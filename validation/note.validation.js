
const {note} = require('./note.schema');

module.exports= {
    addNoteValidation: async (req,res,next) =>{
        const value= await note.validate(req.body);
        if(value.error){
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else{
            next();
        }
    }
}