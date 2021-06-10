
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

const CustomTooltipAllEvents = ({ active, payload, label }) => {

    
    if (active && payload && payload.length) {
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



  export default CustomTooltipAllEvents;