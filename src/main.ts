const appElement = document.querySelector<HTMLDivElement>('#appElement')!;

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

// TODO 開発する際は有効に
const axes = new THREE.AxesHelper(10);
// scene.add(axes);

// TODO 開発する際は有効に
const gridHelper = new THREE.GridHelper(1000, 1000);
// scene.add(gridHelper)

const camera = new THREE.PerspectiveCamera(50, appElement.offsetWidth / appElement.offsetHeight);
// camera.position.set(10, 10, 20);
camera.position.set(8, 8, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xffffff, 1.0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(appElement.offsetWidth, appElement.offsetHeight);

appElement.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.autoRotate = true
// orbitControls.autoRotateSpeed = 1

// cube 作成
function createCube(
    size:{x: number, y: number, z: number},
    position:{x: number, y: number, z: number},
    color: THREE.ColorRepresentation): void {
  const geometry = new THREE.BoxGeometry( size.x, size.y, size.z );
  const material = new THREE.MeshBasicMaterial( {color: color} );
  const cube = new THREE.Mesh( geometry, material );
  cube.position.set(position.x, position.y, position.z)
  scene.add( cube );
};
// createCube({x:1, y:1, z:1}, {x:1,y:1,z:1}, 'red');
// createCube({x:2, y:2, z:2}, {x:5,y:5,z:5}, 'blue');
// createCube({x:1, y:1, z:1}, {x:-1,y:-5,z:-5}, 'green');

// Teapot
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';
function createTeapot(size: number, color: THREE.ColorRepresentation): void {
  const geometry = new TeapotGeometry(size);
  const material = new THREE.MeshBasicMaterial( {color: color} );
  const object = new THREE.Mesh( geometry, material );
  object.position.set(2, 2, 2);
  scene.add( object );
};
// createTeapot(2, 'black');

// TODO COMPANY LOGO
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
const loader = new FontLoader();
function createText(
    message: string,
    size: number,
    height: number,
    color: THREE.ColorRepresentation): void {
  loader.load('node_modules/three/examples/fonts/helvetiker_bold.typeface.json', function (font) {
    const geometry = new TextGeometry(message, {
      size,
      height,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
      font
    });
    const material = new THREE.MeshBasicMaterial( {color} );
    const text = new THREE.Mesh( geometry, material );
    text.position.set(-(message.length*2), 0, -(height/2));
    scene.add( text );
  })
};
createText('DSC', 5, 1, 'black');

renderer.setAnimationLoop(() => {
  orbitControls.update();

  renderer.render(scene, camera);
});
