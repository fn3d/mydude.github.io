import './App.css';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { StrictMode, useRef, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { SceneProvider, SceneSetter, useScene } from './scene/sceneContext';
import { createPrimitive } from './scene/geom';

// Set up the button with a pointer to a PerformActionOnClick.
function PanelButton({buttonString, onClick}) {
	return (
		<button className="panelButton" onClick={() => onClick(buttonString)}>
		{ buttonString }
		</button>
	);
}

function TestImage({imgName}) {
	return (
		<div className="testImageContainer">
			<img src={require("../public/images/" + imgName)} className='testImage' alt={imgName} />
		</div>
	);
}

function PerformActionOnClick(buttonString) {
	switch (buttonString) {
		case "1":
		return [createPrimitive("box"), "Box", "locker.png"];
		case "2":
		return [createPrimitive("sphere"), "Sphere", "sphere.png"];
		case "3":
		return [createPrimitive("cylinder"), "Cylinder", "can.png"];
		case "4":
		return [createPrimitive("cone"), "Cone", "bulb.png"];
	}
}

// The main container which the SceneProvider feeds with the Scene
// context for the Canvas to display. ButtonsContainer encompasses
// the CanvasContainer, so that the generated 3D primitive can be
// directly passed to the CanvasContainer as a prop to be displayed.
function MainPanel() {
	return (
		<SceneProvider>
		<div className="mainPanel">
			<ButtonsContainer />
		</div>
		</SceneProvider>
	);
}

// This houses all the buttons as well as the object label, and for
// that reason it is responsible for setting up two important
// hooks: (a) the state for the object label which essentially
// provides a means for setting the text without the label when
// a button is pressed, and (b) the hook for setting a new object
// in the scene. 
function ButtonsContainer() {
	const [stateVar, setState] = useState("Box");
	const [imgStateVar, setImage] = useState("locker.png");
	const [primitive, setPrimitive] = useState(createPrimitive("box"));
	const buttonLabels = ["1", "2", "3", "4"];

	// The button click is being set up inside the parent container
	// because we also want to set the state of the object label based
	// on the button pressed. This will be done using the setState, and
	// the other purpose of this method is to give each button access
	// to another function which is responsible for generating the 
	// primitive object.
	const handleClick = (buttonString) => {
		const [newPrimitive, desiredStateVal, imgName] = PerformActionOnClick(buttonString);
		setState(desiredStateVal);
		setPrimitive(newPrimitive);
		setImage(imgName);
	}

	return (
		<>
			<div className="buttonsContainer">
				{/*
				<TestImage
					imgName = { imgStateVar }
				/>
				*/}
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

function Foo() {
	useFrame((state, delta, xrFrame) => {
	  // This function runs at the native refresh rate inside of a shared render-loop
	  console.log("Frames flippin'!");
	})
}

function RayCast({mousePos, scene, camera, renderer}) {

	const rcRef = useRef(new THREE.Raycaster());
	const rcRefOld = new THREE.Raycaster();

	// Get mouse coordinates

	// Register event listener and pass the click handler

	// Update raycaster every frame
	useFrame(() => {
		if (scene && mousePos && camera && renderer) {
			rcRef.current.setFromCamera(mousePos, camera);
			let intersects = rcRef.current.intersectObjects(scene.children);
			let canvasBounds = renderer.domElement.getBoundingClientRect();
			/*
			if (intersects.length > 0) {
				console.log("HIT");
			} else {
				console.log("NOTHING");
			}
			*/
		}
	})
}

// Two things to note in this component are the SceneSetter, and
// the inclusion of the primitive which is being to here as a
// prop. SceneSetter is responsible for grabbing the Scene
// context using the useThree hook, and push it to the scene
// context created seperately in sceneContext.js. The primitive
// is being passed here from the ButtonsContainer parent once
// the geometry has been prepared in geom.js.
function CanvasContainer({primitive}) {

	const mousePos = new THREE.Vector2;
	const { renderer, scene, camera } = useScene();

	const handleMouseClick = (event) => {
		//mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
		//mousePos.y = (event.clientY / window.innerHeight) * 2 - 1;
	}

	const handleMouseMove = (event) => {
		mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
		mousePos.y = (event.clientY / window.innerHeight) * 2 - 1;
	}

	return (
		<div className="canvasContainer">
		{
			<StrictMode>
				<Canvas 
					camera={{ position: [5, 3, 5], fov: 35 }}
					gl={{ antialias: false }}
					shadows
					onMouseDown={ handleMouseClick }
					onMouseMove={ handleMouseMove }
				>
					<SceneSetter />
					{ primitive }
					<OrbitControls dampingFactor={0.175}/>
					<ambientLight intensity={1.25} />
					<directionalLight position={[3, 2, 5]} intensity={1.5} castShadow />
					<directionalLight position={[-3, 2, -5]} intensity={0.5} color={0x00FFA2} />
					<directionalLight position={[-3, 6, 5]} intensity={0.5} color={0x00FFA2} />
					<RayCast 
						mousePos={ mousePos }
						scene={ scene }
						camera={ camera }
						renderer={ renderer }
					/>
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