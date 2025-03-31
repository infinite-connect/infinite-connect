import { z } from 'zod';

export const schema = z.object({
  business_name: z.string().optional(),
  company: z.string().optional(),
  department: z.string().optional(),
  job_title: z.string().optional(),
  fax: z.string().optional(),
  business_website: z.string().optional(),
  experience_years: z.string().optional(),
  primaryUrlPlatform: z.string().optional(),
  primaryUrlValue: z.string().optional(),
  subUrl01Platform: z.string().optional(),
  subUrl01Value: z.string().optional(),
  subUrl02Platform: z.string().optional(),
  subUrl02Value: z.string().optional(),
  business_address: z.string().optional(),
  nickname: z.string().optional(),
});
