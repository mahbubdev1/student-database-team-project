import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes'
import 'aos/dist/aos.css'; // CSS ইমপোর্ট
import AOS from 'aos';
AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-blue-50'>
      <RouterProvider router={routes}></RouterProvider>
    </div>
  </StrictMode>,
)
