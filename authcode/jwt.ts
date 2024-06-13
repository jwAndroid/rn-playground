import {sign} from 'react-native-pure-jwt';

interface Payload {
  userId: string;
  email: string;
}

export const generateJWT = () => {
  sign(
    {
      iss: 'luisfelipez@live.com',
      exp: new Date().getTime() + 3600 * 1000, // expiration date, required, in ms, absolute to 1/1/1970
      additional: 'payload',
    }, // body
    'my-secret', // secret
    {
      alg: 'HS256',
    },
  )
    .then(console.log) // token as the only argument
    .catch(console.error); // possible errors
};
