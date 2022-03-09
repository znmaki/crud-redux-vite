import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//ACTION DE REDUX
import { crearNuevoProductoAction } from '../actions/productoActions'

const NuevoProducto = () => {
  const MySwal = withReactContent(Swal)
  MySwal.fire('aea')
  //USAR DISPATCH PARA CREAR LA FUNCION
  const dispatch = useDispatch();

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

  //FORMA DE MANDAR A LLAMAR EL ACTION
  const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto))

  const handleSubmit = async (values) => {

    agregarProducto(values);
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            {/* {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null} */}

            <Formik
              initialValues={{
                nombre: '',
                precio: ''
              }}

              validationSchema={productSchema}
              onSubmit={async (values, { resetForm }) => {
                await handleSubmit(values);

                resetForm();
              }}

            /* onSubmit={handleSubmit} */
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

            <form
            /* onSubmit={submitNuevoProducto} */
            >





            </form>

            {/* {cargando ? <p>Cargando...</p> : null}

            {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoProducto