import './index.css'
import Header from './components/Header'
import Producto from './components/Producto'
import NuevoProducto from './components/NuevoProducto'
import EditarProducto from './components/EditarProducto'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//REDUX
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <BrowserRouter>
      <Provider store = {store}>
        <Header />

        <div className="container mt-5">
          <Routes>
            <Route path='/' element={<Producto />} />
            <Route path='/productos/nuevo' element={<NuevoProducto />} />
            <Route path='/productos/editar/:id' element={<EditarProducto />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  )
}

export default App
