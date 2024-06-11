import React, { memo, useCallback, useState } from 'react';
import styled from '@emotion/native';
import PropsText from './PropsText';

interface IContainer {
  state: boolean;
}
const Container = styled.View<IContainer>(({ theme, state }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: state ? theme.color.white : theme.color.black,
}));

const StyledText = styled.Text<IContainer>(({ theme, state }) => ({
  fontSize: 16,
  color: state ? theme.color.black : theme.color.white,
  fontWeight: '600',
}));

function HelloReactNative() {
  const [state, setState] = useState(false);

  const onPress = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return (
    <Container state={state}>
      <StyledText onPress={onPress} state={state}>
        {state ? 'Hello! React-Native!' : 'Wellcome! React-Native!'}
      </StyledText>

      <PropsText>react-native</PropsText>
    </Container>
  );
}

export default memo(HelloReactNative);
