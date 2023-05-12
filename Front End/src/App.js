import "./App.css";
import { BrowserRouter } from "react-router-dom";
import PageRouter from "./PageRouter";
import { UserProvider } from "./components/UserContext/UserProvider";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <PageRouter />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
