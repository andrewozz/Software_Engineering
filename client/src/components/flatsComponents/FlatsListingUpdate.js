import React, { useRef } from "react";

import { Card, Form, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useFlatsListing } from "../../context/FlatsListingContext";
function FlatsListingUpdate() {
  const townRef = useRef();
  const blockNumberRef = useRef();
  const priceRef = useRef();
  const { currentUser } = useAuth();
  const { updateListedFlat, flatUpdateId, setFlatUpdateId } = useFlatsListing();
  const navigate = useNavigate();
  console.log("Update id " + flatUpdateId);
  const handleSubmit = (e) => {
    e.preventDefault();
    const flatsPostObj = {
      uid: currentUser.uid,
      fid: flatUpdateId,
      blockNumberReq: blockNumberRef.current.value,
      townReq: townRef.current.value,
      priceReq: priceRef.current.value,
    };
    updateListedFlat(flatsPostObj);
    setFlatUpdateId(0);
    navigate("/profile");
  };
  return (
    <>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="town">
              <Form.Label>Town</Form.Label>
              <Form.Control ref={townRef} required type="text" maxLength={50} />
            </Form.Group>
            <Form.Group id="blockNumber">
              <Form.Label>Block Number</Form.Label>
              <Form.Control
                ref={blockNumberRef}
                type="text"
                maxLength={4}
                required
              />
            </Form.Group>
            <Form.Group id="sale-price">
              <Form.Label>Selling Price</Form.Label>
              <Form.Control
                ref={priceRef}
                type="number"
                defaultValue={1}
                min={0}
                required
              />
            </Form.Group>
            <Button type="submit" variant="dark" className="mt-3">
              Update flat listing
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default FlatsListingUpdate;
