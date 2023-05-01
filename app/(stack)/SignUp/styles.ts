import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  padding: 40px;
`;
export const Modal = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.colors.gray_100};
  padding: 24px;
`;
