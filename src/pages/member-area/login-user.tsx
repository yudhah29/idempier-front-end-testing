import { FC } from "react"

import { LoginReq } from "../../dto/login/login-req"

import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as Comp from "../../components/share/share.component";
import { loginPost } from "../../services/user.service";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate()

    const initValue: LoginReq = {
        userName: '', password: '', parameters: {
            clientId: 11, roleId: 102, organizationId: 11, warehouseId: 103, language: 'en_US'
        }
    }
    const userSchema = Yup.object().shape({
        userName: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),

        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required')
    })

    const userForm = useFormik({
        initialValues: initValue,
        onSubmit: (values) => {
            console.log(values)
            loginPost(values)
            navigate('/asset-home')
        },
        validationSchema: userSchema
    })

    return (

        <>

            <div className="flex align-items-center justify-content-center w-auto h-screen">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    <div className="text-center mb-5">
                        <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                        <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                        <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
                    </div>

                    <div>
                        <form onSubmit={userForm.handleSubmit}>
                            <div className="mb-2">
                                <label htmlFor="email" className="block text-900 font-medium mb-2">Username</label>
                                <MyInputText type="text" id="username" name="userName" formik={userForm} />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                                <MyInputText type="password" id="password" name="password" formik={userForm} />
                            </div>

                            <Comp.Button label="Sign In" type="submit" icon="pi pi-user" className="w-full" />
                        </form>
                    </div>
                </div>
            </div>

        </>
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
                className={'w-full'} />
        </>
    )
}

//===========================================================================
