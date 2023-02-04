import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1);

const renderer = new THREE.WebGLRenderer();
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
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

//forth scene
const gridHelper = new THREE.GridHelper(20);
scene.add(gridHelper);

//fifth scene
const sphereGeometry = new THREE.SphereGeometry(2,25,25);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000FF,
    wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0)

camera.position.set(-10, 30, 30);

orbit.update();

function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
