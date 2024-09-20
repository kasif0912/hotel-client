import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { NavLink } from "react-router-dom";

const Room = ({ room, fromDate, toDate }) => {
  // console.log(room);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageUrls[0]} alt="Room" className="smallImg" />
      </div>
      <div className="col-md-7">
        <b>
          <h1>{room.name}</h1>
          <p>Max Count : {room.maxCount}</p>
          <p>Phone Number : {room.phoneNumber}</p>
          <p>Type : {room.type}</p>
        </b>
        <div style={{ float: "right" }}>
          {fromDate && toDate && (
            <NavLink
              to={{
                pathname: `/book/${room._id}/${fromDate}/${toDate}`,
              }}
            >
              <button
                className="btn btn-primary"
                style={{ marginRight: "5px" }}
              >
                Book now
              </button>
            </NavLink>
          )}
          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel indicators="">
            {room.imageUrls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} alt="bigimg" />
                </Carousel.Item>
              );
            })}
          </Carousel>

          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Room;
