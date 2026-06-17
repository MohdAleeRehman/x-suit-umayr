import Joi from 'joi';

// Generic validation middleware factory
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

  if (error) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: error.details.map(d => d.message)
    });
  }

  next();
};

// --- Schemas ---

export const loginSchema = validate(
  Joi.object({
    username: Joi.string().trim().lowercase().required().messages({
      'any.required': 'Username is required'
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required'
    })
  })
);

export const createRecordSchema = validate(
  Joi.object({
    type: Joi.string().valid('sale', 'rent', 'property').required().messages({
      'any.only': 'Type must be sale, rent, or property',
      'any.required': 'Type is required'
    }),
    dataset: Joi.object().required().messages({
      'any.required': 'Dataset is required'
    }),
    tags: Joi.array().items(Joi.string()).default([])
  })
);

export const updateRecordSchema = validate(
  Joi.object({
    dataset: Joi.object().required().messages({
      'any.required': 'Dataset is required'
    }),
    tags: Joi.array().items(Joi.string())
  })
);

export const updatePasswordSchema = validate(
  Joi.object({
    currentPassword: Joi.string().required().messages({
      'any.required': 'currentPassword is required'
    }),
    newPassword: Joi.string().min(8).required().messages({
      'string.min': 'newPassword must be at least 8 characters',
      'any.required': 'newPassword is required'
    })
  })
);

export const generatePdfShareSchema = validate(
  Joi.object({
    moduleType: Joi.string().valid('sale', 'rent', 'property').required().messages({
      'any.only': 'moduleType must be sale, rent, or property',
      'any.required': 'moduleType is required'
    }),
    title: Joi.string().trim().max(200).required().messages({
      'any.required': 'title is required'
    }),
    summary: Joi.string().trim().max(2000).allow('').default(''),
    recordId: Joi.string().trim().allow('').default('')
  })
);
