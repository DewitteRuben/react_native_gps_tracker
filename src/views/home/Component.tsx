import React from "react";
import { View, Image } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useNavigation } from "react-navigation-hooks";
import Button from "../../components/Button";
import Overlay from "../../components/Overlay";
import { CText } from "../../components";
import { GLOBAL } from "../../styles/global";
import styles from "./styles";

const headerImage = require("../../assets/images/header-travel.jpg");

const Home: NavigationStackScreenComponent = () => {
  const { navigate } = useNavigation();

  const goToApp = () => navigate("Map");

  return (
    <View style={GLOBAL.LAYOUT.container}>
      <Overlay>
        <Image resizeMode="cover" style={styles.splashImage} source={headerImage} />
      </Overlay>
      <View style={styles.titleContainer}>
        <CText variant="h1" bold text="Welcome!" />
        <CText text="Please select your preffered routing method:" />
      </View>
      <View style={[GLOBAL.LAYOUT.flexCenter, styles.mainContainer]}>
        <Button text="Routed Tracking" block onPress={goToApp} />
        <View style={styles.orContainer}>
          <CText text="or" />
        </View>
        <Button text="Free Tracking" block />
        <View style={[GLOBAL.LAYOUT.justifyCenter, GLOBAL.LAYOUT.alignCenter, styles.bottomTextContainer]}>
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
