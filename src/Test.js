import React, { Component } from 'react'
import moment from 'moment'
import fire from './config/fire'

export class Test extends Component {
  
    constructor(props) {
        super(props)
    
        this.state = {
             dates:[]
        }
    }
    componentDidMount(){
        let key="391ce7777efee9f0d7a96f8a4074b5ae"
        fetch(`https://getfestivo.com/v2/holidays?api_key=${key}&public=1&country=NG&year=2020`).then((data)=>{
            return data.json()
            }).then(e=>{
                
               let hol=e.holidays
                let newdata= hol.filter((i,id)=>
                       id%2===0    
               ).map(dd=>{return dd.date})
             this.setState({dates:newdata})
        })

    }
    calDays(start,end){
     var start = moment(start).utc().add(start.utcOffset(), 'm'); // Ignore timezones
var end = moment(end).utc().add(end.utcOffset(), 'm'); // Ignore timezones

var first = start.clone().endOf('week'); // end of first week
var last = end.clone().startOf('week'); // start of last week

// Fixing Summer Time problems
var firstCorrection = moment(first).utc().add(60, 'm').toDate(); //
var days = last.diff(firstCorrection,'days') * 5 / 7; // this will always multiply of 7

var wfirst = first.day() - start.day(); // check first week
if(start.day() == 0) --wfirst; // -1 if start with sunday
var wlast = end.day() - last.day(); // check last week
if(end.day() == 6) --wlast; // -1 if end with saturday
return wfirst + days + wlast; // get the total (subtract holidays if needed)
    }


    //  calcBusinessDays(startDate, endDate) { 
    //     var day = moment(startDate);
    //     var businessDays = 0;
  
    //     while (day.isSameOrBefore(endDate,'day')) {
    //       if (day.day()!==0 && day.day()!==6) businessDays++;
    //       day.add(1,'d');
    //     }
    //     return businessDays;
    //   }

    render() {
      const d=new Date()
      const date=`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`
      
      
      var start_date = moment(date, "DD-MM-YYYY");
      var end_date = start_date.add(30, 'days').format('DD-MM-YYYY');
     console.log(this.calDays(start_date,end_date))
      
        return (
            <div>
                {end_date}
                {this.state.dates.map((date,id)=>{
                    return <p key={id}>{date}</p>
                })}
            </div>
        )
    }
}

export default Test



