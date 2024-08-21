import * as dat from 'dat.gui';
import { Camera, Mesh } from 'three';

// Define global variables and defaults
const modelScale = { x: 0.1, y: 0.1, z: 0.1 };
const modelRotation = { x: 0, y: 0, z: 0 }; // Rotation values in radians
const defaultScale = { x: 0.1, y: 0.1, z: 0.1 };
const defaultRotation = { x: 0, y: 0, z: 0 };

// Variables for GUI
const gui = new dat.GUI();
let currentModel: Mesh | null = null; // Use this to store the current model

// Function to initialize GUI
export function initializeGUI(camera: Camera) {
  // Camera controls
  const cameraFolder = gui.addFolder('Camera Position');
  cameraFolder.add(camera.position, 'x', -1000, 1000).name('Position X');
  cameraFolder.add(camera.position, 'y', -1000, 1000).name('Position Y');
  cameraFolder.add(camera.position, 'z', -1000, 1000).name('Position Z');
  cameraFolder.open();

  // Model Rotation controls
  const rotationFolder = gui.addFolder('Model Rotation');
  rotationFolder.add(modelRotation, 'x', -Math.PI, Math.PI).name('Rotation X').onChange(updateModelRotation);
  rotationFolder.add(modelRotation, 'y', -Math.PI, Math.PI).name('Rotation Y').onChange(updateModelRotation);
  rotationFolder.add(modelRotation, 'z', -Math.PI, Math.PI).name('Rotation Z').onChange(updateModelRotation);
  rotationFolder.open();

  // Model Scale controls
  const scaleFolder = gui.addFolder('Model Scale');
  scaleFolder.add(modelScale, 'x', 0, 5).name('Scale X').onChange(updateModelScale);
  scaleFolder.add(modelScale, 'y', 0, 5).name('Scale Y').onChange(updateModelScale);
  scaleFolder.add(modelScale, 'z', 0, 5).name('Scale Z').onChange(updateModelScale);
  scaleFolder.open();

  // Add Reset button
  gui.add({ reset: () => resetModel() }, 'reset').name('Reset to Default');
}

// Function to update the model's scale
function updateModelScale() {
  if (currentModel) {
    currentModel.scale.set(modelScale.x, modelScale.y, modelScale.z);
  }
}

// Function to update the model's rotation
function updateModelRotation() {
  if (currentModel) {
    currentModel.rotation.set(modelRotation.x, modelRotation.y, modelRotation.z);
  }
}

// Function to reset the model to default values
function resetModel() {
  if (currentModel) {
    currentModel.scale.set(defaultScale.x, defaultScale.y, defaultScale.z);
    currentModel.rotation.set(defaultRotation.x, defaultRotation.y, defaultRotation.z);
    // Update the GUI to reflect default values
    modelScale.x = defaultScale.x;
    modelScale.y = defaultScale.y;
    modelScale.z = defaultScale.z;
    modelRotation.x = defaultRotation.x;
    modelRotation.y = defaultRotation.y;
    modelRotation.z = defaultRotation.z;

    // Manually update the GUI sliders
    gui.updateDisplay();
  }
}

// Function to set the model
export function setModel(newModel: Mesh) {
  currentModel = newModel;
  updateModelScale(); // Apply initial scale
  updateModelRotation(); // Apply initial rotation
}

// Export the GUI and other variables
export { gui, modelScale, modelRotation, defaultScale, defaultRotation, resetModel, initializeGUI };
