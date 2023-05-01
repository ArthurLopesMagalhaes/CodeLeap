import { useState } from "react";
import { Button } from "../Button";
import { Divider } from "../Divider";
import { Input } from "../Input";
import { Text } from "../Text";
import { ButtonsContainer, Modal, ModalBody, Overlay } from "./styles";

export type ModalType = "delete" | "edit" | "";
interface IModal {
  type: ModalType;
  visible: boolean;
  onCancelPress: () => void;
  onConfirmPress: () => void;
}

export const ModalConfirmation = ({
  type,
  visible,
  onCancelPress,
  onConfirmPress,
}: IModal) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
                <Button label="Delete" type="alert" />
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
                <Button label="Save" type="confirm" onPress={onConfirmPress} />
              </ButtonsContainer>
            </>
          )}
        </ModalBody>
      </Overlay>
    </Modal>
  );
};
