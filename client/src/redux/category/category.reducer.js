import {
  SET_ACTIVE_CATEGORY,
  FETCH_COUNTRIES,
  FETCH_DISH_TYPES
} from './category.types';

const INITIAL_STATE = {
  activeCategory: {
    type: 'All',
    isCountry: false
  },
  countriesList: null,
  dishTypes: null,
  popular: [
    {
      id: 0,
      name: 'Chicken',
      imgURL: 'https://i.ibb.co/h7xdkrN/chicken.jpg',
      icon: 'https://www.themealdb.com/images/category/chicken.png'
    },
    {
      id: 1,
      name: 'Beef',
      imgURL: 'https://i.ibb.co/4WNt4Tb/beef.jpg',
      icon: 'https://www.themealdb.com/images/category/beef.png'
    },
    {
      id: 2,
      name: 'Pork',
      imgURL: 'https://i.ibb.co/RSmCF8S/pork.jpg',
      icon: 'https://www.themealdb.com/images/category/pork.png'
    },
    {
      id: 3,
      name: 'Lamb',
      imgURL: 'https://i.ibb.co/rGq51ZC/lamb.jpg',
      icon: 'https://www.themealdb.com/images/category/lamb.png'
    },
    {
      id: 4,
      name: 'Seafood',
      imgURL: 'https://i.ibb.co/4JMy4CP/seafood.jpg',
      icon: 'https://www.themealdb.com/images/category/seafood.png'
    },
    {
      id: 5,
      name: 'Pasta',
      imgURL: 'https://i.ibb.co/xFBTyfW/pasta.jpg',
      icon: 'https://www.themealdb.com/images/category/pasta.png'
    },
    {
      id: 6,
      name: 'Dessert',
      imgURL: 'https://i.ibb.co/FsSq1cw/dessert.jpg',
      icon: 'https://www.themealdb.com/images/category/dessert.png'
    },
    {
      id: 7,
      name: 'Vegetarian',
      imgURL: 'https://i.ibb.co/4sx5Fph/vegetarian.jpg',
      icon: 'https://www.themealdb.com/images/category/vegetarian.png'
    }
  ]
}

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload
      }

    case FETCH_COUNTRIES:
      return {
        ...state,
        countriesList: action.payload
      }

    case FETCH_DISH_TYPES:
      return {
        ...state,
        dishTypes: action.payload
      }

    default:
      return {
        ...state
      }
  }
}

export default categoryReducer;