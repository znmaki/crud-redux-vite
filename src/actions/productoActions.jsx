import clienteAxios from '../helper/axios'
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITAR_ERROR,
    OBTENER_ID_EDITAR
} from '../types'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

//CREAR NUEVOS PRODUCTOS
//estas funciones se usan en el componente
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto())
        try {
            await clienteAxios.post('/productos', producto);
            await MySwal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success',
            )
            dispatch(agregarProductoExito(producto))

        } catch (error) {
            dispatch(agregarProductoError(true))
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
})

const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

//FUNCION QUE OBTIENE LOS DATOS DE LA DB
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargarProductosExito(respuesta.data))
        } catch (error) {
            dispatch(descargarProductoseError())
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
})

const descargarProductosExito = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargarProductoseError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//SELECCIONAR Y ELIMINAR EL PRODUCTO
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());
        } catch (error) {
            dispatch(eliminarProductoError())
        }
    }
}

const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO,
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

//MOSTRAR EL PRODUCTO DENTRO DEL FORMULARIO (NO SE BORRA AUNQUE RECARGUES)
export function obtenerIDEditar(id) {
    return async (dispatch) => {
        try {
            const respuesta = await clienteAxios.get(`/productos/${id}`);
            dispatch(obtenerIDEditarAction(respuesta.data))
        } catch (error) {
            console.log(error);
        }
    }
}

const obtenerIDEditarAction = producto => ({
    type: OBTENER_ID_EDITAR,
    payload: producto
})

//EDITAR EL PRODUCTO MEDIANTE EL ID
export function editarProductoAction(id, producto) {
    return async (dispatch) => {
        dispatch(editarProducto());

        try {
            await clienteAxios.put(`/productos/${id}`, producto);
            
        } catch (error) {
            console.log(error);
            dispatch(editarProductoError());
        }
    }
}
const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoError = () => ({
    type: PRODUCTO_EDITAR_ERROR,
    payload: true
})