const appElement = document.querySelector<HTMLDivElement>('#appElement')!;

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

// TODO 開発する際は有効に
const axes = new THREE.AxesHelper(10);
scene.add(axes);

// TODO 開発する際は有効に
const gridHelper = new THREE.GridHelper(1000, 1000);
scene.add(gridHelper)

const camera = new THREE.PerspectiveCamera(50, appElement.offsetWidth / appElement.offsetHeight);
camera.position.set(10, 10, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xffffff, 1.0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(appElement.offsetWidth, appElement.offsetHeight);

appElement.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.autoRotate = true
// orbitControls.autoRotateSpeed = 1

// cube 作成
function createCube(size:{x: number, y: number, z: number}, position:{x: number, y: number, z: number}, color: THREE.ColorRepresentation): void {
  const geometry = new THREE.BoxGeometry( size.x, size.y, size.z );
  const material = new THREE.MeshBasicMaterial( {color: color} );
  const cube = new THREE.Mesh( geometry, material );
  cube.position.set(position.x, position.y, position.z)
  scene.add( cube );
};
createCube({x:1, y:1, z:1}, {x:1,y:1,z:1}, 'red');
createCube({x:2, y:2, z:2}, {x:5,y:5,z:5}, 'blue');
createCube({x:1, y:1, z:1}, {x:-1,y:-5,z:-5}, 'green');

// TODO COMPANY LOGO



renderer.setAnimationLoop(() => {
  orbitControls.update();

  renderer.render(scene, camera);
});
