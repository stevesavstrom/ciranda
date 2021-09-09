// React Imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import AddRecycler from '../SearchPage/AddRecycler.jsx';

// MUI Imports
    // button import
import Button from '@material-ui/core/Button';

    // checkbox imports
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
    // state select imports
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import SearchList from '../SearchList/SearchList';
import RecyclingFeedbackDialog from './RecyclingFeedbackDialog.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-block',
        margin: '10px',
    },
    addRecycler: {
        display:'inline-block',
    },
    button: {
        display: 'inline-block',
        margin: '10px',
        marginBottom: '0px',
        marginTop:'20px;,'
    },
    autocomplete: {
        display: 'inline-block',
        margin: '10px',
        marginLeft: '20px',

    },
    formControl: {
        // margin: theme.spacing(3),
        display: 'inline-block',
        margin: '10px',
        marginTop:'16px',
    },
    formGroup: {
        display:'flex',
        flexDirection:'row',
    },
  }));

// SearchPage component includes the search criteria, search button, and imports the separate SearchItem component, 
// which are iterated over when search results are returned.

function SearchPage () {
    const classes = useStyles();
    const dispatch = useDispatch();

    // Local States
    const [materials, setMaterials] = React.useState({
        metalDrums: false,
        plasticDrums: false,
        plasticFilm: false,
        ibcs: false,
        cardboard: false,
    });
    // Determines if RecyclingFeedbackDialog is opened or closed.
    const [recycleFeedbackDialogOpen, setRecycleFeedbackDialogOpen] = React.useState(false);

    // U.S. States for State Select Dropdown
    const states = [
        { label: 'Alabama', value: 'AL' },
        { label: 'Alaska', value: 'AK' },
        { label: 'American Samoa', value: 'AS' },
        { label: 'Arizona', value: 'AZ' },
        { label: 'Arkansas', value: 'AR' },
        { label: 'California', value: 'CA' },
        { label: 'Colorado', value: 'CO' },
        { label: 'Connecticut', value: 'CT' },
        { label: 'Delaware', value: 'DE' },
        { label: 'District of Columbia', value: 'DC' },
        { label: 'Florida', value: 'FL' },
        { label: 'Georgia', value: 'GA' },
        { label: 'Guam', value: 'GU' },
        { label: 'Hawaii', value: 'HI' },
        { label: 'Idaho', value: 'ID' },
        { label: 'Illinois', value: 'IL' },
        { label: 'Indiana', value: 'IN' },
        { label: 'Iowa', value: 'IA' },
        { label: 'Kansas', value: 'KS' },
        { label: 'Kentucky', value: 'KY' },
        { label: 'Louisiana', value: 'LA' },
        { label: 'Maine', value: 'ME' },
        { label: 'Maryland', value: 'MD' },
        { label: 'Massachusetts', value: 'MA' },
        { label: 'Michigan', value: 'MI' },
        { label: 'Minnesota', value: 'MN' },
        { label: 'Mississippi', value: 'MS' },
        { label: 'Missouri', value: 'MO' },
        { label: 'Montana', value: 'MT' },
        { label: 'Nebraska', value: 'NE' },
        { label: 'Nevada', value: 'NV' },
        { label: 'New Hampshire', value: 'NH' },
        { label: 'New Jersey', value: 'NJ' },
        { label: 'New Mexico', value: 'NM' },
        { label: 'New York', value: 'NY' },
        { label: 'North Carolina', value: 'NC' },
        { label: 'North Dakota', value: 'ND' },
        { label: 'Ohio', value: 'OH' },
        { label: 'Oklahoma', value: 'OK' },
        { label: 'Oregon', value: 'OR' },
        { label: 'Pennsylvania', value: 'PA' },
        { label: 'Puerto Rico', value: 'PR' },
        { label: 'Rhode Island', value: 'RI' },
        { label: 'South Carolina', value: 'SC' },
        { label: 'South Dakota', value: 'SD' },
        { label: 'Tennessee', value: 'TN' },
        { label: 'Texas', value: 'TX' },
        { label: 'Utah', value: 'UT' },
        { label: 'Vermont', value: 'VT' },
        { label: 'Virgin Islands', value: 'VI' },
        { label: 'Virginia', value: 'VA' },
        { label: 'Washington', value: 'WA' },
        { label: 'West Virginia', value: 'WV' },
        { label: 'Wisconsin', value: 'WI' },
        { label: 'Wyoming', value: 'WY' },
      ];
    const [selectedState, setSelectedState] = useState('none');

    // handleChange on checkbox click
    const handleChange = (event) => {
        setMaterials({ ...materials, [event.target.name]: event.target.checked });
      };

    // Handle search for state and material results from the DB 
    const handleSearch = () => {
        dispatch({ type: 'FETCH_COMPANIES', payload: materials, selectedState});
    }

    const handleRecyclingDialog = () => {
        setRecycleFeedbackDialogOpen(true);
    }

    const closeRecyclingDialog = () => {
        setRecycleFeedbackDialogOpen(false);
    }

    return (
        <section>
            {/* Button opens RecyclingFeedbackDialog, where the user can enter in comments on what they're recycling */}
            <Button variant="contained" color="secondary" onClick={handleRecyclingDialog}>Recycling Feedback</Button>
                <RecyclingFeedbackDialog
                    closeRecyclingDialog={closeRecyclingDialog}
                    recycleFeedbackDialogOpen={recycleFeedbackDialogOpen}
                />
            <Autocomplete
                id="states-combo-box"
                options={states}
                className={classes.autocomplete}
                disableClearable='true'
                getOptionLabel={(option) => option.label}
                getOptionSelected={(option) => option.value}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select your State" variant="outlined" />}
                onChange={(event, newValue) => {
                    setSelectedState(newValue.value);
                  }}
            />
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Materials to Recycle</FormLabel>
                <FormGroup className={classes.formGroup}>
                    <FormControlLabel
                        control={<Checkbox checked={materials.metalDrums} onChange={handleChange} name="metalDrums" />}
                        label="Metal Drums"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={materials.plasticDrums} onChange={handleChange} name="plasticDrums" />}
                        label="Plastic Drums HDPE"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={materials.plasticFilm} onChange={handleChange} name="plasticFilm" />}
                        label="Plastic Film"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={materials.ibcs} onChange={handleChange} name="ibcs" />}
                        label="IBCs"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={materials.cardboard} onChange={handleChange} name="cardboard" />}
                        label="Cardboard"
                    />
                </FormGroup>
            </FormControl>
            <Button variant="contained" color="primary" size='large' className={classes.button} onClick={handleSearch}>
                Search
            </Button>
            <AddRecycler states={states} />

            <SearchList materials={materials} selectedState={selectedState} />
        </section>
    )
}

export default SearchPage;