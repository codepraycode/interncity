import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useContext, useEffect, useRef, useState } from 'react';
import AppContext from '../../app/context';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {

    let token;
    if (Device.isDevice) {
        
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        }

        if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
        }

        try{
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        }
        catch(err){
          console.log("Error get notification token:", err);
        }

    } else {
        alert('Device does not support Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        });
    }

    return token;
}

const Notification = ()=>{
    

    const {
    //   expoPushToken, notification, 
      updateExpoPushToken,updateNotification
    } = useContext(AppContext);
    
    const notificationListener = useRef();
    const responseListener = useRef();


    useEffect(() => {
      registerForPushNotificationsAsync().then(token => updateExpoPushToken(token));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        updateNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        // console.log("Notification response:",response);
        console.log("A notification was responded to!");
      });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

    // console.log(expoPushToken);
    // console.log(notification);


    // useEffect(()=>{
    //   setTimeout(async () => {
    //     console.log("Push notification!")
    //     await sendPushNotification(expoPushToken);
    //   }, 2500)
    // },[])


    return null;

}

export default Notification;