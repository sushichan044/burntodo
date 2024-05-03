import bcrypt from "bcryptjs"

type HashPassword = (rawPassword: string) => Promise<string>

const hashPassword: HashPassword = async (rawPassword: string) => {
  const salt = await bcrypt.genSalt(16)
  const hashed = await bcrypt.hash(rawPassword, salt)
  return hashed
}

type VerifyPassword = (
  rawPassword: string,
  hashedPassword: string,
) => Promise<boolean>

const verifyPassword: VerifyPassword = async (
  rawPassword: string,
  hashedPassword: string,
) => {
  const isMatch = await bcrypt.compare(rawPassword, hashedPassword)
  return isMatch
}

export { hashPassword, verifyPassword }
