import React, { Component } from 'react'
import {Switch,Route,Redirect,BrowserRouter} from 'react-router-dom'
import Login from './Login'
import fire from './config/fire'
import Home from './Home'
import './App.css'
import Plans from './Plans'
import Invest from './Invest'

import Register from './Register'


export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
         user:{},
         error:""
    }
}

  componentDidMount(){
    this.authListener()
  }
  
    authListener=()=>{
      fire.auth().onAuthStateChanged((user)=>{
        if (user) {
          this.setState({user})
        }else{
          this.setState({user:user})
        }
  
      })
    }
  render() {
    console.log(this.state.user)
    return (
      <div>
       
        <BrowserRouter>
            <Switch >
              <Route path='/' exact  render={()=>(!this.state.user?( <Login/>):(<Home user={this.state.user}/>))}/>
              <Route path='/home' strict exact render={()=>(this.state.user?(<Home user={this.state.user}/>):( <Redirect to='/'/>))}/>
              <Route path='/invest' strict exact render={()=>(this.state.user?(<Invest user={this.state.user}/>):( <Redirect to='/'/>))}/>
              <Route path='/plans' strict exact render={()=>(this.state.user?(<Plans user={this.state.user} />):( <Redirect to='/'/>))}/>
              <Route path='/register' strict exact render={()=>(!this.state.user?(<Register />):(<Redirect to='/'/>))}/>

            </Switch>
         </BrowserRouter>
      </div>
    )
  }
}

export default App


