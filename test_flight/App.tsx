/**
 * @format
 */

import React, {useState} from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import axios from 'axios';

import {base_url} from './apikey';

type IDataType = {
  id: number;
  name: string;
};

const requestApi = () =>
  axios.get<IDataType[]>(`${base_url}/api/category/first`);

const App = () => {
  const [state, setState] = useState<IDataType[]>([]);
  const [status, setStatus] = useState(0);

  const onPress = async () => {
    try {
      const {data, status: code} = await requestApi();

      setStatus(code);
      setState(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Text style={{fontSize: 30}}>Hello. ITDA! 😁</Text>

        <Text style={{fontSize: 30, marginTop: 20}} onPress={onPress}>
          START API TEST
        </Text>

        <Text style={{fontSize: 30, marginTop: 20}} onPress={onPress}>
          {status === 200 ? 'GOOD' : 'BAD'}
        </Text>
      </View>

      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
        {state.map((data, index) => (
          <Text key={`${index + 1}`}>{data.name}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default App;
