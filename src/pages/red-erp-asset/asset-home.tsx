import { FC, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import React from 'react';
import * as Comp from "../../components/share/share.component";
import { AssetReq } from '../../dto/assets/assets-req';
import { classNames } from 'primereact/utils';
import { useFormik } from 'formik';


interface Asset {
    id: number
    Name: string
    Created: string
    Value: string
}

const initValue: Asset = {
    id: 0,
    Name: '',
    Created: '',
    Value: ''
}


const AssetPage = () => {


    const [data, setData] = useState<Asset[]>([])
    const [editAssetDialog, setEditAssetDialog] = useState(false);
    const [deleteAssetDialog, setDeleteAssetDialog] = useState(false)
    const [submit, setSubmit] = useState(false)

    // const [assetEdit, setAssetEdit] = useState({
    //     id: 0,
    //     Name: '',
    //     Value: ''
    // })

    let assetList: Asset[] = []

    useEffect(() => {
        getAssets()
    }, [])

    const [visible, setVisible] = useState(false);
    const [assets, setAssets] = useState<Asset>()

    const showDialog = () => {
        setVisible(true);
    };

    const hideDialog = () => {
        setVisible(false);
    };

    const getAssets = async () => {
        try {
            await axios.get('/api/v1/models/a_asset', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                proxy: {
                    host: 'demo.globalqss.com',
                    port: 443,
                    protocol: 'https'
                }
            }).then((response) => {
                assetList = response.data.records
                setData(assetList);
                // console.log('API Response:', response.data.records);
            })
        } catch (error) {
            console.error(error);
        }
    };

    const getAssetsById = async (id: number) => {
        try {
            const response = await axios.get(`/api/v1/models/a_asset/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                proxy: {
                    host: 'demo.globalqss.com',
                    port: 443,
                    protocol: 'https'
                }
            });
            const assetList = response.data;
            setAssets(assetList)
            console.log(response.data)
            // console.log(assets)
        } catch (error) {
            console.error(error);
        }
    };


    const assetEdit = async (data: Asset) => {
        try {
            const res = await axios.put<Asset>(`/api/v1/models/a_asset/${assets?.id}`, data, {
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


    const hideDeleteAssetDialog = () => {
        setDeleteAssetDialog(false)
    }

    const deleteProduct = () => {
        // let _data = data.filter((val) => val.id !== data.id);

        // setProducts(_products);
        // setDeleteProductDialog(false);
        // setProduct(emptyProduct);
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const assetDialogFooter = (
        <React.Fragment>
            <Comp.Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            {/* <Comp.Button label="Save" icon="pi pi-check" onClick={saveProduct} /> */}
        </React.Fragment>
    );

    const deleteAssetFooter = (
        <React.Fragment>
            <Comp.Button label="No" icon="pi pi-times" outlined onClick={hideDeleteAssetDialog} />
            <Comp.Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );

    const editAsset = (asset: Asset) => {
        setAssets({ ...asset })
        getAssetsById(asset.id)
        setEditAssetDialog(true)
    }

    const confirmDeleteAsset = (data: Asset) => {
        // setData(data)
        setDeleteAssetDialog(true)

    }

    const actionBodyTemplate = (asset: Asset) => {
        return (
            <React.Fragment>
                <Comp.Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editAsset(asset)} />
                <Comp.Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteAsset(asset)} />
            </React.Fragment>
        );
    };

    const assetEditForm = useFormik({
        initialValues: initValue,
        onSubmit: (values) => {
            assetEdit(values).then(res => {
                console.log(assets)
            })
        }
    })

    return (
        <>

            <div className="grid grid-nogutter justify-content-center">
                <div className="col-10 ">
                    <div className="flex align-self-center my-3 gap-2 justify-content-start">

                        <div className="">
                            <Comp.Button >Add New Asset</Comp.Button>
                        </div>
                    </div>
                    <div className="surface-500">

                        <div className="datatable">
                            <DataTable value={data}>
                                <Column field="id" header="ID" />
                                <Column field="Name" header="Name" />
                                <Column field="Created" header="Created At" />
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>

            <Comp.Dialog visible={editAssetDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Asset Details" modal className="fluid" footer={assetDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <h3 > {assets?.Name}</h3>
                    <form onSubmit={assetEditForm.handleSubmit}>
                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">Name</label>
                            <MyInputText type="text" id="Name" name="Name" formik={assetEditForm} />
                        </div>

                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">Value</label>
                            <MyInputText type="text" id="Value" name="Value" formik={assetEditForm} />
                        </div>
                        <div className=" "></div>
                        <Comp.Button label="Create" type="submit" icon="pi pi-plus" className="w-full" />
                    </form>
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            {/* <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} /> */}
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            {/* <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} /> */}
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            {/* <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} /> */}
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            {/* <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} /> */}
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        {/* <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" /> */}
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        {/* <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} /> */}
                    </div>
                </div>
            </Comp.Dialog>

            {/* <Comp.Dialog visible={deleteAssetDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog> */}

        </>
    );
};

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

export default AssetPage;
