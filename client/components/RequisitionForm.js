import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addRequisition } from '../reducers/requisitionReducer';
import { connect } from 'react-redux';
import { getPostsFromReddit } from '../reducers/postsReducer';

class RequisitionForm extends React.Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        try {
            const target = event.target;
            const newRequisition = {
                searchString: target.searchString.value,
                subReddits:  target.subReddits.value.split(','),
                userId: this.props.user.id
            }
            this.props.addRequisition(newRequisition).then(() => {
                this.props.getPostsFromReddit(this.props.requisition.id)
            });
        } catch (error) {
            console.error('Cannot submit new requisition', error.stack);
        }
    }
    
    render(){
        return(
            <form onSubmit={this.handleSubmit} noValidate>
                <TextField id='standard-basic' label='Search String' name='searchString'/>
                <TextField id='standard-basic'label='Subreddit' name='subReddits'/>
                <Button variant='contained' color='primary' type='submit'>Submit</Button>
            </form>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    requisition: state.requisition
})

const mapDispatch = (dispatch) => ({
    addRequisition: (requisition) => dispatch(addRequisition(requisition)),
    getPostsFromReddit: (reqId) => dispatch(getPostsFromReddit(reqId))
})
export default connect(mapState,mapDispatch)(RequisitionForm);