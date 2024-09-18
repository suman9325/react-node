import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { API_ENDPOINT_CATALOGUE } from '../../ApiServices/ApiConstant';
import moment from 'moment';
import apiService from '../../ApiServices/apiService';


export default function CatalogueList({ handleOnCatalogueDetails })
{

    const [data, setData] = useState([]);

    useEffect(() =>
    {
        const obj = {
            "frmDate": "2023-01-01",
            "toDate": "2024-08-26",
            "clientId": 2
        }

        const fetchData_ = async () =>
        {
            try
            {

                const res = await apiService('POST', API_ENDPOINT_CATALOGUE.GETEXTERNALCATALOG, JSON.stringify(obj))

                const ListAfterFormatDate = res.results.map(item => ({
                    ...item,
                    auctionDate: formatDate(item.auctionDate),
                }))

                setData(ListAfterFormatDate);

            }
            catch (err)
            {
                // setMessage(err);
            }
        }

        fetchData_();
    }, [])

    const formatDate = (isoDate) =>
    {
        return moment(isoDate).format('DD-MM-YYYY');
    };

    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'minNo', //access nested data with dot notation
                header: 'MinNo',
                size: 50,
            },
            {
                accessorKey: 'catalogueName',
                header: 'Catalogue Name',
                size: 350,
            },
            {
                accessorKey: 'auctionDate', //normal accessorKey
                header: 'Auction Date',
                size: 200,
            }
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        muiTableBodyRowProps: ({ row }) => ({
            onClick: (event) =>
            {
                handleOnCatalogueDetails(row.original.minNo);
            },
            sx: {
                cursor: 'pointer', //you might want to change the cursor too when adding an onClick
            },
        }),
        elevation: 0,
        muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
                fontWeight: 'bold',
                fontSize: '14px',
                backgroundColor: '#e3eaf4',
                // border: '1px dashed #e0e0e0',
            },
        },



    });


    return (
        <>
            <div className="card">
                <div className="card-header">
                    CATALOGUE LIST
                </div>
                <div className="card-body">
                    <MaterialReactTable table={table} />
                </div>
            </div >
        </>
    )
}
