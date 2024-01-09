import aceUtil from './aceUtil.js';
import loadModule from './loadModule.js';

const modules = [
    loadModule('./output.js')
];

window.addEventListener('DOMContentLoaded', ()=>{
    console.log('===== js/js-test.js DOMCContentLoaded START =====');
    console.log('ccc');
    aceUtil.set('editor', 'ace/mode/javascript', 'ace/theme/monokai');
    aceUtil.setValue('output.log("Hello World!")')

//    Promise.all(modules).then(()=> run());
    document.getElementById('do').addEventListener('click', ()=> run());
    console.log('===== js/js-test.js DOMCContentLoaded FINISH =====');
});

function run(){
    const f=Function(aceUtil.getValue());
    f();
}
