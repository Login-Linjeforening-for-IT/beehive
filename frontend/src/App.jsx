import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import './App.css';
import './assets/fonts/logfont.css';

import TopBar from './layouts/topbar/TopBar';
import LandingPage from './pages/landing/LandingPage';
import Footer from './layouts/footer/Footer';
import About from './pages/about/About';
import Events from './pages/eventlist/Events';
import Companies from './pages/business/CompaniesPage';
import EventPage from './pages/event/EventPage';
import NotFoundPage from './pages/notfoundpage/NotFoundPage';
import Scroll from './components/utility/Scroll';

function App() {
  
  // trust me, this looks good in the console
  const consoleStr = (
      '%c███████╗                              ███████╗\n' +
      '██╔════╝                              ╚════██║\n' + 
      '██║%c ██╗     ██████╗  ██████╗ ██╗███╗   ██╗ %c██║\n' +
      '╚═╝%c ██║    ██╔═══██╗██╔════╝ ██║████╗  ██║ %c╚═╝%c\n' +
      '    ██║    ██║   ██║██║  ███╗██║██╔██╗ ██║\n' +
      '    ██║    ██║   ██║██║   ██║██║██║╚██╗██║\n' +
      '%c██╗%c ██████╗╚██████╔╝╚██████╔╝██║██║ ╚████║ %c██╗\n' +
      '██║%c ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝ %c██║\n' +
      '███████╗%c                              %c███████║\n' + 
      '╚══════╝                              ╚══════╝%c\n\n' +
      '       - Laget av TekKom med 🍕 og ❤️'
  )

  console.log(
      consoleStr,       // ascii art output
      // each string is the CSS to apply for each consecutive %c
      'color: #fd8738', // apply style (orange color)
      '',               // clear the style for every non orange part
      'color: #fd8738',
      '',
      'color: #fd8738',
      '',
      'color: #fd8738',
      '',
      'color: #fd8738',
      '',
      'color: #fd8738',
      '',
      'color: #fd8738',
      ''
  )
  

  return (
    <div className='App'>

      <BrowserRouter>
        <header>
          <TopBar/>
        </header>

        <main>
          <Scroll>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/about' element={<About /> } />
              <Route path='/events' element={<Events />} />
              <Route path='/events/:id' element={<EventPage />} />
              <Route path='/companies' element={<Companies />} />
              <Route path='*' element={<NotFoundPage />} />
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
