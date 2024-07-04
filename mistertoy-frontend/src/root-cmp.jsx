import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import '../src/assets/style/main.css'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'


export function App() {
  return (
    //   <Provider store={store}>
          <Router>
              <section className="app">
                  <AppHeader />
                  <main className='main-layout'>
                      <Routes>
                          <Route element={<HomePage />} path="/" />
                          <Route element={<AboutUs />} path="/about" />
                      </Routes>
                  </main>
                  <AppFooter />
              </section>
          </Router>
    //   </Provider>

  )
}

