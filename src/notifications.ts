import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
}); //a more persistent and reliable user experience, addressed incomplete expo notification handling

export const requestNotifPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
};

export const scheduleReminder = async (postId: string, title: string, fireDate: Date) => {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder",
      body: title,
      data: { postId },
    },
    trigger: {
      type: "date",
      date: fireDate.getTime(), //  provide the exact timestamp for the notification
    } as Notifications.NotificationTriggerInput,
  });
};

export const addResponseListener = (cb: (postId: string) => void) => {
  return Notifications.addNotificationResponseReceivedListener((resp) => {
    const postId = resp.notification.request.content.data?.postId as
      | string
      | undefined;
    if (postId) cb(postId);
  });
};