import { useState, useEffect } from 'react';

function App() {
  const [vinilos, setVinilos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Petición a tu API de Node.js (Puerto 5000)
    fetch('http://localhost:5000/api/vinilos')
      .then((res) => {
        if (!res.ok) {
          throw new Error('No se pudo conectar con el servidor de la base de datos');
        }
        return res.json();
      })
      .then((data) => {
        setVinilos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error cargando vinilos:', err);
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) return <div style={styles.centrado}>Cargando catálogo de vinilos...</div>;
  if (error) return <div style={styles.error}>Error: {error}. Asegúrate de tener Laragon y el backend encendidos.</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🎵 Vinilove</h1>
        <p>Tu tienda de discos favorita</p>
      </header>

      <main>
        <h2 style={styles.subtitulo}>Catálogo Disponible</h2>
        
        {vinilos.length === 0 ? (
          <p style={styles.centrado}>No hay vinilos ingresados en la base de datos.</p>
        ) : (
          <div style={styles.grid}>
            {vinilos.map((disco) => (
              <div key={disco.id} style={styles.card}>
                {/* Si no tienes imágenes locales en React, usará la URL por defecto que insertamos */}
                <img 
                  src={disco.imagen || 'https://unsplash.com'} 
                  alt={disco.titulo} 
                  style={styles.imagen}
                />
                <div style={styles.info}>
                  <h3 style={styles.tituloDisco}>{disco.titulo}</h3>
                  <p style={styles.artista}>{disco.artista}</p>
                  <div style={styles.footerCard}>
                    <span style={styles.precio}>${Number(disco.precio).toLocaleString('es-CL')}</span>
                    <button style={styles.boton}>Agregar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Estilos rápidos en línea para que la tienda se vea ordenada de inmediato
const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#121212', color: '#fff', minHeight: '100vh' },
  header: { textAlign: 'center', marginBottom: '40px', borderBottom: '1px solid #333', paddingBottom: '20px' },
  subtitulo: { fontSize: '24px', marginBottom: '20px', color: '#e0e0e0' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' },
  card: { backgroundColor: '#1e1e1e', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' },
  imagen: { width: '100%', height: '250px', objectFit: 'cover' },
  info: { padding: '15px', display: 'flex', flexDirection: 'column', flexGrow: 1 },
  tituloDisco: { margin: '0 0 5px 0', fontSize: '18px', fontWeight: 'bold' },
  artista: { margin: '0 0 15px 0', color: '#aaa', fontSize: '14px' },
  footerCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  precio: { fontSize: '18px', fontWeight: 'bold', color: '#1db954' },
  boton: { backgroundColor: '#1db954', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' },
  centrado: { textAlign: 'center', fontSize: '18px', marginTop: '50px', color: '#aaa' },
  error: { textAlign: 'center', fontSize: '18px', marginTop: '50px', color: '#ff4444', backgroundColor: '#2a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #ff4444' }
};

export default App;