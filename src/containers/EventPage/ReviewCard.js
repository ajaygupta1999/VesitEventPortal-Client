import React from 'react';



const ReviewCard = (props) => {

    console.log("In review compo" , props);
    return (
        <div className="Review-cards">
            {
                props.type === "guest" ? (
                    <div>
                        {
                            props.role === "user" &&
                                <div className="each-review">
                                    <div className="review-img-div d-flex justify-content-center">
                                        <div>
                                            <img src={ props.data.imgurl ? props.data.imgurl.dataurl : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
                                            alt="each-reviews-user-images" />
                                        </div>
                                        
                                    </div>
                                    <div className="review-text-div">
                                        <h5 className="card-title"> { props.data.username } </h5>
                                        {
                                            props.data.societydetails ? 
                                            <p className="card-text">{ props.data.societydetails.name.toUpperCase() } VESIT, { props.data.societydetails.role.toUpperCase() }</p>
                                            : null
                                        }
                                        {
                                            props.data.classdetails ?
                                            <p className="card-text"> { props.data.classdetails.department.toUpperCase()  }  , { props.data.classdetails.class.toUpperCase() }-{props.data.classdetails.rollno} </p>
                                            : null
                                        }
                                        <a href="#" className="btn btn-sm btn-block btn-primary mt-2">Profile</a>
                                    </div>
                                </div>
                        }
                        { 
                            props.role === "guest" &&
                                <div className="each-review">
                                    <div className="review-img-div d-flex justify-content-center">
                                        <div>
                                            <img src={ props.data.imgurl ? props.data.imgurl.dataurl : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
                                            alt="each-reviews-user-images" />
                                        </div>
                                    </div>
                                    <div className="review-text-div">
                                    {
                                        props.data.role === "others" ? 
                                            <div className="card-body">
                                                <h5 className="card-title">{ props.data.details.others.name }</h5>
                                                <p className="card-text">{ props.data.details.others.branch.toUpperCase() }, { props.data.details.others.class.toUpperCase() }</p>
                                            </div>
                                        : (
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    { 
                                                    props.data.role === "outsideperson" ?  props.data.details.outsideperson.name : props.data.details.faculty.name
                                                    }
                                                </h5>
                                                <p className="card-text">
                                                    {
                                                        props.data.role === "outsideperson" ? props.data.details.outsideperson.profession :  props.data.details.faculty.profession
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                    </div>
                                </div>

                        }
                        {  
                          props.role === "eventtaker" &&
                                <div className="each-review">
                                    <div className="review-img-div d-flex justify-content-center">
                                        <div>
                                            <img src={ props.data.imgurl ? props.data.imgurl.dataurl : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
                                            alt="each-reviews-user-images" />
                                        </div>
                                    </div>
                                    <div className="review-text-div">
                                    {
                                        props.data.role === "others" ? 
                                            <div className="card-body">
                                                <h5 className="card-title">{ props.data.details.others.name }</h5>
                                                <p className="card-text">{ props.data.details.others.branch.toUpperCase() }, { props.data.details.others.class.toUpperCase() }</p>
                                            </div>
                                        : (
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    { 
                                                    props.data.role === "outsideperson" ?  props.data.details.outsideperson.name : props.data.details.faculty.name
                                                    }
                                                </h5>
                                                <p className="card-text">
                                                    {
                                                        props.data.role === "outsideperson" ? props.data.details.outsideperson.profession :  props.data.details.faculty.profession
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                    </div>
                                </div>
                        }
                        {
                            !props.registeredguest && 
                                    <div className="each-review">
                                            <div className="review-img-div d-flex justify-content-center">
                                                <div>
                                                    <img src={ props.data.imgurl ? props.data.imgurl.dataurl : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
                                                    alt="each-reviews-user-images" />
                                                </div>
                                            </div>
                                            <div className="review-text-div">
                                            {
                                                props.data.role === "others" ? 
                                                    <div className="card-body">
                                                        <h5 className="card-title">{ props.data.details.others.name }</h5>
                                                        <p className="card-text">{ props.data.details.others.branch.toUpperCase() }, { props.data.details.others.class.toUpperCase() }</p>
                                                    </div>
                                                : (
                                                    <div className="card-body">
                                                        <h5 className="card-title">
                                                            { 
                                                            props.data.role === "outsideperson" ?  props.data.details.outsideperson.name : props.data.details.faculty.name
                                                            }
                                                        </h5>
                                                        {
                                                            props.data.role === "outsideperson" ? (
                                                                <p className="card-text">
                                                                    {
                                                                        props.data.details.outsideperson.profession.length > 100 ? 
                                                                            `${props.data.details.outsideperson.profession.substring(0 , 100)} ...`
                                                                        : props.data.details.outsideperson.profession
                                                                    }
                                                                </p>
                                                            ) : (
                                                                <p className="card-text">
                                                                    {
                                                                        props.data.details.faculty.profession.length > 100 ? 
                                                                            `${props.data.details.faculty.profession.substring(0 , 100)} ...`
                                                                        : props.data.details.faculty.profession
                                                                    }
                                                                </p>
                                                            )     
                                                        }
                                                    </div>
                                                )
                                            }
                                            </div>
                                </div>
                        }
                    </div>
                    
                ) : (
                    <div>
                        {
                            props.role === "user" &&
                                <div className="each-review">
                                    <div className="review-img-div d-flex justify-content-center">
                                        <div>
                                            <img src={ props.data.imgurl ? props.data.imgurl.dataurl : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
                                            alt="each-reviews-user-images" />
                                        </div>
                                        
                                    </div>
                                    <div className="review-text-div">
                                        <h5 className="card-title"> { props.data.username } </h5>
                                        {
                                            props.data.societydetails ? 
                                            <p className="card-text">{ props.data.societydetails.name.toUpperCase() } VESIT, { props.data.societydetails.role.toUpperCase() }</p>
                                            : null
                                        }
                                        {
                                            props.data.classdetails ?
                                            <p className="card-text"> { props.data.classdetails.department.toUpperCase()  }  , { props.data.classdetails.class.toUpperCase() }-{props.data.classdetails.rollno} </p>
                                            : null
                                        }
                                        <a href="#" className="btn btn-sm btn-block btn-primary mt-2">Profile</a>
                                    </div>
                                </div>
                        }
                        { 
                            props.role === "guest" &&
                                <div className="each-review">
                                    <div className="review-img-div d-flex justify-content-center">
                                        <div>
                                            <img src={ props.data.imgurl ? props.data.imgurl.dataurl : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
                                            alt="each-reviews-user-images" />
                                        </div>
                                    </div>
                                    <div className="review-text-div">
                                    {
                                        props.data.role === "others" ? 
                                            <div className="card-body">
                                                <h5 className="card-title">{ props.data.details.others.name }</h5>
                                                <p className="card-text">{ props.data.details.others.branch.toUpperCase() }, { props.data.details.others.class.toUpperCase() }</p>
                                            </div>
                                        : (
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    { 
                                                    props.data.role === "outsideperson" ?  props.data.details.outsideperson.name : props.data.details.faculty.name
                                                    }
                                                </h5>
                                                <p className="card-text">
                                                    {
                                                        props.data.role === "outsideperson" ? props.data.details.outsideperson.profession :  props.data.details.faculty.profession
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                    </div>
                                </div>

                        }
                        {  
                          props.role === "eventtaker" &&
                                <div className="each-review">
                                    <div className="review-img-div d-flex justify-content-center">
                                        <div>
                                            <img src={ props.data.imgurl ? props.data.imgurl.dataurl : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
                                            alt="each-reviews-user-images" />
                                        </div>
                                    </div>
                                    <div className="review-text-div">
                                    {
                                        props.data.role === "others" ? 
                                            <div className="card-body">
                                                <h5 className="card-title">{ props.data.details.others.name }</h5>
                                                <p className="card-text">{ props.data.details.others.branch.toUpperCase() }, { props.data.details.others.class.toUpperCase() }</p>
                                            </div>
                                        : (
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    { 
                                                    props.data.role === "outsideperson" ?  props.data.details.outsideperson.name : props.data.details.faculty.name
                                                    }
                                                </h5>
                                                <p className="card-text">
                                                    {
                                                        props.data.role === "outsideperson" ? props.data.details.outsideperson.profession :  props.data.details.faculty.profession
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                    </div>
                                </div>
                        }
                        {
                            !props.registeredguest && 
                                    <div className="each-review">
                                            <div className="review-img-div d-flex justify-content-center">
                                                <div>
                                                    <img src={ props.data.imgurl ? props.data.imgurl.dataurl : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
                                                    alt="each-reviews-user-images" />
                                                </div>
                                            </div>
                                            <div className="review-text-div">
                                            {
                                                props.data.role === "others" ? (
                                                    <div className="card-body">
                                                        <h5 className="card-title">{ props.data.details.others.name }</h5>
                                                        <p className="card-text">{ props.data.details.others.currentyear } Year, { props.data.details.others.branch.toUpperCase() }, { props.data.details.others.class.toUpperCase() }
                                                            </p>
                                                    </div>
                                                )  : (
                                                    <div className="card-body">
                                                        <h5 className="card-title">
                                                            { 
                                                            props.data.role === "outsideperson" ?  props.data.details.outsideperson.name : props.data.details.faculty.name
                                                            }
                                                        </h5>
                                                        {
                                                            props.data.role === "outsideperson" ? (
                                                                <p className="card-text">
                                                                    {
                                                                        props.data.details.outsideperson.profession.length > 80 ? 
                                                                            `${props.data.details.outsideperson.profession.substring(0 , 80)} ...`
                                                                        : props.data.details.outsideperson.profession
                                                                    }
                                                                </p>
                                                            ) : (
                                                                <p className="card-text">
                                                                    {
                                                                        props.data.details.faculty.profession.length > 80 ? 
                                                                            `${props.data.details.faculty.profession.substring(0 , 80)} ...`
                                                                        : props.data.details.faculty.profession
                                                                    }
                                                                </p>
                                                            )     
                                                        }
                                                    </div>
                                                )
                                            }
                                            </div>
                                </div>
                        }
                    </div>
                )
                    
            }
        </div>
        
        
    )

}



export default ReviewCard;