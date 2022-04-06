import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// variables
const sceneBackgroundColor = '#e7e7e9';
const goldColor = '#FFD700';
let height: number;
let geometry: THREE.CylinderBufferGeometry;
let material: THREE.MeshBasicMaterial;
let ring: THREE.Mesh;
const radiusTop = 3;
const radiusBottom = radiusTop;
const radialSegments = 64;
const heightSegments = 1;
const openEnded = true;

//scene varialbles
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

// Dom Elements
const app = document.querySelector('#app') as HTMLElement;
const input = document.querySelector('#height-input') as HTMLInputElement;
const inputValue = document.querySelector('#height-value') as HTMLElement;

// Get initial heigh value
height = Number(input.value);


// setup scene
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);
scene.background = new THREE.Color(sceneBackgroundColor);

camera.position.z = 10;
camera.position.y = 5;


// add ring
geometry = new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded);
material = new THREE.MeshBasicMaterial({ color: goldColor, side: THREE.DoubleSide, });
ring = new THREE.Mesh(geometry, material);


// Listen to input changes
input.addEventListener('input', (e: Event) => {
  ring.geometry.dispose();
  const target = e.target as HTMLInputElement;
  const height: number = parseFloat(target.value) || 1;
  inputValue.innerText = target.value;

  // generate new geometry
  ring.geometry = new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded);
});

scene.add(ring);

function animate() {
  requestAnimationFrame(animate);
  render()

}
function render(){
  renderer.render(scene, camera);
  controls.update();
}
function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false)
animate();
