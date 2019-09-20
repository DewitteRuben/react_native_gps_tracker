import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import Button from "../../components/Button";
import Overlay from "../../components/Overlay";

export interface Props {}

const Home: React.FC = (props: Props) => {
  return (
    <>
      <Overlay>
        <Image
          resizeMode={"cover"}
          style={{ width: "100%", height: 225 }}
          source={require("src/assets/images/header-travel.jpg")}
        ></Image>
      </Overlay>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 40
        }}
      >
        <Button text="Routed Tracking" block callback={() => {}}></Button>
        <View style={{ marginVertical: 12 }}>
          <Text>or</Text>
        </View>
        <Button text="Free Tracking" block callback={() => {}}></Button>
      </View>
    </>
  );
};

export default Home;
