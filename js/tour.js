import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.querySelector("#museumCanvas");
const loaderText = document.querySelector("#loader");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf7f5f1);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / (window.innerHeight - 80),
  0.1,
  1000
);

camera.position.set(4, 3, 6);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight - 80);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 8, 6);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffd6a0, 1.2, 20);
pointLight.position.set(0, 3, 2);
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 2;
controls.maxDistance = 14;
controls.target.set(0, 1, 0);

const loader = new GLTFLoader();

loader.load(
  "models/museum.glb",

  function (gltf) {
    const model = gltf.scene;

    model.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);

    scene.add(model);

    loaderText.style.display = "none";
  },

  function (xhr) {
    if (xhr.total) {
      const percent = Math.round((xhr.loaded / xhr.total) * 100);
      loaderText.textContent = `Завантаження 3D моделі: ${percent}%`;
    }
  },

  function (error) {
    loaderText.textContent = "Помилка завантаження моделі";
    console.error(error);
  }
);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / (window.innerHeight - 80);
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight - 80);
});

const fullscreenBtn = document.getElementById("fullscreenBtn");

fullscreenBtn.addEventListener("click", function () {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152/build/three.module.js';

import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();

scene.background = new THREE.Color(0xf7f5f1);


// CAMERA
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(4, 3, 6);


// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#museumCanvas'),
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(window.devicePixelRatio);


// LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);

scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);

directionalLight.position.set(5, 10, 7);

scene.add(directionalLight);


// CONTROLS
const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableDamping = true;


// MODEL
const loader = new GLTFLoader();

loader.load(

  '../model/museum.glb',

  function(gltf){

    const model = gltf.scene;

    model.scale.set(1,1,1);

    model.position.set(0,0,0);

    scene.add(model);
  },

  function(xhr){

    console.log(
      (xhr.loaded / xhr.total * 100) + '% loaded'
    );
  },

  function(error){

    console.log(error);
  }

);


// ANIMATE
function animate(){

  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();


// RESIZE
window.addEventListener('resize', () => {

  camera.aspect =
    window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
});
const points = document.querySelectorAll(".room-point");
const modal = document.getElementById("roomModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");

points.forEach((point) => {
  point.addEventListener("click", () => {
    modalImage.src = point.dataset.image;
    modalTitle.textContent = point.dataset.title;
    modalText.textContent = point.dataset.text;
    modal.classList.add("active");
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
});