import React, { Fragment, useRef, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Row, Stack } from "react-bootstrap";
import { TOAST_TYPE, toastAlert } from '../../components/Toaster/toastify';
import { uploadSingleFileService } from '../../api/service/fileUploadService';

const SingleFileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const supportedFile = ['image/jpeg', 'image/jpg', 'image/png']
    const maxFileSize = 50000; //bytes

    const getFile = (e) => {
        const inputFile = e.target.files[0];
        if (inputFile.size > maxFileSize) {
            toastAlert(TOAST_TYPE.ERROR, 'File size is large!');
            fileInputRef.current.value = ''; // Clear file input
            setSelectedFile(null);
            return;
        }
        else if (!supportedFile.includes(inputFile.type)) {
            toastAlert(TOAST_TYPE.ERROR, 'File type is not supported!');
            fileInputRef.current.value = ''; // Clear file input
            setSelectedFile(null);
            return;
        }
        else setSelectedFile(inputFile);

    }

    const uploadFile = () => {
        console.log("File uploaded", selectedFile);
        const formData = new FormData();
        formData.append('myFile', selectedFile);
        uploadSingleFileService(formData).then(res => {

        })
    }

    return (
        <Fragment>
            <Container fluid='md'>
                <Card>
                    <CardHeader>
                        <h5>Single File Upload</h5>
                    </CardHeader>
                    <CardBody>
                        <input type='file' onChange={getFile} ref={fileInputRef} />
                    </CardBody>
                    <CardFooter className='d-flex justify-content-end'>
                        <Button variant="primary" onClick={uploadFile} disabled={selectedFile === null}>Upload</Button>
                    </CardFooter>
                </Card>
            </Container>
        </Fragment>
    )
}

export default SingleFileUpload;