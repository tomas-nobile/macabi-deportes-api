import { verifyToken } from "../utils/tokens.js";

const validateAccess = (req, res, next) => {
    try {

        

        const { tokenMacabi } = req.cookies;

        console.log(tokenMacabi);
        
        if (!tokenMacabi) {
            const error = new Error("Acceso denegado, no hay cookie")
            error.status = 401;
            throw error;
        };

        const { payload } = verifyToken(tokenMacabi);

        if (!payload) {
            const error = new Error("Acceso denegado, no hoy payload")
            error.status = 401;
            throw error;
        };
    
        req.user = payload;

        next()

    } catch (error) {

        if (error.message == 'jwt expired') {
            res.cookie('tokenMacabi', '');
            error.message = 'JWT expired, Cookie Eliminada'
        }

        
        next(error);
    }

};

export default validateAccess;