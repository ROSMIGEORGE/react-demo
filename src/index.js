import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import UserDetails from './components/UserDetails';

class App extends Component{
    render(){
        return (
            <div>
                <UserDetails/>
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'));