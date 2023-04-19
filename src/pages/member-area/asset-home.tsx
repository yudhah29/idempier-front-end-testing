import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

interface Asset {
    id: number;
    Name: string;
    Created : string
}

const AssetPage = () => {


    const [data, setData] = useState<Asset[]>([]);
    let assetList: Asset[] = []

    useEffect(() => {
        getAssets()
    }, [])

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
                console.log('API Response:', response.data.records);
            })
        } catch (error) {
            console.error(error);
        }
    };

    console.log(localStorage.getItem('token'))


    console.log('Data:', data);

    return (
        <div className="datatable">
            <DataTable value={data}>
                <Column field="id" header="ID" />
                <Column field="Name" header="Name" />
                <Column field="Created" header="Created At" />
            </DataTable>
        </div>
    );
};

export default AssetPage;
