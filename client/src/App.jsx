import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import store from './store/store'
import { Provider } from 'react-redux'
import HomePage from './pages/HomePage'
import CategoryNav from './components/NavComponent/CategoryNav'
import Category from './pages/Category'
function App() {
  return (
    <>
        <Provider store={store}>
      <BrowserRouter>
          <NavBar />
          <CategoryNav />
          <Routes>
            <Route exacts path='/' element={<HomePage />} />
            <Route path='/:category' element={<Category />} />
          </Routes>
      </BrowserRouter>
        </Provider>
    </>
  )
}

export default App
