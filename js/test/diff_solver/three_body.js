const intervalTime=100; // 1s
const dt=10e-6, nStep=100;

const N=3;
const RADIUS1=1.0, RADIUS2=1.05;
const masses=[ 100, 1, 0.01 ];

const x=[ new Vector(0, 0, 0), new Vector(RADIUS1, 0, 0), new Vector(RADIUS2, 0, 0) ];
const v=[ new Vector(0, 0, 0), new Vector(0, 0, sqrt(masses[0]/x[1].abs2())), new Vector(0, 0, sqrt(masses[0]/x[1].abs())+sqrt(masses[1]/(x[2]-x[1]).abs())) ];
let arg=new Matrix([ ...x, ...v ]);
let t=0;

const func=(t, arg)=>{
    const result= new Matrix(2*N, 3);
    for( let i=0; i<N; i++ ){
	result[i]=arg[N+i]; // dx/dt=v
	for( let j=N; j<2*N; j++ ){
	    if( i+N===j ) continue;
	    result[j]=result[j]+(masses[i]/(arg[i]-arg[j-N]).abs2())*(arg[i]-arg[j-N]).unitVector();
	}
    }
    return result;
}

const [ canvas, modalWrapper ]=setModal();
const [ renderer, scene, camera, light ]=setThree(canvas);

const intervalID=setInterval(()=>{
    const result=solver.diff.rungeKutta(func, 0, arg, dt, nStep);
    t+=dt*nStep
    arg=result[result.length-1];

    addObject(result, scene);
//    setCameraPosition();
    
    renderer.render(scene, camera);
}, intervalTime);

const colorName=[ 'red', 'blue', 'yellow' ];
const radii=[ 0.1, 0.02, 0.01];
const balls=[];
for( let i=0; i<N; i++ ){
    balls.push(new THREE.Mesh( new THREE.SphereGeometry(radii[i]), new THREE.MeshStandardMaterial({ color: colorName[i] })));
    scene.add(balls[i]);
}
balls[0].material.transparent=true;
balls[0].material.opacity=0.4;
balls[0].material.side=THREE.DoubleSide;

function addObject(data, scene){
    for( let i=0; i<N; i++ ){
	const points=[];	
	for( let j=0; j<data.length; j++ ){
	//	console.log(...result[i]);
	    points.push(new THREE.Vector3(...data[j][i]));
	}
	const material=new THREE.LineBasicMaterial({ color: colorName[i]});
	const geometry=new THREE.BufferGeometry().setFromPoints(points);
	const line=new THREE.Line(geometry, material);

	balls[i].position.set(...points[points.length-1]);
	scene.add(line);
    }
    light.position.set(...data[data.length-1][0]);
}

function setCameraPosition(){
    camera.position.set(0.2*balls[1].position[0], 0.2, 0.2*balls[1].position[1]);
    camera.lookAt(...balls[1].position);
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
    camera.position.set(-2.0, 1.0, 0);
    camera.lookAt(0, 0, 0);

    const light = new THREE.PointLight(0xFFFFFF);
    light.position.set(...x[0]);
    scene.add(light);
    
    return [ renderer, scene, camera, light ];
}
