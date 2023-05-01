import styled from "styled-components/native";
import { theme } from "../global/theme";

interface TextProps {
  weight?: "400" | "700";
  color?: string;
  size?: number;
}

export const Text = styled.Text<TextProps>`
  font-family: ${({ weight }) =>
    weight ? `Roboto_${weight}Bold` : "Roboto_400Regular"};
  color: ${({ color }) => color || "#000"};
  font-size: ${({ size }) => (size ? `${size}px` : "16px")};
`;
