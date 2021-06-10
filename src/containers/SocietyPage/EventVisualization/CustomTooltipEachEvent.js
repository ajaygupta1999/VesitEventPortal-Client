

const CustomTooltipEachEvent = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      console.log(active , payload , label);
      return (
        <div className="custom-tooltip">
          <p className="tooltip-eventName"><span>Name:</span> { payload[0].name }</p>
          <p className="tooltip-intro"><span>Registration:</span> {  payload[0].value }</p>
        </div>
      );
    }
  
    return null;
};



export default CustomTooltipEachEvent;