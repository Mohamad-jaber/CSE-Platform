const dataMethod = ['body','params','query','headers'];
export const validation = (Schema)=>{
    return (req,res,next)=>{
        const validationArr = [];
        dataMethod.forEach(key=>{
    if(Schema[key]){
       const validtionResult = Schema[key].validate(req[key],{abortEarly:false});
       if(validtionResult.error){
        validationArr.push(validtionResult.error.details);
    }
        }
        })
        
        if(validationArr.length){

            res.json({message:'validation error',validationArr});
        }else{
            next();
        }
    }
}