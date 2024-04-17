const modalWrapper=document.querySelector('#modal-wrapper-3D');
const canvas=document.querySelector('#canvas-3D');
modalWrapper.style.display='block';
canvas.style.width=0.75*modalWrapper.clientWidth+'px';
canvas.style.height=0.75*0.75*modalWrapper.clientWidth+'px';

const width=canvas.clientWidth, height=canvas.clientHeight;
const renderer=new THREE.WebGLRenderer({ 'canvas': canvas });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(45, width/height, 1, 10000);
camera.position.set(0, 0, 1000);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
directionalLight.position.set(-1, -1, -1);
scene.add(directionalLight);

const geometory=new THREE.BoxGeometry(400, 400, 400);
const material=new THREE.MeshNormalMaterial();
const box=new THREE.Mesh(geometory, material);
scene.add(box);
renderer.render(scene, camera);



