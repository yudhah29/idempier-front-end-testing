import { useFormik } from "formik"
import { AssetReq } from "../../dto/assets/assets-req"
import { postData } from "../../axios/rest"
import * as Comp from "../../components/share/share.component";
import { FC } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateAsset = () => {

    const initValue: AssetReq = {
        isSOTrx: true,
        AD_Org_ID: {
            id: 11
        },
        A_Asset_Group_ID: {
            id: 50006
        },
        A_Asset_Status: {
            id: 'AC'
        },
        AssetActivationDate: '2023-03-24',
        AssetServiceDate: '2023-03-24',
        Help: 'CreatedFrom InvoiceLine',
        InventoryNo: 1000000,
        IsActive: true,
        IsDepreciated: false,
        IsDisposed: false,
        IsFullyDepreciated: false,
        IsInPosession: false,
        IsOwned: true,
        M_Locator_ID: {
            id: 101
        },
        M_Product_ID: {
            id: 200001
        },
        Name: '',
        Value: ''
    }

    const assetPost = async (data: AssetReq) => {
        try {
            const res = await axios.post<AssetReq>('/api/v1/models/a_asset', data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                proxy: {
                    host: 'demo.globalqss.com',
                    port: 443,
                    protocol: 'https'
                }
            })
            console.log(res)
        } catch (error) {

        }
    }

    const navigate = useNavigate()
    const assetCreateForm = useFormik({
        initialValues: initValue,
        onSubmit: (values) => {
            console.log(values)
            assetPost(values).then(res => {
                navigate("/asset-home")
            })
        }
    })


    return (
        <>
            <div className="flex align-items-center justify-content-center w-auto h-screen">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">

                    <div>
                        <form onSubmit={assetCreateForm.handleSubmit}>
                            <div className="mb-2">
                                <label htmlFor="email" className="block text-900 font-medium mb-2">Name</label>
                                <MyInputText type="text" id="Name" name="Name" formik={assetCreateForm} />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="password" className="block text-900 font-medium mb-2">Value</label>
                                <MyInputText type="text" id="Value" name="Value" formik={assetCreateForm} />
                            </div>

                            <Comp.Button label="Create" type="submit" icon="pi pi-plus" className="w-full" />
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

//agar prop generic memakai FC
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
