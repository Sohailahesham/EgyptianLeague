import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const generateAccessToken = (payload: any) => {
  
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY || "", {
    expiresIn: "1h",
  });
  return accessToken;
};

export {
  generateAccessToken,
};
