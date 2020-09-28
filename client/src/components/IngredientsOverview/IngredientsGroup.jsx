import React from 'react';

// Components
import IngredientsGroupItem from './IngredientsGroupItem';

// Bootstrap
import Row from 'react-bootstrap/Row';

const IngredientsGroup = React.forwardRef(({ ingredientGroup }, ref) => {
  return (
    <div className="list-by-letter mb-5 px-2">
      <h4 ref={ref} className='text-center mb-3'>{ingredientGroup[0]}</h4>
      <hr />
      {
        ingredientGroup[1].length < 1 && <em>No ingredients</em>
      }
      <Row>
        {
          ingredientGroup[1] && ingredientGroup[1].map((ingredient, idx) =>
            <IngredientsGroupItem key={idx} ingredient={ingredient} />
          )
        }
      </Row>
    </div>
  )
})

export default IngredientsGroup;
