import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 300);
// document.body.appendChild(renderer.domElement);
document.getElementById("app").appendChild(renderer.domElement)

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.z = 10;
camera.position.x = -1;

renderer.render(scene, camera);
