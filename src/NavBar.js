import React, { Component } from 'react'
import {FaAlignRight,FaHome,FaWallet,FaCoins} from 'react-icons/fa'
import {BiLogOut} from 'react-icons/bi'
import {NavLink} from 'react-router-dom'
import fire from './config/fire'


export class NavBar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isOpen:false
        }
    }

    
    handleLogout=()=>{
        fire.auth().signOut()
        
    }
    handleToggle=()=>{
        this.setState({isOpen:!this.state.isOpen})
    }
    render() {
        return (
            <nav className='navbar' >
               
                    <div className='nav-header'>
                      
                       <button onClick={this.handleToggle} className='nav-btn'>
                           <FaAlignRight className='nav-icon'/>
                       </button>
                    </div>
                    <div className={this.state.isOpen?'nav-links show-nav':'nav-links' }>
                        <ul className="ul">
                            <li>
                                <NavLink activeClassName="active" to='/home'> <span className={!this.state.isOpen?'hide-text':"text" }><FaHome/> Home</span></NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" to='/invest'><span className={!this.state.isOpen?'hide-text':"text" }><FaWallet/> Invest</span></NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" to='/plans'><span className={!this.state.isOpen?'hide-text':"text" }><FaCoins/> Plans</span></NavLink>
                            </li>
                          
                            <li>
                                <button className="logout" onClick={this.handleLogout} ><BiLogOut/> Logout</button>
                            </li>
                        </ul>
                    </div>
                
            </nav>
           
        )
    }
}

export default NavBar
