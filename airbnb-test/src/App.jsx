import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import store from './store/store'
import { Provider } from 'react-redux'
import HomePage from './pages/HomePage'
import CategoryNav from './components/NavComponent/CategoryNav'
function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <NavBar />
          <CategoryNav />
          <Routes>
            <Route path='/' element={<HomePage />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
