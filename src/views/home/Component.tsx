import * as React from 'react';
import { View, Image, SafeAreaView, Text } from 'react-native';

export interface Props {}

interface State {}

class Home extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text>Hello!</Text>
      </SafeAreaView>
    );
  }
}

export default Home;
