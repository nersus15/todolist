const autoBind = require("auto-bind");
const { nanoid } = require("nanoid");
const InvariantError = require("../Exceptions/InvariantError");
const NotFoundError = require("../Exceptions/NotFoundError");
const AuthorizationError = require("../Exceptions/AuthorizationError");
const { formatDate, formatDateTime } = require("../utils");

class TasksService {
    constructor(){
        // Connect to db
        const query_builder = require('mysql-querybuilder-nodejs');
        const db = query_builder(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, process.env.DB_HOST, process.env.DB_PORT);

        this.db = db;
        autoBind(this);
    }

    async getAllTasks(req, res){
        const {userId} = req;

        // Get all my tasks
        const tasks = await this.db.select('*')
            .where('owner', userId)
            .where('todo.deleted_at IS NULL', '', '', false)
            .order_by('created_at').results_async('todo');
        
        // Get all shared tasks
        const shared = await this.db.select('todo.*')
            .where('collaborations.user', userId)
            .where('todo.deleted_at IS NULL', '', '', false)
            .from('todo').join('collaborations', 'collaborations.todo = todo.id').order_by('created_at').results_async();
        res.status(200).json({tasks, shared});
    }

    async getSharedTasks(req, res){
        const {userId} = req;

        // Get all shared tasks
        const shared = await this.db.select('todo.*')
            .where('collaborations.user', userId)
            .where('todo.deleted_at IS NULL', '', '', false)
            .from('todo').join('collaborations', 'collaborations.todo = todo.id').order_by('created_at').results_async();
        res.status(200).json({shared});
    }

    async getMyTasks(req, res){
        const {userId} = req;

        // Get all my tasks
        const tasks = await this.db.select('*')
            .where('owner', userId)
            .where('todo.deleted_at IS NULL', '', '', false)
            .order_by('created_at').results_async('todo');

        res.status(200).json({tasks});
    }
    async getTask(req, res){
        const {id} = req.params;
        const userId = req.userId;

        try {
            await this.verifyAcces(id, userId);
            console.log(userId);
            
            const tasks = await this.db.select('*')
                .where('id', id)
                .where('todo.deleted_at IS NULL', '', '', false)
                .order_by('created_at').results_async('todo');

            res.status(200).json({tasks});
        } catch (error) {
            res.status(error.statusCode).json({message: error.message, status: 'fail'});
        }   
    }

    async createNew(req, res){
        const {title, body} = req.body;
        const userId = req.userId;

        try {
            if(!title || !body || title == '' || body == ''){
                throw new InvariantError('Field title, body required');
            }
    
            const input = {id: `task-${nanoid(16)}`, owner: userId, title, body};

            await this.db.insert_async('todo', input);

            res.status(201).json({status: 'success', message: 'Task berhasil dibuat'});
        } catch (error) {
            res.status(error.statusCode).json({message: error.message, status: 'fail'});
        }

    }

    async updateTask(req, res){
        const {title, body} = req.body;
        const userId = req.userId;
        const {id} = req.params;

        try {
            if(!title || !body || title == '' || body == ''){
                throw new InvariantError('Field title, body required');
            }
            await this.verifyOwner(id, userId);

            const input = {title, body};

            await this.db.where('id', id).update_async('todo', input);

            res.status(201).json({status: 'success', message: 'Task berhasil diubah'});
        } catch (error) {
            res.status(error.statusCode).json({message: error.message, status: 'fail'});
        }
    }

    async deleteTask(req, res){
        const userId = req.userId;
        const {id} = req.params;

        try {
            await this.verifyOwner(id, userId);
            const input = {deleted_at: formatDateTime()};
            
            await this.db.where('id', id).update_async('todo', input);

            res.status(201).json({status: 'success', message: 'Task berhasil dihapus'});
        } catch (error) {
            res.status(error.statusCode).json({message: error.message, status: 'fail'});
        }
    }

    async changeStatus(req, res){
        const {id} = req.params;
        const userId = req.userId;
        const {status} = req.body;
        const statusOptions = [
            'OPEN',
            'ON PROGRES',
            'PENDING',
            'COMPLETED',
            'CANCELED'
        ];
        try {
            await this.verifyAcces(id, userId);
            if(!statusOptions.includes(status.toUpperCase())){
                throw new InvariantError(`Status must one of ${statusOptions.join(',')}`);
            }

            await this.db.where('id', id).update_async('todo', {status: status.toUpperCase()});
            res.status(201).json({status: 'success', message: 'Status Task berhasil diubah'});
        } catch (error) {
            res.status(error.statusCode).json({message: error.message, status: 'fail'});
        }
    }
    async getShared(req, res){
        const {id} = req.params;
        const userId = req.userId;

        try {
            await this.verifyOwner(id, userId);

            const users = await this.db.select('users.id, users.username, users.nama')
                .from('users')
                .join('collaborations', 'collaborations.user = users.id')
                .where('collaborations.todo', id)
                .results_async();

            res.status(200).json({users});
        } catch (error) {
            console.log(error.message);
            
            res.status(error.statusCode).json({message: error.message, status: 'fail'});
        }
    }

    async shareTask(req, res){
        const {id} = req.params;
        const userId = req.userId;
        const {users} = req.body;

        try {
            await this.verifyOwner(id, userId);
            if(!Array.isArray(users)){
                throw new InvariantError('Users must in array of string');
            }
            if( users.length == 0){
                throw new InvariantError('Share task to 1 or more users');
            }

            await users.forEach(async (user) => {
                await this.db.insert_async('collaborations', {id:`collab-${nanoid(16)}`, todo: id, user: user});
            });

            res.status(201).json({staus: 'success', message: `Berhasil membagikan task ke ${users.join(', ')}`});
        } catch (error) {
            console.log(error);
            
            res.status(error.statusCode).json({message: error.message, status: 'fail'});
        }
    }

    async deleteShare(req, res){
        const {id} = req.params;
        const userId = req.userId;
        const {users} = req.body;

        try {
            await this.verifyOwner(id, userId);
            if(!Array.isArray(users)){
                throw new InvariantError('Users must in array of string');
            }
            
            if(users.length == 0){
                throw new InvariantError('Unshare task from 1 or more users');
            }

            await users.forEach(async (user) => {
                await this.db.where('user', user).where('todo', id).delete_async('collaborations');
            });

            res.status(200).json({status: 'success', message: `Berhasil menghapus user ${users.join(', ')} dari daftar sharing`});
        } catch (error) {
            res.status(error.statusCode).json({message: error.message, status: 'fail'});
        }
    }

    async commentTask(req, res){
        const {id} = req.params;
        const userId = req.userId;
        const {content} = req.body;

        try {
            await this.verifyAcces(id, userId);
            if(!content || content == ''){
                throw new InvariantError('content is required field');
            }
            const input = {
                id: `comment-${nanoid(16)}`,
                content: content,
                todo: id,
                owner: userId
            }

            await this.db.insert_async('comments', input);
            res.status(201).json({status: 'success', message: 'Berhasil menambahkan komentar'});
        } catch (error) {
            res.status(error.statusCode).json({message: error.message, status: 'fail'});
        }
    }

    async deleteComment(req, res){
        const {id, commentid} = req.params;
        const userId = req.userId;
        console.log(commentid);
        
        try {
            const comment = await this.db.select('*').where('todo', id).where('id', commentid).results_async('comments');
            if(comment.length == 0){
                throw new NotFoundError('Komentar tidak ditemukan');
            }

            if(comment[0].owner != userId){
                throw new AuthorizationError('Access denied');
            }

            await this.db.where('todo', id).where('owner', userId).where('id', commentid).update_async('comments', {deleted_at: formatDateTime()});
            res.status(200).json({status: 'success', message: 'Berhasil menghapus komentar'});
        } catch (error) {
            res.status(error.statusCode).json({message: error.message, status: 'fail'});
        }
    }

    async getComments(req, res){
        const {id} = req.params;
        const userId = req.userId;

        try {
            await this.verifyAcces(id, userId)
          
            const comments = await this.db.select('*').where('deleted_at IS NULL', '', '', false).where('todo', id).results_async('comments');
            res.status(200).json({status: 'success', comments});
        } catch (error) {
            res.status(error.statusCode).json({message: error.message, status: 'fail'});
        }
    }
    async verifyOwner(taskid, username){
        const task = await this.db.select('owner')
            .where('todo.deleted_at IS NULL', '', '', false)
            .where('id', taskid).row_async('todo');

        if(task.length == 0){
            throw new NotFoundError('Task tidak ditemukan');
        }
        
        if(task[0].owner != username){
            throw new AuthorizationError('access denied');
        }
    }

    async verifyAcces(taskid, username){
        try {
            await this.verifyOwner(taskid, username);
        } catch (error) {
            const shared = await this.db.select('todo.*').from('todo').join('collaborations', 'collaborations.todo = todo.id')
                .where('todo.id', taskid)
                .where('todo.deleted_at IS NULL', '', '', false)
                .where('collaborations.user', username)
                .results_async();
            
            if(shared.length == 0){
                throw new AuthorizationError('access denied');
            }
        }
    }
}

module.exports = TasksService;