import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import Logo from './resources/images/fsp2.png'
import img from './resources/images/img.jpg'
import fire from './config/fire'
const db=fire.firestore()
export class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             Register:{},
             error:""
        }
    }
    
    componentDidMount(){
        this.authListener()
      }
      
        authListener=()=>{
          fire.auth().onAuthStateChanged((register)=>{
            if (register) {
              this.setState({register})
            }else{
              this.setState({register:null})
            }
      
          })
        }   
 clear(){
     setTimeout(() => {
         this.setState({error:'',isLoading:!this.state.isLoading})
     }, 5000);
 }
 handleSignup=(event)=>{
         event.preventDefault()
         let amount=0
         this.setState({isLoading:!this.state.isLoading})
         if(event.target.children[0].value==="Basic"){
             amount=7000000

         }else if(event.target.children[0].value==="Standard"){
             amount=21000000

         }else if(event.target.children[0].value==="Multiple"){
             amount=49000000

         }
         const data={
            plan:event.target.children[0].value,
            name:event.target.children[2].value,
            phone:event.target.children[4].value,
            address:event.target.children[6].value,
            email:event.target.children[8].value,
            return:0,
            invest_date:"",
            price:amount
        }
         db.collection('fsp_users').doc(event.target.children[2].value).set(data);
         fire.auth().createUserWithEmailAndPassword(event.target.children[8].value,
            event.target.children[10].value)
         .then((user)=>{
          
         }).catch((err)=>{
             this.setState({error:err.message})
            
 
          })
 this.clear()
     }
 
    render() {
        return (
             <div >
            {/* // <div className="sign-box">
            //     <img src={img} className="sign" alt="think"/>
            // </div> */}
            <div className='max' >
                <div className='center container '>
                   
                    <div className='head'>
                        <img className='logo ' src={Logo} alt="fsp_logo"/>
                        <p className='brand '>FREEDOM SYNERGY PRO</p>
                    </div>
                    <form autoComplete='off' onSubmit={this.handleSignup}>
                    <select className="form-control"  
                                         name="plan" required>
                                        <option value="">Select Plan</option>
                                             <option value="Basic">Basic Plan</option>
                                             <option value="Standard">Standard Plan</option>
                                             <option value="Multiple">Multiple Plan</option>  
                                        </select>
                                       <br/>
                                       <input type='text' className='form-control' placeholder='Full Name'  name='name' required />
                                        <br/>
                                        <input type='text' className='form-control' placeholder='Phone number' maxLength="11" name='phone' required />
                                        <br/>
                                        <textarea id="text" type='textarea' className='form-control' placeholder='Home Address' required name='address'></textarea>
                                        <br/>
                        <input type='email' className='form-control' placeholder='Email' name='email' required />
                        <br/>
                        <input type='password' className='form-control' placeholder='Password' name='pasword' required />
                        <Fade duration={1000} bottom  when={this.state.error!==''}>
                                                    <div className="invalid-feedback" style={{color:'red', display: 'block',width:'350px'}}>
                                                    <label>{this.state.error}</label> 
                                                    </div>
                                                </Fade>                
                        <div className='sub'>
                        {this.state.isLoading?<span className="bot"></span>:null}  <input type='submit' value='Register' className='submit'/>
                        </div>
                        <Link to ="/" className='nav-button'>Login</Link>  
                        <br/>
                        <br/>
                    </form>  
                </div>
            </div>
            </div>
        )
    }
}

export default Register
