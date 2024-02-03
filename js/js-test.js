import aceUtil from './aceUtil.js';
import loadModule from './loadModule.js';

loadModule('./output.js');
loadModule('./modules/calc.js');
loadModule('./modules/svg.js');

window.addEventListener('DOMContentLoaded', ()=>{
    console.log('===== js/js-test.js DOMCContentLoaded START =====');
    aceUtil.set('editor', 'ace/mode/javascript', 'ace/theme/monokai');
    
    const codeSelect=document.getElementById('code-select');
    document.getElementById('run').addEventListener('click', ()=> run());
    document.getElementById('clear').addEventListener('click', ()=> clearResult());
    codeSelect.addEventListener('change', ()=>{
        const filePath=[...codeSelect.children].find(e=> e.selected).value;
        if( filePath.length>0 ){
	    aceUtil.loadText('./js/test/'+filePath).then(()=>{
//		console.log('Load file ./js/test/'+filePath);
		if( document.getElementById('auto-clear').checked ) clearResult();
                if( document.getElementById('auto-run').checked ) run();
	    });
	}
    });

    // loadModuleを待つため
    //    codeSelect.dispatchEvent(new Event('change'));
    setTimeout(()=>{ codeSelect.dispatchEvent(new Event('change')); }, 1000);
    console.log('===== js/js-test.js DOMCContentLoaded FINISH =====');
});

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
