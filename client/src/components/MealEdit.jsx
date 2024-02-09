import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    Paper,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
    Container // Add this line
} from '@mui/material';

const styles = {
    paper: {
        width: "25rem", padding: "1rem"
    },
    input: {
        marginBottom: "1rem", width: "100%"
    },
    button: {
        width: "30%", marginRight: "1rem"
    }
}

const MealEdit = () => {
    const [name, setName] = useState("");
    const [minutes, setMinutes] = useState("");
    const [directions, setDirections] = useState("");
    const [gredient1, setGredient1] = useState("");
    const [gredient2, setGredient2] = useState("");
    const [gredient3, setGredient3] = useState("");
    const [errors, setErrors] = useState([]);
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/meal/' + id)
        .then((res) => {
            setName(res.data.meal.name)
            setMinutes(res.data.meal.minutes)
            setDirections(res.data.meal.directions)
            setGredient1(res.data.meal.gredient1)
            setGredient2(res.data.meal.gredient2)
            setGredient3(res.data.meal.gredient3)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [id])

    const updateMeal = (e) => {
        e.preventDefault()

        if (!name) {
            setErrors(["Name is required"]);
            return;
        }
        if (name.length < 3) {
            setErrors(["Name must be at least 3 characters"]);
            return;
        }
        if (name.length > 20) {
            setErrors(["Name cannot exceed 20 characters"]);
            return;
        }
        if (!minutes) {
            setErrors(["minutes is required"]);
            return;
        }
        if (minutes.length < 2) {
            setErrors(["minutes must be at least 2min"]);
            return;
        }
        if (minutes.length > 240) {
            setErrors(["minutes cannot exceed 240min"]);
            return;
        }
        if (!directions) {
            setErrors(["direction is required"]);
            return;
        }
        if (directions.length < 10) {
            setErrors(["direction must be at least 10 characters"]);
            return;
        }


        axios.patch('http://localhost:8000/api/meal/edit/' + id, {
            name,
            minutes,
            directions,
            gredient1,
            gredient2,
            gredient3
        })
        .then((res) => {
            navigate('/meals')
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
    <Container sx={{display: "flex", justifyContent: "center"}}>
        <Paper elevation={3} style={styles.paper}>
            <h1>Speedy Meals</h1>
            <Link to={`/meal/${id}`}>MealDetails</Link>
            <h3>Update your {name} recipe</h3>
            <form onSubmit={updateMeal}>
                    <FormControl variant="outlined" style={styles.input}>
                        <InputLabel>Dish Name:</InputLabel>
                        <OutlinedInput type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl variant="outlined" style={styles.input}>
                        <InputLabel>Total Minutes:</InputLabel>
                        <OutlinedInput type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
                    </FormControl>
                    <FormControl variant="outlined" style={styles.input}>
                        <InputLabel>Directions:</InputLabel>
                        <OutlinedInput type="text" value={directions} onChange={(e) => setDirections(e.target.value)} />
                    </FormControl>
                    <Container>
                        <h2>Ingredients(s) - Optional</h2>
                        <FormControl variant="outlined" style={styles.input}>
                            <InputLabel>Ingredient One:</InputLabel>
                            <OutlinedInput type="text" value={gredient1} onChange={(e) => setGredient1(e.target.value)} />
                        </FormControl>
                        <FormControl variant="outlined" style={styles.input}>
                            <InputLabel>Ingredient Two:</InputLabel>
                            <OutlinedInput type="text" value={gredient2} onChange={(e) => setGredient2(e.target.value)} />
                        </FormControl>
                        <FormControl variant="outlined" style={styles.input}>
                            <InputLabel>Ingredient Three:</InputLabel>
                            <OutlinedInput type="text" value={gredient3} onChange={(e) => setGredient3(e.target.value)} />
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
                        Update
                    </Button>
                </form>
        </Paper>
    </Container>
  )
}

export default MealEdit;