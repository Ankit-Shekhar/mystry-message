import { z } from 'zod';

// here "identifier" is the email.
export const signInSchema = z.object({
    identifier: z.string(),
    password: z.string()
})