import { Button, Container, Input, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { singleFileUploadService } from "../../../api/services/fileUploadService";
import CancelIcon from '@mui/icons-material/Cancel';

const MultipleFileUploadShow = () => {

    const [selectedFiles, setSelectedFiles] = useState<any>([]);
    const [preview, setPreview] = useState<any>([]);

    const handleFileChange = (e: any) => {
        setSelectedFiles([...e.target.files]);

        // Generate preview URL
        const previewFiles = [...e.target.files];
        if (previewFiles.length !== 0) {

            previewFiles?.forEach((file: any) => {
                const previewURL = URL.createObjectURL(file);
                preview.push(previewURL)
            })
        }

    };

    const handleUpload = () => {
        const formData = new FormData();
        selectedFiles.forEach((el: any, i: number) => {
            formData.append('profile_image[' + i + ']', el);
        });
        console.log('selectedFiles', selectedFiles);

        singleFileUploadService(formData).then((res: any) => {
            if (res.success) {
                setSelectedFiles(null);
                setPreview([]);
            }
        })
            .catch((err: any) => {

            })
    };

    const removeImg = (i: number) => {
        const newPreview = preview.filter((el: any) => el !== preview[i]);
        setPreview(newPreview);
        selectedFiles.splice(i, 1); //pos, no. of items
    }

    return (
        <Fragment>
            <div className="p-5">
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
                <div className="d-flex flex-wrap mt-4">
                    {preview && preview.map((img: any, i: number) => <>
                        <div className="p-2">
                            <button className="cancel-btn" onClick={() => removeImg(i)}><CancelIcon /></button>
                            <img src={img} className="me-3" alt="File Preview" style={{ width: '400px', height: '350px' }} />
                        </div>
                    </>)}
                </div>
                {preview.length > 0 && (
                    <div className="mt-5 d-flex">
                        <Button variant="contained" className="" color="primary" onClick={handleUpload}>
                            Upload
                        </Button>
                    </div>
                )}
            </div>
        </Fragment>
    );
}

export default MultipleFileUploadShow;


// .cancel-btn {
//     height: 1%;
//     border-radius: 20px;
//     background: inherit;
//     color: red;
//     position: absolute;
//   }