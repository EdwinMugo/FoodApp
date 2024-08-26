import React, { useEffect, useState } from "react";
import styles from './fooddetails.module.css';
import ItemList from "./ItemList";

export default function FoodDetails ({foodId}){
    const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
    const API_KEY = '39eefc7483124a26841dc4887a6e1bd1';
    const [recipe, setRecipe]= useState({});
    const[isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        async function fetchFood(){
            try{
            const response = await fetch(`${URL}?apiKey=${API_KEY}`);
            const data = await response.json();
            console.log(data);
            setRecipe(data);
            setIsLoading(false);
            } catch{
                Console.error("Error fetching the food Details:", error);
            }
        } fetchFood();
        }, [foodId])
    return (
        <div className={styles.recipeCard}>
        <div> 
        <h1 className={styles.recipeName}> {recipe.title}</h1>
        
        <img className={styles.recipeImage} src={recipe.image} alt="recipe image"/>
        <div className={styles.recipeDetails}> 
        <span> 
            <strong> ⌚{recipe.readyInMinutes} Minutes</strong>
        </span>
        <span> 👨‍👩‍👧‍👦 Serves: {recipe.servings}</span>
        <span> {recipe.vegetarian ? "🥕 Vegetarian": "🥩 Non-vegetarian"}</span>
        <span>{recipe.vegan ? "  🥒 Vegan": " 🐮 Non-Vegan"}</span>
        </div>
        <div> <span> ${Math.round(recipe.pricePerServing / recipe.servings)} Per Serving </span> </div>
       <h1>Ingredients: </h1>
        <ItemList recipe={recipe} isLoading={isLoading}/>
       <div> 
        <h2> Instructions:  </h2>
        </div>
        <div className={styles.recipeInstructions}>
            <ol> 
            {isLoading ? <p> Loading...</p> : recipe.analyzedInstructions[0].steps.map((step)=> (<li key={step.number}> {step.step}</li>))}
            </ol>
        </div>
        </div>
        </div>
    )
}