import AppRouter from "./Config/router.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configStore from "./store";

function App() {
  const { store, persistor } = configStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter>
          <p>Home</p>
        </AppRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
