import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  Mesh,
  Vector3
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui';

// Initialize scene, camera, renderer, etc.
const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = 'absolute'; // Ensure the canvas is positioned correctly
renderer.domElement.style.top = '0'; // Ensure it starts at the top of the page
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

const ambientLight = new AmbientLight(0x404040);
scene.add(ambientLight);
const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const loader = new GLTFLoader();
let model: any = null;

const modelScale = { x: 0.1, y: 0.1, z: 0.1 };
const modelRotation = { x: 0, y: 0, z: 0 }; // Ensure this is in radians

// Default values
const defaultScale = { x: 0.1, y: 0.1, z: 0.1 };
const defaultRotation = { x: 0, y: 0, z: 0 };
const defaultCamera = { x: 0, y: 0, z: 0 };

loader.load(
  './glb.glb',
  (gltf) => {
    model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0);
    model.scale.set(modelScale.x, modelScale.y, modelScale.z);
    model.rotation.set(modelRotation.x, modelRotation.y, modelRotation.z); // Initialize rotation
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the model:', error);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (model) {
    // Apply rotation updates based on GUI values
    model.rotation.set(modelRotation.x, modelRotation.y, modelRotation.z);
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Create GUI
const gui = new dat.GUI();

const cameraFolder = gui.addFolder('Camera Position');
cameraFolder.add(camera.position, 'x', -1000, 1000).name('Position X');
cameraFolder.add(camera.position, 'y', -1000, 1000).name('Position Y');
cameraFolder.add(camera.position, 'z', -1000, 1000).name('Position Z');
cameraFolder.open();

const rotationFolder = gui.addFolder('Model Rotation');
rotationFolder.add(modelRotation, 'x', -Math.PI, Math.PI).name('Rotation X').onChange(updateModelRotation);
rotationFolder.add(modelRotation, 'y', -Math.PI, Math.PI).name('Rotation Y').onChange(updateModelRotation);
rotationFolder.add(modelRotation, 'z', -Math.PI, Math.PI).name('Rotation Z').onChange(updateModelRotation);
rotationFolder.open();

const scaleFolder = gui.addFolder('Model Scale');
scaleFolder.add(modelScale, 'x', 0, 5).name('Scale X').onChange(updateModelScale);
scaleFolder.add(modelScale, 'y', 0, 5).name('Scale Y').onChange(updateModelScale);
scaleFolder.add(modelScale, 'z', 0, 5).name('Scale Z').onChange(updateModelScale);
scaleFolder.open();

// Add Default button
gui.add({ reset: () => resetModel() }, 'reset').name('Reset to Default');

// Function to update the model's scale
function updateModelScale() {
  if (model) {
    model.scale.set(modelScale.x, modelScale.y, modelScale.z);
  }
}

// Function to update the model's rotation
function updateModelRotation() {
  if (model) {
    model.rotation.set(modelRotation.x, modelRotation.y, modelRotation.z);
  }
}

// Function to reset the model to default values
function resetModel() {
  if (model) {
    model.scale.set(defaultScale.x, defaultScale.y, defaultScale.z);
    model.rotation.set(defaultRotation.x, defaultRotation.y, defaultRotation.z);
    // Also update the GUI to reflect default values
    modelScale.x = defaultScale.x;
    modelScale.y = defaultScale.y;
    modelScale.z = defaultScale.z;
    modelRotation.x = defaultRotation.x;
    modelRotation.y = defaultRotation.y;
    modelRotation.z = defaultRotation.z;
    camera.position.x = defaultCamera.x;
    camera.position.y = defaultCamera.y;
    camera.position.z = defaultCamera.z;
    // Manually update the GUI sliders
    gui.updateDisplay();
  }
}
