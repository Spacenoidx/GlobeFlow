import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

// Import react-bootstrap for styling (optional)
import 'bootstrap/dist/css/bootstrap.min.css';
// Import navbar
import { Navbar, Nav } from 'react-bootstrap';  
// Import custom CSS for styling

// create Navbar component
function NavigationBar() {
  return (<>
    <Navbar bg="dark" variant="dark" expand="lg" />
    <Navbar.Brand href="#home">Interactive Globe</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </>
  );
}

function App() {
  const globeRef = useRef();
  const [countries, setCountries] = useState({ features: [] });

    useEffect(() => {
    // Fetch GeoJSON of country borders
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(res => res.json())
      .then(data => setCountries(data));

    // Set auto-rotate after globeRef is ready
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.3;
    }
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <NavigationBar />
      <Globe
        ref={globeRef}
        backgroundColor='rgba(0, 0, 0, 0.8)'
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        polygonsData={countries.features}  // <--- add this!
        polygonCapColor={() => 'rgba(200, 0, 0, 0.9)'}
        polygonSideColor={() => 'rgba(255, 255, 255, 0.1)'}
        polygonStrokeColor={() => '#111'}
        polygonAltitude={0.008} // Slightly raised polygons to avoid z-fighting
        polygonLabel={d => `<b>${d.properties.name}</b>`}
        
      />
    </div>
  );
}

export default App;
