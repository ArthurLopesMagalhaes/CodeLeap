import { TextInputProps } from "react-native";

import { Container, InputField } from "./styles";

interface IInput extends TextInputProps {
  onChangeText: (txt: string) => void;
}

export const Input = ({ ...rest }: IInput) => {
  return (
    <Container>
      <InputField {...rest} />
    </Container>
  );
};
