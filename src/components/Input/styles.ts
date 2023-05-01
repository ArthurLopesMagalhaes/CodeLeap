import styled from "styled-components/native";

export const Container = styled.View`
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.gray_300};
  padding: 6px 8px;
`;

export const InputField = styled.TextInput`
  width: 100%;
`;
