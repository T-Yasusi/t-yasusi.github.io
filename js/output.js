const output={
    log: (...args)=>{
        const elem=document.getElementById('result');
        const div=document.createElement('div');
        const text=args.reverse().reduce((a, sum)=> sum+' '+a, '');

        div.innerHTML=text;
        elem.appendChild(div);
    },

    math: (...args)=>{
        const elem=document.getElementById('result');
        const div=document.createElement('div');	
	div.innerHTML+='\\[\\n';
	args.forEach(a=>{ console.log(a.toTex()); div.innerHTML+=a.toTex()});
	div.innerHTML+=']\\\\n';
	console.log(div);
	console.log(div.innerHTML);
	elem.appendChild(div);
    }    
};
export { output };
