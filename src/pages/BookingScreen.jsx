import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getroomById } from "../redux/Room/Action";
import Loader from "../components/Loader";
import { parse, differenceInDays } from "date-fns";
import { loadStripe } from "@stripe/stripe-js";
import { BASE_URL } from "../redux/apiConfig";

const BookingScreen = () => {
  const { id } = useParams();
  const { fromDate, toDate } = useParams();
  // console.log(id);
  const roomData = useSelector((state) => state.roomData.room);
  const auth = useSelector((store) => store.auth);
  // console.log(auth.user._id);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // console.log(roomData);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await dispatch(getroomById(id));
      setLoading(false);
    };
    fetch();
  }, [dispatch, id]);

  // function onToken(token) {
  //   console.log(token);
  // }

  const makePayment = async () => {
    // setLoading(true);

    const stripe = await loadStripe(
      "pk_test_51OwgfASBZRhVBRtafeFiaDN38gSs2kJHJ1u1Qvh3H83lLKC3Sz8VXnK2P9mE72DkdxWlw9JlSlrM5Vho9NETLiI000sZAcvYl5"
    );
    const bookingDetails = {
      room: roomData,
      userId: auth.user?._id,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(`${BASE_URL}/api/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(bookingDetails),
    });

    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    // setLoading(false);
    if (result.error) {
      console.log(result.error);
    }
  };
  const calculateTotalDays = (fromDate, toDate) => {
    if (!fromDate || !toDate) return 0;
    const start = parse(fromDate, "dd-MM-yyyy", new Date());
    const end = parse(toDate, "dd-MM-yyyy", new Date());
    const diffTime = differenceInDays(end, start);
    return diffTime + 1;
  };

  const totalDays = calculateTotalDays(fromDate, toDate);
  const totalAmount = totalDays * (roomData?.rentPerDay || 0);

  // const bookRoom = async () => {
  //   const bookingDetails = {
  //     room: roomData,
  //     userId: auth.user?._id,
  //     fromDate,
  //     toDate,
  //     totalAmount,
  //     totalDays,
  //   };
  //   await dispatch(roomBooking(bookingDetails));
  // };
  return (
    <div>
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : (
        <div className="main" style={{ marginTop: "70px" }}>
          <div className="left">
            <h1>{roomData?.name}</h1>
            <img src={roomData?.imageUrls[0]} className="bigimg" />
          </div>
          <div className="right">
            <h1>Booking Details</h1>
            <hr />
            <b>
              <p>Name : {auth.user?.fullName}</p>
              <p>From Date : {fromDate}</p>
              <p>To Date : {toDate}</p>
              <p>Max Count : {roomData?.maxCount}</p>
            </b>

            <h1>Amount Details</h1>
            <hr />
            <b>
              <p>Total Days :{totalDays} </p>
              <p>Rent Per Day : {roomData?.rentPerDay}</p>
              <h2>Total Amount : {totalAmount}</h2>
            </b>
            <div style={{ float: "left" }}>
              {/* <StripeCheckout
                token={onToken}
                amount={totalAmount * 100}
                currency="INR"
                stripeKey="pk_test_51OwgfASBZRhVBRtafeFiaDN38gSs2kJHJ1u1Qvh3H83lLKC3Sz8VXnK2P9mE72DkdxWlw9JlSlrM5Vho9NETLiI000sZAcvYl5"
              > */}
              <button
                className="btn btn-primary"
                style={{ marginRight: "5px" }}
                onClick={makePayment}
              >
                Book now
              </button>
              {/* </StripeCheckout> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingScreen;
