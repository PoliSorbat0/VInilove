import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import Categorias from './pages/Categorias'
import Ofertas from './pages/Ofertas'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import CompraExito from './pages/CompraExito'
import CompraError from './pages/CompraError'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Contacto from './pages/Contacto'
import Perfil from './pages/Perfil'
import Admin from './pages/Admin'
import Blog from './pages/Blog'
import './App.css'

function App() {
  const [carrito, setCarrito] = useState([])

  function agregarAlCarrito(producto) {
    setCarrito((listaActual) => {
      const indice = listaActual.findIndex((item) => item.id === producto.id)
      if (indice !== -1) {
        const copia = [...listaActual]
        copia[indice] = { ...copia[indice], cantidad: copia[indice].cantidad + 1 }
        return copia
      }
      return [...listaActual, { ...producto, cantidad: 1 }]
    })
  }

  function cambiarCantidad(id, cambio) {
    setCarrito((listaActual) =>
      listaActual
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad + cambio }
            : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }

  function eliminarDelCarrito(id) {
    setCarrito((listaActual) => listaActual.filter((item) => item.id !== id))
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/productos"
            element={<Productos agregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/productos/:id"
            element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/categorias"
            element={<Categorias agregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/ofertas"
            element={<Ofertas agregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                cambiarCantidad={cambiarCantidad}
                eliminarDelCarrito={eliminarDelCarrito}
              />
            }
          />
          <Route path="/checkout" element={<Checkout carrito={carrito} />} />
          <Route path="/compra-exito" element={<CompraExito />} />
          <Route path="/compra-error" element={<CompraError />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App