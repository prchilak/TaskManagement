import {
    createNotification,
    deleteNotification,
    getNotifications,
    markAsRead
} from '../controllers/notification.controller.js';
import { createNotificationSchema, deleteNotificationSchema, getNotificationsSchema, markAsReadSchema } from '../validators/notification.validator.js';

import auth from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import express from 'express';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

router.use(auth);


router.post('/', authorizeRoles('admin'), validate(createNotificationSchema), createNotification);


router.get('/', getNotifications);
router.put('/:id/read', markAsRead);
router.delete('/:id', validate(deleteNotificationSchema), deleteNotification);

export default router;