import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  HelperText,
  Text,
  TextInput,
} from 'react-native-paper';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  button: {
    marginLeft: 10,
    borderRadius: 8,
    backgroundColor: '#1E90FF',
    marginTop: 7,
    justifyContent: 'center',
    height: 48,
    width: 80,
  },
  buttonError: {
    backgroundColor: '#D3D3D3',
  },
});

const Email = () => {
  const [text, setText] = useState('');
  const [forceError, setForceError] = useState(false);

  const [loading, setLoading] = useState<null | boolean>(null);
  // 로딩은 스토어 로딩으로 대체

  const [code, setCode] = useState(-1);

  const hasErrors = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (text === '') {
      return 'Email address cannot be empty!';
    }

    if (!emailRegex.test(text)) {
      return 'Invalid email address!';
    }

    if (forceError) {
      return 'Server error for demonstration!';
    }

    if (code === 1056) {
      return 'Wrong code!';
    }

    return null;
  };

  const handleButtonClick = () => {
    if (text === '') {
      setForceError(true); // 텍스트가 비어 있으면 에러 발생
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // setCode(1056);
      setCode(0);
      // setForceError(true);
      setLoading(false);
    }, 2000);
  };

  const onChangeText = (value: string) => {
    setText(value);
    setForceError(false); // 기타에러 초기화
    setCode(-1); // 서버에러 초기화
  };

  const errorMessage = hasErrors();

  if (code === -1 || code !== 0) {
    return (
      <View style={{marginTop: 60, padding: 20}}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Email"
            value={text}
            activeOutlineColor="#1E90FF"
            onChangeText={onChangeText}
            error={!!errorMessage}
          />

          <Button
            mode="text"
            onPress={handleButtonClick}
            disabled={!!errorMessage || !!loading}
            textColor="white"
            style={[styles.button, !!errorMessage && styles.buttonError]}>
            {loading ? <ActivityIndicator size={20} color="white" /> : 'Send'}
          </Button>
        </View>

        <HelperText type="error" visible={!!errorMessage}>
          {errorMessage}
        </HelperText>
      </View>
    );
  }

  if (code === 0) {
    return (
      <View style={{marginTop: 60, padding: 20}}>
        <Text>Auth Code Input</Text>

        {/* <AuthCode /> */}

        <Pressable
          onPress={() => {
            setText('');
            setCode(-1);
          }}
          style={styles.button}
        />
      </View>
    );
  }

  return null;
};

export default Email;
