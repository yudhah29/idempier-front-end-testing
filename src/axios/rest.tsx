import axios from './api'

async function resData(url:string){
    try{
        const res = await axios.get(url)
        return res.data
    }catch(err:any){
        console.log(err)
    }
}

async function postData<T> (url:string, data:T){
    try{
        const res = await axios.post(url,data)
        return res.data
    }catch(err:any){
        console.log(err)
    }
}

async function updateData<T>(url:string, data:T){
    try{
        const res = await axios.put(url,data)
        return res.data
    }catch(err:any){
        console.log(err)
    }
}

async function deleteDataById(url:string, id:string){
    try{
        const res = await axios.delete(url+id)
        return res.data
    }catch(err:any){
        console.log(err)
    }
}

export {resData, postData,updateData,deleteDataById}