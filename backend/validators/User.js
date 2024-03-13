import Joi  from "joi";

export default {

    async createUser(req, res, next) {
        const schema = Joi.object().keys({
            lastName: Joi.string().required(),
            firstName: Joi.string().required(),
            password: Joi.string().required(),
            gender :Joi.string().valid('male','female','other'),
            email: Joi.string().regex(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required().messages({
                "string.pattern.base": "Please Enter Valid Email"
            }),
        });

        const validatationResult = schema.validate(req.body);

        if (validatationResult.error) {
            validatationResult?.error?.details?.forEach((data) => {
                let error = data?.message.toString();
                let message = error.replace("\"", "").replace("\"", "");
                return res.status(400).json({
                    status: false,
                    message
                });
            })
        } else {
            next();
        }
    },

     async validateLogin(req, res, next) {
        const schema = Joi.object().keys({
            email: Joi.string().regex(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required().messages({
                "string.pattern.base": "Please Enter Valid Email"
            }),
            password: Joi.string().required(),
        });

        const validatationResult = schema.validate(req.body);

        if (validatationResult.error) {
            validatationResult?.error?.details?.forEach((data) => {
                let error = data?.message.toString();
                let message = error.replace("\"", "").replace("\"", "");
                return res.status(400).json({
                    status: false,
                    message
                });
            })
        } else {
            next();
        }
    }
    


    
}