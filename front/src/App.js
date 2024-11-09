import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import NavBar from './NavBar';
import Sucursales from './Sucursales';
import Clientes from './Clientes';
import Empleados from './Empleados';
import Proveedores from './Proveedores';
import Ventas from './Ventas';
import Productos from './Productos';
import RegistroCliente from './RegistroCliente';
import './App.css';

function App() {
  // Estado para verificar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Estado para almacenar el rol del usuario autenticado (ej. Administrador, Cliente, etc.)
  const [role, setRole] = useState('');

  return (
    <Router>
      {/* Muestra la barra de navegación (NavBar) solo si el usuario está autenticado */}
      {isAuthenticated && (
        <NavBar setIsAuthenticated={setIsAuthenticated} role={role} />
      )}

      <Routes>
        {/* Ruta para el formulario de inicio de sesión. Al iniciar sesión, se actualizan los estados de autenticación y rol */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />

        {/* Rutas protegidas: solo accesibles si el usuario está autenticado */}
        {/* Ruta para la página de registro de clientes, accesible si el usuario está autenticado */}
        <Route path="/registroCliente" element={<RegistroCliente />} />

        {/* Ruta para la página de sucursales, accesible solo para usuarios autenticados con rol de Administrador */}
        <Route path="/sucursales" element={isAuthenticated && role === 'Administrador' ? <Sucursales /> : <Navigate to="/login" />} />

        {/* Ruta para la página de clientes, accesible para cualquier usuario autenticado */}
        <Route path="/clientes" element={isAuthenticated ? <Clientes /> : <Navigate to="/clientes" />} />

        {/* Ruta para la página de empleados, accesible solo para usuarios autenticados con rol de Administrador */}
        <Route path="/empleados" element={isAuthenticated && role === 'Administrador' ? <Empleados /> : <Navigate to="/login" />} />

        {/* Ruta para la página de proveedores, accesible para cualquier usuario autenticado */}
        <Route path="/proveedores" element={isAuthenticated ? <Proveedores /> : <Navigate to="/login" />} />

        {/* Ruta para la página de ventas, accesible para cualquier usuario autenticado */}
        <Route path="/ventas" element={isAuthenticated ? <Ventas /> : <Navigate to="/ventas" />} />

        {/* Ruta para la página de productos, accesible para cualquier usuario autenticado */}
        <Route path="/productos" element={isAuthenticated ? <Productos /> : <Navigate to="/productos" />} />

        {/* Ruta adicional para el formulario de inicio de sesión */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />

        {/* Ruta por defecto: si el usuario accede a la raíz ('/'), será redirigido al login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;





