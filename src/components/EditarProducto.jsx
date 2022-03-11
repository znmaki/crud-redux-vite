import React, { useEffect } from 'react'
import Formulario from './Formulario'
import { obtenerIDEditar } from '../actions/productoActions'
import { useParams } from 'react-router-dom'

//REDUX
import { useDispatch, useSelector } from 'react-redux'

const EditarProducto = () => {
  const dispatch = useDispatch();
  const params = useParams()

  useEffect(() => {
    dispatch(obtenerIDEditar(params.id))
  }, [])  

  /* console.log(params.id); */

  const productoEdit = useSelector(state => state.productos.productoEdit);
  return (
    <Formulario
      tipo='editar'
      producto={productoEdit}
      id={params.id}
    />
  )
}

export default EditarProducto