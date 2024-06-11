/**
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';

let user = null;

async function fetchAndUpdateCredentialState(
  updateCredentialStateForUser: any,
) {
  if (user === null) {
    updateCredentialStateForUser('N/A');
  } else {
    const credentialState = await appleAuth.getCredentialStateForUser(user);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      updateCredentialStateForUser('AUTHORIZED');
    } else {
      updateCredentialStateForUser(credentialState);
    }
  }
}

async function onAppleButtonPress(updateCredentialStateForUser: any) {
  console.warn('Beginning Apple Authentication');

  // start a login request
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    console.log('appleAuthRequestResponse', appleAuthRequestResponse);

    const {
      user: newUser,
      email,
      nonce,
      identityToken,
      realUserStatus,
    } = appleAuthRequestResponse;

    user = newUser;

    fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
      updateCredentialStateForUser(`Error: ${error.code}`),
    );

    if (identityToken) {
      // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
      console.log(nonce, identityToken);
    } else {
      // no token - failed sign-in?
    }

    if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
      console.log("I'm a real person!");
    }

    console.warn(`Apple Authentication Completed, ${user}, ${email}`);
  } catch (error) {
    if (error.code === appleAuth.Error.CANCELED) {
      console.warn('User canceled Apple Sign in.');
    } else {
      console.error(error);
    }
  }
}

const App = () => {
  const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);

  useEffect(() => {
    if (!appleAuth.isSupported) {
      return;
    }

    return appleAuth.onCredentialRevoked(async () => {
      console.warn('Credential Revoked');

      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(`Error: ${error.code}`),
      );
    });
  }, []);

  if (!appleAuth.isSupported) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text>Apple Authentication is not supported on this device.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={[styles.container, styles.horizontal]}>
        <Text style={styles.header}>Credential State</Text>
        <Text>{credentialStateForUser}</Text>
        <Text style={styles.header}>Buttons</Text>
        <Text>Continue Styles</Text>
        <AppleButton
          style={styles.appleButton}
          cornerRadius={5}
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.CONTINUE}
          onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appleButton: {
    width: 200,
    height: 60,
    margin: 10,
  },
  header: {
    margin: 10,
    marginTop: 30,
    fontSize: 18,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default App;
