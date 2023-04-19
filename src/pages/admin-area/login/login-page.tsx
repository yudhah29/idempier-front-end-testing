import { FC, useState } from "react"

import { LoginReq } from "../../../dto/login/login-req"

import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as Comp from "../../../components/share/share.component";
import clsx from "clsx";
import { LoginRes } from "../../../dto/login/login-res";
import axios from "axios";
import { postData } from "../../../axios/rest";


function LoginPage(data: LoginReq) {

    const [error, setError] = useState('');

    const [token, setToken] = useState('');

    const initValue: LoginReq = { userName: 'GardenAdmin', password: 'GardenAdmin', parameters: { clientId: 0, roleId: 0, organizationId: 0, warehouseId: 0, languange: '' } }

    const apiUrl = 'https://demo.globalqss.com/api/v1/auth/tokens';

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post<LoginRes>(apiUrl, data);
            console.log('Token:', response.data.token);
            const token = response.data.token;
            setToken(token);
        } catch (error) {
            setError('Invalid username or password');
            console.error('Error:', error);
        }
    };

    const loginPost = async (data: LoginReq) => {

        let result: LoginRes
        try {
            const res = await postData<LoginReq>(apiUrl, data)
            result = res.data
        } catch (err) {
            // console.log(err)
            return Promise.reject(err)
        }
        return result
    }

    // const userSchema = Yup.object().shape({
    //     email: Yup.string()
    //         .min(3, 'Too Short!')
    //         .max(50, 'Too Long!')
    //         .required('Required'),

    //     password: Yup.string()
    //         .min(2, 'Too Short!')
    //         .max(10, 'Too Long!')
    //         .required('Required')
    // })

    const userForm = useFormik({
        initialValues: initValue,
        onSubmit: (values) => {
            console.log(values)
        },
        // validationSchema: userSchema
    })

    return (

        <div className="flex align-items-center justify-content-center">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                    <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                    <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
                </div>

                <div>
                    <form onSubmit={userForm.handleSubmit}>
                        <div>
                            <MyInputText type="text" name="userName" id="email"
                                formik={userForm} />
                            <ErrorMessage formik={userForm} name="userName" />
                        </div>
                        <div>
                            <MyInputText type="password" name="password" id="password"
                                formik={userForm} />
                            <ErrorMessage formik={userForm} name="password" />
                        </div>
                        <div>
                            <Comp.Button type="submit" label="LOGIN" />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default LoginPage

const ErrorMessage: FC<{ formik: any, name: string }> =
    ({ formik, name }) => {
        return (
            <>
                {formik.errors[name] && formik.touched[name] ?
                    <span>{formik.errors[name]}</span> : null}
            </>
        )
    }

const MyInputText: FC<{
    type?: string, name: string, id?: string,
    value?: any, formik: any
}> = ({ type, id, name, value, formik }) => {

    return (
        <>
            <Comp.InputText type={type ?? 'text'} name={name} id={id ?? name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={value}
                className={formik.errors[name] && formik.touched[name] ? "p-invalid" : ''} />
        </>
    )
}