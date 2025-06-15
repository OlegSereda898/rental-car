import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Header from "./components/Header/Header";
import AppLayout from "./components/AppLayout/AppLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppLayout>
          <Header />
          <AppRouter />
        </AppLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
