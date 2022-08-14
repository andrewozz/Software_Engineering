import React from 'react'
import {HiLightBulb} from "react-icons/hi"
import {AiOutlineFileSearch} from "react-icons/ai"
import {FaHandshake} from "react-icons/fa"
import {MdKeyboardArrowRight} from "react-icons/md"

const FlowchartHomePage = () => {
  return (
    <div>
        <div class="basic-1">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="flow-chart">
                            <div class="element">
                                <div className='outline-icons'><HiLightBulb /></div>
                                <p class="title" style={{marginTop: "20px"}}>Planning</p>
                            </div>  
                            <div className='outline-arrow'><MdKeyboardArrowRight /></div>
                            <div class="element">
                                <div className='outline-icons'><AiOutlineFileSearch /></div>
                                <p class="title" style={{marginTop: "20px"}}>Searching</p>
                            </div> 
                            <div className='outline-arrow'><MdKeyboardArrowRight /></div>
                            <div class="element">
                                <div className='outline-icons'><FaHandshake /></div>    
                                <p class="title" style={{marginTop: "20px"}}>Dealing</p>
                            </div>  
                        
                        </div>  
                    </div> 
                </div>  
                <div class="row">
                    <div class="col-lg-12">
                        <p class="testimonial-text">Planning Searching Dealing. We provide you with all the tools needed to find a great home! </p>
                    </div>  
                </div>  
            </div>  
        </div>

    </div>
  )
}

export default FlowchartHomePage