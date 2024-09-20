import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { api } from "../redux/apiConfig";
import Loader from "../components/Loader";
import { getAllRooms } from "../redux/Room/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
const { TabPane } = Tabs;

const AdminScreen = () => {
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const user = auth.user;

  if (!user || user.isAdmin !== true) {
    navigate("/home");
  }

  return (
    <div className="admin-main-container">
      <h1 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add room" key="3">
          <Addroom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminScreen;

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await api.get("/api/getallbookings")).data;
        setBookings(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th>Bookings</th>
              <th>UserId</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              bookings.length > 0 &&
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.userId}</td>
                  <td>{booking.room}</td>
                  <td>{booking.fromDate}</td>
                  <td>{booking.toDate}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {!loading && bookings.length === 0 && <h1>No bookings found</h1>}
      </div>
    </div>
  );
}

export function Rooms() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.roomData.rooms);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      await dispatch(getAllRooms());
      setLoading(false);
    };

    fetchRooms();
  }, [dispatch]);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th>RoomId</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              rooms.length > 0 &&
              rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>{room.rentPerDay}</td>
                  <td>{room.maxCount}</td>
                  <td>{room.phoneNumber}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {!loading && rooms.length === 0 && <h1>No rooms found</h1>}
      </div>
    </div>
  );
}

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/getallusers");
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loader />}
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>IsAdmin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// add room component
export function Addroom() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [rentPerDay, setRentPerDay] = useState();
  const [maxCount, setMaxCount] = useState();
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [type, setType] = useState("");
  const [imageurl1, setimageurl1] = useState();
  const [imageurl2, setimageurl2] = useState();

  async function addRoom() {
    const newroom = {
      name,
      rentPerDay,
      maxCount,
      description,
      phoneNumber,
      type,
      imageUrls: [imageurl1, imageurl2],
      address,
    };
    console.log(newroom);
    try {
      setLoading(true);
      const result = await api.post("/api/addroom", newroom);
      setLoading(false);
      console.log(result.data);
      swal
        .fire("Congrats", "Your Room added successfully", "success")
        .then(() => {
          navigate("/home");
        });
      // navigate("/home");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <div className="row">
      <div className="col-md-5">
        {loading && <Loader />}
        <input
          type="text"
          className="form-control"
          placeholder="room name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="rent per day"
          value={rentPerDay}
          onChange={(e) => {
            setRentPerDay(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="max count"
          value={maxCount}
          onChange={(e) => {
            setMaxCount(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="phone number"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </div>

      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="image url-1"
          value={imageurl1}
          onChange={(e) => {
            setimageurl1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="image url-2"
          value={imageurl2}
          onChange={(e) => {
            setimageurl2(e.target.value);
          }}
        />

        <div className="text-right">
          <div className="btn btn-primary mt-2" onClick={addRoom}>
            Add Room
          </div>
        </div>
      </div>
    </div>
  );
}
