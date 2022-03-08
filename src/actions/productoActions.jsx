import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types'

//CREAR NUEVOS PRODUCTOS
//estas funciones se usan en el componente
export function crearNuevoProductoAction(producto) {
    return () => {
        console.log(producto);
    }
}