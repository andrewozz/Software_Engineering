import React, { useState, useRef, useEffect } from "react";

import { Card, Button, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useFlatsListing } from "../../context/FlatsListingContext";

function FlatsListing() {
  const townRef = useRef();
  const blockNumberRef = useRef();
  const priceRef = useRef();
  const { currentUser } = useAuth();
  const { createFlatsToList } = useFlatsListing();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const flatsPostObj = {
      uid: currentUser.uid,
      town: townRef.current.value,
      blockNumber: blockNumberRef.current.value,
      price: priceRef.current.value,
    };
    try {
      createFlatsToList(flatsPostObj);
    } catch (err) {
      return;
    }
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
              List flat
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default FlatsListing;
