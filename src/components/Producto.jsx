import React from 'react'
//SWEETALERT2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

//REDUX
import { useDispatch } from 'react-redux'
import { borrarProductoAction } from '../actions/productoActions'

const Producto = ({ producto }) => {
    const { nombre, precio, id } = producto;
    const dispatch = useDispatch();

    const confirmarEliminarProducto = id => {
        MySwal.fire({
            title: 'Estas seguro?',
            text: "Al eliminar el producto no se podra recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(borrarProductoAction(id))
                MySwal.fire({
                    title: 'Eliminado!',
                    text: 'Su producto fue eliminado.',
                    icon: 'success',
                    timerProgressBar: true,
                    timer: 1500,
                    showConfirmButton: false
                })
            }
            else if (result.dismiss) {
                MySwal.fire(
                    'Cancelado',
                    'Su producto no se elimino',
                    'error'
                )
            }
        })

    }

    return (
        <tr>
            <td>{nombre}</td>
            <td>{precio}</td>
            <td className="acciones">
                <button
                    type="button"
                    onClick={() => redireccionarEdicion(producto)}
                    className="btn btn-primary mr-2">
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >Eliminar </button>
            </td>
        </tr>
    )
}

export default Producto