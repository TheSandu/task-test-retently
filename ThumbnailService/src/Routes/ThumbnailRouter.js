import express from 'express';

import ThumbnailController from "../Controllers/ThumbnailController.js";

import Auth from "../Middleware/Auth.js";

let AuthMiddleware = new Auth();

let router = express.Router();

// Check autorisation middleware
router.use(AuthMiddleware.isAuth);

router.post('/', (req, res) => {
    res.json("System work correctly").status(200);
});

let ThumbnailControllerInstance = new ThumbnailController();

router.post('/getThumbnail', ThumbnailControllerInstance.getThumbnail);

export default router;