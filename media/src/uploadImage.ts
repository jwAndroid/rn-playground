import client from '../api';

export const uploadImage = (uri: string) => {
  const image = {
    uri,
    type: 'image/jpg',
    name: `8WLNxkxxFHpt1FnS${new Date()}.jpg`,
  };

  const formdata = new FormData();
  formdata.append('file', image);

  const headers = {
    'Content-Type': 'multipart/form-data; boundary=someArbitraryUniqueString',
  };

  client
    .post('/api/upload/image', formdata, {
      headers,
    })
    .then(response => {
      if (response) {
        console.log('response');

        console.log(response.data);
      }
    })
    .catch(error => {
      if (error.response) {
        console.log('error');

        console.log(error.response.data);

        console.log(error.response.status);

        console.log(error.response.headers);
      } else if (error.request) {
        console.log('error request');

        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
};
