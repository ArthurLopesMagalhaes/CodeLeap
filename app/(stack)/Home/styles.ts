import styled from "styled-components/native";

export const Header = styled.View`
  height: 80px;
  background-color: ${(props) => props.theme.colors.primary};
  justify-content: center;
  padding: 0 27px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FormWrapper = styled.View`
  padding: 22px;
`;

export const OpenModalButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
`;

export const ButtonsBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
