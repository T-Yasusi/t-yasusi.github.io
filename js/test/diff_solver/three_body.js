const intervalTime=1000; // 1s

const N=3;

const masses=[ 100, 1, 0.01 ];
const x=[ new Vector(0, 0, 0), new Vector(1, 0, 0), new Vector(1.05, 0, 0) ];
const v=[ new Vector(0, 0, 0), new Vector(0, sqrt(masses[0]/x[1].abs2()), 0), new Vector(0, sqrt(masses[0]/x[1].abs())+sqrt(masses[1]/(x[2]-x[1]).abs()), 0) ];

let arg=new Matrix([ ...x, ...v ]);
let t=0;
const func=(t, arg)=>{
    const result= new Matrix(2*N, 3);
    for( let i=0; i<N; i++ ){
	result[i]=arg[N+i]; // dx/dt=v
	for( let j=N; j<2*N; j++ ){
	    if( i+N===j ) continue;
	    const a=masses[i]/(arg[i]-arg[j-N]).abs2();
	    result[j]=result[j]+a*(arg[i]-arg[j-N]).unitVector();
	}
    }
    return result;
}

const [ canvas, modalWrapper ]=setModal();
const [ renderer, scene, camera, pointLight ]=setThree(canvas);

const intervalID=setInterval(()=>{
    const result=solver.diff.eular(func, 0, arg, 1.0e-5, 1000);
    t+=0.01;
    arg=result[result.length-1];

    addObject(result, scene);
    
    renderer.render(scene, camera);
}, intervalTime);

const colorName=[ 'red', 'blue', 'yellow' ];
const radii=[ 0.1, 0.02, 0.01];
const balls=[];
for( let i=0; i<N; i++ ){
    balls.push(new THREE.Mesh( new THREE.SphereGeometry(radii[i]), new THREE.MeshStandardMaterial({ color: colorName[i] })));
    scene.add(balls[i]);
}

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
    camera.position.set(0, 0, 3.5);
    camera.lookAt(0, 0, 0);

    const light = new THREE.PointLight(0xFFFFFF);
    light.position.set(...x[0]);
    scene.add(light);
    
    return [ renderer, scene, camera, light ];
}
