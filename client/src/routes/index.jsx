import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import HowItWorks from '../pages/HowItWorks';
import Contact from '../pages/Contact';
import Auth from '../pages/Auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/nosotros',
    element: <About />,
  },
  {
    path: '/servicios',
    element: <Services />,
  },
  {
    path: '/como-funciona',
    element: <HowItWorks />,
  },
  {
    path: '/contacto',
    element: <Contact />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
]);

export default router; 