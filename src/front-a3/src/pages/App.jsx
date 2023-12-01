import { ToastContainer } from "react-toastify";
import Router from "../router/Router";
import "../styles/GlobalCss.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router />
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
