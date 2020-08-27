import React from 'react';

// Components
import MiniRecipesListItem from './MiniRecipesListItem';

const MiniRecipesList = ({ recipes, title, otherClasses = '' }) => {

  return (
    <div className={`sidebar-latest ${otherClasses}`}>
      <h5 className='text-center text-sm-left'><em>{title}</em></h5>
      <ul className='latest-list list-unstyled'>
        {
          recipes && recipes.data && recipes.data.map(recipe => (
            <li key={recipe.idMeal}>
              <MiniRecipesListItem
                recipeID={recipe.idMeal}
                name={recipe.strMeal}
                category={recipe.strCategory}
                imageURL={recipe.strMealThumb} />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default MiniRecipesList;
