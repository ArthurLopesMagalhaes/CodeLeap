import { TouchableOpacityProps } from "react-native";

import { Container } from "./styles";

import { Text } from "../../components/Text";

export type ButtonTypes = "confirm" | "alert" | "white" | "primary" | "disable";
export interface IButton extends TouchableOpacityProps {
  label: string;
  type: ButtonTypes;
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
