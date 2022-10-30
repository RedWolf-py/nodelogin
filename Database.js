const mongoose = require('mongoose')

function ConnectDataBase() {
    mongoose.connect(process.env.DATABASA_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    });
    const db = mongoose.connection;
    db.on('error', (err) => {
        console.log(err)
    })
    db.once('open', () => {
        console.log('conected on database!')
    })
}

module.exports = ConnectDataBase;