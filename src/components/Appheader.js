import "../asserts/css/Appheader.scss";

function Appheader() {
    return(
            <div className="container home-main-header my-5">
                <div className="row">
                    <div className="home-content col-md-6">
                        <p className="home-main-title">VESIT Event Portal, One Platform for All Events.</p>
                        <p className="home-description">This is all in one platform for VESIT events, you will
                        get here all the events from all the society's as well
                        from college. Here you will easily able to register for any
                        events which is held by college or society.</p>
                    </div>
                    <div className="col-md-6">
                        <div style={{ height: "100%" }} className="home-img-session d-flex justify-content-center align-items-center">
                            <div className="d-flex justify-content-center">
                                <div className="home-ad-event-pic">
                                    <img src="/images/eventpic3.png" alt="Event-pic" />
                                </div>
                                <div className="home-ad-left-right-arrow">
                                    <img src="/images/left-right-arrow.jpg" alt="Left-right-arrow" />
                                </div>
                                <div className="home-ad-ves_logo">
                                    <img src="/images/VES_logo.png" alt="VES-logo" />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Appheader;




