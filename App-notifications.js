/*
README

npm install --save @notifee/react-native


Note that the `onBackgroundEvent` seems to be necessary -- app was crashing if it wasn't there.
I think merely its presence is enough to make it work, but I'm not sure.

*/

import React, {useState, useEffect} from 'react';
import {Text, Button, SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import notifee, {
  AuthorizationStatus,
  AndroidImportance,
  EventType,
} from '@notifee/react-native';

const CHANNEL_ID = 'custom';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [permitted, setPermitted] = useState(false);

  /*
   * The state above and these two functions detect how app was launched.
   * You can delete them if you don't care.
   */
  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log(
        'Notification caused application to open',
        initialNotification.notification,
      );
      console.log(
        'Press action used to open the app',
        initialNotification.pressAction,
      );
    }
  }

  useEffect(() => {
    bootstrap().then(() => setLoading(false));
    // .catch(console.error);
  }, []);

  /*
   * Handlers for both types of events (when app is foreground, when app is in background).
   * I don't know why the styles are so different.
   */
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;

    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
      // Update external API
      console.log('User marked as read');
      await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
        method: 'POST',
      });

      // Remove the notification
      await notifee.cancelNotification(notification.id);
    }
  });

  if (loading) {
    return null;
  }

  // Callback from button to demonstrate how to generate a notification
  function onDisplayNotification() {
    notifee.requestPermission().then(permissionResult => {
      if (permissionResult.authorizationStatus === AuthorizationStatus.DENIED) {
        console.log('User denied permissions request');
      } else if (
        permissionResult.authorizationStatus === AuthorizationStatus.AUTHORIZED
      ) {
        setPermitted(true);
        console.log('User granted permissions request');
      } else if (
        permissionResult.authorizationStatus === AuthorizationStatus.PROVISIONAL
      ) {
        setPermitted(true);
        console.log('User provisionally granted permissions request');
      }
    });

    if (!permitted) {
      // Probably should render a full-screen error here?
      console.log('Permissions not granted');
      return;
    }

    // Create a channel (required for Android)
    notifee.createChannel({
      id: CHANNEL_ID,
      name: 'Banana Channel',
      // Must be "HIGH" to cause notif to show over apps on Android.
      importance: AndroidImportance.HIGH,
    });
    /*
     * FIXME: There MAY BE a race here -- if the channel is not
     *  created before the notification is displayed, the notification will not be displayed.
     * Consider doing the displayNotification in a .then() on createChannel?
     */

    // (all the work to finally do this!) Display a notification
    notifee.displayNotification({
      title: 'a Title',
      body: 'body of the notification',
      // icon, sound, vibration, etc. are optional
      android: {
        channelId: CHANNEL_ID,
        // necessary here for old Android versions
        importance: AndroidImportance.HIGH,

        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Hello World</Text>
        <Button
          title="Press console log me"
          onPress={() => console.error('goo')}
        />
        <Button title="Do It!" onPress={() => onDisplayNotification()} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
