import React, { useState, useEffect } from 'react';
import { ReactComponent as SilverChefHat } from '../../assets/difficulty-silver.svg';
import { ReactComponent as OrangeChefHat } from '../../assets/difficulty-orange.svg';
import { ReactComponent as Clock } from '../../assets/clock.svg';

const TimeAndDifficulty = () => {
  const [state, setState] = useState({
    difficulty: null,
    time: null
  })

  useEffect(() => {
    setState({
      difficulty: getRandomDifficulty(),
      time: getRandomTime()
    });
  }, []);

  const getRandomDifficulty = () => Math.floor((Math.random() * 3) + 1);

  const getRandomTime = () => Math.ceil(Math.floor((Math.random() * 90) + 10) / 5) * 5;

  return (
    <div className='card-item-footer d-flex align-items-center'>
      <div className="recipe-difficulty">
        {
          state.difficulty === 3 &&
          <>
            <OrangeChefHat className='recipe-difficulty-image' />
            <OrangeChefHat className='recipe-difficulty-image' />
            <OrangeChefHat className='recipe-difficulty-image' />
          </>
        }

        {
          state.difficulty === 2 &&
          <>
            <OrangeChefHat className='recipe-difficulty-image' />
            <OrangeChefHat className='recipe-difficulty-image' />
            <SilverChefHat className='recipe-difficulty-image' />
          </>
        }

        {
          state.difficulty === 1 &&
          <>
            <OrangeChefHat className='recipe-difficulty-image' />
            <SilverChefHat className='recipe-difficulty-image' />
            <SilverChefHat className='recipe-difficulty-image' />
          </>
        }
      </div>
      <div className="recipe-cooking-time ml-3">
        <Clock className='recipe-difficulty-image' />
      </div>
      <p className="color-1 mb-0 pt-1 text-size-08">
        {state.time} min
      </p>
    </div>
  )
}

export default TimeAndDifficulty;
