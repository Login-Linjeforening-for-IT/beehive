// @ts-nocheck
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./styles/colors.css"
import "./styles/themes.css"
import "./styles/fontImport.css"
import "./styles/globals.css"
import "./assets/fonts/logfont/style.css"

import TopBar from "./components/topbar/TopBar"
import LandingPage from "./pages/landing/LandingPage"
import Footer from "./components/footer/Footer"
import About from "./pages/about/About"
import Events from "./pages/eventlist/Events"
import Companies from "./pages/business/CompaniesPage"
import Policy from "./pages/policy/Policy"
import EventPage from "./pages/event/EventPage"
import Jobads from "./pages/jobadlist/Jobads"
import JobadPage from "./pages/jobad/JobadPage"
import Verv from "./pages/verv/Verv"
import Fund from "./pages/fund/Fund"
import NotFoundPage from "./pages/notfoundpage/NotFoundPage"
import Scroll from "./utils/Scroll"
import * as ConsoleOutput from "./utils/ConsoleOutput"
import { ThemeProvider } from "./context/ThemeContext"
import Profile from "./pages/profile/Profile"

function App() {
    ConsoleOutput.LogoConsoleOutput()

    return (
        <ThemeProvider>
            <div className="App">
                <BrowserRouter>
                    <header className="main-header">
                        <TopBar />
                    </header>

                    <main className="main-content">
                        <Scroll>
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/om" element={<About />} />
                                <Route path="/omoss" element={<About />} />
                                <Route path="/events" element={<Events />} />
                                <Route path="/events/:id" element={<EventPage />} />
                                <Route path="/arrangementer" element={<Events />} />
                                <Route path="/arrangementer/:id" element={<EventPage />} />
                                <Route path="/arrangement/:id" element={<EventPage />} />
                                <Route path="/career" element={<Jobads />} />
                                <Route path="/career/:id" element={<JobadPage />} />
                                <Route path="/karriere" element={<Jobads />} />
                                <Route path="/karriere/:id" element={<JobadPage />} />
                                <Route path="/companies" element={<Companies />} />
                                <Route path="/bedrift" element={<Companies />} />
                                <Route path="/bedrifter" element={<Companies />} />
                                <Route path="/fund" element={<Fund />} />
                                <Route path="/fond" element={<Fund />} />
                                <Route path="/fondet" element={<Fund />} />
                                <Route path="/policy" element={<Policy />} />
                                <Route path="/verv" element={<Verv />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/recruitment" element={<Verv />} />
                                <Route path="/rekruttering" element={<Verv />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </Scroll>
                    </main>

                    <footer className="main-footer">
                        <Footer />
                    </footer>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    )
}

export default App
