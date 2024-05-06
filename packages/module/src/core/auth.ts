import bcrypt from "bcryptjs"

type HashPassword = ({
  rawPassword,
  salt,
}: {
  rawPassword: string
  salt: string
}) => Promise<string>

const hashPassword: HashPassword = async ({ rawPassword, salt }) => {
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
