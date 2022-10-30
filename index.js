require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/User')

const app = express();

const epxhsb = require('express-handlebars');
const ConnectDataBase = require('./Database');
const session = require('express-session');
const flash = require('connect-flash');

app.engine('handlebars', epxhsb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: 'javascript',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

ConnectDataBase();


// variaveis globais do flash

app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
});

app.get('/', (req, res) => {
    res.render('login')
})

//verificar usuario no db

app.post('/', async (req, res) => {

    const { email, password } = req.body
    const erros = [];

    if (!email) {

        erros.push({ texto: 'Digite um Email Válido' })
    }

    if (!password) {
        erros.push({ texto: 'password obrigatorio' })

    }

    // ver se o usuario existe
    const user = await User.findOne({ email: email })
    if (!user) {

        erros.push({ texto: 'Email obrigatorio' })

    }

    // ver se os password sao iguais

    const checkpassword = await User.findOne({ password: password })

    if (!checkpassword) {

        erros.push({ texto: 'senha invalida' })

    }


    if (erros.length > 0) {
        res.render('login', { erros: erros })

    }
    const logado = await User.findOne({ email: email })
    if (logado) {
        res.render('lg')

    }

});
app.get('/lg', (req, res) => {
    res.render('lg')
})

app.get('/registro', (req, res) => {
    res.render('register')
})

app.post('/registro', async (req, res) => {
    const { name, email, password, password2 } = req.body

    const er = [];

    if (name.length < 2) {
        er.push({ texto: "O Usuario não poder ser menor qu 4 caracterios" })

    }
    if (email.includes('@')) { } else {
        er.push({ texto: "Seu Email não é válido!" })

    }
    if (!password) {
        er.push({ texto: "A senha não poder ser menor que 6 caracteres" })

    }
    if (password != password2) {
        er.push({ texto: "As Senhas não são iguais" })

    }

    //verificando se o email esta no banco de dados

    const userExiste = await User.findOne({ email: email })
    if (userExiste) {
        er.push({ texto: "Email já existe no banco de dados" })
    }


    if (er.length > 0) {
        res.render('register', { er: er });
    } else if (er.length == 0) {

        const user = new User({
            name,
            email,
            password
        })

        try {
            await user.save()
            er.push({ texto: "Usuario salvo no banco" })
            if (er.length > 0) {
                res.render('register', { er: er });
            }
           
          
        } catch (error) {
            console.log(error)      
        }
    }

});



const port = 3001
app.listen(port, () => {

    console.log('link: http://localhost:3001')

})






