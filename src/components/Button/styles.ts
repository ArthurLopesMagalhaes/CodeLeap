import styled from "styled-components/native";

import { ButtonTypes } from ".";

interface ContainerProps {
  background: ButtonTypes;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors[props.background]};
  padding: 6px 20px;
  align-self: flex-end;
  border: 1px solid
    ${(props) =>
      props.background === "white"
        ? "#000"
        : props.theme.colors[props.background]};
`;
