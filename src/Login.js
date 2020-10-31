import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import Logo from './resources/images/fsp2.png'
import img from './resources/images/img.jpg'
import fire from './config/fire'
export class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             user:{},
             error:"",
             isLoading:false
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
              this.setState({user:null})
            }
      
          })
        }   
 clear(){
     setTimeout(() => {
         this.setState({error:'',isLoading:!this.state.isLoading})
     }, 5000);
 }
     handleLogin=(event)=>{
         event.preventDefault()
         this.setState({isLoading:!this.state.isLoading})
         fire.auth().signInWithEmailAndPassword(event.target.children[0].value,
             event.target.children[2].value)
         .then((user)=>{
             
         }).catch((err)=>{
             this.setState({error:err.message})
            
 
         })
 this.clear()
     }
 
    render() {
        return (
            <div className="container">
            <div className="sign-box">
                <img src={img} className="sign" alt="think"/>
            </div>
            <div className='display' >
                <div className='center container '>
                   
                    <div className='head'>
                        <img className='logo ' src={Logo} alt="fsp_logo"/>
                        <p className='brand '>FREEDOM SYNERGY PRO</p>
                    </div>
                    <form autoComplete='off' onSubmit={this.handleLogin}>
                        <input type='email' className='form-control' placeholder='Email' name='username' required />
                        <br />
                        <input type='password' className='form-control' placeholder='Password' name='pasword' required />
                        <Fade duration={1000} bottom  when={this.state.error!==''}>
                                                    <div className="invalid-feedback" style={{color:'red', display: 'block',width:'350px'}}>
                                                    <label>{this.state.error}</label> 
                                                    </div>
                                                </Fade>                
                        <div className='sub'>
                          {this.state.isLoading?<span className="bot"></span>:null}  <input type='submit' value='Login' className='submit'/>
                        </div>
                        <Link to ="/register" className='nav-button'>Register</Link>  
                    </form>  
                </div>
            </div>
            </div>
        )
    }
}

export default Login
