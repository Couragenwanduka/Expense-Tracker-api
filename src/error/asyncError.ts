import BadRequest from './error';
import { NextFunction, Request, Response } from 'express';



const errorHandling = (err: Error |any, req: Request, res: Response, next: NextFunction): Response => {
  // Handle custom BadRequest errors
  if (err instanceof BadRequest) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle validation errors (e.g., from Joi or express-validator)
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      errorCode: "VALIDATION_ERROR",
      message: 'Validation Error',
      details: err.details.map((detail: any) => detail.message),
    });
  }

  // Handle syntax errors in JSON parsing
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      success: false,
      errorCode: "SYNTAX_ERROR",
      message: 'Invalid JSON syntax',
      details: err.message,
    });
  }

  // Handle TypeErrors
  if (err instanceof TypeError) {
    return res.status(400).json({
      success: false,
      errorCode: "TYPE_ERROR",
      message: 'Type Error',
      details: err.message,
    });
  }

  // Log any unhandled errors for internal tracking
  if (err) {
    console.error(err.stack || err); // Logs stack trace or error message
    return res.status(500).json({
      success: false,
      errorCode: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred. Please try again later.",
    });
  }

  // Default to 500 Internal Server Error for other types of errors
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};

export default errorHandling;
