const intervalTime=1000;
const dt=10e-5, nStep=25;
const rFactor=1/5;

(async ()=>{
    const json = await fetch('data/solar_system.json').then(res=>res.json());
    console.log(json);
    const g=json.gravitational_constant;
    const star_arr=Object.entries(json.bodies);
    const N=star_arr.length;
    const masses=star_arr.map(a=> a[1].mass);
    const pos_arr=star_arr.map(a=> new Vector(a[1].position));
    const vel_arr=star_arr.map(a=> new Vector(a[1].velocity));
    const colorNames=star_arr.map(a=> a[1].color);
//    const radii=star_arr.map((a, i)=> i==0 ? rFactor*0.01*a[1].radius : rFactor*a[1].radius);
    const radii=star_arr.map(a=> rFactor*pow(a[1].radius, 1/10));
    const max_orbit=pos_arr.reduce((max, a)=> max<a.abs() ? a.abs() : max, 0);
    const max_radius=radii.reduce((max, a)=> max<a ? a : max);
    
    console.log("params", N, masses, pos_arr, vel_arr);
    console.log("max orbit :", max_orbit);
    console.log("max radius :", max_radius);
    let t=0;
    let xv_mat=new Matrix([ ...pos_arr, ...vel_arr]);
    console.log('xv Matrix : ', xv_mat);
    
    const [ canvas, modalWrapper ]=setModal();
    const [ renderer, scene, camera, light ]=setThree(canvas);

    const func=(t, xv_mat)=>{ 
	const result=new Matrix(xv_mat.colSize, xv_mat.rowSize);
	for( let i=0; i<N; i++ ){
            result[i]=xv_mat[N+i]; // dx/dt=v
	    for( let j=N; j<2*N; j++ ){
		if( i+N===j ) continue;
		result[j]=result[j]+(g*masses[i]/(xv_mat[i]-xv_mat[j-N]).abs2())*(xv_mat[i]-xv_mat[j-N]).unitVector();
            }
	}
	return result;
    }

    const balls=[];
    for( let i=0; i<N; i++ ){	
	balls.push(new THREE.Mesh( new THREE.SphereGeometry(radii[i]), new THREE.MeshStandardMaterial({ color: colorNames[i] })));
	scene.add(balls[i]);
    }
    balls[0].material.transparent=true;
    balls[0].material.opacity=0.4;
    balls[0].material.side=THREE.DoubleSide;

    renderer.render(scene, camera);	
    const intervalID=setInterval(intervalFunc, intervalTime); 
    function intervalFunc(){
	const result=solver.diff.rungeKutta(func, 0, xv_mat, dt, nStep);
	console.log(result);
	t+=dt*nStep
	xv_mat=result[result.length-1];

	addObject(result, scene);

        renderer.render(scene, camera);
//	clearInterval(intervalID);
    }
    
    function addObject(data, scene){
	for( let i=0; i<N; i++ ){
            const points=[];
            for( let j=0; j<data.length; j++ ){
		points.push(new THREE.Vector3(...data[j][i]));
            }
	    const material=new THREE.LineBasicMaterial({ color: colorNames[i] });
            const geometry=new THREE.BufferGeometry().setFromPoints(points);
            const line=new THREE.Line(geometry, material);

	    balls[i].position.set(...points[points.length-1]);
	    scene.add(line);
	}
	light.position.set(...data[data.length-1][0]);
    }

    function setThree(canvas){
	const renderer=new THREE.WebGLRenderer({ 'canvas': canvas });
	renderer.setSize(canvas.clientWidth, canvas.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	
	const scene=new THREE.Scene();
	const camera=new THREE.PerspectiveCamera(45, canvas.clientWidth/canvas.clientHeight);
	camera.position.set(0, 0, max_orbit);
	camera.lookAt(0, 0, 0);
	
	const light = new THREE.PointLight(0xFFFFFF);
	light.position.set(...pos_arr[0]);
	scene.add(light);

	return [ renderer, scene, camera, light ];
    }

    const controls=new OrbitControls(camera, renderer.domElement);
    controls.enableDamping=true;
})();

function setModal(){
    const modalWrapper=document.querySelector('#modal-wrapper-3D');
    const canvas=document.querySelector('#canvas-3D');
    modalWrapper.style.display='block';
    canvas.style.width=0.75*modalWrapper.clientWidth+'px';
    canvas.style.height=0.75*0.75*modalWrapper.clientWidth+'px';

    // modalWrapper.addEventListener('click', ()=>{
    //  clearInterval(intervalID);
    //  modalWrapper.style.display='none';
    // });

    return [ canvas, modalWrapper ];
}




