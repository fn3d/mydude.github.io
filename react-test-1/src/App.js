import logo from './logo.svg';
import './App.css';
import { Canvas } from '@react-three/fiber';

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
    </div>
  );
}

function ButtonsContainer() {
  return (
    <div className="buttonsContainer">
      <button>
        Button 1
      </button>
      <button>
        Button 2
      </button>
      <button>
        Button 3
      </button>
    </div>
  );
}

function CanvasContainer() {
  return(
    <div className="canvasContainer">

    </div>
  );
}

export default function MyButtonApp() {
  return (
    <div className='body'>
      <div className='main-container'>
        <h1>
          Welcome to my app, my dude.
        </h1>
        {/* <MyButton />*/}
      </div>
    </div>
  );
}

//export default App;