import BadRequest from "../error/error";
import { Request, Response, NextFunction} from "express";


interface CustomRequest extends Request {
    dirty?: boolean;  // Define 'dirty' as an optional property
}
export function validator (schema:any, path='body') {
    return function (req:CustomRequest, res:Response, next:NextFunction) {
        let request = req.body;
        if (path === 'query') {
            request = req.query;
        } else if (path === 'params') {
            request = req.params;
        }
        const { value, error } = schema.validate(request);
        if (error) {
            throw new BadRequest(error.details[0].message);
        }


        req.dirty = req.body;
        req.body = value;

        next()
    }
}