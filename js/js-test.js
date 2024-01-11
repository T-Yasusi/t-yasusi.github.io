import aceUtil from './aceUtil.js';
import loadModule from './loadModule.js';

const modules = [
    loadModule('./output.js'),
    loadModule('./modules/calc.js')
];

window.addEventListener('DOMContentLoaded', ()=>{
    console.log('===== js/js-test.js DOMCContentLoaded START =====');
    console.log('ccc');
    aceUtil.set('editor', 'ace/mode/javascript', 'ace/theme/monokai');
    aceUtil.setValue('output.log("Hello World!")')

//    Promise.all(modules).then(()=> run());
    document.getElementById('do').addEventListener('click', ()=> run());
    document.getElementById('clear').addEventListener('click', ()=> clearResult());

    const codeSelect=document.getElementById('code-select');
    codeSelect.addEventListener('change', ()=>{
        const filePath=[...codeSelect.children].find(e=> e.selected).value;
        if( filePath.length>0 ){
	    aceUtil.loadText('./js/test/'+filePath).then(()=>{
		console.log('Load file ./js/test/'+filePath);
	    });
	}
    });
    console.log('===== js/js-test.js DOMCContentLoaded FINISH =====');
});

function clearResult(){
    const elem=document.getElementById('result');
    while( elem.firstChild ) elem.removeChild(elem.firstChild);
}

function run(){
    const f=Function(aceUtil.getValue());
    f();
}
