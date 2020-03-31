import React,{Component} from 'react';
import axios from 'axios'
import UserTab from './UserTab';
import LinearProgress from '@material-ui/core/LinearProgress';

class UserDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            success: false
        }
    }

    componentDidMount(){
        axios.get('https://hnswu6rm5g.execute-api.us-east-2.amazonaws.com/beta')
        .then(response => {
            let responseData = response.data;
            this.setState({
                users: responseData.data.members,
                success: true
            });
        })
        .catch(error => {
            console.log(error);
        })
    }
    render(){
        const {users} = this.state;
        if(this.state.success){
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
    }else{
        return(
        <LinearProgress color="secondary"></LinearProgress>
        );
    }
    }
}

export default UserDetails;