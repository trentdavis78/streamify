import React, { Component } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';

class StreamDelete extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }    
    renderActions() {
        return (
            <>
                <button onClick={() => this.props.deleteStream(this.props.match.params.id)} className="ui red button">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </>
        );
    }
    renderContent() {
        if(!this.props.stream) {
            return (
                <p>Are you sure you want to delete this stream?</p>
            );
        } else {
            return (
                <>
                <p style={{color: 'red', fontWeight: 'bold'}}>Are you sure you want to delete this stream?</p>
                <p><b>Title:</b> {this.props.stream.title}<br/>
                   <b>Description:</b> {this.props.stream.description}</p>
                </>
            );
        }
    }  
    render() {        
        return (
                <Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
        )
    }    
}
const mapStateToProps = (state, ownProps) => {
    return { 
        stream: state.streams[ownProps.match.params.id]
    };
};
export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);