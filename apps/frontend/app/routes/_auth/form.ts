import { z } from "zod"

const signInUpSchema = z.object({
  name: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string({ required_error: "Name is required" }),
  ),
})

export { signInUpSchema }
