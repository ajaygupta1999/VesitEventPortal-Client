import React, { Component } from 'react';
import { PieChart,Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';




const getDataDestribution = (eachdata , islast , color , type) => {
  if(Object.keys(eachdata).length  > 0 ){
      if(islast){
          return (
              <div style={{ display : "inline-block" }}>
                <div style={{ width : "10px", height : "10px" , background : color , display : "inline-block", marginRight: "1px" }} 
                     className="span-box-for-colors">
                </div>
                <span>{ type === "class" ? eachdata.class.toUpperCase() :  eachdata.branch.toUpperCase()  }-{ eachdata.reg }.</span>
              </div>
          )
      }

      return (
        <div style={{ display : "inline-block" , marginRight : "7px" }}>
          <div style={{ width : "10px", height : "10px" , background : color  ,display : "inline-block", marginRight: "1px" }} 
              className="span-box-for-colors">
          </div>
          <span>{ type === "class" ? eachdata.class.toUpperCase() :  eachdata.branch.toUpperCase() }-{ eachdata.reg }, </span>
        </div>
      )

  }else{
     return <p>Ajay</p>;
  }
  
};


const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    console.log(active , payload , label);
    return (
      <div className="custom-tooltip">
        <p className="tooltip-eventName"><span>Event:</span> { payload[0].name }</p>
        <p className="tooltip-intro"><span>Total Registration:</span> {  payload[0].value }</p>
        <p className="Each-registration-records">
        <fieldset>
            <legend>Classwise:</legend>
            { 
              payload[0].payload.classWiseReg.map((eachdata , index) => {
                  if(payload[0].payload.classWiseReg.length === (index + 1) ){
                      return getDataDestribution(eachdata , true , getRandomColor() , "class");
                  }

                  return getDataDestribution(eachdata , false , getRandomColor() ,  "class");                
              }) 
            } 
          </fieldset>
        </p>
        <p className="Each-registration-records">
          <fieldset>
            <legend>Branchwise:</legend>
            { 
              payload[0].payload.branchWiseReg.map((eachdata , index) => {
                  if(payload[0].payload.branchWiseReg.length === (index + 1) ){
                      return getDataDestribution(eachdata , true , getRandomColor() , "branch");
                  }

                  return getDataDestribution(eachdata , false , getRandomColor(), "branch");                
              }) 
            } 
            </fieldset>
        </p>
        
      </div>
    );
  }

  return null;
};


class AllEventVisualizer extends Component  {

    
    render(){
      const { data } = this.props;
      const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    
      return(
        <div className="alleventsvisualization-section-main-div d-flex justify-content-center">
          <div style={{ width : "70%" , height : "450px" }} className="ajaygupta">
              <ResponsiveContainer width="100%"  height="100%">
                <PieChart width={700} height={700}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label
                    outerRadius="75%"
                    dataKey="totalregistrations"
                  >
                    { data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getRandomColor()} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" width="100%" height={36}/>
                </PieChart>
            </ResponsiveContainer>
          </div>
        </div>  
      )
    }
}



export default AllEventVisualizer;