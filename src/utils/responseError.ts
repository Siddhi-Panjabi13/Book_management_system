export function responseError(message:string|object,error:object,status:boolean){
    return {
        status:status,
        message:message,
        error:error
    }
}

export function server_Error(error:any){
   
        let message:string = ''
        if(error.name == 'CastError'){
            return message = 'Invalid ID please go through it'
        }if(error.code==11000){
           return message = 'Please be unique cause category already exist'
        }
        if(error.name === 'ValidationError'){
            // console.log("here")
            for(const key in error.errors){
                // console.log(error.errors[key].name === 'CastError')
                if(error.errors[key].name === 'CastError'){
                     message += `The Id for reference is not valid at ${key}`
                }else{
                    message+=error.errors[key].message;
                    // console.log('in else')
                }
                message+=" "
            }
            message.slice(0,message.length-2)
            // return  new ApiError(422,message)
            return message
        }
        return error.message
}