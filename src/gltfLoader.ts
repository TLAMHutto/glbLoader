import { Scene, MeshBasicMaterial, BoxHelper, Object3D, Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function loadGLTFModel(scene: Scene, url: string) {
  const loader = new GLTFLoader();

  loader.load(
    url,
    (gltf) => {
      const model = gltf.scene;

      // Adjust the model's position and scale
      model.position.set(0, 0, 0);
      model.scale.set(10, 10, 10); // Increase scale if needed

      // Add model to the scene
      scene.add(model);
      console.log('GLTF model loaded');
      console.log('Model position:', model.position);
      console.log('Model scale:', model.scale);
      console.log(model)
    },
    (xhr) => {
      console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
      console.error('An error occurred:', error);
    }
  );
}
