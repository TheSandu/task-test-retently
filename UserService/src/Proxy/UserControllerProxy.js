import axios from 'axios';

axios.defaults.headers.common = {
    "Content-Type": "application/json"
};

export default class UserControllerProxy {
    async login({ login, password }) {
        try {
            let response  = await axios.post("http://localhost:5000/user/login", {
                login: login,
                password: password,
            });
    
            if( !response )
                return false;
            
            return response;
        } catch (error) {
            return error;
        }
    }

    async register({ login, password }) {
        try {
            let response  = await axios.post("http://localhost:5000/user/register", {
                login: login,
                password: password,
            });
    
            if( !response )
                return false;
            
            return response;
        } catch (error) {
            return error;
        }

    }
}