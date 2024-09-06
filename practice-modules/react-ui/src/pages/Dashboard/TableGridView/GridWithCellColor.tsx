import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, renderActionsCell } from '@mui/x-data-grid';
import { activeInactiveEnquiryService, getAllEnquiryService } from '../../../api/services/tableGridViewService';
import { Button, Container, FormControlLabel } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Switch from '@mui/material/Switch';
import { TOAST_TYPE, toastAlert } from '../../../common/toastAlert';
import classNames from 'classnames';

export default function GridWithCellColor() {

    const [allEnquiryList, setAllEnquiryList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        getAllEnquiry();
    }, [])

    const getAllEnquiry = () => {
        getAllEnquiryService().then((res: any) => {
            if (res.success) {
                setAllEnquiryList(res.enquiryList);
            }
            else {
                setAllEnquiryList([]);
            }

        })
            .catch((err: Error) => {
                setAllEnquiryList([]);
                console.error(err);
            })
            .finally(() => setLoading(false))
    }

    const columns: any = [

        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
        },
        {
            field: 'address',
            headerName: 'Address',
            flex: 1,
        },
        {
            field: 'contact',
            headerName: 'Contact',
            flex: 1,
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
        },
        {
            field: 'enquiryCount',
            headerName: 'Enquiry Count(#)',
            flex: 1,
            renderCell: (params: any) => (<>
                <div className={classNames('text-primary', {
                    'bg-red': params?.row?.enquiryCount < 10,
                    'bg-green': (params?.row?.enquiryCount >= 10 && params?.row?.enquiryCount <= 20),
                    'bg-blue': params?.row?.enquiryCount > 20,
                })}>
                    {params?.row?.enquiryCount}
                </div>
            </>)
        },
    ];

    return (
        <React.Fragment>
            <Container sx={{ marginTop: '5rem' }}>
                <div className='d-flex justify-content-between' style={{ marginBottom: '2rem' }}>
                    <h3>All Enquiry List</h3>
                </div>
                <Box sx={{ width: '100%', display: 'flex' }}>
                    {loading ?
                        <CircularProgress sx={{ marginLeft: '50%' }} />
                        :
                        <DataGrid
                            rows={allEnquiryList}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5, 10, 15]}
                            sx={{
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#c7eef4', // Set your desired header color
                                },
                            }}
                        />
                    }
                </Box>
            </Container>
        </React.Fragment>
    );
}


