import express from 'express';
import intializeDatabase from '../Controllers/databaseController.js';

const Router = express.Router();

Router.get('/', (req, res)=> {
    res.send("ini db")
})
Router.get('/initialize_database', intializeDatabase)


export default Router;
