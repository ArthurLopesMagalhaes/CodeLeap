import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: string;
      alert: string;
      confirm: string;
      disable: string;
      white: string;
      black: string;
      gray_100: string;
      gray_200: string;
      gray_300: string;
      overlay: string;
    };

    fontFamily: {
      regular: string;
      bold: string;
    };
  }
}
