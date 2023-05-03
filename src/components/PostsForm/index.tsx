import { useState } from "react";
import { Alert } from "react-native";

import { useTheme } from "styled-components";

import { Container } from "./styles";
import { CodeLeapAPI } from "../../actions/codeleap-api";
import { useAppSelector } from "../../redux/hooks";

import { Text } from "../Text";
import { Divider } from "../Divider";
import { Input } from "../Input";
import { Button } from "../Button";

import { AntDesign } from "@expo/vector-icons";

interface PostForm {
  onClosePress: () => void;
}

export const PostsForm = ({ onClosePress }: PostForm) => {
  const user = useAppSelector((state) => state.user.name);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { colors } = useTheme();

  const sendPost = async () => {
    try {
      const response = CodeLeapAPI.sendPost({ username: user, title, content });
      console.log((await response).data);
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <Container>
      <Text weight="700" size={22} color={colors.black}>
        What’s on your mind?
      </Text>
      <AntDesign
        name="closecircleo"
        size={24}
        color="black"
        style={{ position: "absolute", top: 12, right: 12 }}
        onPress={onClosePress}
      />
      <Divider top={12} />
      <Text>Title</Text>
      <Divider top={8} />
      <Input onChangeText={(txt) => setTitle(txt)} placeholder="Hello world" />
      <Divider top={24} />
      <Text>Content</Text>
      <Divider top={8} />
      <Input
        onChangeText={(txt) => setContent(txt)}
        placeholder="Content here"
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />
      <Divider top={12} />
      <Button label="Create" type="primary" onPress={sendPost} />
    </Container>
  );
};
