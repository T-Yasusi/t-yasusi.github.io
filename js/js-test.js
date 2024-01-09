import loadModule from './loadModule.js';
import aceUtil from './aceUtil.js';

const modules = [
    loadModule('./output.js')
];

window.addEventListener('DOMContentLoaded', ()=>{
    console.log('===== js/js-test.js DOMCContentLoaded START =====');
    aceUtil.set('editor', 'ace/mode/javascript', 'ace/theme/monokai');
    aceUtil.setValue('output.log("Hello World!")')

    Promise.all(modules).then(()=>{
	run();
    });
//    setTimeout(()=> run(), 1000);
    
    function run(){
        const f=Function(aceUtil.getValue());
        f();
    }
    console.log('===== js/js-test.js DOMCContentLoaded FINISH =====');
});
