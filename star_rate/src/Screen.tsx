import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@emotion/react';
import styled from '@emotion/native';

const Container = styled.View(() => ({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 20,
}));

const Icon = styled.Image(() => ({
  width: 20,
  height: 20,
}));

const FullIcon = styled.Image(() => ({
  width: 19.3,
  height: 20,
}));

const HalfIcon = styled.Image(() => ({
  width: 10,
  height: 20,
}));

const Screen = () => {
  const theme = useTheme();

  return (
    <>
      <Container>
        <Icon source={theme.icon.em} />

        <Icon source={theme.icon.em} />

        <Icon source={theme.icon.em} />

        <Icon source={theme.icon.em} />

        <Icon source={theme.icon.em} />
      </Container>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          position: 'relative',
          left: 1.3,
          top: 0,
          bottom: 0,
          right: 0,
        }}>
        <FullIcon source={theme.icon.star} />

        <FullIcon source={theme.icon.star} />

        <FullIcon source={theme.icon.star} />

        <HalfIcon source={theme.icon.har} />
      </View>
    </>
  );
};

export default Screen;
