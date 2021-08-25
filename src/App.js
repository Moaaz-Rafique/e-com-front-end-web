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
        main: "#03A19F",
        red: "#DB4437",
        shadow: "1px 5px 50px rgba(0, 0, 0, 0.06)",
      },
      background: {
        default: `#f5fafe`,
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
