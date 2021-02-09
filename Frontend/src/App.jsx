import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import Data from "./pages/Data.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/client/:id?" component={Profile} />
        <Route path="/" exact component={Data} />
      </BrowserRouter>
    </>
  );
}

export default App;
