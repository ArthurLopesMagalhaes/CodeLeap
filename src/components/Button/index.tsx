import { Container } from "./styles";

import { Text } from "../../components/Text";
import { PressableProps, TouchableOpacityProps } from "react-native";

export interface IButton extends TouchableOpacityProps {
  label: string;
  type: "confirm" | "alert" | "white" | "primary" | "disable";
}

export const Button = ({ type, label, ...rest }: IButton) => {
  return (
    <Container {...rest} background={type} activeOpacity={0.7}>
      <Text weight="700" color={type === "white" ? "black" : "white"}>
        {label}
      </Text>
    </Container>
  );
};
