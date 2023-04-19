import { postData } from "../axios/rest"
import { BASE_URL } from "../constant/base.service"
import { LoginReq } from "../dto/login/login-req"
import { LoginRes } from "../dto/login/login-res"

const assetApi = 'https://demo.globalqss.com/api/v1/models/a_asset'

const loginPost = async (data: LoginReq) => {

  let result: LoginRes
  try {
    const res = await postData<LoginReq>(assetApi, data)
      .then(res => {
        localStorage.setItem('Token', res.token)
        result = res
      })
  } catch (err) {
    return Promise.reject(err)
  }
}

const getToken = (): string => {
  const data = localStorage.getItem("dataLogin")
  if (data) {
    return JSON.parse(data).token
  }
  throw new Error("Token is empty")
}

const getIdLogin = (): String => {
  const data = localStorage.getItem("dataLogin")
  if (data) {
    return JSON.parse(data).userId
  }
  throw new Error("User Id is empty")
}

const getIdFotoProfile = (): string => {
  const data = localStorage.getItem("dataLogin")
  if (data) {
    return JSON.parse(data).fotoProfile
  }
  throw new Error("Foto Profile is empty")
}

const getRole = (): string => {
  const data = localStorage.getItem("dataLogin")
  if (data) {
    return JSON.parse(data).roleCode
  }
  throw new Error("Role is empty")
}

const getFullName = (): string => {
  const data = localStorage.getItem("dataLogin")
  if (data) {
    return JSON.parse(data).fullname
  }
  throw new Error("Fullname is empty")
}

const saveDataLogin = async (data: LoginRes) => {
  localStorage.setItem("dataLogin", JSON.stringify(data))
}

const getroleCode = (): string => {
  const data = localStorage.getItem("dataLogin")
  if (data) {
    return JSON.parse(data).roleCode
  }
  throw new Error("Role is empty")
}



const getimages = (): string => {
  const data = localStorage.getItem("dataLogin")
  if (data) {
    return JSON.parse(data).imageId
  }
  throw new Error("Images is empty")
}




export { loginPost }