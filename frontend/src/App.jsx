import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './App.css';

import TopBar from './components/topbar/TopBar';
import LandingPage from './components/landing/LandingPage';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Events from './components/event/Events';
import Companies from './components/business/CompaniesPage';
import EventPage from './components/event/EventPage';
import NotFoundPage from './components/notfoundpage/NotFoundPage';
import Scroll from "./components/utility/Scroll";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <header>
          <TopBar/>
        </header>

        <main>
          <Scroll>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<About /> } />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventPage />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Scroll>
        </main>

        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default App;
