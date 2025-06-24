import React from 'react';
import './AdminSummaryCards.css';

const AdminSummaryCards = () => (
  <div className="admin-summary-cards">
    <div className="card red">Tipos de Usuario<br /><b>3</b></div>  
    <div className="card blue">Usuarios<br /><b>10</b></div>
    <div className="card green">Huertas<br /><b>5</b></div>
    <div className="card yellow">Publicaciones<br /><b>8</b></div>
    <div className="card purple">Cultivos<br /><b>12</b></div>
  </div>
);

export default AdminSummaryCards; 