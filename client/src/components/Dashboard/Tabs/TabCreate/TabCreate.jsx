import React, { useState } from 'react';

// Redux
import { connect } from 'react-redux';
import { createRecipe } from '../../../../redux/private/recipes/privateRecipes.actions';

const TabCreate = ({ createRecipe }) => {

  const [recipe, setRecipe] = useState({
    name: null,
    category: null
  });

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    createRecipe(recipe);
  };

  return (
    <div className='tab-create'>
      <h1>Create new recipe</h1>
      <hr />
      <form onSubmit={handleSubmit} >
        <input onChange={handleChange} type="text" name="name" required />
        <input onChange={handleChange} type="text" name='category' required />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  createRecipe: recipe => dispatch(createRecipe(recipe))
});

export default connect(null, mapDispatchToProps)(TabCreate);
