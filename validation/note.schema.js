const joi= require("@hapi/joi");

const schema= {
    note: joi.object({
        topic: joi.string().max(25).required(),
        description: joi.string().max(100).required()
    })
}

module.exports= schema;