let editor=null;

export default {
    set: (id, lang=void 0, theme=void 0)=>{
        if( typeof(id)==='object' ){
            if( id.lang !=null ) lang=id.lang;
            if( id.theme!=null ) theme=id.theme;
        }
        editor=ace.edit(id);
        editor.setTheme(theme);
        editor.session.setMode(lang);
        console.log(editor);
    },

    setValue: (text, point=-1)=>{ editor.setValue(text, point); },
    getValue: ()=>{ return editor.getValue(); },

    loadText: async (url)=>{ return fetch(url, { cache: "no-store" } ).then(res=> res.text()).then(text=> editor.setValue(text, -1)); }
}
