import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import Button from "../../components/Button";
import Overlay from "../../components/Overlay";
import { CText } from "../../components";

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
        <Button text="Routed Tracking" block callback={() => {}}></Button>
        <View style={{ marginVertical: 12 }}>
          <CText text="or" />
        </View>
        <Button text="Free Tracking" block callback={() => {}}></Button>
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
    </>
  );
};

export default Home;
