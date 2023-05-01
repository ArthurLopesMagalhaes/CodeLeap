import { Container } from "./styles";

export interface IDivider {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export const Divider = ({ top, bottom, left, right }: IDivider) => {
  return <Container top={top} bottom={bottom} left={left} right={right} />;
};
