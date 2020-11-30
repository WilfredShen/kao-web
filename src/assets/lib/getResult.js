import axios from 'axios';

export const schoolList = new Promise((resolve, reject) => {
    axios.get("http://localhost:8080/meta/college",{
    }).then((res=>{
        resolve(res.data.data);
    })).catch((error)=>{
        reject(error);
    })
})

export function getSchRegion(schid) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:8080/base/college?cid=${schid}`,{
        }).then((res=>{
            resolve(res.data.data);
        })).catch((error)=>{
            reject(error);
        })
    })
}

