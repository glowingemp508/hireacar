import React, { useEffect } from "react";
import Route from "./Src/Navigation/Route";
import messaging from '@react-native-firebase/messaging';
import { ChatState } from "./Src/Context/ChatProvider";
import notifee from '@notifee/react-native';
import { Platform } from "react-native";
export default function App() {
  const { selectedChat, setSelectedChat, user, notification, setNotification, isTyping, setIsTyping } = ChatState();
console.log('notificaton',notification)

useEffect(() => {
  if (Platform.OS === 'android') {
    console.log('Platform is Android. Requesting permission...');
    messaging()
      .requestPermission()
      .then(() => {
        console.log('Permission granted. Getting token...');
        return messaging().getToken();
      })
      .then(token => {
        console.log('Token received:', token);
      })
      .catch(error => {
        console.error('Error getting FCM token:', error);
      });
  }
}, []);






  useEffect(() => {
    let unsubscribe;
    if (!notification) {
      setNotification(true);
    }
    
    if (notification) {
      unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('Message handled in the foreground!', remoteMessage);
        const { title, body } = remoteMessage.notification;

        try {
          // Display the notification using Notifee
          const channelId = await notifee.createChannel({
            id: 'default85',
            name: 'Default Channel85',
          });

          await notifee.displayNotification({
            title,
            body,
            android: {
              channelId,
            },
          });
        } catch (error) {
          console.error('Error displaying notification:', error);
        }
      });
    }

    // Clean up the listener on unmount or when notification state changes
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [notification]);






  return <Route />;
}
