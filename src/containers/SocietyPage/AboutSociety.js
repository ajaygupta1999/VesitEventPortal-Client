import React, { Component } from 'react';
import { connect } from "react-redux";

class AboutSociety extends Component {
    render(){
        return(
            <div className="about-society-session container">
                <div className="society-iamges-and-description">
                    <img src="/images/iste_society_image.jpg" alt="society-image" />
                    <p id="society-main-text">Student chapter of Indian Society for Technical Education</p>
                </div>
                <p>
                    ISTE aims at developing not only technical temperament of budding engineers but also overall personality, reasoning and presentation skills. ISTE has a good reputation in the field of technical education and it strives hard in order to cultivate a fraternal spirit among teachers, administrators, technicians, investigators, practitioners and industrialists.
                    In todays world of excessive competition it becomes mandatory that along with technical excellence a person be able to put forth his/her ideas well.
                    This is what ISTE aims to develop technical as well as soft skills of a person. Events like TPP, Open Hardware etc. expose the students to the technical field and Debates, Group discussions develop the very needed confidence in each individual. thus ISTE aims at shaping a good individual and a technician at the same time.
                    For more details go to <a href="www.isteonline.in">www.isteonline.in</a>
                </p>
                <h2> NATIONAL ISTE </h2>
                <p>
                The Indian Society for Technical Education is a national, professional, non-profit making Society registered under the Societies Registration Act of 1860. First started in 1941 as the Association of Principals of Technical Institutions (APTI), it was converted into "Indian Society for Technical Education" in 1968 with a view to enlarge its activities to advance the cause of technological education. The major objective of the ISTE is to assist and contribute in the production and development of top quality professional engineers and technicians needed by the industries and other organisations. Being the only national organisation of educators in the field of Engineering and Technology, ISTE effectively contributes in various missions of the Union Government. The Ministry of Human Resource Development, CTE/DST/MIT/State Govts. are well associated with the ISTE for programmes relating to technical education.
For more details go to www.isteonline.in
                </p>
                <h2>ISTE Students Convention</h2>
                <p>
                First Annual Convention of ISTE Students, BIET, Davengare (Karnataka), 11 & 12 October, 1998 - Role of Technical Students in Nation Building. Chief Guest: Hon'ble Dr. S. Rame Gowda, Chairman, AICTE, New Delhi.
Second Annual Convention of ISTE Students, SES College of Engineering, Kopargaon (Maharashtra), 30 & 31, October, 1999 - Challenges for Technical Students in the 21st Century. Chief Guest: Hon'ble Dr. Vinod N. Walivadekar, Director, CEDT, Aurangabad.
Third Annual Convention of ISTE Students, Regional Engineering College, Jalandhar (Punjab), 14 & 15, October, 2000 - The Role of Information Technology in Technical Education. Chief Guest: Hon'ble Sardar Jagdish Singh Garcha, Minister for Technical Education and Industrial Training, Govt. of Punjab.
To know more, click here.
                </p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        society : state.society
    }
}

export default connect(mapStateToProps , null)(AboutSociety);