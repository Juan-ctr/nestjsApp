import * as bcrypt from 'bcrypt';

export async function encodePassword(rawPassword: string): Promise<string> {
  const SALT = bcrypt.genSaltSync(10);
  return bcrypt.hash(rawPassword, SALT);
}

export function comparePassword(rawPassword: string, hash: string): boolean {
  return bcrypt.compareSync(rawPassword, hash);
}
