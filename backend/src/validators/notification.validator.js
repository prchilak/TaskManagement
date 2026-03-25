import { z } from 'zod';

export const createNotificationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),


  userId: z.string().optional(),
});


export const getNotificationsSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});


export const markAsReadSchema = z.object({
  id: z.string().min(1),
})


export const deleteNotificationSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
