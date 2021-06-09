import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const AlertMsg = ({ alerts }) =>
    alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType} mt-2 text-center`}>
            {alert.msg}
        </div>
    ));

AlertMsg.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    alerts: state.alert,
})

export default connect(mapStateToProps)(AlertMsg);
