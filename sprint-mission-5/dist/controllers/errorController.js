import { StructError } from 'superstruct';
import BadRequestError from '../lib/errors/BadRequestError.js';
import NotFoundError from '../lib/errors/NotFoundError.js';
import UnauthorizedError from '../lib/errors/UnauthorizedError.js';
import ForbiddenError from '../lib/errors/ForbiddenError.js';
export function defaultNotFoundHandler(req, res) {
    res.status(404).send({ message: 'Not found' });
}
export function globalErrorHandler(err, req, res, next) {
    if (err instanceof StructError || err instanceof BadRequestError) {
        res.status(400).send({ message: err.message });
        return;
    }
    if (err instanceof SyntaxError &&
        'status' in err &&
        err.status === 400 &&
        'body' in err) {
        res.status(400).send({ message: 'Invalid JSON' });
        return;
    }
    if (typeof err === 'object' && err !== null && 'code' in err) {
        console.error(err);
        res.status(500).send({ message: 'Failed to process data ' });
        return;
    }
    if (err instanceof NotFoundError) {
        res.status(404).send({ message: err.message });
        return;
    }
    if (err instanceof UnauthorizedError) {
        res.status(401).send({ message: err.message });
        return;
    }
    if (err instanceof ForbiddenError) {
        res.status(403).send({ message: err.message });
        return;
    }
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
}
