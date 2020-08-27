import React, { useState, useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { getLatestRecipes } from '../../redux/recipes/recipes.actions';

// Selectors
import { selectLatestRecipes } from '../../redux/recipes/recipes.selectors';

// Components
import SliderNavbar from './SliderNavbar';
import SliderContainer from './SliderContainer/SliderContainer';
import VideoSliderContainer from './VideoSliderContainer/VideoSliderContainer';
import SectionTitle from '../layout/SectionTitle';

// Bootstrap Components
import Container from 'react-bootstrap/Container';

const RecipesSlider = ({ latestRecipes, getLatestRecipes, title, isVideo = false }) => {
  const [showRandomRecipes, setShowRandomRecipes] = useState(false);
  const [state, setState] = useState({
    data: null,
    isLoading: false
  });

  useEffect(() => {

  });

  const handleSelect = (eventKey) => {
    if (eventKey === 'showLatest') {
      getLatestRecipes();
      setShowRandomRecipes(false);
    } else if (eventKey === 'showRandom') {
      setShowRandomRecipes(true);
      fetchRandomRecipes();
    }
  }

  const fetchRandomRecipes = async () => {
    setState({ ...state, isLoading: true });
    try {
      const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/randomselection.php`);
      const jsonData = await res.json();

      setState({
        ...state,
        data: jsonData.meals,
        isLoading: false
      })
    } catch (err) {
      console.log(err.response.statusText);
    }
  }

  return (
    <Container className='recipes-slider px-0 mb-5' fluid='xl'>
      {title && <SectionTitle title={title} />}
      <SliderNavbar
        handleSelect={handleSelect}
        activeKey={
          showRandomRecipes ? 'showRandom' : 'showLatest'
        } />
      {
        isVideo ? <VideoSliderContainer toShow={showRandomRecipes ? state : latestRecipes} /> :
          <SliderContainer toShow={showRandomRecipes ? state : latestRecipes} />
      }
    </Container>
  )
}

const mapStateToProps = (state) => ({
  latestRecipes: selectLatestRecipes(state)
});

const mapDispatchToProps = dispatch => ({
  getLatestRecipes: () => dispatch(getLatestRecipes())
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipesSlider);
