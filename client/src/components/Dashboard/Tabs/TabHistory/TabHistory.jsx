import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { populateHistoryFromLS } from '../../../../redux/history/history.actions';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Components
import SectionTitle from '../../../layout/SectionTitle';
import TabListItem from '../TabListItem';

const TabHistory = ({ seenRecipes, populateHistoryFromLS }) => {

  useEffect(() => {
    populateHistoryFromLS();
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <SectionTitle title='Recently Seen' />
      {
        seenRecipes.length < 1 && <h6><em>You haven't seen any recipes this session yet. <Link to='/recipes' className='text-danger'><u>Browse recipes!</u></Link></em></h6>
      }
      <Row>
        {
          seenRecipes && seenRecipes.map(recipe => (
            <Col xs={6} sm={4} lg={3} key={recipe.id}>
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
