import RNFS from 'react-native-fs';

export const converter = async (uri: string): Promise<string> => {
  if (uri.startsWith('ph://')) {
    const copyPath = `${
      RNFS.DocumentDirectoryPath
    }/${new Date().toISOString()}.jpg`.replace(/:/g, '-');

    const fileURI = await RNFS.copyAssetsFileIOS(uri, copyPath, 360, 360);

    return fileURI;
  }

  return '';
};
