import DB_CONFIG from "../../../config.js";

import { MongoClient } from 'mongodb';

const client = new MongoClient(`${ DB_CONFIG.DB_HOST }:${ DB_CONFIG.DB_PORT }`);

export default class Auth {
    async isAuth(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];

            await client.connect();

            const db = client.db(DB_CONFIG.DB_NAME);

            collection = db.collection('users');

            let user = await collection.findOne({
                token: bearerToken,
            });

            req.user = user;

            if (!user)
                return res.sendStatus(403);

            next();
        } else {
            // Forbidden
            res.sendStatus(403);
        }
    }
}