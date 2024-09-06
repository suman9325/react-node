import { Button, Container, Input, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { singleFileUploadProgressService } from "../../../api/services/fileUploadService";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

const SingleFileProgress = () => {

    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [percentCompleted, setPercentCompleted] = useState<number>(0);

    const handleFileChange = (e: any) => {
        setPercentCompleted(0);
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        // Here you can implement your upload logic
        console.log('Uploading file:', selectedFile);
        // Reset the selected file after upload

        const formData = new FormData();
        formData.append('profile_image', selectedFile);

        var config = {
            onUploadProgress: (progressEvent: any) => {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log('percentCompleted', percentCompleted);

                setPercentCompleted(percentCompleted);
            }
        };

        singleFileUploadProgressService(formData, config)
            .then((res: any) => {
                if (res.success) {
                    setSelectedFile(null);
                }
            })
            .catch((err: any) => {

            })
            .finally(()=>{
                
            })

    };

    return (
        <Fragment>
            <Container component="main" maxWidth="sm" sx={{ marginTop: '5%', background: '#c5daed', padding: '3%' }}>
                <div className="d-flex justify-content-between">
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
                <hr />
                {selectedFile && (
                    <div className="mt-4 mb-4">
                        <div className="d-flex justify-content-between">
                            <Typography variant="body1" gutterBottom>
                                Selected File: {selectedFile.name}
                            </Typography>
                            <Button variant="contained" className="ms-4" color="primary" onClick={handleUpload}>
                                Upload
                            </Button>
                        </div>
                    </div>
                )}

                {percentCompleted !== 0 &&
                    <Fragment>
                        <LinearProgress variant="determinate" value={percentCompleted} color={percentCompleted === 100 ? "success" : "primary"} />

                        <div className="d-flex justify-content-center">
                            <span>{percentCompleted}%</span>
                        </div>
                    </Fragment>
                }

            </Container>
        </Fragment>
    );
}

export default SingleFileProgress;