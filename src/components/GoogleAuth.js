import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

export class GoogleAuth extends Component {
  
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '375236110784-dvn2pfgqelc7u73it0nhoiji7t65ntos.apps.googleusercontent.com',
                scope: "email profile"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    onAuthChange = isSignedIn => {
       if(isSignedIn) {
           this.props.signIn(this.auth.currentUser.get().getId());
       } else {
           this.props.signOut();
       }
    }
    onSignInClick = () => {
        this.auth.signIn();
    }
    onSignOutClick = () => {
        this.auth.signOut();
    }
    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        } else if(this.props.isSignedIn) {
            return (
            <button className="ui red google button" onClick={this.onSignOutClick}>
                <i className="google icon" />Sign Out
            </button>
            )
        } else {
            return (
                <button className="ui red google button" onClick={this.onSignInClick}>
                    <i className="google icon" />Sign In With Google
                </button>
                )
        }
    }
    render() {
        return (
            <div className="item">
                {this.renderAuthButton()}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
    mapStateToProps, 
    { signIn, signOut }
)(GoogleAuth);
