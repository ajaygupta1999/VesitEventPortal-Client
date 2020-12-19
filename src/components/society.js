import React, { Component } from 'react';
import '../asserts/css/navbar.scss';

class Society extends Component {
  render(){
    return(
        <div className="each-society-information d-flex justify-content-center">
  <div className="society-details-society-page d-flex flex-column">
    <div className="society-img-session">
      {/* <img src="/asserts/{{ $society->image }}" style={{width: '130px', height: '130px', objectFit: 'cover'}} /> */}
    </div>
    <h4>ISA Society</h4>
  </div>
</div>
    );
  }
}

export default Society;




