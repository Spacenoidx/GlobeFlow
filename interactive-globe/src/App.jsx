import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import "./App.css"; // Import custom CSS for styling
// Import react-bootstrap for styling (optional)
import "bootstrap/dist/css/bootstrap.min.css";
// Import navbar
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
// Import custom CSS for styling

// create Navbar component
function NavigationBar({countries}) {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home" className="display-1 me-auto">
        Interactive Globe
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-right">
          <NavDropdown title="Find a Nation" id="nav-dropdown">
            {countries.features.map((country, idx) => (
              <NavDropdown.Item key={idx} href={`#${country.properties.name}`}>
                {country.properties.name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

      {/* Add a dropdown menu */}
    </>
  );
}

function App() {
  const globeRef = useRef();
  const [countries, setCountries] = useState({ features: [] });

  useEffect(() => {
    // Fetch GeoJSON of country borders
    fetch(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    )
      .then((res) => res.json())
      .then((data) => setCountries(data));

    // Set auto-rotate after globeRef is ready
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.3;
    }
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <NavigationBar countries={countries} />
      {/* Add a globe with country borders */}
      <Globe
        ref={globeRef}
        // {/* backgroundColor defines what is seen before render completes. */}

        backgroundColor="rgba(0, 0, 0, 0.8)"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        polygonsData={countries.features} // <--- add this!
        polygonCapColor={() => "rgba(0, 200, 0, 0.9)"}
        polygonSideColor={() => "rgba(255, 255, 255, 0.1)"}
        polygonStrokeColor={() => "#111"}
        polygonAltitude={0.008} // Slightly raised polygons to avoid z-fighting
        polygonLabel={(d) => `<b>${d.properties.name}</b>`}
      />
    </div>
  );
}

export default App;
