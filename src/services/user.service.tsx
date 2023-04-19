import { postData } from "../axios/rest"
import { BASE_URL } from "../constant/base.service"
import { LoginReq } from "../dto/login/login-req"
import { LoginRes } from "../dto/login/login-res"

const loginAPi = 'https://demo.globalqss.com//api/v1/auth/tokens'

const loginPost = async (data: LoginReq) => {

  let result: LoginRes
  try {
    const res = await postData<LoginReq>(loginAPi, data)
      .then(res => {
        localStorage.setItem('token', res.token)
        result = res
      })
  } catch (err) {
    return Promise.reject(err)
  }
}


export { loginPost }