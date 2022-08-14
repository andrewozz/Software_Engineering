import React from 'react'
import "../../styles/homepageStyles/homePageServices.modules.css";

const ServicesHomePage = () => {
  return (
    <div className='services'>
        <div id="services" class="basic-2">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h2 className='title-services'>SERVICES</h2>
                        <p class="p-heading" style={{textAlign : "center", width: "60%", margin : "0 auto"}}> Your Passion is our Satisfaction. We Believe in Service, and you Know that</p>
                    </div> 
                </div> 

                <div class="row feature-section">
                    <div className='col'>
                        <div className='feature-box'>
                            <div className='image-feature img1'></div>
                            <div className='content'>
                                <div className='content-title'>
                                    Research on flats
                                </div>
                                <div className='content-text'>
                                    With our highly customised search filter feature, you will be able to 
                                    research on a vast variety of HDB flats in Singapore based on 
                                    filters such as town, storey range, flat types and many more! 
                                    You can even assess crucial information of the flat such as its nearby amenities and its resale price transactions.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='feature-box'>
                            <div className='image-feature img2'></div>
                            <div className='content'>
                                <div className='content-title'>
                                    Explore Available listings
                                </div>
                                <div className='content-text'>
                                    Our explore page presents to you all available listings for you 
                                    to browse through and choose the ones that appeal to you 
                                    the most! You can even bookmark them and come back another
                                    day to view your saved bookmarks! 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='feature-box'>
                            <div className='image-feature img3'>
                            </div>
                            <div className='content'>
                                <div className='content-title'>
                                    Deal with sellers
                                </div>
                                <div className='content-text'>
                                    After you have decided on an available HDB flat up for sale, you will be able to contact 
                                    the seller of the listing and send him an email to discuss on
                                    a negotiable price for the HDB flat! You will also be able to view the 
                                    seller's profile information on our application!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div> 
        </div> 
    

    </div>
  )
}

export default ServicesHomePage