import styled from "styled-components/native";

export const Container = styled.View`
  border: 1px solid ${(props) => props.theme.colors.gray_200};
  border-radius: 16px;
  overflow: hidden;
`;

export const Header = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Icons = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const Content = styled.View`
  padding: 12px;
`;

export const AuthorAndTime = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
