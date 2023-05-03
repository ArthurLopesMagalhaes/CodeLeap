import { useAppDispatch, useAppSelector } from "../../../src/redux/hooks";
import { setName } from "../../../src/redux/reducers/userReducer";

import { Container, Modal } from "./styles";

import { useNavigation } from "expo-router";

import { Divider } from "../../../src/components/Divider";
import { Input } from "../../../src/components/Input";
import { Text } from "../../../src/components/Text";
import { Button } from "../../../src/components/Button";

const SignUp = () => {
  const navigation = useNavigation();
  const user = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch();

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
          onChangeText={(txt) => dispatch(setName(txt))}
          placeholder="John Doe"
          value={user}
        />
        <Divider top={16} />
        <Button
          label="ENTER"
          type={user.length >= 3 ? "primary" : "disable"}
          disabled={user.trim().length === 0}
          onPress={handleSignUp}
        />
      </Modal>
    </Container>
  );
};

export default SignUp;
