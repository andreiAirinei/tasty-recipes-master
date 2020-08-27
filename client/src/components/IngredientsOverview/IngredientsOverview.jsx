import React, { useRef } from 'react';
import { StickyContainer } from 'react-sticky';

// Redux & Selectors
import { connect } from 'react-redux';
import {
  selectIngredientsGroupedAlphabetically
} from '../../redux/ingredients/ingredients.selectors';

// Components
import IngredientsGroup from './IngredientsGroup';
import LettersMenu from './LettersMenu';

const IngredientsOverview = ({ ingredientsByGroup }) => {

  // Create an array of refs
  const lettersRefList = useRef([]);

  // Handling LettersMenu button clicks and scroll to specific IngredientGroup 
  const handleClick = (e, idx) => {
    e.preventDefault();
    // Scroll to specific ref
    lettersRefList.current[idx].scrollIntoView();
    // Adjust page after scroll
    window.scrollBy(0, -125);
  }

  return (
    <div className='ingredients-list'>
      <StickyContainer>
        <LettersMenu
          lettersRefList={lettersRefList}
          handleClick={handleClick}
        />
        {
          Object.entries(ingredientsByGroup).map(
            (ingredientGroup, idx) => (
              <IngredientsGroup
                ingredientGroup={ingredientGroup}
                key={idx}
                // Assign a ref for each child
                ref={ingredientGroup => lettersRefList.current[idx] = ingredientGroup}
              />
            )
          )
        }
      </StickyContainer>
    </div>
  )
}

const mapStateToProps = state => ({
  ingredientsByGroup: selectIngredientsGroupedAlphabetically(state)
})

export default connect(mapStateToProps)(IngredientsOverview);
