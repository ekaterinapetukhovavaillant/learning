import * as bcrypt from 'bcrypt';

export async function hashPassowrd(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  return hash;
}
