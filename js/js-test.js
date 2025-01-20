import aceUtil from './aceUtil.js';
import loadModule from './loadModule.js';

loadModule('./output.js');
loadModule('./modules/calc.js');
loadModule('./modules/svg.js');
loadModule('./modules/three.js');
loadModule('./modules/ui.js');
// loadModule('../node_modules/three//examples/jsm/controls/OrbitControls.js');

window.addEventListener('DOMContentLoaded', ()=>{
    console.log('===== js/js-test.js DOMCContentLoaded START =====');
    aceUtil.set('editor', 'ace/mode/javascript', 'ace/theme/monokai');
    
    document.getElementById('run').addEventListener('click', run);
    document.getElementById('clear').addEventListener('click', clearResult);
    document.getElementById('result-only').addEventListener('click', resultOnly);
    const codeSelect=document.getElementById('code-select');
    codeSelect.addEventListener('change', ()=>{
        const filePath=[...codeSelect.children].find(e=> e.selected).value;

	const searchParam=new URLSearchParams(location.search);
	if( filePath !== searchParam.get('src') ){
	    searchParam.set('src', filePath);
            if( document.getElementById('auto-run').checked ) searchParam.set('run', '');
	    
	    const url=new URL(window.location.href);
	    window.location.replace(url.origin + url.pathname + "?"+(new URLSearchParams(searchParam)).toString());
	}
        if( filePath.length>0 ){
	    aceUtil.loadText('./js/test/'+filePath).then(()=>{
		if( document.getElementById('auto-clear').checked ) clearResult();
                if( document.getElementById('auto-run').checked ) run();
	    });
	}
    });

    // loadModuleを待つため
    //    codeSelect.dispatchEvent(new Event('change'));
    setTimeout(()=>{
	const searchParam=new URLSearchParams(location.search);
	if( searchParam.has('src') ){
	    const elem=[...codeSelect.children].find(e=> e.value===searchParam.get('src'));
	    if( elem ) elem.selected=true;
	}	
	if( searchParam.has('run') ) document.getElementById('auto-run').checked=true;
	codeSelect.dispatchEvent(new Event('change'));
    }, 2000);
    console.log('===== js/js-test.js DOMCContentLoaded FINISH =====');
});

function resultOnly(){
    const modalWrapper=document.getElementById('modal-wrapper1');
    const modal=document.getElementById('modal1');
    modalWrapper.style.display='block';    
    modal.style.width=modalWrapper.clientWidth+'px';
    modal.style.height=modalWrapper.clientHeight+'px';
    modal.innerHTML=document.getElementById('result').innerHTML;

    modalWrapper.addEventListener('click', ()=>{
	modal.innerHTML='';
	modalWrapper.style.display='none';
    });
}

function clearResult(){
    const elem=document.getElementById('result');
    while( elem.firstChild ) elem.removeChild(elem.firstChild);
}

function run(){
    const { code }=Babel.transform(aceUtil.getValue(), { presets: ['env'], plugins: ['operator_overload'] });
//    console.log('Transpile Code', code);
//    const f=Function(aceUtil.getValue());
    const f=Function(code);

    if( document.getElementById('auto-clear').checked ) clearResult();
    f();
}
