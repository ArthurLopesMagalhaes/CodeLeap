import styled from "styled-components/native";

export const Modal = styled.Modal`
  flex: 1;
`;

export const Overlay = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.overlay};
  padding: 24px;
  justify-content: center;
`;
export const ModalBody = styled.View`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 16px;
  padding: 24px;
`;
export const ButtonsContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  justify-content: flex-end;
`;
