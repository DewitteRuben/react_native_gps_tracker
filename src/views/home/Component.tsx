import React from "react";
import { Text, View, Image } from "react-native";
import Button from "../../components/Button";
import Overlay from "../../components/Overlay";
import { CText } from "../../components";
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import { NavigationStackScreenComponent } from "react-navigation-stack";

export interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Home: NavigationStackScreenComponent<Props> = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <Overlay>
        <Image
          resizeMode={"cover"}
          style={{ width: "100%", height: 225 }}
          source={require("src/assets/images/header-travel.jpg")}
        ></Image>
      </Overlay>
      <View style={{ paddingHorizontal: 40, marginTop: 20 }}>
        <CText h1 bold text="Welcome!" />
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
        <Button text="Routed Tracking" block onPress={() => props.navigation.navigate("Map")}></Button>
        <View style={{ marginVertical: 12 }}>
          <CText text="or" />
        </View>
        <Button text="Free Tracking" block></Button>
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
