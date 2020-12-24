import "../asserts/css/Allsociety.scss";

const Allsocietys = () => {
    return (
       <div>
            <div class="home-page-all-society">
                <h4>All Societies</h4>
            </div>
            <div class="my-all-society-div d-flex justify-content-center">
                <div class="row my-society-content container">
                    <div class="col-6 col-md-3 d-flex justify-content-center">
                        <a href="#">
                            <div class="CSI-society d-flex flex-column">
                                <img src="/images/iste_logo.jpg" />
                                <h4> ISTE </h4>
                            </div>
                        </a>
                    </div>
                    <div class="col-6 col-md-3 d-flex justify-content-center">
                        <a href="#">
                            <div class="CSI-society d-flex flex-column">
                                <img src="/images/ieee_logo.jpg" />
                                <h4> IEEE </h4>
                            </div>
                        </a>
                    </div>
                    <div class="col-6 col-md-3 d-flex justify-content-center">
                        <a href="#">
                            <div class="CSI-society d-flex flex-column">
                                <img src="/images/csi_logo.jpg" />
                                <h4> CSI </h4>
                            </div>
                        </a>
                    </div>
                    <div class="col-6 col-md-3 d-flex justify-content-center">
                        <a href="#">
                            <div class="CSI-society d-flex flex-column">
                                <img src="/images/isa_logo.gif" />
                                <h4> ISA </h4>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
       </div>
    );
}


export default Allsocietys;