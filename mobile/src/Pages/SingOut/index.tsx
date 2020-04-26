import React from 'react';
import { View, Text } from 'react-native';

import { Container } from './styles';

const SingOut: React.FC = () => {
  return (
    <Container>
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        <Text>Sing Out</Text>
      </View>
    </Container>
  );
};

export default SingOut;
