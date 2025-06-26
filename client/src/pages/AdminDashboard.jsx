import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminSummaryCards from '../components/admin/AdminSummaryCards';
import UsersTable from '../components/admin/tables/UsersTable';
import TipoUsuarioTable from '../components/admin/tables/TipoUsuarioTable';
import HuertasTable from '../components/admin/tables/HuertasTable';
import PublicacionesTable from '../components/admin/tables/PublicacionesTable';
import CultivosTable from '../components/admin/tables/CultivosTable';
import AdminRoute from '../components/admin/AdminRoute';
import Loader from '../components/common/Loader';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [selected, setSelected] = useState('usuarios');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data
    setUser(true);
  }, []);

  if (!user) {
    return <Loader />;
  }

  return (
    <AdminRoute>
      <div className="admin-dashboard">
        <AdminSidebar selected={selected} setSelected={setSelected} />
        <main className="admin-main">
          <h2>Panel de Administración</h2>
          <AdminSummaryCards />
          {selected === 'tipos' && <TipoUsuarioTable />}
          {selected === 'usuarios' && <UsersTable />}
          {selected === 'huertas' && <HuertasTable />}
          {selected === 'publicaciones' && <PublicacionesTable />}
          {selected === 'cultivos' && <CultivosTable />}
        </main>
      </div>
    </AdminRoute>
  );
};

export default AdminDashboard; 