import React from 'react';
import './AdminSidebar.css';
import { useAuth } from '../../context/AuthContext.tsx';

const AdminSidebar = ({ selected, setSelected }) => {
  const { logout } = useAuth();
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">HuertaConecta</div>
      <nav>
        <ul>
          <li><button className={selected === 'tipos' ? 'active' : ''} onClick={() => setSelected('tipos')}>Tipos de Usuario</button></li>
          <li><button className={selected === 'usuarios' ? 'active' : ''} onClick={() => setSelected('usuarios')}>Usuarios</button></li>
          <li><button className={selected === 'huertas' ? 'active' : ''} onClick={() => setSelected('huertas')}>Huertas</button></li>
          <li><button className={selected === 'publicaciones' ? 'active' : ''} onClick={() => setSelected('publicaciones')}>Publicaciones</button></li>
          <li><button className={selected === 'cultivos' ? 'active' : ''} onClick={() => setSelected('cultivos')}>Cultivos</button></li>
        </ul>
      </nav>
      <div className="admin-sidebar-logout">
        <button className="logout-btn" onClick={logout}>Cerrar sesión</button>
      </div>
    </aside>
  );
};

export default AdminSidebar; 