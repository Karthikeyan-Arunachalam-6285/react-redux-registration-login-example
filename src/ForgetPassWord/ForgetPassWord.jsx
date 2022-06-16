import React from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { userActions } from '../_actions';
import store from '../_helpers/store';

class ForgetPassWord extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            errorMessage: null, 
        };

        this.handleChange = this.handleChange.bind(this);
        this.checkUserId = this.CheckUserId.bind(this);
    }

    componentDidMount() {
        this.props.getUsers();
    }

    handleChange(event) {        
        this.setState({userName: event.target.value});
        
    }   

    CheckUserId(event) {   
        if (event.key === 'Enter') {
            const { users } = this.props;
            if (users)
            {
                const userInfo = users.items.filter(a => a.username === this.state.userName);
                if (userInfo.length > 0) {
                    this.setState({ errorMessage: true });
                }
                else {
                    this.setState({ errorMessage: false });
                }
            }
            else {
                this.setState({ errorMessage: false });
            }           
        }        
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>ForgetPassword</h2>                                
                <label htmlFor="uerName">User Name</label>
                <input type="text" className="form-control" name="userName" value={this.state.userName} onChange={this.handleChange} onKeyPress={(e) => { this.checkUserId(e) }} />                                    
                {this.state.errorMessage === true ?
                        <span >
                              Welcome to portal 
                        </span>
                    : this.state.errorMessage === false ? 
                    <span >
                         User does not exit
                    </span>
                    :null
                }
            </div>            
        );
    }
}

function mapState(state) {
    const { users } = state;
    return { users };
}

const actionCreators = {
    getUsers: userActions.getAll,
}

const connectedForgetPassWord = connect(mapState, actionCreators)(ForgetPassWord);
export { connectedForgetPassWord as ForgetPassWord };