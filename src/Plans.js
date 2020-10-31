
import React, { Component } from 'react'
import { FaBuffer } from 'react-icons/fa'
import NavBar from './NavBar'
import fire from './config/fire'
export class Plans extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             basic:{},
             standard:{},
             multiple:{}
        }
    }
    
    componentDidMount(){
        fire.database().ref().on('value',(snapshot)=> {
         
            if(snapshot.val()!=null){
                 const vall=snapshot.val()
                
                 this.setState({
                    basic:vall.Basic.returns,
                    standard:vall.Standard.returns,
                    multiple:vall.Multiple.returns
                 })
                
            }
        })

    }
    render() {
        return (
            <div>
            <NavBar/>
            <br/>
            <div className="animate-bottom all">
                <div className="left">
                    <div className="plan-title">
                        Basic Plan
                    </div>
                    <div className="plan-body">
                    <ul className="plan-inner">
                         
               
                {
                Object.entries(this.state.basic).map(([key, value]) => {
                                return <li key={key} className="inner"><FaBuffer/> {value}</li>
                            })} 
                           
                            <li className="inner"><FaBuffer/> Total Amount #210,000</li> 

                        </ul>
                    </div>

                </div>
                <div className="middle">
                    <div className="plan-title">
                        Standard Plan
                    </div>
                    <div className="plan-body">
                    <ul className="plan-inner">
                    {
                Object.entries(this.state.standard).map(([key, value]) => {
                                return <li key={key} className="inner"><FaBuffer/> {value}</li>
                            })} 
                           
                            <li className="inner"><FaBuffer/> Total Amount #540,000</li> 

                        </ul>
                    </div>


                </div>
                <div className="right">
                    <div className="plan-title">
                        Multiple Plan
                    </div>
                    <div className="plan-body">
                    <ul className="plan-inner">
                    {
                Object.entries(this.state.multiple).map(([key, value]) => {
                                return <li key={key} className="inner"> <FaBuffer/> {value}</li>
                            })} 
                           
                          
                            <li className="inner"><FaBuffer/> Total Amount #1,000,000</li> 
                        </ul>
                    </div>

                </div>
                <footer className="footer">
                    &copy; Freedom Synergy Pro 2020
                </footer>
            </div>
            
        </div>
        )
    }
}

export default Plans

