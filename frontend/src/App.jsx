import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateCat from './pages/CreateCat.jsx'
import ShowCat from './pages/ShowCat.jsx'
import EditCat from './pages/EditCat.jsx'
import DeleteCat from './pages/DeleteCat.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cats/create' element={<CreateCat />} />
      <Route path='/cats/details/:id' element={<ShowCat />} />
      <Route path='/cats/edit/:id' element={<EditCat />} />
      <Route path='/cats/delete/:id' element={<DeleteCat />} />
    </Routes>
  )
}

export default App