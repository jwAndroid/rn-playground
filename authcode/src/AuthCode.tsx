import React, {useState, useRef, useMemo, RefObject} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
  Alert,
} from 'react-native';
import {Button, HelperText} from 'react-native-paper';

const PinInput: React.FC = () => {
  const [pin, setPin] = useState<string[]>(Array(6).fill(''));
  const [showPin, setShowPin] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refArray: RefObject<TextInput>[] = useMemo(
    () =>
      Array(6)
        .fill(0)
        .map(() => React.createRef<TextInput>()),
    [],
  );

  const handlePinChange = (value: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError(null);

    if (value && index < 5) {
      const nextInput = refArray[index + 1].current;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && pin[index] === '') {
      if (index > 0) {
        const prevInput = refArray[index - 1].current;
        if (prevInput) {
          prevInput.focus();
        }
        const newPin = [...pin];
        newPin[index - 1] = '';
        setPin(newPin);
      }
    }
  };

  const handleSubmit = () => {
    const pinCode = pin.join('');
    if (pinCode.length < 6) {
      setError('Please enter a 6 digit code.');
      return;
    }

    // 서버 요청 시뮬레이션
    setTimeout(() => {
      if (pinCode !== '123456') {
        // 예를 들어 올바른 핀 코드가 '123456'인 경우
        setError('Invalid PIN code.');
      } else {
        setError(null);
        Alert.alert('PIN code submitted successfully.');
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter 6 digit code</Text>
      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={value => handlePinChange(value, index)}
            style={[
              styles.pinInput,
              digit ? styles.pinInputActive : styles.pinInputInactive,
            ]}
            keyboardType="numeric"
            maxLength={1}
            secureTextEntry={!showPin}
            onKeyPress={e => handleKeyPress(e, index)}
            ref={refArray[index]}
          />
        ))}
        <TouchableOpacity
          onPress={() => setShowPin(!showPin)}
          style={styles.icon}>
          <Text>ALL</Text>
        </TouchableOpacity>
      </View>

      {/* Submit 버튼 추가 */}
      <View style={styles.submitContainer}>
        <Button mode="contained" onPress={handleSubmit}>
          Submit
        </Button>
      </View>

      {/* 에러 메시지 표시 */}
      {error && (
        <HelperText type="error" visible={true}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  pinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinInput: {
    width: 50,
    height: 50,
    margin: 5,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
  },
  pinInputActive: {
    borderColor: '#1E90FF',
    backgroundColor: '#E6F7FF',
  },
  pinInputInactive: {
    borderColor: '#ccc',
    backgroundColor: '#F5F5F5',
  },
  icon: {
    marginLeft: 10,
  },
  submitContainer: {
    marginTop: 20,
  },
});

export default PinInput;
