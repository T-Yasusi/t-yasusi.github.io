const output={
    log: (...args)=>{
        const elem=document.getElementById('result');
        const div=document.createElement('div');
        const text=args.reverse().reduce((a, sum)=> sum+' '+a.replaceAll('\n', '</br>'), '');

        div.innerHTML=text;
        elem.appendChild(div);
    }
};
export { output };
