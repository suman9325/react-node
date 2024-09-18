import React, { useContext, useEffect, useMemo, useState } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { API_ENDPOINT_CATALOGUE } from '../../ApiServices/ApiConstant';
import apiService from '../../ApiServices/apiService';
import { CatalogueContext } from '../../pages/Catalogue/Catalogue';


const Yes_NO = [
    {
        value: "Yes",
        label: 'Yes'
    },
    {
        value: 'No',
        label: 'No'
    }
]

const lotType = [
    {
        value: "Stock",
        label: 'Stock'
    },
    {
        value: 'Arising',
        label: 'Arising'
    }
]

export default function CatalogueDetailsTable()
{
    const { CatalogueData, handleSetEditData } = useContext(CatalogueContext)
    const [uomDesc, setUomDesc] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() =>
    {
        const uomDesc = async () =>
        {
            try
            {
                const res = await apiService('GET', API_ENDPOINT_CATALOGUE.UOM_DESC)

                const option = res.results.map((item) => ({
                    // value: item.uomMapId,
                    value: item.description,
                    label: item.description
                }))
                setUomDesc(option);
            }
            catch (err)
            {
                // setMessage(err);
            }
        }

        uomDesc();

    }, [CatalogueData.TypeAuctionDetails])



    const columns = useMemo(
        () =>
            CatalogueData.TypeAuctionDetails.length
                ? Object.keys(CatalogueData.TypeAuctionDetails[0]).map((column, index) =>
                (
                    ([0, 1].includes(index)) ?
                        {
                            id: column,
                            accessorKey: column,
                            header: column,
                            size: 100,
                            enableEditing: false,
                        } :
                        (index == (3)) ?
                            {
                                id: column,
                                accessorKey: column,
                                header: column,
                                enableEditing: false
                            } :
                            // ([4].includes(index)) ?
                            //     {
                            //         header: column,
                            //         accessorKey: column,
                            //         id: column,
                            //         editVariant: 'select',
                            //         editSelectOptions: uomDesc,
                            //         Cell: ({ cell }) =>
                            //         {
                            //             let item = uomDesc.find((option) => option.value === cell.getValue());
                            //             return item ? item.label : 'Unknown';
                            //         },
                            //         muiEditTextFieldProps: ({ cell, row }) => ({
                            //             select: true,
                            //             error: !!validationErrors?.state,
                            //             helperText: validationErrors?.state,
                            //             onChange: (event) =>
                            //             {
                            //                 // setData(prevRows =>
                            //                 //     prevRows.map((item, idx) =>
                            //                 //         idx == row.id ? { ...item, [cell.column.id]: event.target.value } : item
                            //                 //     )
                            //                 // )
                            //                 handleSetEditData(row.id, cell.column.id, event.target.value);
                            //             }
                            //         })
                            //     } :
                            ([4, 6, 7, 8, 9].includes(index)) ?
                                {
                                    header: column,
                                    accessorKey: column,
                                    id: column,
                                    editVariant: 'select',
                                    editSelectOptions: index == 4 ? uomDesc : Yes_NO,
                                    Cell: ({ cell }) =>
                                    {
                                        let item = index == 4 ? (uomDesc.find((option) => option.value === cell.getValue())) : (Yes_NO.find((option) => option.value === cell.getValue()));
                                        return item ? item.label : 'Unknown';
                                    },
                                    muiEditTextFieldProps: ({ cell, row }) => ({
                                        select: true,
                                        error: !!validationErrors?.state,
                                        helperText: validationErrors?.state,
                                        onChange: (event) =>
                                        {
                                            // setData(prevRows =>
                                            //     prevRows.map((item, idx) =>
                                            //         idx == row.id ? { ...item, [cell.column.id]: event.target.value } : item
                                            //     )
                                            // )
                                            handleSetEditData(row.id, cell.column.id, event.target.value);
                                        }
                                    })
                                } :
                                ([15].includes(index)) ?
                                    {
                                        header: column,
                                        accessorKey: column,
                                        id: column,
                                        editVariant: 'select',
                                        editSelectOptions: lotType,
                                        Cell: ({ cell }) =>
                                        {
                                            let lotType_ = lotType.find((option) => option.value === cell.getValue());
                                            return lotType_ ? lotType_.label : 'Unknown';
                                        },
                                        muiEditTextFieldProps: ({ cell, row }) => ({
                                            select: true,
                                            error: !!validationErrors?.state,
                                            helperText: validationErrors?.state,
                                            onChange: (event) =>
                                            {
                                                // setData(prevRows =>
                                                //     prevRows.map((item, idx) =>
                                                //         idx == row.id ? { ...item, [cell.column.id]: event.target.value } : item
                                                //     )
                                                // )
                                                handleSetEditData(row.id, cell.column.id, event.target.value);
                                            }
                                        })
                                    } :
                                    ([29, 30, 31, 32, 33, 34, 35, 36].includes(index)) ?
                                        {
                                            id: column,
                                            accessorKey: column,
                                            // header: column.slice(2),
                                            header: column,
                                            muiEditTextFieldProps: ({ cell, row }) => ({
                                                type: 'text',
                                                onBlur: (event) =>
                                                {
                                                    // setData(prevRows =>
                                                    //     prevRows.map((item, idx) =>
                                                    //         idx == row.id ? { ...item, [cell.column.id]: event.target.value } : item
                                                    //     )
                                                    // )
                                                    handleSetEditData(row.id, cell.column.id, event.target.value);
                                                },
                                            }),
                                        } :
                                        {
                                            id: column,
                                            accessorKey: column,
                                            header: column,
                                            muiEditTextFieldProps: ({ cell, row }) => ({
                                                type: 'text',
                                                // required: true,
                                                // error: !!validationErrors?.[cell.id],
                                                // helperText: validationErrors?.[cell.id],
                                                onBlur: (event) =>
                                                {
                                                    // const validationError = !validateRequired(event.currentTarget.value)
                                                    //     ? 'Required'
                                                    //     : undefined;
                                                    // setValidationErrors({
                                                    //     ...validationErrors,
                                                    //     [cell.id]: validationError,
                                                    // });

                                                    // setData(prevRows =>
                                                    //     prevRows.map((item, idx) =>
                                                    //         idx == row.id ? { ...item, [cell.column.id]: event.target.value } : item
                                                    //     )
                                                    // )
                                                    handleSetEditData(row.id, cell.column.id, event.target.value);
                                                },
                                            }),
                                        }
                )
                ) : []


        ,
        [CatalogueData.TypeAuctionDetails, uomDesc],
    );

    const table = useMaterialReactTable({
        columns,
        data: CatalogueData.TypeAuctionDetails,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        enablePagination: false,
        enableStickyHeader: true,
        // muiTableContainerProps: { sx: { maxHeight: '300px' } },
        enableColumnPinning: true,
        initialState: { columnPinning: { left: ['AuctionID', 'Lot_No'] } },
        enableEditing: true,
        editDisplayMode: 'table',
    });

    const hideColumn = () =>
    {
        const obj = {}
        Object.keys(CatalogueData.TypeAuctionDetails[0]).map((column, index) =>
        {
            if ([10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].includes(index))
            {
                obj[column] = false;
            }
        });
        return obj;
    }

    const initialState = {
        columnPinning: { left: ['auctionId', 'lot_No'], right: ['lot_Type'] },
        columnVisibility: hideColumn()
    }

    const headStyle = {
        //simple styling with the `sx` prop, works just like a style prop in this example
        sx: {
            fontWeight: 'bold',
            fontSize: '14px',
            backgroundColor: '#e3eaf4'
        },
    }





    return (
        <>
            {/* <MaterialReactTable table={table} /> */}
            <MaterialReactTable
                data={CatalogueData.TypeAuctionDetails}
                columns={columns}
                enableTopToolbar={false}
                enableSorting={false}
                enableColumnActions={false}
                enablePagination={false}
                enableStickyHeader={true}
                enableColumnPinning={true}
                initialState={initialState}
                enableEditing={true}
                editDisplayMode={'cell'}
                muiTableHeadCellProps={headStyle}
            />
        </>
    )
}
