import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

class PrivateRoute extends React.Component {
    render() {
        return (
            this.props.isLogin ? <Route {...this.props} /> : <Redirect from="*" to="/app/auth/login" />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.auth === undefined ? false : state.auth.isLogin,
    }
};

export default connect(mapStateToProps)(PrivateRoute);