import { body } from "express-validator";

const registrationValidation = () => {
  return [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is not valid")
      .notEmpty()
      .withMessage("Email is required"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 7 })
      .withMessage("minimum 7 characters required")
      .isLength({ max: 12 })
      .withMessage("Maximum 12 letter / symbols used"),
  ];
};

const loginValidator = () => {
    return [
        body("email").isEmail().notEmpty().withMessage("Email is required"),
        body("password").notEmpty().withMessage("password is required"),
    ]
}

export{registrationValidation, loginValidator}