import React, {useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import './App.css';
import './assets/fonts/logfont/style.css';

import TopBar from './layouts/topbar/TopBar';
import LandingPage from './pages/landing/LandingPage';
import Footer from './layouts/footer/Footer';
import About from './pages/about/About';
import Events from './pages/eventlist/Events';
import Companies from './pages/business/CompaniesPage';
import EventPage from './pages/event/EventPage';
import Verv from './pages/verv/Verv';
import NotFoundPage from './pages/notfoundpage/NotFoundPage';
import Scroll from './utils/Scroll';
import ThemeContext from "./context/ThemeContext";
import Profile from './pages/profile/Profile';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme'))

  // Looks good in chrome console
  const chromeStr = (
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
  
  // Needs fine tuning during a TekKom meeting, time consuming but easy work
  const safariStr = (
    '%c███████╗\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t███████╗\n' +
    '██╔════╝\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t╚════██║\n' +
    '██║%c ██╗      \t\t\t██████╗\t\t██████╗\t  ██╗███╗ \t\t   ██╗%c██║\n' +
    '╚═╝%c ██║\t\t\t\t██╔═══██╗██╔════╝\t  ██║████╗\t\t   ██║%c╚═╝%c\n' +
    '    \t\t██║\t\t\t    ██║\t\t\t  ██║██║\t\t   ███╗ ██║██╔██╗ \t██║\n' +
    '    \t\t██║\t\t\t    ██║\t\t\t  ██║██║\t\t\t   ██║██║██║╚██╗ ██║\n' +
    '%c██╗%c ██████╗╚██████╔╝╚██████╔╝ ██║██║\t╚████║  %c██╗\n' +
    '██║%c ╚═════╝\t╚═════╝\t\t╚═════╝\t  ╚═╝╚═╝\t\t╚═══╝ %c██║\n' +
    '███████╗%c\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t %c███████║\n' +
    '╚══════╝\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t╚══════╝%c\n\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t- Laget av TekKom med 🍕 og ❤️'
  )

  console.log(
      navigator.userAgent.indexOf("Chrome") !== -1 ? chromeStr : safariStr, // ascii art output
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
    <ThemeContext.Provider value={{theme, setTheme}}>
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
                <Route path='/verv' element={<Verv />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/rekruttering' element={<Verv />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </Scroll>
          </main>

          <footer>
            <Footer />
          </footer>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  )
}

export default App;
