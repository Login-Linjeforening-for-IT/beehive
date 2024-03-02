import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "./assets/fonts/logfont/style.css";

import TopBar from "./layouts/topbar/TopBar";
import LandingPage from "./pages/landing/LandingPage";
import Footer from "./layouts/footer/Footer";
import About from "./pages/about/About";
import Events from "./pages/eventlist/Events";
import Companies from "./pages/business/CompaniesPage";
import Policy from "./pages/policy/Policy";
import EventPage from "./pages/event/EventPage";
import Jobads from "./pages/jobadlist/Jobads";
import JobadPage from "./pages/jobad/JobadPage";
import Verv from "./pages/verv/Verv";
import NotFoundPage from "./pages/notfoundpage/NotFoundPage";
import Scroll from "./utils/Scroll";
import * as ConsoleOutput from "./utils/ConsoleOutput";
import ThemeContext from "./context/ThemeContext";
import Profile from "./pages/profile/Profile";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  ConsoleOutput.LogoConsoleOutput()

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="App">
        <BrowserRouter>
          <header>
            <TopBar />
          </header>

          <main>
            <Scroll>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventPage />} />
                <Route path="/career" element={<Jobads />} />
                <Route path="/career/:id" element={<JobadPage />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/policy" element={<Policy />} />
                <Route path="/verv" element={<Verv />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/rekruttering" element={<Verv />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Scroll>
          </main>

          <footer>
            <Footer />
          </footer>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
