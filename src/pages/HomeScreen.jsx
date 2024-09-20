import React, { useEffect, useState } from "react";
import { getAllRooms } from "../redux/Room/Action";
import { useDispatch, useSelector } from "react-redux";
import Room from "../components/Room";
import Loader from "../components/Loader";
import "antd/dist/reset.css";
import { format, isWithinInterval, parse } from "date-fns";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const HomeScreen = () => {
  const rooms = useSelector((state) => state.roomData.rooms);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [duplicateRooms, setduplicateRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [searchKey, setsearchKey] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      await dispatch(getAllRooms());
      setLoading(false);
    };

    fetchRooms();
  }, [dispatch]);

  useEffect(() => {
    setduplicateRooms(rooms);
    setAvailableRooms(rooms);
  }, [rooms]);



  // search functionality by 3 ways
  const filterByDate = (dates) => {
    if (dates && dates.length === 2) {
      const startDate = dates[0].toDate();
      const endDate = dates[1].toDate();
      setFromDate(format(startDate, "dd-MM-yyyy"));
      setToDate(format(endDate, "dd-MM-yyyy"));

      const tempRooms = [];
      for (const room of duplicateRooms) {
        let isAvailable = true;
        if (room.currentBookings.length > 0) {
          for (const booking of room.currentBookings) {
            const bookingStart = parse(
              booking.fromDate,
              "dd-MM-yyyy",
              new Date()
            );
            const bookingEnd = parse(booking.toDate, "dd-MM-yyyy", new Date());

            if (
              isWithinInterval(startDate, {
                start: bookingStart,
                end: bookingEnd,
              }) ||
              isWithinInterval(endDate, {
                start: bookingStart,
                end: bookingEnd,
              }) ||
              isWithinInterval(bookingStart, {
                start: startDate,
                end: endDate,
              }) ||
              isWithinInterval(bookingEnd, { start: startDate, end: endDate })
            ) {
              isAvailable = false;
              break;
            }
          }
        }
        if (isAvailable || room.currentBookings.length === 0) {
          tempRooms.push(room);
        }
      }
      setAvailableRooms(tempRooms);
    }
  };

  const filterBySearch = () => {
    const tempRooms = duplicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setAvailableRooms(tempRooms);
  };

  const filterByType = (type) => {
    setType(type);
    
    if (type === "all") {
      setAvailableRooms(duplicateRooms);
    } else {
      // Adjusted to use case-insensitive comparison and handle "non deluxe" type correctly
      const tempRooms = duplicateRooms.filter(
        (room) => room.type.trim().toLowerCase() === type.trim().toLowerCase()
      );
      setAvailableRooms(tempRooms);
    }
  };
  
  return (
    <div className="container">
      <div className="row date">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="search rooms"
            value={searchKey}
            onChange={(e) => {
              setsearchKey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => filterByType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Delux">Delux</option>
            <option value="Non-Delux">Non Delux</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <h2>
            <Loader />
          </h2>
        ) : (
          (availableRooms.length > 0 ? availableRooms : rooms).map((room) => (
            <div key={room.id} className="col-md-9 mt-2">
              <Room room={room} fromDate={fromDate} toDate={toDate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
