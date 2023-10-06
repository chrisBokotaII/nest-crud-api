import * as dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET, JWT_EXP } = process.env;
export const jwtconstant = {
  secret: JWT_SECRET,
  expiresIn: JWT_EXP,
};
