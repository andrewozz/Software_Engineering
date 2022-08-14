import React, { useState, useEffect } from "react";
import axios from "axios"
import { useAuth } from "../../context/AuthContext";


const ContactSeller = ({setContactModal,sellerEmail}) => {

    const [userProfileDetails, setUserProfileDetails] = useState({})
    const { currentUser } = useAuth();
    
    //form details
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [message,setMessage] = useState("");
    const [purpose,setPurpose] = useState("");

    const getUserProfile = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3005/api/users/get-user-profile?uid=${currentUser.uid}`
          );
          setUserProfileDetails(res.data);
        } catch (err) {
          console.log(err);
        }
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        await getUserProfile();
        setContactModal(false);
        // axios function to backend nodemailer functionality
        axios.post("http://localhost:3005/api/list-flats/send-email-to-seller",{
            sellerEmail : sellerEmail, //send to sellerEmail the details of interested buyer
            buyerEmail : email,
            name: name,
            purpose: purpose,
            message: message,
        })
        .then((response)=>
        {
            console.log(response);
            alert("successfully sent an email to seller!")
        })
        .catch((err)=>
        {
            console.log(err);
            alert("something went wrong. Please refresh!")
        })
    }

    return (
        <div className='contact-seller'>
            <div className='custom-modal-bg'>
                <div className='custom-modal' style={{position : "relative", width: "600px"}}>
                    <div className='close' style={{position : "absolute"}} onClick = {()=> setContactModal(false)}>X</div>
                    <h3>Contact seller</h3>
                    <div className='container-form'>
                        <form className='form-contact-seller' onSubmit={handleSubmit}>
                            <p style={{textAlign: "center"}}>Interested to purchase this flat? Submit this form and we will send an email to the seller!</p>
                            <input type="text" placeholder='Full name' name='name' onChange={(e)=>setName(e.target.value)}></input>
                            <input type="text" placeholder='Email' name = 'email' onChange={(e)=>setEmail(e.target.value)}></input>     
                            <input type="text" placeholder='Purpose' name = 'purpose' onChange={(e)=>setPurpose(e.target.value)}></input>     
                            <textarea placeholder='Send message to seller!' name='message' onChange={(e)=>setMessage(e.target.value)}></textarea>  
                            <button className='btn submit-btn' type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactSeller;
