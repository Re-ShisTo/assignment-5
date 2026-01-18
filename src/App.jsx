import "./assets/css/bootstrap.min.css";
import "./assets/css/custom.css";
import Nav from "./Components/Nav";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NewContact from "./Pages/NewContact";
import { ContactProvider } from "./Context/ContactProvider.jsx";

const App = () => {
  return (
    <>
      <Nav />
      <ContactProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/newContact" element={<NewContact />} />
        </Routes>
      </ContactProvider>
    </>
  );
};

export default App;
