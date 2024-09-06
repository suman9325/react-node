import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, renderActionsCell } from '@mui/x-data-grid';
import { getAllEnquiryDocumentsService } from '../../../api/services/tableGridViewService';
import { Button, Container, FormControlLabel, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DownloadIcon from '@mui/icons-material/Download';
import Switch from '@mui/material/Switch';
import { TOAST_TYPE, toastAlert } from '../../../common/toastAlert';
import { downloadEnquiryDocumentService, saveEnquiryDocumentService, singleFileUploadService } from '../../../api/services/fileUploadService';
import TextField from '@mui/material/TextField';
import { Card } from 'reactstrap';
import nodata from '../../../assets/images/nodata.png';

export default function GridWithFileDownload() {

    const [allEnquiryList, setAllEnquiryList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedFile, setSelectedFile] = React.useState<any>(null);
    const [feedback, setFeedback] = React.useState('');

    React.useEffect(() => {
        getAllEnquiry();
    }, [])

    const getAllEnquiry = () => {
        setLoading(true);
        getAllEnquiryDocumentsService().then((res: any) => {
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

    const handleFileChange = (e: any) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('document', selectedFile);
        formData.append('feedback', feedback);
        saveEnquiryDocumentService(formData).then((res: any) => {
            if (res.success) {
                toastAlert(TOAST_TYPE.SUCCESS, res?.message);
                setSelectedFile(null);
                setFeedback('');
                getAllEnquiry();
            }
            else {
                toastAlert(TOAST_TYPE.ERROR, res?.message);
            }
        })
            .catch((err: Error) => {
                toastAlert(TOAST_TYPE.ERROR, err?.message);
            })
    };

    const handleDownload = async (fileId: number) => {
        try {
            downloadEnquiryDocumentService({ id: fileId }).then((res: any) => {

                // Extract the content type and disposition headers
                const contentType = res.headers['content-type'];
                const contentDisposition = res.headers['content-disposition'];

                // Create a URL for the file
                const url = window.URL.createObjectURL(new Blob([res.data], { type: contentType }));    // **
                const link = document.createElement('a');   // **
                link.href = url;    // **

                // Determine the filename from the content-disposition header
                let filename = 'downloaded_file';   // **
                if (contentDisposition) {
                    const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                    if (filenameMatch && filenameMatch.length === 2) {
                        filename = filenameMatch[1];
                    }
                }

                // Set the filename and trigger the download
                link.setAttribute('download', filename);    // **
                document.body.appendChild(link);    // **
                link.click();   // **
                document.body.removeChild(link);    // **
                toastAlert(TOAST_TYPE.SUCCESS, 'File Downloaded Successfully!');
            });
        } catch (error) {
            toastAlert(TOAST_TYPE.ERROR, 'Error downloading the file');
        }
    };



    const columns: any = [

        {
            field: 'feedback',
            headerName: 'Description',
            width: 1000
        },
        {
            field: 'isActive',
            headerName: 'Action',
            flex: 1,
            renderCell: (params: any) => (<div className='cursor-pointer' onClick={() => handleDownload(params?.row?.id)} > <DownloadIcon color="primary" /> </div>)
        },
    ];

    return (
        <React.Fragment>
            <Container sx={{ marginTop: '5rem' }}>
                <Card className='p-5'>
                    <div className="d-flex mt-4 justify-content-between">
                        <TextField id="outlined-basic" label="Please Enter Your Query..." variant="outlined" style={{ width: '500px' }} value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                        <div className='d-flex'>
                            <Typography variant="h5" gutterBottom className="me-4">
                                Upload a File
                            </Typography>
                            <input
                                type="file"
                                accept=".jpg,.png,.jpeg,.pdf" // Define accepted file types
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="fileInput"
                            />
                            <label htmlFor="fileInput">
                                <Button variant="contained" component="span">
                                    Choose File
                                </Button>
                            </label>
                        </div>
                    </div>
                    {selectedFile && (
                        <div className="mt-5 d-flex">
                            <Typography variant="body1" gutterBottom>
                                Selected File: {selectedFile.name}
                            </Typography>
                            <Button variant="contained" className="ms-4" color="primary" onClick={handleUpload}>
                                Upload
                            </Button>
                        </div>
                    )}

                </Card>

                {/* ------------ LIST ------------------ */}

                <div className='mt-4'>
                    <div className='d-flex justify-content-between' style={{ marginBottom: '2rem' }}>
                        <h3>All Enquiry List</h3>
                    </div>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        {loading ?
                            <CircularProgress />
                            :
                            <>
                                {allEnquiryList.length > 0 ?
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
                                    :
                                    <div>
                                        <img src={nodata} height={200} width={200} />
                                    </div>
                                }
                            </>
                        }
                    </Box>
                </div>
            </Container>
        </React.Fragment>
    );
}


