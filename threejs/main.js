import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SpotLightHelper } from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight
);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
document.getElementById("app").appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);

//first scence
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//second scene
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

//third scene
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

//forth scene
const gridHelper = new THREE.GridHelper(20);
scene.add(gridHelper);

//fifth scene
const sphereGeometry = new THREE.SphereGeometry(2, 25, 25);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-5, 5, 0);
sphere.castShadow = true;

//light
// const amibentLight = new THREE.AmbientLight(0x333333);
// scene.add(amibentLight)

// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
// scene.add(directionalLight);
// directionalLight.position.set(-30, 30, 0);
// directionalLight.castShadow = true;


// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);

// const dLShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLShadowHelper)

const spotLight = new THREE.SpotLight(0xFFFFFF)
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2

const sLHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLHelper)

camera.position.set(-10, 30, 30);

orbit.update();

const gui = new dat.GUI();

const options = {
  sphereColor: "#ffea00",
  wireframe: false,
};

gui.addColor(options, "sphereColor").onChange((e) => {
  sphere.material.color.set(e);
});

gui.add(options, "wireframe").onChange((e) => (sphere.material.wireframe = e));

let step = 0;
let speed = 0.01;

function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;
  step += speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
