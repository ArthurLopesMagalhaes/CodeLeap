import { useState } from "react";
import { Alert } from "react-native";

import { ButtonsContainer, Modal, ModalBody, Overlay } from "./styles";

import { Button } from "../Button";
import { Divider } from "../Divider";
import { Input } from "../Input";
import { Text } from "../Text";
import { CodeLeapAPI } from "../../actions/codeleap-api";

export type ModalType = "delete" | "edit";
interface IModal {
  type: ModalType;
  visible: boolean;
  onCancelPress: () => void;
  postId: number;
  refetchPosts: () => void;
}

export const ModalConfirmation = ({
  type,
  visible,
  onCancelPress,
  postId,
  refetchPosts,
}: IModal) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleDeletePost = async (postId: number) => {
    console.log(postId);
    try {
      const response = await CodeLeapAPI.deletePost(postId);
      console.log(response.data);
      refetchPosts();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  const handleEditPost = async (postId: number) => {
    try {
      const response = await CodeLeapAPI.updatePost(postId, { title, content });
      console.log(response.data);
      refetchPosts();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Overlay>
        <ModalBody>
          {type === "delete" ? (
            <>
              <Text weight="700" size={20}>
                Are you sure you want to delete this item?
              </Text>
              <Divider top={20} />
              <ButtonsContainer>
                <Button label="Cancel" type="white" onPress={onCancelPress} />
                <Button
                  label="Delete"
                  type="alert"
                  onPress={() => handleDeletePost(postId)}
                />
              </ButtonsContainer>
            </>
          ) : (
            <>
              <Text weight="700" size={20}>
                Edit Item
              </Text>
              <Divider top={12} />
              <Text>Title</Text>
              <Divider top={8} />
              <Input
                onChangeText={(txt) => setTitle(txt)}
                placeholder="Hello world"
              />
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
              <ButtonsContainer>
                <Button label="Cancel" type="white" onPress={onCancelPress} />
                <Button
                  label="Save"
                  type={
                    title.length > 0 && content.length >= 0
                      ? "confirm"
                      : "disable"
                  }
                  disabled={title.length < 3 && content.length < 3}
                  onPress={() => handleEditPost(postId)}
                />
              </ButtonsContainer>
            </>
          )}
        </ModalBody>
      </Overlay>
    </Modal>
  );
};
