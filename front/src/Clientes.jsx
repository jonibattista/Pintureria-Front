// src/Clientes.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistroCliente from './RegistroCliente';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Cargar clientes desde el localStorage al iniciar
  useEffect(() => {
    const storedClientes = localStorage.getItem("clientes");
    if (storedClientes) {
      setClientes(JSON.parse(storedClientes));
    }
  }, []);

  // Guardar clientes en el localStorage cada vez que se actualiza la lista
  useEffect(() => {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }, [clientes]);

  // Función para agregar un nuevo cliente a la lista
  const addClient = (newClient) => {
    setClientes([...clientes, { ...newClient, id: Date.now() }]);
    setFormVisible(false); // Ocultar formulario después de registrar cliente
  };

  // Manejar cambio en el filtro de búsqueda
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtrar clientes según la búsqueda
  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cliente.dni && cliente.dni.includes(searchQuery))
  );

  return (
    <div style={{ marginTop: '5%' }}>
      <div className="btn-group mb-3">
        <button
          id="b_create"
          onClick={() => setFormVisible(!formVisible)}
          type="button"
          className="btn btn-primary"
        >
          {formVisible ? 'Cancelar' : 'Crear Cliente'}
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar por nombre o DNI"
          className="form-control"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Mostrar formulario de registro de cliente */}
      {formVisible && <RegistroCliente addClient={addClient} />}

      {/* Tabla de Clientes */}
      <div className="table-responsive mt-4">
        <h2>Listado de Clientes</h2>
        <table className="table table-bordered" id="clienteTable">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.length > 0 ? (
              filteredClientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.name}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.phone}</td>
                  <td>{cliente.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No hay clientes registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;









