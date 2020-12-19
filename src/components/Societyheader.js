import React, { Component } from 'react';
import '../asserts/css/societies.scss';

function Societyheader(){
        return(
        <div>
            <div className="home-page-all-society d-flex justify-content-center">
                <h4>All Societies</h4>
            </div>
            <div className="my-all-society-div d-flex justify-content-center">
                <div className="row my-society-content container">
                    <div className="col-6 col-md-3 d-flex justify-content-center">
                        <a href="">
                            <div className="CSI-society d-flex flex-column">
                                <img style={{ width : '130px' }} src="/images/isa_logo.gif" />
                                <h4>ISA</h4>
                            </div>
                        </a>
                    </div>
                    <div className="col-6 col-md-3 d-flex justify-content-center">
                        <a href="">
                            <div className="CSI-society d-flex flex-column">
                                <img style={{ width : '130px' }} src="/images/ieee_logo.jpg" />
                                <h4>IEEE</h4>
                            </div>
                        </a>
                    </div>
                    <div className="col-6 col-md-3 d-flex justify-content-center">
                        <a href="">
                            <div className="CSI-society d-flex flex-column">
                                <img style={{ width : '130px' }} src="/images/csi_logo.jpg" />
                                <h4>CSI</h4>
                            </div>
                        </a>
                    </div>
                    <div className="col-6 col-md-3 d-flex justify-content-center">
                        <a href="">
                            <div className="CSI-society d-flex flex-column">
                                <img style={{ width : '130px' }} src="/images/iste_logo.jpg" />
                                <h4>ISTE</h4>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        )
    }


export default Societyheader;