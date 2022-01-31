import DB_CONFIG from "../../../config.js";

import { MongoClient } from 'mongodb';

const client = new MongoClient( `${ DB_CONFIG.DB_HOST }:${ DB_CONFIG.DB_PORT }` );

// Created for incapsulation, to not have acces from exterior of this module
let collection = null;

// Generate token for registered users
const generateRandomString = ( myLength ) => {
    const chars =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
      { length: myLength },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );
  
    const randomString = randomArray.join("");
    return randomString;
};

export default class UserModel {
    constructor() {
        try {
            client.connect().then(() => {
                console.log('Connected successfully to database');
    
                const db = client.db( DB_CONFIG.DB_NAME );
    
                collection = db.collection('users');
            });

        } catch (error) {
            console.log( `UserModel:constructor | ${ error.message }` );
        }
    }

    async getUser({ login, password }) {
        try {

            if( !login || !password )
                return false;

            let user = await collection.findOne({
                login: login,
                password: password,
            });

            if( !user )
                return false;

            return user;

        } catch (error) {
            console.log( `UserModel:getUser | ${ error.message }` );
        }
    }

    async addUser({ login, password }) {
        try {

            if( !login || !password )
                return false;

            let token = generateRandomString( 32 );

            let user = await collection.insertOne({
                login: login,
                password: password,
                token: token,
            });

            console.log( "addUser token", user );

            if( !user )
                return false;

            return user;

        } catch (error) {
            console.log( `UserModel:addUser | ${ error.message }` );
        }
    }
}