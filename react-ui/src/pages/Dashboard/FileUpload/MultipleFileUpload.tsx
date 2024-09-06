import { Button, Container, Input, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { singleFileUploadService } from "../../../api/services/fileUploadService";

const MultipleFileUpload = () => {

    const [selectedFiles, setSelectedFiles] = useState<any>([]);
    const [fileCount, setFileCount] = useState<number>(0);

    const handleFileChange = (e: any) => {
        setFileCount(e.target.files.length)
        setSelectedFiles([...e.target.files]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        selectedFiles.forEach((el: any, i: number) => {
            formData.append('profile_image[' + i + ']', el);
        });

        singleFileUploadService(formData).then((res: any) => {
            if (res.success) {
                setSelectedFiles(null);
            }
        })
            .catch((err: any) => {

            })
    };

    return (
        <Fragment>
            <Container component="main" maxWidth="md" sx={{ marginTop: '5%' }}>
                <div className="d-flex">
                    <Typography variant="h5" gutterBottom className="me-4">
                        Upload a File
                    </Typography>
                    <input
                        type="file"
                        multiple
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
                {fileCount > 0 && (
                    <div className="mt-5 d-flex">
                        <Typography variant="body1" gutterBottom>
                            Total File(s) selected: {fileCount}
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

export default MultipleFileUpload;