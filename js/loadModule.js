export default async (filepath)=>{
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

