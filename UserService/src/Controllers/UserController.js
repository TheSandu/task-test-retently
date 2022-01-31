import UserModel from "../Models/UserModel.js";

const UserInstance = new UserModel();

export default class UserController {
    async login( req, res ) {
        try {

            let login = req.body.login;
            let password = req.body.password;

            if( !login || !password )
                return res.status( 404 ).json({
                    data: "Set credentials"
                });

            let user = await UserInstance.getUser({
                login: login,
                password: password,
            });

            if( !user )
                return res.status( 404 ).json({
                    data: "User not found"
                });

            return res.status( 200 ).json({
                data: user
            });

        } catch (error) {
            console.log( `UserController:login | ${ error.message }` );
        }
    }

    async register( req, res ) {
        try {

            let login = req.body.login;
            let password = req.body.password;
    
            if( !login || !password )
                return res.json({
                    data: "Set credentials"
                }).status( 404 );

            let user = await UserInstance.addUser({
                login: login,
                password: password,
            });
    
            if( !user )
                return res.json({
                    data: "User cand be register",
                }).status( 404 );
    
            return res.json({
                data: user
            }).status( 200 );
    
        } catch (error) {
            console.log( `UserController:register | ${ error.message }` );
        }
    }
}