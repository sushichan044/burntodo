import { z } from "zod"

const regex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,128}$/,
)

const signUpSchema = z.object({
  name: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string({ required_error: "Name is required" }),
  ),
  password: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters")
      .regex(
        regex,
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 8-128 characters long",
      ),
  ),
})

const signInSchema = z.object({
  name: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string({ required_error: "Name is required" }),
  ),
  password: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string({ required_error: "Password is required" }),
  ),
})

export { signInSchema, signUpSchema }
