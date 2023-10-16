import jwt from 'jsonwebtoken'
import { secret } from '../config/config.js'


//genera un token con los datos que se le envien en el payload 
export const generateToken = (payload) => {
    const token = jwt.sign({payload}, secret, {
        expiresIn: '6h',
    });

    return token;
};


export const verifyToken = (token) => {
    return jwt.verify(token, secret);
}