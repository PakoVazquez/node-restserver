const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const query = req.query;
    res.json({
        msg: 'get API - Controller',
        query
    });
};
const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'put API - Controller',
        id
    });
};
const usuariosPost = (req, res = response) => {
    const { name, edad, email } = req.body;

    res.json({
        msg: 'post API - Controller',
        name,
        edad,
        email
    });
};
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - Controller'
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}