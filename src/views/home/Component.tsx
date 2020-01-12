import React from "react";
import { View, Image } from "react-native";
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import Button from "../../components/Button";
import Overlay from "../../components/Overlay";
import { CText } from "../../components";

const headerImage = require("../../assets/images/header-travel.jpg");

export interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Home: NavigationStackScreenComponent<Props> = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <Overlay>
        <Image resizeMode="cover" style={{ width: "100%", height: 225 }} source={headerImage} />
      </Overlay>
      <View style={{ paddingHorizontal: 40, marginTop: 20 }}>
        <CText variant="h1" bold text="Welcome!" />
        <CText text="Please select your preffered routing method:" />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 40
        }}
      >
        <Button text="Routed Tracking" block onPress={() => props.navigation.navigate("Map")} />
        <View style={{ marginVertical: 12 }}>
          <CText text="or" />
        </View>
        <Button text="Free Tracking" block />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30
          }}
        >
          <CText gray text="New?" />
          <CText bold green text="Read more here" />
        </View>
      </View>
    </View>
  );
};

Home.navigationOptions = {
  header: null
};

export default Home;
