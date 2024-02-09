import { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, Link, useNavigate} from "react-router-dom";
import {
    Paper,
    Button,
    Container // Add this line
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
        marginRight: "1rem"
    }
}

const MealDetail = (props) => {
    const {meal, setMeal, removeFromDom} = props;
    const navigate = useNavigate();
    const {id} = useParams(); 
    useEffect(() => {
        axios.get("http://localhost:8000/api/meal/" + id)
            .then( res => {
                console.log(res.data);
                setMeal(res.data.meal);
            })
            .catch( err => console.log(err) );
    }, []);

    const deleteMeal = (mealId) => {
        axios.delete('http://localhost:8000/api/meal/' + mealId)
        .then((res) => {
            removeFromDom(mealId);
            navigate('/meals'); // Add this line
        })
        .catch((err) => console.log(err))
    }
    return (
        <Container>
        <Paper elevation={3} style={styles.paper}>
            <h1>Speed Meals</h1>
            <Link to="/meals">back to home</Link>
        <Link to="/meals">
            <Button type="submit" variant="contained" color="primary" style={{color: 'red'}} onClick={() => deleteMeal(meal._id)}>
            delete
            </Button>
        </Link>
        <h2>{meal.name} recipe</h2>
            <p>Cook Time {meal.minutes} minutes</p>
            <h3>Ingredients </h3>
            <p>{meal.gredient1}</p>
            <p>{meal.gredient2}</p>
            <p>{meal.gredient3}</p>
            <p>Directions: {meal.direction}</p>
        </Paper>
    </Container>
    );
}
export default MealDetail;