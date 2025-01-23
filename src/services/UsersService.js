const autoBind = require("auto-bind");
const { nanoid } = require("nanoid");
const { NewUser } = require("../models/UsersModel");
const InvariantError = require("../Exceptions/InvariantError");
const AuthenticationError = require("../Exceptions/AuthenticationError");
require('dotenv').config();
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const NotFoundError = require("../Exceptions/NotFoundError");

class UsersService {
    constructor(){
        // Connect to db
        const query_builder = require('mysql-querybuilder-nodejs');
        const db = query_builder(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, process.env.DB_HOST, process.env.DB_PORT);

        this.db = db;
        autoBind(this);
    }

    getUsers(req, res){
        res.send("Hello World");
    }

    async daftarUser(req, res){
       
        try {
            const input = await NewUser(req.body);
            await this._cekUsername(input.username);

            this.db.insert_async('users', input).then(data => res.status(201).json({status: 'success',message: 'Berhasil registrasi'}))
                .catch(err => res.status(500).json({status: 'fail', message: 'server error', err}));

        } catch (error) {
            res.status(error.statusCode).json({message: error.message, status: 'fail'})
        }
        
        
    }

    async login(req, res){
        try {
            const {username, password} = req.body;            
            const user = await this.db.select('*').from('users').where('username', username).row_async();
            
            if(user.length == 0){
                throw new NotFoundError(`User ${username} tidak terdaftar`);                
            }

            // Verify password
            const valid = await bcrypt.compare(password, user[0].password);
            if(!valid){
                throw AuthenticationError(`Password untuk user ${username} salah!`);
            }

            // Create token
            const token = Jwt.sign({id: user[0].id}, process.env.JWT_SECRET_KEY);

            res.status(200).json({status: 'success', message: 'berhasil login', token: token})

        } catch (error) {
            res.status(error.statusCode).json({message: error.message, status: 'fail'});
        }
    }


    async _cekUsername(username){
        const user = await this.db.select('username').from('users').where('username', username).row_async();
        if(user.length != 0){
            throw new InvariantError(`User ${username} sudah terdaftar`);                
        }
    }
}

module.exports = UsersService;