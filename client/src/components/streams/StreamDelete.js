import React from 'react'
import Modal from '../Modal.js'
import history from '../../history.js'
import { connect } from 'react-redux'
import {fetchStream, deleteStream } from '../../actions/index.js'
import { Link } from 'react-router-dom'


class StreamDelete extends React.Component {


    componentDidMount() {
       this.props.fetchStream(this.props.match.params.id) 
    }

    renderActions() {
        const { id } = this.props.match.params
        return (
            <>
              
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </>
        )
    }

renderContent = () => {
    if (!this.props.stream) {return 'Are you sure you want to delete this stream?'}

    return `Are you sure you want to delete the stream: ${this.props.stream.title}`
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
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream: fetchStream, deleteStream: deleteStream })(StreamDelete)