import './App.css';
import { Canvas } from '@react-three/fiber';
import { StrictMode } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';
import { SceneProvider, SceneSetter, useScene } from './scene/sceneContext';
import { createPrimitive } from './scene/geom';

function PanelButton({buttonString, onClick}) {
  return (
    <button className="panelButton" onClick={() => onClick(buttonString)}>
      { buttonString }
    </button>
  );
}

function PerformActionOnClick(buttonString) {

  switch (buttonString) {
    case "1":
      return [createPrimitive("box"), "Box"];
    case "2":
      return [createPrimitive("sphere"), "Sphere"];
    case "3":
      return [createPrimitive("cylinder"), "Cylinder"];
    case "4":
      return [createPrimitive("cone"), "Cone"];
  }
}

function MainPanel() {
  return (
    <SceneProvider>
      <div className="mainPanel">
        <ButtonsContainer />
      </div>
    </SceneProvider>
  );
}

function ButtonsContainer() {

  const [stateVar, setState] = useState("Box");
  const [primitive, setPrimitive] = useState(createPrimitive("box"));
  const buttonLabels = ["1", "2", "3", "4"];

  const handleClick = (buttonString) => {
    const [newPrimitive, desiredStateVal] = PerformActionOnClick(buttonString);
    setState(desiredStateVal);
    setPrimitive(newPrimitive);
  }

  return (
    <>
      <div className="buttonsContainer">
        <div className="statusField">
          { stateVar }
        </div>
        {buttonLabels.map((label, index) => (
          <PanelButton
            key={index}
            buttonString={label}
            onClick={handleClick}
          />
        ))}
      </div>
      <CanvasContainer primitive={primitive} />
    </>
  );
}

function CanvasContainer({primitive}) {
  <SceneSetter />
  return (
    <div className="canvasContainer">
      {
        <StrictMode>
          <Canvas camera={{ position: [5, 3, 5], fov: 35 }} gl={{ antialias: false }} shadows>
            { primitive }
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