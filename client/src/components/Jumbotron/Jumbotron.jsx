import React from 'react';

// Components
import Searchbar from '../Searchbar/Searchbar';

// Bootstrap Components
import Container from 'react-bootstrap/Container';

const Jumbotron = ({
  children,
  imgURL,
  title,
  withSearchbar = false,
  isLightBackground = false
}) => {

  const divStyle = { backgroundImage: 'url(' + require(`../../assets/${imgURL}`) + ')' };

  const heroContentStyle = isLightBackground ? { backgroundColor: 'rgba(0, 0, 0, 0.7)' } : {};

  return (
    <Container fluid='xl' className='px-0'>
      <div className="curved-line d-none d-lg-block" />
      <div className="hero d-flex justify-content-center align-items-center"
        style={divStyle}>
        <div className="hero-content px-5 py-3"
          style={heroContentStyle}
        >
          <h1 className='hero-text text-white text-center'>{title}</h1>
          {children}
          {withSearchbar && <Searchbar />}
        </div>
      </div>
    </Container >

  )
}

export default Jumbotron;
