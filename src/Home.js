import React, { Component } from 'react'
import NavBar from './NavBar'
import {FaBuffer,FaCheck} from 'react-icons/fa'
import fire from './config/fire'
import moment from 'moment'
import fsp2 from './resources/images/fsp2.png'
const db=fire.firestore()

export class Home extends Component {
    constructor(props) {
        super(props)
       
        this.state = {
             user:{},
             planDetails:{},
             planReturns:{},
             isLoading:true
        }
    }
   async getInfo(){
        let plan="Basic"
      await     db.collection('fsp_users').where("email","==",`${this.props.user.email}`).get().then(snapshot=>{
                snapshot.forEach((doc) => {
                    this.setState({user:doc.data()})
                })
              }).then(()=>{
                 plan=this.state.user.plan
                
              }).catch(err=>{
                console.log(err);
                fire.auth().signOut()
              })
          fire.database().ref(plan).once('value').then(snapshot=> {
                if(snapshot.val()!=null){
                     const vall=snapshot.val()
                    
                     this.setState({
                         planDetails:vall.details,
                         planReturns:vall.returns
                     })
                     this.setState({isLoading: false})
                }
            }).catch(err=>{
                console.log(err);
            })
             
    }
  
     componentDidMount=()=>{
       this.getInfo()
    }
    componentWillUnmount(){
        this.getInfo()
    }



    render() {
      
        const { planDetails } = this.state;

    if (planDetails === undefined) {
        fire.auth().signOut()
      return <div id="loader"></div>
    }else{

        let date=this.state.user.invest_date
        let re=this.state.user.return
        let end_date="Not Invested"
        if (date!==""){
            let start_date = moment(date, "YYYY-MM-DD");
            end_date = start_date.add((30*re+1), 'days').format('YYYY-MM-DD');

        }
       
      let chec=0
        const name=this.state.user.name
        console.log(this.state.user)
        return (
            
            <div>
                <NavBar/>
                <br/>
                {this.state.isLoading ?<div id="loader"></div> : (
                <div className="animate-bottom all">
                    <div className="welcome">
                       
                        <i>{`Welcome ${name}`}</i> 
                    </div>
                    <div className="info">
                    
                      {
                        this.state.planDetails.detail
                }
                        <p className="tt">Day of Investment : {date}
                        </p>
                        <p className="tt">Number of Returns Received : {re}
                        </p>
                        <p className="tt">Next Payment Date : {end_date}
                        </p>
                        <img className="img" src={fsp2} alt="fsp"/>
                         
                    </div>
                    <div className="money-box">
                    <i className="plan">{`Current plan: ${this.state.planDetails.name}`}</i>
                        <ul className="money">
                        {
                            
                                
                                Object.entries(this.state.planReturns).map(([key, value]) => {
                                    if(chec!==re){
                                        chec++
                                        return <li key={key} className="mo"><FaBuffer/> {value}  <FaCheck className="check"/></li>
                                    }else{
                                        return <li key={key} className="mo"><FaBuffer/> {value}  </li>
                                    }
                                    
                                }) 
                        }
                            
                        </ul>
                    </div>
                   
                    <footer className="footer">
                        &copy; Freedom Synergy Pro 2020
                    </footer>
                </div>
                )}
            </div>
        )
    }
}
}

export default Home
