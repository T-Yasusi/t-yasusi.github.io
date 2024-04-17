const intervalTime=1000; // 1s
const sigma=10, rho=28, beta=8/3;
const func=(t, x)=> new Vector(sigma*(x[1]-x[0]), x[0]*(rho-x[2])-x[1], x[0]*x[1]-beta*x[2]); 

let t=0;
let x0=new Vector(1.0, 0, 0);

const [ canvas, modalWrapper ]=setModal();
const [ renderer, scene, camera ]=setThree(canvas);

const intervalID=setInterval(()=>{
    const result=solver.diff.eular(func, 0, x0, 1.0e-3, 1000);
    t+=1.0;
    x0=result[result.length-1];

    addLine(result, scene);
    
    renderer.render(scene, camera);
}, intervalTime);

function addLine(data, scene){
    const points=[];
    for( let i=0; i<data.length; i++ ){
	//	console.log(...result[i]);
	points.push(new THREE.Vector3(...data[i]));
    }
    
    const material=new THREE.LineBasicMaterial({ color: 0xFFFFFF});
    const geometry=new THREE.BufferGeometry().setFromPoints(points);
    const line=new THREE.Line(geometry, material);

    scene.add(line);
}

function setModal(){
    const modalWrapper=document.querySelector('#modal-wrapper-3D');
    const canvas=document.querySelector('#canvas-3D');
    modalWrapper.style.display='block';
    canvas.style.width=0.75*modalWrapper.clientWidth+'px';
    canvas.style.height=0.75*0.75*modalWrapper.clientWidth+'px';
    
    modalWrapper.addEventListener('click', ()=>{
	clearInterval(intervalID);
	modalWrapper.style.display='none';
    });

    return [ canvas, modalWrapper ];
}

function setThree(canvas){
    const renderer=new THREE.WebGLRenderer({ 'canvas': canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(45, canvas.clientWidth/canvas.clientHeight);
    camera.position.set(50, 50, 50);
    camera.lookAt(0, 0, 0);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(-1, -1, -1);
    scene.add(directionalLight);
    
    return [ renderer, scene, camera ];
}
