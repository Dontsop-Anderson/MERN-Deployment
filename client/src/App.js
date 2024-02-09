import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Container } from '@mui/material';
import Main from './views/Main';
import Form from './views/Form'
// import MealDetails from './components/MealDetails';
import MealEdit from './components/MealEdit';
import Detail from './views/Detail';
import { useState } from 'react';



function App() {
  const [meal, setMeal] = useState([]);
  const removeFromDom = (mealId) => {
      setMeal(meal.filter((p) => p._id !== mealId))
  }
  return (
    
    <Container>
      <h1>Welcome to my Speedy Meal App</h1>
      <BrowserRouter>
        <Routes>
        <Route element={<Main />} path="/meals" default /> 
        <Route element={<Form />} path="/meals/new" />
        <Route element={<Detail meal={meal} setMeal={setMeal} removeFromDom={removeFromDom}/>} path="/meal/:id" />
        <Route element={<MealEdit/>} path="/meal/edit/:id" />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
