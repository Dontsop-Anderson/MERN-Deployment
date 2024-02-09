import { Container } from '@mui/material';
import React from 'react'
import MealDisplay from '../components/MealDisplay';
import { useState } from 'react';

const Main = () => {
  const [meal, setMeal] = useState([]);
  const removeFromDom = (mealId) => {
      setMeal(meal.filter((p) => p._id !== mealId))
  }

  return (
    <Container sx={{display: "flex", justifyContent: "center"}}>
        <MealDisplay meal={meal} setMeal={setMeal} removeFromDom={removeFromDom}/>
    </Container>
  )
}

export default Main;