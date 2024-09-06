import { Container } from '@mui/material';
import * as React from 'react';
import { createUserService } from '../../api/services/usersService';

const Test = () => {
    const [imagePreview, setImagePreview] = React.useState<any>('');
    // Function to handle the file selection
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            // Create a FileReader instance
            const reader = new FileReader();
            reader.onloadend = () => {
                // When FileReader finishes reading, set the preview image
                setImagePreview(reader.result);
            };
            // Read the file as a data URL
            reader.readAsDataURL(file);
        }
    };

    // React.useEffect(() => {
    //     let i = 0;
        
    //     const req = {
    //         fname: 'test' + i++,
    //         lname: 'user' + i++,
    //         address: 'test address' + i++
    //     }
    //     createUserService(req).then((res: any) => {

    //     })
    // }, [])

    return (
        <React.Fragment>
            <Container component="main" maxWidth="md">
                <div>

                    <input type="file" accept="image/*" onChange={handleFileChange} />


                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    )}
                </div>
            </Container>
        </React.Fragment>
    );
}
export default Test;