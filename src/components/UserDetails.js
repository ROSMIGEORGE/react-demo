import React,{Component} from 'react';
import axios from 'axios'
import UserTab from './UserTab';

class UserDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        axios.get('https://hnswu6rm5g.execute-api.us-east-2.amazonaws.com/beta')
        .then(response => {
            this.setState({
                users: response.data.members
            });
        })
        .catch(error => {
            console.log(error);
        })
    }
    render(){
        const {users} = this.state;
        return(
            <div className="userdetails-wrapper">
                <div className="user-title">User Details</div>
                <div>
                    {
                        users.length?
                        users.map(user =><UserTab key={user.id} user={user}></UserTab>)
                        :null
                    }
                </div>
            </div>
        );
    }
}

export default UserDetails;