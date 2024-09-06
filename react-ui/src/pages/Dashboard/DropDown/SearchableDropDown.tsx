import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getAllFilmService } from '../../../api/services/dropDownService';

const SearchableDropDown = () => {

    const top100Films = [
        { name: 'The Shawshank Redemption', year: 1994 },
        { name: 'The Godfather', year: 1972 },
        { name: 'The Godfather: Part II', year: 1974 },
        { name: 'The Dark Knight', year: 2008 },
        { name: '12 Angry Men', year: 1957 },
        { name: "Schindler's List", year: 1993 },
        { name: 'Pulp Fiction', year: 1994 }
    ];

    const [filmList, setFilmList] = React.useState<{ label: string, year: number }[]>([]);

    React.useEffect(() => {
        getAllFilmService().then((res: any) => {
            res.success ? setFilmList(res.filmList) : setFilmList([]);
        })
            .catch((err: Error) => {
                setFilmList([])

                // --------------
                // top100Films == res.filmList
                const updatedTop100Films = top100Films.map(film => ({
                    label: film.name,
                    year: film.year
                }));
                setFilmList(updatedTop100Films)

            })
    }, [])

    const apiCall = (year: number) => {

    }

    return (
        <React.Fragment>
            <Autocomplete
                id="combo-box-demo"
                // options={top100Films}
                options={filmList}
                sx={{ width: 300 }}
                onChange={(event, value: any) => apiCall(value.year)}
                renderInput={(params) => <TextField {...params} label="Movie" />}
            />
        </React.Fragment>
    );
}

export default SearchableDropDown;