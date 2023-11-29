import { z } from "zod";
export const signupInput = z.object({
    username: z.string().min(4),
    password: z.string().min(3)
})

export type SignupParams = z.infer<typeof signupInput>;