import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingSucursal, setEditingSucursal] = useState(null);
  const direccionRef = useRef(null);
  const telefonoRef = useRef(null);

  // Crear sucursal
  const createSucursal = (event) => {
    event.preventDefault();
    const direccion = direccionRef.current?.value;
    const telefono = telefonoRef.current?.value;

    if (direccion && telefono) {
      if (editingSucursal) {
        // Actualizar sucursal existente
        const updatedSucursales = sucursales.map((sucursal) =>
          sucursal.id === editingSucursal.id
            ? { ...sucursal, direccion, telefono }
            : sucursal
        );
        setSucursales(updatedSucursales);
        setEditingSucursal(null);
      } else {
        // Crear nueva sucursal
        const newSucursal = {
          id: sucursales.length + 1,
          direccion,
          telefono,
        };
        setSucursales([...sucursales, newSucursal]);
      }
      resetForm();
      setFormVisible(false); // Ocultar formulario después de crear o actualizar sucursal
    }
  };

  // Mostrar/ocultar formulario
  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
    setEditingSucursal(null); // Resetear sucursal en edición
  };

  // Limpiar formulario
  const resetForm = () => {
    if (direccionRef.current) direccionRef.current.value = '';
    if (telefonoRef.current) telefonoRef.current.value = '';
  };

  // Función para actualizar sucursal
  const editSucursal = (id) => {
    const sucursal = sucursales.find((s) => s.id === id);
    if (sucursal) {
      setFormVisible(true);
      setEditingSucursal(sucursal);
      if (direccionRef.current) direccionRef.current.value = sucursal.direccion;
      if (telefonoRef.current) telefonoRef.current.value = sucursal.telefono;
    }
  };

  // Función para eliminar sucursal
  const deleteSucursal = (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta sucursal?");
    if (confirmDelete) {
      const updatedSucursales = sucursales.filter((sucursal) => sucursal.id !== id);
      setSucursales(updatedSucursales);
    }
  };

  return (
    <div style={{ marginTop: '5%' }}>
      <div className="btn-group">
        <button
          id="b_create"
          onClick={toggleFormVisibility}
          type="button"
          className="btn btn-primary"
        >
          {formVisible ? 'Cancelar' : 'Crear Sucursal'}
        </button>
      </div>

      {/* Formulario visible para crear o editar sucursal */}
      {formVisible && (
        <form id="sucursalForm" onSubmit={createSucursal} style={{ marginBottom: '3%' }}>
          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">Dirección:</label>
            <input type="text" ref={direccionRef} name="direccion" className="form-control" required />
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono:</label>
            <input type="text" ref={telefonoRef} name="telefono" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingSucursal ? 'Actualizar Sucursal' : 'Guardar Sucursal'}
          </button>
        </form>
      )}

      {/* Tabla de Sucursales */}
      <div className="table-responsive" style={{ marginTop: '3%' }}>
        <h2>Listado de Sucursales</h2>
        <table className="table table-bordered" id="sucursalTable">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sucursales.length > 0 ? (
              sucursales.map((sucursal) => (
                <tr key={sucursal.id}>
                  <td>{sucursal.id}</td>
                  <td>{sucursal.direccion}</td>
                  <td>{sucursal.telefono}</td>
                  <td>
                    <button
                      onClick={() => editSucursal(sucursal.id)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Actualizar
                    </button>
                    <button
                      onClick={() => deleteSucursal(sucursal.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No hay sucursales registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sucursales;


