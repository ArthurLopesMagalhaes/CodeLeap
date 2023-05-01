import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../../src/global/theme";

const StackLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Stack
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Stack.Screen name="SignUp/index" />
        <Stack.Screen name="Home/index" />
      </Stack>
    </ThemeProvider>
  );
};

export default StackLayout;
