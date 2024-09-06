import { Button, Container, Input, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { singleFileUploadService } from "../../../api/services/fileUploadService";

const SingleFileUpload = () => {

    const [selectedFile, setSelectedFile] = useState<any>(null);

    const handleFileChange = (e: any) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        // Here you can implement your upload logic
        console.log('Uploading file:', selectedFile);
        // Reset the selected file after upload
        
        const formData = new FormData();
        formData.append('profile_image', selectedFile);
        singleFileUploadService(formData).then((res: any)=>{
            if (res.success) {
                setSelectedFile(null);
            }
        })
        .catch((err: any)=>{

        })
    };

    return (
        <Fragment>
            <Container component="main" maxWidth="md" sx={{marginTop: '5%'}}>
                <div className="d-flex">
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
            </Container>
        </Fragment>
    );
}

export default SingleFileUpload;