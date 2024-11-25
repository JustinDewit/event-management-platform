import { z } from 'zod';

export const eventSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  description: z.string().min(1, 'Description is required'),
  detailedDescription: z.string().min(1, 'Detailed description is required'),
  location: z.string().min(1, 'Location is required'),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  time: z.string().min(1, 'Time is required'),
});

export type EventInput = z.infer<typeof eventSchema>;