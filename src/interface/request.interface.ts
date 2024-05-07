import {IUSER} from '../interface'
import {Request} from 'express';

interface Request1 extends Request{
    user:IUSER|null
}
export default Request1;