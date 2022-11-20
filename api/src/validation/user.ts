import Joi from 'joi';

export const PostUserSchema = Joi.object<{ email: string; password: string }>().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(100),
});
