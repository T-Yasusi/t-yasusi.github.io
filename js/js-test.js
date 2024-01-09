// import loadModule from './loadModule.js';
const loadModule = async (filepath)=>{
    return await import(filepath).then(module=>{
        for( const [key, val] of Object.entries(module) ){
            if( window[key]==null ){
                window[key]=val;
                console.log('Set Global Property '+key);
            }
            else{
                console.error('! Global.'+key+' already defined');
            }
        }
    });
}

import aceUtil from './aceUtil.js';

// const modules = [
//     loadModule('./output.js')
// ];

window.addEventListener('DOMContentLoaded', ()=>{
    console.log('===== js/js-test.js DOMCContentLoaded START =====');
    aceUtil.set('editor', 'ace/mode/javascript', 'ace/theme/monokai');
    aceUtil.setValue('result.log("Hello World!")')

    run();
    // Promise.all(modules).then(()=>{
    // 	run();
    // });
//    setTimeout(()=> run(), 1000);
    
    function run(){
        const f=Function(aceUtil.getValue());
        f();
    }
    console.log('===== js/js-test.js DOMCContentLoaded FINISH =====');
});
