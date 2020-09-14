import React from 'react';
import { Sticky } from 'react-sticky';

const LettersMenu = ({ lettersRefList, handleClick }) => {
  return (
    <Sticky topOffset={-50}>
      {
        ({ style, isSticky }) => (
          <div className='ingredients-letters-menu text-center py-4 bg-white' style={{ ...style, marginTop: isSticky ? '50px' : '0px', zIndex: 999 }}>
            {
              lettersRefList.current.length > 1 && lettersRefList.current.map((ref, idx) => (
                <span key={idx}>
                  <button className='btn btn-link p-1 text-danger text-size-1' onClick={(e) => handleClick(e, idx)} key={idx}>
                    {ref.innerText}
                  </button>
                </span>
              ))
            }
          </div>
        )
      }
    </Sticky>
  )
}

export default LettersMenu;
