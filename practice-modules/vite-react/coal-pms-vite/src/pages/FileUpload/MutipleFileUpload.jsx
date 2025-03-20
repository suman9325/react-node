import React, { Fragment, useRef, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Row, Stack } from "react-bootstrap";
import { TOAST_TYPE, toastAlert } from '../../components/Toaster/toastify';
import { uploadFileService } from '../../api/service/fileUploadService';

const MultipleFileUpload = () => {
    const [selectedFile, setSelectedFile] = useState([]);
    const fileInputRef = useRef(null);
    // const supportedFile = ['image/jpeg', 'image/jpg', 'image/png']
    // const maxFileSize = 70000; //bytes

    const getFile = (e) => {
        console.log('@@', e.target.files);
        
        const inputFile = Array.from(e.target.files);
        if (inputFile.length > 0) {
            const validFiles = [];
            for (const el of inputFile) {
                // if (el.size > maxFileSize) {
                //     toastAlert(TOAST_TYPE.ERROR, 'File size is large!');
                //     fileInputRef.current.value = ''; // Clear file input
                //     return; // Stop further checks
                // }
                // if (!supportedFile.includes(el.type)) {
                //     toastAlert(TOAST_TYPE.ERROR, 'File type is not supported!');
                //     fileInputRef.current.value = ''; // Clear file input
                //     return; // Stop further checks
                // }
                validFiles.push(el); // Add valid file to the list
            }
            setSelectedFile(validFiles);
        }

    }

    const uploadFile = () => {
        const formData = new FormData();
        // selectedFile.map((file, i) => formData.append('documents', file))
        selectedFile.map((file, i) => formData.append('documents[' + i + ']', file))
        uploadFileService(formData).then(res => {
            const { success, message } = res
            if (success) {
                setSelectedFile([]);
                fileInputRef.current.value = '';
                toastAlert(TOAST_TYPE.SUCCESS, message);
            }
            else {
                toastAlert(TOAST_TYPE.ERROR, message);
            }
        })
            .catch(() => toastAlert(TOAST_TYPE.ERROR, 'Something Went Wrong!'))
    }

    return (
        <Fragment>
            <Container fluid='md'>
                <Card>
                    <CardHeader>
                        <h5>Multiple File Upload</h5>
                    </CardHeader>
                    <CardBody>
                        <input type='file' multiple className='form-control' onChange={getFile} ref={fileInputRef} />
                    </CardBody>
                    <CardFooter className='d-flex justify-content-center'>
                        <Button variant="primary" onClick={uploadFile} disabled={selectedFile.length === 0}>Upload</Button>
                    </CardFooter>
                </Card>
            </Container>
        </Fragment>
    )
}

export default MultipleFileUpload;