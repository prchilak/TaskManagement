import { addNotificationIfNotExists } from '../app/features/notifications/notificationSlice';
import { baseURL } from '../config';
import { io } from 'socket.io-client';
import { showToast } from '../app/features/alerts/alertsSlice';

export const initNotificationSocket = (dispatch, userId) => {
    const socket = io(baseURL, {
        query: { userId },
    });

    socket.on("connect", () => {
        console.log("✅ Connected:", socket.id);

        socket.emit("join", userId);
    });


    socket.on('notification', (data) => {
        console.log("Raw notification:", data);

        if (!data || !data._id) {
            console.warn(" Invalid notification payload:", data);
            return;
        }

        dispatch(addNotificationIfNotExists(data));

        dispatch(
            showToast({
                message: data.message || "New notification received",
                severity: 'info',
            })
        );
    });

    return socket;
};