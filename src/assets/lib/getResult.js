import axios from 'axios';

export const schoolList = new Promise((resolve, reject) => {
    axios.get("/api/meta/college",{
    }).then((res=>{
        resolve(res.data.data);
    })).catch((error)=>{
        reject(error);
    })
})

export function getSchRegion(schid) {
    return new Promise((resolve, reject) => {
        axios.get(`/api/base/college?cid=${schid}`,{
        }).then((res=>{
            resolve(res.data.data);
        })).catch((error)=>{
            reject(error);
        })
    })
}

export function getResultTest(schNames) {
    console.log("进入了getTest!");
    return new Promise((resolve)=>{
        var name_id = [];
        var mapresult = [];
        schoolList.then(res=>{
            for (let i=0;i<res.length;i++){
                name_id[res[i].cname] = res[i].cid;
            }
            for (let i=0;i<schNames.length;i++){
                getSchRegion(name_id[schNames[i]]).then(res=>{
                    var loc = res.location;
                    let i = 0;
                    for (i=0;i<mapresult.length;i++){
                        if (mapresult[i].name === loc){
                            mapresult[i].value +=1;
                            break;
                        }
                    }
                    if (i===mapresult.length){
                        mapresult.push({name: loc,value: 1});
                    }
                }).catch(error=>{
                    console.log(error);
                })
            }
        })
        console.log(mapresult.length)
        resolve(mapresult)
    })
}
