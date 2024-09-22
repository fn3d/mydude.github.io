import logo from './logo.svg';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { StrictMode } from 'react';
import { createRoot } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          This is amazing!
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

/*
const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];
*/

function MyButton() {
  return (
    <button>
      I'm a button.
    </button>
  );
}

function MainPanel() {
  return (
    <div className="mainPanel">
      <ButtonsContainer />
      <CanvasContainer />
    </div>
  );
}

function ButtonsContainer() {
  return (
    <div className="buttonsContainer">
      
    </div>
  );
}

function CanvasContainer() {
  return(
    <div className="canvasContainer">
      {
        <StrictMode>
          <Canvas camera={{ position: [5, 3, 5], fov: 35 }} gl={{ antialias: false }} shadows>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[3, 2, 2]} />
              <meshPhongMaterial 
                color={0xFFD500}
                shininess={0.0}
                polygonOffset={true}
                polygonOffsetFactor={1}/>
              <mesh>
                <boxGeometry args={[3, 2, 2]} />
                <meshPhongMaterial color={0x000000} shininess={0.0} wireframe/>
              </mesh>
            </mesh>
            <OrbitControls />
            <ambientLight intensity={1.0} />
            <directionalLight position={[3, 2, 5]} intensity={1.5} />
            <directionalLight position={[-3, 2, -5]} intensity={1.0} />
            <directionalLight position={[-3, 6, 5]} intensity={1.0} />
          </Canvas>
        </StrictMode>
      }
    </div>
  );
}

export default function MyButtonApp() {
  return (
    <div className='body'>
      <div className='mainContainer'>
        <h1>
          Welcome to the site, my dude.
        </h1>
        <MainPanel />
      </div>
    </div>
  );
}

//export default App;