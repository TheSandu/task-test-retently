import DB_CONFIG from "../../../config.js";

import { MongoClient } from 'mongodb';

const client = new MongoClient(`${ DB_CONFIG.DB_HOST }:${ DB_CONFIG.DB_PORT }`);

import path from "path";
const __dirname = path.resolve();

import captureWebsite from 'capture-website';

// Created for incapsulation, to not have acces from exterior of this module
let collection = null;

// Generate token for registered users
const generateRandomString = (myLength) => {
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from({ length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
};

export default class ThumbnailModel {
    constructor() {
        try {
            client.connect().then(() => {
                console.log('Connected successfully to database');

                const db = client.db(DB_CONFIG.DB_NAME);

                collection = db.collection('thumbnails');
            });
        } catch (error) {
            console.log(`ThumbnailModel:constructor | ${ error.message }`);
        }
    }

    async getThumbNail({ domainName }) {
        try {

            let fileName = generateRandomString(16);

            let filePath = path.join(__dirname, `ThumbnailService/store/${ fileName }.png`);

            console.log(domainName, filePath);

            await captureWebsite.file(domainName, filePath);

            let thumbnail = await collection.insertOne({
                userId: userId,
                fileName: `${ fileName }.png`,
            });

            if (!thumbnail)
                return false;

            return {
                fileName: `${ fileName }.png`,
                filePath: filePath,
            };

        } catch (error) {
            console.log(`ThumbnailModel:getThumbNail | ${ error.message }`);
        }
    }

}