import './index.css'
import Header from './components/Header'
import Producto from './components/Producto'
import NuevoProducto from './components/NuevoProducto'
import EditarProducto from './components/EditarProducto'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="container mt-5">
        <Routes>
          <Route path='/' element={<Producto />} />
          <Route path='/productos/nuevo' element={<NuevoProducto />} />
          <Route path='/productos/editar/:id' element={<EditarProducto />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
