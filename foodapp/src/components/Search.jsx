import { useEffect, useState } from "react";
import styles from './search.module.css';

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "39eefc7483124a26841dc4887a6e1bd1";

export default function Search({foodData, setFoodData}){
    const [query, setQuery] = useState("Pizza");
    useEffect( () => {
        async function fetchFood(){
            const response= await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
            const data = await response.json();
            setFoodData(data.results);
        }
        fetchFood();
    }, [query]);
    return(
        <form className={styles.searchContainer}>
        <input className={styles.input} value={query} onChange={(e) => setQuery(e.target.value)} type="text"/>
        </form>
    )
}