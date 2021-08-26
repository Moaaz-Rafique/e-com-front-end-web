import AppRouter from "./Config/router.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configStore from "./store";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
function App() {
  const { store, persistor } = configStore();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FF2A44",
        // secondary: "#FFF",
        // red: "#DB4437",
        shadow: "1px 5px 50px rgba(0, 0, 0, 0.06)",
      },
      secondary: {
        main: "#fff",
      },
      background: {
        default: `#FF2A44`,
      },
      text: {
        primary: "#121111",
        secondary: "#A7a8Ad",
      },
    },
    overrides: {
      MuiOutlinedInput: {
        // Name of the rule
        // notchedOutline: {
        //   // Some CSS
        //   borderColor: "#A7a8Ad",
        // },
      },
      MuiButton: {
        outlined: {
          color: "#A7a8Ad",
        },
      },
    },
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
