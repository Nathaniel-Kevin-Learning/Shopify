import jwt, { Secret } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
export function createToken(payload: {
  _id: ObjectId;
  username: string;
  email: string;
}) {
  return jwt.sign(payload, process.env.JWT_SECRET as Secret);
}
