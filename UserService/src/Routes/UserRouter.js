import express from 'express';

import UserController from "../Controllers/UserController.js";

let UserControllerInstance = new UserController();

let router = express.Router();

router.post('/', function (req, res) {
    res.json("System work correctly").status( 200 );
});

router.post('/login', UserControllerInstance.login );

router.post('/register', UserControllerInstance.register );

export default router;