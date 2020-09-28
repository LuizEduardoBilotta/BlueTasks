import Axios from "axios";
import { JWT_TOKEN_NAME } from "../constants";
import { AUTH_ENDPOINT } from '../constants'

class AuthService {

    login(username, password, onLogin) {
        Axios.post(`${AUTH_ENDPOINT}/login`, { username: username, password: password })
             .then(response => {
                const jwtToken = response.headers['authorization'].replace("Bearer ", "");
                sessionStorage.setItem(JWT_TOKEN_NAME, jwtToken);
                onLogin(true);
             }).catch(error => {
                 console.error(error);
                 onLogin(false);
             });
    }

    getJWTToken() {
        return sessionStorage.getItem(JWT_TOKEN_NAME);
    }

    isAuthenticated() {
        return this.getJWTToken() != null;
    }

    logout() {
        sessionStorage.removeItem(JWT_TOKEN_NAME);
    }

    getJwtTokenData() {
        const jwtToken = this.getJWTToken();

        if (jwtToken == null) {
            return null;
        }

        const jwtTokenData = atob(jwtToken.split(".")[1]);
        return JSON.parse(jwtTokenData);
    }


}

export default new AuthService();