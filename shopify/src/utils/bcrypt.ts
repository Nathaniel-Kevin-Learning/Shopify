import bcrypt from 'bcryptjs';
export function encryptPass(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function validate(password: string, hashed: string) {
  return bcrypt.compareSync(password, hashed);
}
