import aceUtil from './aceUtil.js';

window.addEventListener('DOMContentLoaded', ()=>{
    console.log('===== js/js-test.js DOMCContentLoaded START =====');
    aceUtil.set('editor', 'ace/mode/javascript', 'ace/theme/monokai');
    aceUtil.setValue('console.log("Hello World!")')

    run();
    
    function run(){
        const f=Function(aceUtil.getValue());
        f();
    }
    console.log('===== js/js-test.js DOMCContentLoaded FINISH =====');
});
