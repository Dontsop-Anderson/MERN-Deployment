import { Container, Paper, Button } from '@mui/material';
import React, { useEffect } from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
const styles = {
    paper: {
        width: "25rem", padding: "1rem"
    },
    input: {
        marginBottom: "1rem", width: "100%"
    },
    button: {
        width: "30%", marginRight: "0.5rem"
    }
}

const MealDisplay = (props) => {
    const {meal, setMeal} = props;
    useEffect(() => {
        axios.get('http://localhost:8000/api/meal')
        .then((res) => {
            setMeal(res.data.allmeals)
        })
        .catch((err) => console.log(err));        
    }, [])

    // const deleteMeal = (mealId) => {
    //     axios.delete('http://localhost:8000/api/meal/' + mealId)
    //     .then((res) => {
    //         removeFromDom(mealId)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }

  return (
    <Container>
        <Paper elevation={3} style={styles.paper}>
        <h1>Favorite authors</h1>
        <Link to="/meals/new">Add a Meal</Link>
        <p>Find inspiration with these delicious meals!</p>
        <table>
                <thead>
                <tr>
                    <th>Meal</th>
                    <th>Prep Time</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {
                        meal.map((meal, index) => {
                            return(
                                <tr key={index}>
                                    <td>{meal.name}</td>
                                    <td>{meal.minutes}</td>
                                    <td>
                                    <Link to={`/meal/${meal._id}`}>details</Link> | <Link to={`/meal/edit/${meal._id}`}>Edit</Link>  
                                    </td>
                                    {/* <td><Button type="submit" variant="contained"  color="primary" style={styles.button} >
                        Delete
        </Button></td> */}
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
        </Paper>
    </Container>
  )
}

export default MealDisplay;