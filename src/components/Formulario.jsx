import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

//REDUX
import { useDispatch, useSelector } from 'react-redux'
//ACTION DE REDUX
import { crearNuevoProductoAction } from '../actions/productoActions'


const Formulario = ({ producto, tipo, id }) => {
    //USAR DISPATCH PARA CREAR LA FUNCION
    const dispatch = useDispatch();

    const [productoEdit, setProductoEdit] = useState({
        nombre: '',
        precio: 0
    })

    useEffect(() => {
        setProductoEdit(producto);
        /* console.log(productoEdit); */
    }, [productoEdit]);


    const handleSubmit = (values) => {
        //CONDICIONAL PARA DETECTAR SI ES AGREGAR O EDITAR
        if (tipo === 'agregar') {
            agregarProducto(values);
        }
        else if (tipo === 'editar') {

        }
    }

    //FORMA DE MANDAR A LLAMAR EL ACTION
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto))

    //VALIDACIONES DEL FORMULARIO
    const productSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('El nombre es obligatorio')
            .min(3, 'El nombre es muy corto')
            .max(30, 'El nombre es muy largo'),

        precio: Yup.number()
            .required('El precio es obligatorio')
            .positive('Número no valido')
            .typeError('Número no valido')
    })


    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        <Formik
                            initialValues={{
                                nombre: producto?.nombre ?? '',
                                precio: producto?.precio ?? ''
                            }}
                            enableReinitialize={true}
                            validationSchema={productSchema}

                            onSubmit={(values, { resetForm }) => {
                                handleSubmit(values);
                                resetForm();
                            }}
                        >
                            <Form>
                                <div className="form-group">
                                    <label htmlFor='nombre'>Nombre Producto</label>
                                    <Field
                                        type="text"
                                        id='nombre'
                                        name="nombre"
                                        className="form-control"
                                        placeholder="Nombre Producto"
                                    />
                                    <ErrorMessage name="nombre" component='div' className='alert alert-danger text-center text-uppercase p3 mt-3' />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='precio'>Precio Producto</label>
                                    <Field
                                        type="number"
                                        id='precio'
                                        name="precio"
                                        className="form-control"
                                        placeholder="Precio Producto"
                                    />
                                    <ErrorMessage name="precio" component='div' className='alert alert-danger text-center text-uppercase p3 mt-3' />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                                >Agregar</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

Formulario.defaultProps = {
    producto: {}
}

export default Formulario