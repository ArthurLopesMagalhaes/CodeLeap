import { ThemeProvider } from "styled-components/native";
import { store } from "../../src/redux/store";
import { Provider } from "react-redux";

import { Stack } from "expo-router";

import { theme } from "../../src/global/theme";

const StackLayout = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Stack
          screenOptions={{ headerShown: false, animation: "slide_from_right" }}
        >
          <Stack.Screen name="SignUp/index" />
          <Stack.Screen name="Home/index" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
};

export default StackLayout;
