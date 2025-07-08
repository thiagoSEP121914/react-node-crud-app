import "./App.css";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Form from "./components/Form";
import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import {ToastContainer} from 'react-toastify';

function App() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
      <div className="layout">
        <SideBar isActive={showMobileMenu} />

        {showMobileMenu && (
          <div
            className="overlay"
            onClick={() => setShowMobileMenu(false)}
          ></div>
        )}
        <main className="content">
          <Header onToggleMenu={() => setShowMobileMenu((prev) => !prev)} />
          <AppRoutes/>
        </main>
        <ToastContainer
            autoClose={2000}
            closeOnClick={true}
        />
      </div>
  );
}

export default App;
