export interface customError{
    statusCode:number,
    message:string
}
export class ErrorHandler extends Error implements customError{
    statusCode: number;
    constructor(message:string,statusCode:number){
        super(message);
        this.message=message,
        this.statusCode=statusCode
    }
}

