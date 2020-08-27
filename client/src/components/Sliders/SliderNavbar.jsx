import React from 'react';

// Bootstrap Components
import Nav from 'react-bootstrap/Nav';

const SliderNavbar = ({ activeKey, handleSelect }) => {
  return (
    <Nav variant="tabs"
      defaultActiveKey={activeKey}
      className='slider-navbar my-4 justify-content-center'
      onSelect={handleSelect}>
      <Nav.Item className='latest'>
        <Nav.Link eventKey='showLatest' className=' l-spacing-2 text-tasty'>
          Latest
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className='random'>
        <Nav.Link eventKey='showRandom' className=' l-spacing-2' >
          <div className="d-flex align-items-center">
            <span className='mr-1 text-tasty'>Random</span>
            <img src={require('../../assets/dice.svg')} alt="Dice" />
          </div>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default SliderNavbar;
