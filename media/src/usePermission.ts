import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

export default function usePermission() {
  const [hasPermission, setHasPermission] = useState<undefined | boolean>();

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const permission =
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

        const hasPermission = await PermissionsAndroid.check(permission);

        setHasPermission(hasPermission);

        const status = await PermissionsAndroid.request(permission);

        return status === 'granted';
      }
    })();
  }, []);

  return {
    hasPermission,
  };
}
