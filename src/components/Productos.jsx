import React, { useEffect } from 'react'
import { obtenerProductosAction } from '../actions/productoActions'
import Producto from './Producto'
//REDUX
import { useDispatch, useSelector } from 'react-redux'


const Productos = () => {
  const dispatch = useDispatch();

  //usar los datos del state
  useEffect(() => {
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
  }, [])

  //OBTENER STATE
  const productos = useSelector(state => state.productos.productos);

  return (
    <>
      <h2 className="text-center my-5">Listado de Productos</h2>

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>       
        {productos.length === 0 ? <tr><td>no hay</td></tr> : (
            productos.map(producto => (
              <Producto
                key={producto.id}
                producto={producto}
              />
            ))
          )}
        </tbody>  
              
      </table>      
    </>
  )
}

export default Productos