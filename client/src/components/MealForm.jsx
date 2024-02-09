import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import App from '../App';
import {
    Paper,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
    Container
} from '@mui/material';

const styles = {
    paper: {
        width: "25rem",
        padding: "1rem"
    },
    input: {
        marginBottom: "1rem",
        width: "100%"
    },
    button: {
        width: "30%",
        marginRight: "1rem",

    },
    parentContainer: {
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem"
    }
}

const MealForm = (props) => {
    const [name, setName] = useState("");
    const [minutes, setMinutes] = useState("");
    const [directions, setDirections] = useState("");
    const [gredient1, setGredient1] = useState("");
    const [gredient2, setGredient2] = useState("");
    const [gredient3, setGredient3] = useState("");
    const [errors, setErrors] = useState([]);
    const { meal, setMeal } = props;

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/meal', {
            name,
            minutes,
            directions,
            gredient1,
            gredient2,
            gredient3
        }).then(res => {
            setMeal([...meal, res.data.meal])
            console.log(res.data);
            setName("");
            setMinutes("");
            setDirections("");
            setGredient1("");
            setGredient2("");
            setGredient3("");
        })
        .catch(err => {
            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                console.log(err);
            }
        });
    }

    return (
        <Container>
                <Container className='box'>
                <Paper elevation={3} style={styles.paper}>
                    <h1>Speedy Meals</h1>
                    <Link to="/meals">back to home</Link>
                    <p>Add the next culinary masterpiece!</p>
                    <form onSubmit={onSubmitHandler}>
                        <FormControl variant="outlined" style={styles.input}>
                            <InputLabel>Dish Name:</InputLabel>
                            <OutlinedInput type="text"  onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl variant="outlined" style={styles.input}>
                            <InputLabel>Total Minutes:</InputLabel>
                            <OutlinedInput type="number"  onChange={(e) => setMinutes(e.target.value)} />
                        </FormControl>
                        <FormControl variant="outlined" style={styles.input}>
                            <InputLabel>Directions:</InputLabel>
                            <OutlinedInput type="text"  onChange={(e) => setDirections(e.target.value)} />
                        </FormControl>
                        <Container className='box2'>
                            <h2>Ingredients(s) - Optional</h2>
                            <FormControl variant="outlined" style={styles.input}>
                                <InputLabel>Ingredient One:</InputLabel>
                                <OutlinedInput type="text"  onChange={(e) => setGredient1(e.target.value)} />
                            </FormControl>
                            <FormControl variant="outlined" style={styles.input}>
                                <InputLabel>Ingredient Two:</InputLabel>
                                <OutlinedInput type="text"  onChange={(e) => setGredient2(e.target.value)} />
                            </FormControl>
                            <FormControl variant="outlined" style={styles.input}>
                                <InputLabel>Ingredient Three:</InputLabel>
                                <OutlinedInput type="text"  onChange={(e) => setGredient3(e.target.value)} />
                            </FormControl>
                        </Container>
                        {errors.length > 0 && (
                            <p style={{ color: 'red', listStyle: "none", display: "block" }}>
                                {errors.map((error, index) => (
                                    <small style={{ color: 'red', listStyle: "none", display: "block" }} key={index}>{error}</small>
                                ))}
                            </p>
                        )}
                        <Button type="submit" variant="contained" color="primary" style={styles.button}>
                            Create
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Container>
    )
}

export default MealForm;
