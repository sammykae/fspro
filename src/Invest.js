import React, { Component } from 'react'
import NavBar from './NavBar'
import {FaCcPaypal} from 'react-icons/fa'
import { usePaystackPayment } from 'react-paystack';
import moment from 'moment'
import fire from './config/fire'

let mail=""

let price=200
export class Invest extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            price:200,
            mail:"",
            invested:"",          
            toggleTran:false
        }
    }

    async getInfo(){
        mail= this.props.user.email
        
        let invested=""
         price=200
        
     await   fire.firestore().collection("fsp_users").where("email", "==", `${this.props.user.email}`).get().then(snapshot=>{
            snapshot.forEach(doc=>{
           
                price=doc.data().price
                invested=doc.data().invest_date

            })
            
            this.setState({mail,price,invested})
      
           
        }).catch(err=>{
            console.log(err);
        })
    }

    componentDidMount(){
        this.getInfo()

    }
 
    handleToggle=()=>{
        this.setState({toggleTran:!this.state.toggleTran})

    }
    componentWillUnmount(){
        this.getInfo()
    }
    render() {
        
        this.getInfo()
        const config = {
            reference: (new Date()).getTime(),
            email: mail,
            amount: price,
            publicKey: 'pk_test_3aed2a0e9918ba05fb8a45f9fce96df4e49f92e2',
        };
// you can call this function anything
const onSuccess = (reference) => {
    let date = moment().format("YYYY-MM-DD")
  
  // Implementation for whatever you want to do with reference and after success call.
  
  fire.firestore().collection("fsp_users").where("email", "==", `${this.props.user.email}`).get()
  .then(querySnapshot=> {
      querySnapshot.forEach(doc=>{
          doc.ref.update({invest_date: date})
      });
 }).catch(err=>{
     console.log(err)
 })
  
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
 
}

const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
          <button className="btn"  onClick={() => {
              initializePayment(onSuccess, onClose)
          }}><FaCcPaypal className="btn-pay"/></button>
      </div>
    );
};
if(this.state.invested===""){
        return (
            <div>
                <NavBar/>
                <br/>
                <div className="animate-bottom all">
                    
                    <div className="left-pay">
                       <p> You can coose to pay via Bank transfer to any of the banks given.
                           Note that evidence of transfer will be required, so kindly forward such to any of our contacts
                        </p>
                        <p>You can also pay with Pay stack.
                        Note that evidence of transfer will be required, so kindly forward such to any of our contacts
                        </p>
                    </div>
                    <div>
                        How do you want to pay?
                    </div>
                    <div className="right-pay">
                        <div className="paystack">
                         <PaystackHookExample /> 
                        </div>
                        <div className="paystack">
                            <button className="btn-tran" onClick={this.handleToggle}>TRANSFER</button>
                        </div>
                        <div className={this.state.toggleTran?'cc':'pp' }>
                            Zenith Bank : 0384937437 <br/>
                            Access Bank : 0974836471 <br/>
                            Wema Bank   : 0294767381 <br/>

                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
    else{
        return(
            <div>
                <NavBar/>
                <br/>
                <div className="animate-bottom all">
                    <div className="left-pay">
                        <p>You have Already Invested and your returns will be paid to you at appropriate time</p>
                        <p>Wait Until all returns have been paid before Investing again </p>
                    </div>

                </div>
            </div>

        )
    }
    }
}

export default Invest
