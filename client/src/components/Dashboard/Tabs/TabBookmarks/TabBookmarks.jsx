import React, { useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import {
  fetchBookmarks,
  removeBookmark
} from '../../../../redux/private/bookmarks/bookmarks.actions';

// Components
import TabListItem from '../TabListItem';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TabBookmarks = ({ fetchBookmarks, bookmarks, removeBookmark }) => {

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleRemove = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    removeBookmark(id);
  }

  return (
    <div className='tab-bookmarks'>
      <h1>Bookmarks</h1>
      <hr />
      <Row>
        {
          bookmarks && bookmarks.map(bm => (
            <Col xs={6} sm={4} key={bm._id}>
              <TabListItem
                recipe={bm}
                handleRemove={handleRemove} />
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

const mapStateToProps = state => ({
  bookmarks: state.bookmarks.bookmarks
})

const mapDispatchToProps = dispatch => ({
  fetchBookmarks: () => dispatch(fetchBookmarks()),
  removeBookmark: id => dispatch(removeBookmark(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabBookmarks);
