import { useState } from "react";

import { Container, Modal } from "./styles";

import { Divider } from "../../../src/components/Divider";
import { Input } from "../../../src/components/Input";
import { Text } from "../../../src/components/Text";
import { Button } from "../../../src/components/Button";

import { Link, useNavigation } from "expo-router";

const SignUp = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("aaaaaa");

  const handleSignUp = () => {
    navigation.navigate("Home/index");
  };

  return (
    <Container>
      <Modal>
        <Text weight="700" size={22}>
          Welcome to CodeLeap network!
        </Text>
        <Divider top={12} />
        <Text>Please enter your name</Text>
        <Divider top={8} />
        <Input
          onChangeText={(txt) => setName(txt)}
          placeholder="John Doe"
          value={name}
        />
        <Divider top={16} />
        <Button
          label="ENTER"
          type="primary"
          disabled={name.trim().length === 0}
          onPress={handleSignUp}
        />
      </Modal>
    </Container>
  );
};

export default SignUp;
