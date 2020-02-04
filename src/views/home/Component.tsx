import React, { useState } from "react";
import { View, Image } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useNavigation } from "react-navigation-hooks";
import Button from "../../components/Button";
import Overlay from "../../components/Overlay";
import { CText as Text, Modal } from "../../components";
import { GLOBAL } from "../../styles/global";
import styles from "./styles";
import { ROUTES } from "../../navigators/navigation";
import { getModalButtons } from "../../utils/modal";

const headerImage = require("../../assets/images/header-travel.jpg");

const Home: NavigationStackScreenComponent = () => {
  const { navigate } = useNavigation();
  const [showModal, setModalVisibility] = useState(false);

  const modalButtons = getModalButtons({ label: "Ok", callback: () => setModalVisibility(false) });

  const goToApp = () => navigate(ROUTES.TAB_MAP);

  return (
    <View style={GLOBAL.LAYOUT.container}>
      <Overlay>
        <Image resizeMode="cover" style={styles.splashImage} source={headerImage} />
      </Overlay>
      <View style={styles.titleContainer}>
        <Text variant="h1" bold text="Welcome!" />
        <Text text="Read more about tracker or click 'Start tracking' to begin!" />
      </View>
      <View style={[GLOBAL.LAYOUT.flexCenter, styles.mainContainer]}>
        <Button text="Start tracking" block onPress={goToApp} />
        <View style={styles.orContainer}>
          <Text text="or" />
        </View>
        <Button text="Sample Text" block />
        <View style={[GLOBAL.LAYOUT.justifyCenter, GLOBAL.LAYOUT.alignCenter, styles.bottomTextContainer]}>
          <Text bold green text="Read more here" onPress={() => setModalVisibility(true)} />
        </View>
      </View>
      <Modal
        isVisible={showModal}
        buttons={modalButtons}
        text="This gps tracker was developed as a hobby project, to get more familiar with React Native and as a technical showcase."
      />
    </View>
  );
};

Home.navigationOptions = {
  header: null
};

export default Home;
