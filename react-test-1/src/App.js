import './App.css';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { StrictMode, useRef, useState, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import { SceneProvider, SceneSetter, useScene } from './scene/sceneContext';
import { createPrimitive, roundToDecimalPlaces } from './scene/geom';
import { DynamicLabel } from './scene/dynamicLabel';

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

function CanvasUISpace({raycastCoords, mouseCoords}) {

	return (
		<div className="canvasUISpace">
			<DynamicLabel 
				raycastCoords={ raycastCoords }
				mouseCoords={ mouseCoords }
			/>
		</div>
	);
}

function CanvasMain({primitive}) {

	const { renderer, scene, camera } = useScene();
	const [ raycastCoords, setCoords ] = useState();
	const [ mouseCoords, setMouseCoords ] = useState();

	// Need to use useEffect here to avoid an infinite
	// rendering loop. We do need to initialize the
	// setter function.
	useEffect(() => {
		setCoords(null);
		setMouseCoords(new THREE.Vector2());
	}, []);

	return (
		<>
			<CanvasContainer
				primitive={ primitive }
				renderer={ renderer }
				scene={ scene }
				camera={ camera }
				coordinateSetter={ setCoords }
				mouseCoordSetter={ setMouseCoords }
				mouseCoords={ mouseCoords }
			/>
			<CanvasUISpace 
				raycastCoords={ raycastCoords }
				mouseCoords={ mouseCoords }
			/>
		</>
	)
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
			<CanvasMain primitive={ primitive } />
		</>
	);
}

function RayCast({mouseCoords, renderer, scene, camera, coordinateSetter}) {

	const rcRef = useRef(new THREE.Raycaster());

	// Update raycaster every frame
	useFrame(() => {
		if (scene && mouseCoords && camera && renderer) {
			rcRef.current.setFromCamera(mouseCoords, camera);
			let intersects = rcRef.current.intersectObjects(scene.children);
			let coordStr = "";
			if (intersects.length > 0) {
				//console.log(intersects[0].point);
				const array = [intersects[0].point.x,
							   intersects[0].point.y,
							   intersects[0].point.z];
				let roundedPoint = [];
				array.forEach(element => {
					const tempVal = roundToDecimalPlaces(element, 3);
					roundedPoint.push(tempVal);
				});
				
				coordStr = roundedPoint[0].toString() + ", " + 
								 roundedPoint[1].toString() + ", " + 
								 roundedPoint[2].toString() ;
				coordinateSetter(coordStr);
			} else {
				coordStr = "0.0, 0.0, 0.0";
				coordinateSetter(coordStr);
			}
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
function CanvasContainer({primitive, renderer, scene, camera, coordinateSetter, mouseCoordSetter, mouseCoords}) {

	const handleMouseClick = (event) => {
		//mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
		//mousePos.y = (event.clientY / window.innerHeight) * 2 - 1;
	}

	let canvasBounds = renderer ? renderer.domElement.getBoundingClientRect() : 
		{ left: 0, top: 0, width: 1, height: 1 };
	const handleMouseMove = (event) => {
		mouseCoords.x = (event.clientX - canvasBounds.left) / canvasBounds.width * 2 - 1;
		mouseCoords.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;
		mouseCoordSetter(mouseCoords);
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
						mouseCoords={ mouseCoords }
						scene={ scene }
						camera={ camera }
						renderer={ renderer }
						coordinateSetter={ coordinateSetter }
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