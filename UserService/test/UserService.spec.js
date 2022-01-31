import assert from "assert";

import UserControllerProxy from "../src/Proxy/UserControllerProxy.js";

let UserControllerInstance = new UserControllerProxy();

import DB_CONFIG from "../../config.js";

import { MongoClient } from 'mongodb';

const client = new MongoClient( `${ DB_CONFIG.DB_HOST }:${ DB_CONFIG.DB_PORT }` );

describe("UserService", async() => {

    describe("LoginService", () => {

        it("request should return status 404 with message", async () => {
            let testLogin = "login";
            let testPassword = "pass";

            UserControllerInstance.login({
                login: testLogin,
                password: testPassword,
            }).then(( response ) => {
                assert.strictEqual( response.status, 404);
                assert.strictEqual( typeof response.data, "string" );
            })
        });

        it("request should return status 200 with user data", async () => {
            let testLogin = "testlogin";
            let testPassword = "testpassword";

            let response = await UserControllerInstance.login({
                login: testLogin,
                password: testPassword,
            });

            assert.strictEqual( response.status, 200);
        });
    });

    describe("RegisterService", () => {
        // beforeEach( async () => {
        //     await db.dropDatabase();
        // });

        it("should return request status 404 with message", async () => {

        });

        it("should return request status 200 with user data", async () => {

        });

        it("should find registered user", async () => {

        });
    });
});