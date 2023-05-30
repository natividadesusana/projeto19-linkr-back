export function validateSchema(schema, errorCode) {
    
    return (req, res, next) => {
        const validation = schema.validate(req.body, { abortEarly: false })

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message)
            
            return res.status(errorCode).send(errors)
        }
        next()
    }
}