import { Container } from '@mui/material';
import React from 'react'
import MealDetails from '../components/MealDetails';
import { useState } from 'react';

const Detail = () => {
    const [meal, setMeal] = useState([]);
    // const removeFromDom = (mealId) => {
    //     setMeal(meal.filter((p) => p._id !== mealId))
    // }
  return (
    <Container sx={{display: "flex", justifyContent: "center"}}>
        <MealDetails meal={meal} setMeal={setMeal} />
    </Container>
  )
}

export default Detail;