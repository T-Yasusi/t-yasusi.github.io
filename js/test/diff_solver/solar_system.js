const intervalTime=1000;
const dt=1e-2, nStep=10;
const rFactor=1.0e-5;

const usePlanet=[ "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto" ];
// const usePlanet=[ "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto" ]; 

(async ()=>{
    const [ json, x, v, masses, radii, color ] = await getInitialParameters();
    
    const N=x.length;
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
    
    const [ canvas, modalWrapper ] = setModal();
    const [ renderer, scene, camera, light ] = setThree(canvas);

    const stars=[ ];
    for( let i=0; i<x.length; i++ ){
	stars.push(new THREE.Mesh( new THREE.SphereGeometry(radii[i]), new THREE.MeshStandardMaterial({ 'color': color[i] })));
	stars[i].position.set(...x[i]);
    }
    stars[0].material.transparent=true;
    stars[0].material.opacity=0.4;
    stars[0].material.side=THREE.DoubleSide;
    stars.forEach(a=> scene.add(a));

    const controls=new OrbitControls(camera, renderer.domElement);
    controls.enableDamping=true;
//    renderer.setClearColor(0xffffff, 1);
    for( const val of Object.values(json) ){
	const theta=val.perihelion_longitude/(2*Math.PI);
	const points=[];
	const rotMat=new Matrix( [ cos(theta), -sin(theta), 0 ], [ sin(theta), cos(theta), 0], [ 0, 0, 1 ] );
	for( let j=0; j<=100; j++ ){
	    const theta2=j*2*Math.PI/100;
	    const r=val.semi_major_axis/(1+val.eccentricity*cos(theta2));
	    points.push(new THREE.Vector3(...rotMat*(new Vector( r*cos(theta2), r*sin(theta2), 0))));
	}
	scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ 'color': 'white' })));
    }
    
    const intervalID=setInterval(()=>{
	const result=solver.diff.rungeKutta(func, 0, arg, dt, nStep); // result[nData][2*V][3];
	t+=dt*nStep
	arg=result[result.length-1];

	light.position.set(...arg[0]);
	for( let i=0; i<N; i++ ){
	    stars[i].position.set(...arg[i]);
	    const points=[];
	    for( let j=0; j<result.length; j++ ) points.push(new THREE.Vector3(...result[j][i]));
	    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ 'color': color[i] })));
	}
	renderer.render(scene, camera);
    }, intervalTime);

    async function getInitialParameters(){
	const json = await fetch('data/solar_system.json').then(res=>res.json());
	
	const x= [ new Vector(0, 0, 0) ];
	const v= [ new Vector(0, 0, 0) ];
	const masses= [ 1.0 ];
	const radii=[ 0.1 ];
	const color= [ 'red' ];
	
	for( const [ key, val ] of Object.entries(json) ){
	    if( usePlanet.includes(key) ){
		const theta=val.perihelion_longitude/(2*Math.PI);
		const r=val.semi_major_axis/(1+val.eccentricity);
		x.push(new Vector(cos(theta)*r, sin(theta)*r, 0));
		v.push(new Vector(-sin(theta)*val.perihelion_velocity, cos(theta)*val.perihelion_velocity, 0));
		masses.push(val.mass);
		radii.push(rFactor*val.radius);
		color.push(val.color);
	    
		console.log('===== check :', key, '=====');
		const e=val.eccentricity;
		console.log('   velocity : ', val.perihelion_velocity, Math.sqrt((1+e)/(val.semi_major_axis*(1-e))));
		console.log('   check  x*v =', x[x.length-1]*v[x.length-1]);
	    }
	}
	return [ json, x, v, masses, radii, color ];
    }
    
    function setModal(){
	const modalWrapper=document.querySelector('#modal-wrapper-3D');
	const canvas=document.querySelector('#canvas-3D');
	modalWrapper.style.display='block';
	canvas.style.width=0.75*modalWrapper.clientWidth+'px';
	canvas.style.height=0.75*0.75*modalWrapper.clientWidth+'px';
	
	modalWrapper.addEventListener('click', (event)=>{
	    if( !canvas.contains(event.target) ){
		clearInterval(intervalID);
		modalWrapper.style.display='none';	
	    }
	});

	return [ canvas, modalWrapper ];
    }
})();

function setThree(canvas){
    const renderer=new THREE.WebGLRenderer({ 'canvas': canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(45, canvas.clientWidth/canvas.clientHeight);
    camera.position.set(1.0, 1.0, 10.0);
    camera.lookAt(0, 0, 0);

    const light = new THREE.PointLight(0xFFFFFF, 2, 0, 1.1);
    light.position.set(0, 0, 0);
    scene.add(light);
//    scene.add(new THREE.AmbientLight(0xFFFFFF, 0.1));
    
    return [ renderer, scene, camera, light ];
}
