import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Clase Producto adaptada a JavaScript
class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}

const Productos = ({ role }) => {
  // Estado para controlar la visibilidad del formulario de creación/edición de productos
  const [formVisible, setFormVisible] = useState(false);

  // Estado para almacenar la lista de productos
  const [productos, setProductos] = useState([]);

  // Estado para los valores del formulario (nombre y precio del producto)
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  // Estado para almacenar el producto que se está editando (si corresponde)
  const [productoEditando, setProductoEditando] = useState(null);

  // Alterna la visibilidad del formulario y resetea el formulario cuando se oculta
  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
    resetForm(); // Limpia los campos del formulario
  };

  // Resetea el formulario a su estado inicial
  const resetForm = () => {
    setNombre('');
    setPrecio('');
    setProductoEditando(null);
  };

  // Función para crear o actualizar un producto
  const createOrUpdateProducto = (event) => {
    event.preventDefault();

    // Solo continúa si los campos de nombre y precio no están vacíos
    if (nombre && precio !== '') {
      if (productoEditando) {
        // Si hay un producto en edición, lo actualiza en la lista de productos
        const productosActualizados = productos.map((prod) =>
          prod.id === productoEditando.id ? { ...prod, nombre, precio: Number(precio) } : prod
        );
        setProductos(productosActualizados);
      } else {
        // Si no hay un producto en edición, crea un nuevo producto
        const newProducto = new Producto(productos.length + 1, nombre, Number(precio));
        setProductos([...productos, newProducto]);
      }

      resetForm(); // Resetea el formulario
      setFormVisible(false); // Oculta el formulario
    }
  };

  // Función para editar un producto
  const handleEdit = (id) => {
    const producto = productos.find((prod) => prod.id === id); // Encuentra el producto a editar
    if (producto) {
      setProductoEditando(producto); // Establece el producto en edición
      setFormVisible(true); // Muestra el formulario para editar
      setNombre(producto.nombre); // Carga el nombre en el formulario
      setPrecio(producto.precio); // Carga el precio en el formulario
    }
  };

  // Función para eliminar un producto
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este producto?");
    if (confirmDelete) {
      const productosActualizados = productos.filter((producto) => producto.id !== id); // Filtra el producto a eliminar
      setProductos(productosActualizados); // Actualiza la lista de productos
    }
  };

  return (
    <div>
      {/* Solo muestra el botón para crear productos si el rol es "Administrador" o "Vendedor" */}
      {(role === 'Administrador' || role === 'Vendedor') && (
        <div className="btn-group">
          <button
            id="b_create"
            onClick={toggleFormVisibility}
            type="button"
            className="btn btn-primary"
          >
            {formVisible ? 'Cancelar' : 'Crear Producto'} {/* Cambia el texto del botón dependiendo del estado */}
          </button>
        </div>
      )}

      {/* Formulario para crear o editar productos, visible solo si formVisible es true */}
      {formVisible && (
        <form onSubmit={createOrUpdateProducto} id="productoData" style={{ marginTop: '20px' }}>
          <div className="mb-3">
            <label htmlFor="nombre">Nombre: </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              name="nombre"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="precio">Precio: </label>
            <input
              type="number"
              value={precio === '' ? '' : precio} // Permite que el campo esté vacío si se borra el contenido
              onChange={(e) => setPrecio(e.target.value === '' ? '' : Number(e.target.value))}
              name="precio"
              className="form-control"
              required
            />
          </div>

          {/* Botón para enviar el formulario (Crear o Actualizar Producto) */}
          <button type="submit" className="btn btn-primary">
            {productoEditando ? 'Actualizar' : 'Crear'} {/* Cambia el texto dependiendo de la acción */}
          </button>
        </form>
      )}

      {/* Tabla de productos */}
      <div className="table-responsive" style={{ marginTop: '10%' }}>
        <h2>Listado de Productos</h2>
        <table className="table table-bordered" id="productoTable">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Muestra los productos si existen, de lo contrario muestra un mensaje */}
            {productos.length > 0 ? (
              productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.precio}</td>
                  <td>
                    {/* Muestra botones de editar y eliminar si el rol es "Administrador" o "Vendedor" */}
                    {(role === 'Administrador' || role === 'Vendedor') && (
                      <>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(producto.id)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(producto.id)}
                          style={{ marginLeft: '10px' }}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">No hay productos registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Productos;








