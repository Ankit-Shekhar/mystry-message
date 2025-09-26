import { z } from 'zod';

// this "verifySchema" is for checking the verification code.
export const verifySchema = z.object({
    code: z.string().length(6, { message: "Verification code must have 6 digits" })
})