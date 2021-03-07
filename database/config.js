require('colors');
const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Database is ready.'.green);
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar.'.red);
    }
}

module.exports = {
    dbConnection
}