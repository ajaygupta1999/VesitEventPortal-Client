import React, { Component } from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import CustomTooltipEachEvent from "./CustomTooltipEachEvent";
import { getRandomColor } from "../../../utils";




class EventVisualizer extends Component {
    render(){
        let { data } = this.props;
        let { classWiseReg } = data;
        let { branchWiseReg } = data;
        let classWiseRegData = [];
        let branchWiseRegData = [];
        if(classWiseReg && classWiseReg.length > 0){
            for(var i = 0 ; i < classWiseReg.length; i++){
                let obj = {
                    name : classWiseReg[i].class.toUpperCase(),
                    value : classWiseReg[i].reg
                }
                classWiseRegData.push(obj);
            }
        }
        
        if(branchWiseReg && branchWiseReg.length > 0){
            for(var i = 0 ; i < branchWiseReg.length; i++){
                let obj = {
                    name : branchWiseReg[i].branch.toUpperCase(),
                    value : branchWiseReg[i].reg
                }
                branchWiseRegData.push(obj);
            }
        }
        
        return(
            <div className="alleventsvisualization-section-main-div d-flex justify-content-center">
                <div style={{ width : "70%" , height : "450px" }} className="ajaygupta">
                    <ResponsiveContainer width="100%"  height="100%">
                        <PieChart width={400} height={400}>
                                <Pie
                                    data={classWiseRegData}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="45%"
                                    fill="#8884d8"
                                >
                                    { classWiseRegData.map((entry, index) => (
                                       <Cell key={`cell-${index}`} fill={getRandomColor()} />
                                    ))}
                                </Pie>
                                <Pie
                                    data={branchWiseRegData}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="53%"
                                    outerRadius="75%"
                                    fill="#82ca9d"
                                    label
                                >
                                    { branchWiseRegData.map((entry, index) => (
                                       <Cell key={`cell-${index}`} fill={getRandomColor()} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltipEachEvent />} />
                                <Legend verticalAlign="top" width="100%" height={36}/>
                        </PieChart>
                        </ResponsiveContainer>
                        </div>
                </div>
        )
    }
}


export default EventVisualizer;