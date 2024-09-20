import React, { useEffect, useState } from "react";
import { getUser } from "../redux/Auth/Action";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import "./Booking.css"; // Import the CSS file
import { cancelBooking, getBookingByUserId } from "../redux/roomBooking/Action";
import { Tag, Divider } from "antd";

const Bookings = () => {
  const token = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);
  const bookingsData = useSelector((store) => store.roomBooking);
  const dispatch = useDispatch();
  const userId = auth.user?._id;
  const [loading, setLoading] = useState(false);
  const [localBookings, setLocalBookings] = useState([]);

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        dispatch(getBookingByUserId({ userId }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false); // Ensure loading state is turned off in case of error
      }
    };
    if (userId) {
      fetchBooking();
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (bookingsData.bookings) {
      setLocalBookings(bookingsData.bookings);
    }
  }, [bookingsData.bookings]);

  const cancel = async (bookingId, roomId) => {
    setLoading(true);
    await dispatch(cancelBooking({ bookingid: bookingId, roomid: roomId }));

    // Update local state to reflect the cancellation
    setLocalBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking._id === bookingId
          ? { ...booking, status: "CANCELLED" }
          : booking
      )
    );

    setLoading(false);
  };

  const renderBookings = () => {
    if (!Array.isArray(localBookings)) {
      return <p>No bookings available.</p>;
    }

    return localBookings.map((booking) => (
      <div className="bs" key={booking._id}>
        <p>
          <b>{booking?.room}</b>
        </p>
        <p>
          <b>BookingId</b> :{booking?._id}
        </p>
        <p>
          <b>CheckIn</b> :{booking?.fromDate}
        </p>
        <p>
          <b>CheckOut</b> :{booking.toDate}
        </p>
        <p>
          <b>Amount</b> :{booking.totalAmount}
        </p>
        <p>
          <b>Status</b> :{" "}
          {booking.status === "Booked" ? (
            <Tag color="green">CONFIRMED</Tag>
          ) : (
            <Tag color="red">CANCELLED</Tag>
            
          )}
        </p>
        {booking.status !== "Cancelled" && (
          <div className="button-container">
            <button
              className="btn btn-primary"
              onClick={() => cancel(booking._id, booking.roomId)}
            >
              Cancel Booking
            </button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {renderBookings()}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
