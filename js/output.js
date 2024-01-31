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
	div.innerHTML+='\\[ ';
	args.forEach(a=>{ console.log(a.toTex()); div.innerHTML+=a.toTex()});
	div.innerHTML+=' \\]';
	console.log(div);
	elem.appendChild(div);
	restartMathJax();
    }    
};
export { output };

function restartMathJax(){ MathJax.Hub.Queue(["Typeset", MathJax.Hub, "dynamicElement"]); }
