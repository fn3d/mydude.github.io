import './App.css';
import { Canvas, useThree } from '@react-three/fiber';
import { StrictMode } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';
import { SceneProvider, useScene } from './scene/sceneContext';

function PanelButton({buttonString, theFunction}) {
  return (
    <button className="panelButton" onClick={() => PerformActionOnClick(theFunction)}>
      { buttonString }
    </button>
  );
}

function PerformActionOnClick(theFunction) {
  
}

function MainPanel() {
  return (
    <SceneProvider>
      <div className="mainPanel">
        <ButtonsContainer />
        <CanvasContainer />
      </div>
    </SceneProvider>
  );
}

function ButtonsContainer() {
  const [stateVar, setState] = useState(null);
  const { scene } = useScene();
  return (
    <div className="buttonsContainer">
      <div className="statusField">
        { stateVar }
      </div>
      <PanelButton buttonString="1" theFunction={ setState } theScene={ scene }/>
      <PanelButton buttonString="2" theFunction={ setState }/>
      <PanelButton buttonString="3" theFunction={ setState }/>
      <PanelButton buttonString="4" theFunction={ setState }/>
    </div>
  );
}

function CanvasContainer() {
  return (
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
                castShadow
                receiveShadow
                <boxGeometry args={[3, 2, 2]} />
                <meshPhongMaterial color={0x000000} shininess={0.0} wireframe/>
              </mesh>
            </mesh>
            <OrbitControls />
            <ambientLight intensity={1.0} />
            <directionalLight position={[3, 2, 5]} intensity={1.5} castShadow />
            <directionalLight position={[-3, 2, -5]} intensity={1.0} />
            <directionalLight position={[-3, 6, 5]} intensity={1.0} />
          </Canvas>
        </StrictMode>
      }
    </div>
  );
}

export default function App() {
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