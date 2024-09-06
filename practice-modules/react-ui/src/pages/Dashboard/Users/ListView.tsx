import { Box, Container } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { getAllUserListService } from '../../../api/services/usersService';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { PageSizes } from '../../../enum/paginationEnum';

const ListView = () => {

    const [userList, setUserList] = useState<[]>([]);
    const [paginationObj, setPaginationObj] = useState({ page: 0, pageSize: 10 });
    const [totalCount, setTotalCount] = useState(0);
    // const pageSizeOptions = (Object.values(PageSizes)).map(p => +p);

    useEffect(() => {

        getAllUserListService(paginationObj).then((res: any) => {
            console.log(res);
            const result = res?.data;
            result?.userList?.length > 0 ? setUserList(result?.userList) : setUserList([]);
            setTotalCount(result?.totalCount);

        })
            .catch((err: Error) => {
                console.log(err);
                setUserList([]);
                setTotalCount(0);
            })
    }, [paginationObj])

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 200,
        },
        {
            field: 'fname',
            headerName: 'First Name',
            width: 250
        },
        {
            field: 'lname',
            headerName: 'Last Name',
            width: 250
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 250
        },

        // {
        //     field: 'avatar',
        //     headerName: 'AVATAR',
        //     sortable: false,
        //     width: 160,
        //     renderCell: (params: GridCellParams) => (
        //         <div>
        //             <img src={params.row?.avatar} height={100} width={100} />
        //         </div>
        //     ),
        // },
    ];

    return (
        <Fragment>
            <Container component="main" maxWidth="md">
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: 1
                    }}
                >

                    <DataGrid
                        rows={userList}
                        columns={columns}
                        rowCount={totalCount} // Set total count here
                        paginationMode="server" // Set pagination mode to server
                        initialState={{
                            pagination: {
                                paginationModel: { page: paginationObj.page, pageSize: paginationObj.pageSize },
                            },
                        }}
                        pageSizeOptions={[5, 10, 15]}
                        onPaginationModelChange={(params) => {
                            console.log('pp', params);
                            const pageObj = {
                                page: params.page,
                                pageSize: params.pageSize
                            }
                            setPaginationObj(pageObj);
                        }}
                    />

                </Box>
            </Container>
        </Fragment>
    );
}

export default ListView;