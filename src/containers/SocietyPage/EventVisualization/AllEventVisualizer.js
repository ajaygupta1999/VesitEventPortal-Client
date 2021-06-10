import React, { Component } from 'react';
import { PieChart,Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomTooltipAllEvents from "./CustomTooltipAllEvents";
import { getRandomColor } from "../../../utils";




class AllEventVisualizer extends Component  {    
    render(){
      const { data } = this.props;
    
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
                  <Tooltip content={<CustomTooltipAllEvents />} />
                  <Legend verticalAlign="top" width="100%" height={36}/>
                </PieChart>
            </ResponsiveContainer>
          </div>
        </div>  
      )
    }
}



export default AllEventVisualizer;