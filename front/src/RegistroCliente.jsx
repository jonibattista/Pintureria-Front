// src/RegistroCliente.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistroCliente = ({ addClient }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    username: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica que addClient exista antes de llamarlo
    if (addClient) {
      addClient(formData);
    }

    // Mostrar mensaje de éxito y redirigir al login después de unos segundos
    setSubmitted(true);
    setTimeout(() => {
      alert("Cliente registrado con éxito");
      navigate('/login'); // Redirigir al login
    }, 2000); // Redirigir después de 2 segundos
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '50px' }}>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="text-center mb-4">Registro de Cliente</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Ingrese su nombre completo"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Ingrese su correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Teléfono:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="Ingrese su número de teléfono"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Dirección:</label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-control"
                placeholder="Ingrese su dirección"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre de Usuario:</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                placeholder="Cree su nombre de usuario"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Cree su contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Registrar</button>
          </form>
          {submitted && (
            <div className="alert alert-success mt-3" role="alert">
              ¡Cliente registrado con éxito! Redirigiendo al inicio de sesión...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistroCliente;




