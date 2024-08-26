import Item from "./Item";

export default function ItemList({ recipe, isLoading }) {
  return (
    <>
      {isLoading ? (
        <p> Loading...</p>
      ) : (
        recipe.extendedIngredients.map((item) => (
          <Item item={item}/>
        ))
      )}
    </>
  );
}
