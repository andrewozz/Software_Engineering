import React from 'react'
import "../../styles/homepageStyles/homepageAbout.modules.css";


const AboutHomePage2 = () => {
  return (
    <div className='about-home-page'>
        <div id="details" class="accordion">
            <div class="area-1" >
            </div><div class="area-2" >
              <h3 style={{textAlign: "center", margin: "10px" ,fontSize: "40px"}}>ABOUT US</h3>
              <div className='content-text' style={{margin: "0px"}} >
                  <div class="accordion-container"  id="accordionOne">
                        <div class="item">
                            <div id="headingOne">
                                <span data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" role="button">
                                    <span class="circle-numbering">1</span><span class="accordion-title">Objective and Mission</span>
                                </span>
                            </div>
                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionOne">
                                <div class="accordion-body">
                                  Provide a convenient platform for Singaporeans to research,buy or sell HDB flats. Allowing them to 
                                  have a fuss free deal when deciding to purchase a HDB resale flat
                                </div>
                            </div>
                        </div> 
                    
                        <div class="item">
                            <div id="headingTwo">
                                <span class="collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" role="button">
                                    <span class="circle-numbering">2</span><span class="accordion-title">Offers registered user a vast variety of information of a resale flat type </span>
                                </span>
                            </div>
                          
                        </div> 
                    
                        <div class="item">
                            <div id="headingThree">
                                <span class="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" role="button">
                                    <span class="circle-numbering">3</span><span class="accordion-title">Helps sellers advertise and promote their HDB flats</span>
                                </span>
                            </div>
                        </div> 

                        <div class="item">
                            <div id="headingFour">
                                <span class="collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" role="button">
                                    <span class="circle-numbering">4</span><span class="accordion-title">Offers buyers an enjoyable browsing and research experience in their journey of finding a suitable flat</span>
                                </span>
                            </div>
  
                        </div> 
                    </div> 
              </div>
                    
                    

            </div> 
        </div> 

    </div>
  )
}

export default AboutHomePage2