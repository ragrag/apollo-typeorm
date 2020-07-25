import { Request, Response, NextFunction } from 'express';
import Boom from 'boom';
import { isBoom } from '@hapi/boom';

function errorMiddleware(error: Boom | Error, req: Request, res: Response, next: NextFunction) {
    console.log(`[Error] - ${error.message}`);
    const statusCode: number = isBoom(error) ? error.output.statusCode : 500;
    const errorMessage: string = isBoom(error) ? error.message : 'Something went wrong';

    return res.status(statusCode).send(errorMessage);
}

export default errorMiddleware;
