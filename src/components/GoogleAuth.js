import React, { Component } from 'react';

export class GoogleAuth extends Component {
    state = { isSignedIn: null };
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '375236110784-dvn2pfgqelc7u73it0nhoiji7t65ntos.apps.googleusercontent.com',
                scope: "email profile"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get()});
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get()});
    }
    renderAuthButton() {
        if(this.state.isSignedIn === null) {
            return <div>IDK if isSignedIn</div>
        } else if(this.state.isSignedIn) {
            return <div>Signed In</div>
        } else {
            return <div>Signed Out</div>
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

export default GoogleAuth;
