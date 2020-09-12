import React, { useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { populateHistoryFromLS } from '../../../../redux/history/history.actions';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Components
import TabListItem from '../TabListItem';

const TabHistory = ({ seenRecipes, populateHistoryFromLS }) => {

  useEffect(() => {
    populateHistoryFromLS();
  }, [])

  console.log(seenRecipes);

  return (
    <div>
      <h1>Recently seen</h1>
      <hr />
      <Row>
        {
          seenRecipes && seenRecipes.map(recipe => (
            <Col xs={6} sm={4} key={recipe.id}>
              <TabListItem
                canBeRemoved={false}
                recipe={{
                  recipeID: recipe.id,
                  recipeName: recipe.name,
                  recipeImageUrl: recipe.image
                }} />
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

const mapStateToProps = state => ({
  seenRecipes: state.history.seenRecipes
})

const mapDispatchToProps = dispatch => ({
  populateHistoryFromLS: () => dispatch(populateHistoryFromLS())
})

export default connect(mapStateToProps, mapDispatchToProps)(TabHistory);
