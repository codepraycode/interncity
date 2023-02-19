import { useState } from 'react';
// import AppContext from '../app/context';

async function sendPushNotification(expoPushToken, item) {
    const {title, body, data} = item;
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: title || 'New notification',
        body: body || "Click to view",
        data: data || {},
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

const useNotifications = (expoPushToken)=>{

    const [notification, setNotification] = useState(false);

    const newNotification = ({title, body, data})=> sendPushNotification(expoPushToken, {title, body, data});
    const updateNotification = (notification)=> setNotification(notification);

    return {notification, updateNotification, newNotification};
}


export default useNotifications;