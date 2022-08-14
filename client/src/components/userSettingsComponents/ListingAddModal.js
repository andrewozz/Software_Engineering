import React, { useState, useRef } from "react";

import { useFlatsListing } from "../../context/FlatsListingContext";
import { useAuth } from "../../context/AuthContext";
import { useImage } from "../../context/ImageUploadContext";
import { useNavigate } from "react-router-dom";
function ListingAddModal(props) {
  const { createFlatsToList, flatListedState, setFlatListedState } =
    useFlatsListing();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { uploadFlatImage } = useImage();
  const [fileStateArr, setFileStateArr] = useState([]);
  const [error, setError] = useState("");
  const allowedImageFormats = ["image/png", "image/jpeg", "image/jpg"];
  const townRef = useRef();
  const blockRef = useRef();
  const streetNameRef = useRef();
  const unitNoRef = useRef();
  const flatTypeRef = useRef();
  const sftRef = useRef();
  const resalePriceRef = useRef();
  const remainingLeaseRef = useRef();
  const addInfoRef = useRef();
  const style1 = {
    lineHeight: "0.3",
    fontSize: "18px",
    textAlign: "start",
    paddingTop : "15px"
  };

  const handleChange = async (e) => {
    e.preventDefault();
    // kiv: file size limit
    const fileInserted = e.target.files[0];
    console.log(fileInserted);
    if (allowedImageFormats.includes(fileInserted.type)) {
      // console.log(fileStateArr);
      for (const file of fileStateArr) {
        if (file.name === fileInserted.name) {
          setError("Duplicate files!");
          // console.log(error);
          return;
        }
      }
      setError("");
      setFileStateArr((fileStateArr) => [...fileStateArr, fileInserted]);
      // console.log(fileStateArr);
    } else {
      setError("File not in correct format!");
      // console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(townRef.current.value);
    const flatObj = {
      uid: currentUser.uid,
      town: townRef.current.value,
      street: streetNameRef.current.value,
      block: blockRef.current.value,
      unitNo: unitNoRef.current.value,
      resalePrice: resalePriceRef.current.value,
      flatType: flatTypeRef.current.value,
      sft: sftRef.current.value,
      remainingLease: remainingLeaseRef.current.value,
      addInfo: addInfoRef.current.value,
    };
    // console.log(townRef.current.value);
    console.table(`Submit info ${flatObj}`);
    const { latestFlatFid } = await createFlatsToList(flatObj);
    // console.log(latestFlatFid);
    uploadFlatImage(latestFlatFid, fileStateArr);
    await new Promise((r) => setTimeout(r, 800));
    setFlatListedState(!flatListedState);
    props.closeModalFunction(false);
    navigate("/settings");
  };
  return (
    <div className="custom-modal-bg">
      <div className="listing-modal custom-modal">
        <div className="close">
          <div
            className="close-sticky"
            onClick={() => {
              props.closeModalFunction(false);
            }}
          >
            x
          </div>
        </div>
        <h3>Add Listing</h3>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <label><p style={style1}>Town</p></label>
            <input type="text" placeholder="Town" ref={townRef}></input>
            <label><p style={style1}>Block</p></label>
            <input type="text" placeholder="Block" ref={blockRef}></input>
            <label><p style={style1}>Street Name</p></label>
            <input
              type="text"
              placeholder="street Name"
              ref={streetNameRef}
            ></input>
            <label><p style={style1}>Unit Number</p></label>
            <input type="text" placeholder="Unit No" ref={unitNoRef}></input>
            <label><p style={style1}>Flat Type</p></label>
            <input
              type="text"
              placeholder="Flat Type"
              ref={flatTypeRef}
            ></input>
            <label><p style={style1}>Size (sqft)</p></label>
            <input type="text" placeholder="Size (sqft)" ref={sftRef}></input>
            <label><p style={style1}>Resale Price</p></label>
            <input
              type="text"
              placeholder="Resale Price"
              ref={resalePriceRef}
            ></input>
            <label><p style={style1}>Remaining Lease</p></label>
            <input
              type="text"
              placeholder="Remaining Lease"
              ref={remainingLeaseRef}
            ></input>
            <label><p style={style1}>Additional information</p></label>
            <textarea
              type="text"
              placeholder="Additional information of house"
              ref={addInfoRef}
            ></textarea>
            <label><p style={style1} >Add images of your flat! </p></label>

            <input style={{height: "42px"}} type="file" required onChange={handleChange}></input>
            {fileStateArr.map((file) => {
              return <div key={file.name + file.lastModified}>{file.name}</div>;
            })}
            <div>{error}</div>
            <div className="buttons">
              <button type="submit" className="btn save">
                Add listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ListingAddModal;
