import { resData } from "../axios/rest"
import { BASE_URL } from "../constant/base.service"
import { CategoryRes } from "../dto/category/category-res.dto"

const getAllCategories = async () =>{
    let result: CategoryRes[] = []
    try{
        const res = await resData(`${BASE_URL}/admin/categories`)
        result = res.data
    }catch(err:any){
        console.log(err)
    }
    return result
}

export {getAllCategories}