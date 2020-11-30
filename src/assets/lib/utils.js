export function readFile(file) {
    return new Promise(resolve => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = ev => {
          resolve(ev.target.result);
        };
    })
}

export let character = {
    name:{
        text:'姓名',
        type:'string'
    },
    school:{
        text:'学校名',
        type:'string'
    }
}



