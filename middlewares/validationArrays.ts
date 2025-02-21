import {body, param} from 'express-validator';

const createPlayerValidation = [

    body("name")
                .isString()
                .withMessage("Name should be string")
                .notEmpty()
                .withMessage("Name is required"),
            body("age")
                .isNumeric()
                .withMessage("Age should be number")
                .notEmpty()
                .withMessage("Age is required")
                .isInt({min: 16})
                .withMessage("Age should be greater than 15"),
            body("salary")
                .isNumeric()
                .withMessage("Salary should be number")
                .notEmpty()
                .withMessage("Salary is required")
                .isInt({min: 1000})
                .withMessage("Salary should be greater than 999"),
    body("teamId")
        .notEmpty()
                .withMessage("Team ID is required")
                .isUUID()
                .withMessage("Invalid team ID")
                
]

const playerIdValidation = [
    param("playerId")
        .isUUID()
        .withMessage("Invalid player ID")
        .notEmpty()
        .withMessage("Player ID is required")
]

const salaryValidation = [
    body("salary")
        .isNumeric()
        .withMessage("Salary should be number")
        .isInt({min: 1000})
        .withMessage("Salary should be greater than 999")
]

const teamIdValidation = [
    param("teamId")
        .isUUID()
        .withMessage("Invalid team ID")
        .notEmpty()
        .withMessage("Team ID is required")
]

const shirtColorValidation = [
    body("shirtColor")
        .notEmpty()
        .withMessage("Shirt color is required")
        .isString()
        .withMessage("Shirt color should be string")   
        
]

const registerValidation = [
    body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters long")
    .matches(/^[A-Za-z0-9\s]+$/)
    .withMessage("Username can only contain letters, numbers, and spaces"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&_]/)
    .withMessage(
      "Password must contain at least one special character (@, $, !, %, *, ?, &, _)"
    )
    .not()
    .matches(/\s/)
    .withMessage("Password must not contain spaces"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

const loginValidation = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Must be a valid email"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
]
export {createPlayerValidation, playerIdValidation, salaryValidation, teamIdValidation, shirtColorValidation, registerValidation, loginValidation}