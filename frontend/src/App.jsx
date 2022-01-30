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
import ContentContainer from './components/container/Container';
import About from './components/about/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <TopBar/>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ContentContainer component={LandingPage} />} />
            <Route path="/about" element={<ContentContainer component={About} />} />
          </Routes>
        </main>
        
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
