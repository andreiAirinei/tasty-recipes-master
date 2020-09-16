import React from 'react';

// Redux
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {

  return (
    <div className="alerts-container text-center">
      {
        alerts.map(alert => (
          <div key={alert.id} className={`msg ${alert.type}`}>
            <p className='m-0 py-2 l-spacing-1'>{alert.msg}</p>
          </div>
        ))
      }
    </div>
  )
}

const mapStateToProps = state => ({
  alerts: state.alert.alerts
});

export default connect(mapStateToProps)(Alert);
