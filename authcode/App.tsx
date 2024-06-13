import React, {useState} from 'react';
import {View, Button, TextInput, Text, StyleSheet} from 'react-native';
import {generateJWT} from './jwt';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  token: {
    marginTop: 20,
  },
});

const App = () => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = () => {
    const payload = {userId, email};
    const jwt = generateJWT(payload);
    setToken(jwt);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Login" onPress={handleLogin} />
      {token && <Text style={styles.token}>JWT: {token}</Text>}
    </View>
  );
};

export default App;
