import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getAllEnquiryService } from '../../../api/services/tableGridViewService';
import { Button, Container } from '@mui/material';

export default function GridWithCheckbox() {

    const [allEnquiryList, setAllEnquiryList] = React.useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);

    React.useEffect(() => {
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
    }, [])

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
    ];

    const handleSelectionModelChange = (newSelectionModel: any) => {
        setSelectedRows(newSelectionModel);
    };

    const deleteEnquiry = () => {
        console.log(selectedRows.join());

    }

    return (
        <React.Fragment>
            <Container sx={{ marginTop: '5rem' }}>
                <div className='d-flex justify-content-between' style={{ marginBottom: '2rem' }}>
                    <h3>All Enquiry List</h3>
                    <Button className='' variant="contained" onClick={() => deleteEnquiry()}>Proceed</Button>
                </div>
                <Box sx={{ width: '100%' }}>
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
                        checkboxSelection
                        onRowSelectionModelChange={handleSelectionModelChange}
                        sx={{
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#c7eef4', // Set your desired header color
                            },
                        }}
                    />
                </Box>
            </Container>
        </React.Fragment>
    );
}


