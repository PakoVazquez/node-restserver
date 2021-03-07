const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const condicion = { estado: true };
    const [totalRegistros, usuarios] = await Promise.all([
        Usuario.countDocuments(condicion),
        Usuario.find(condicion)
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    res.json({ totalRegistros, usuarios });
};
const usuariosPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;
    // Validar en BD
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
    res.json(usuario);
};
const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });
    //Verificar que el correo existe desde un middleware

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await usuario.save();

    res.json({
        usuario
    });
};
const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;
    // borrado fisico
    //const usuario = await Usuario.findByIdAndDelete(id);
    // Cambio de estado
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(usuario);
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}