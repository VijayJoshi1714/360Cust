import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Card() {
  // store user data
  const [userlist, setUserlist] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const navigate = useNavigate();

  // call first render
  useEffect(() => {
    getdata();
  }, []);

  // apicall
  async function getdata() {
    const response = await axios.get("https://randomuser.me/api/?results=9");

    const users = response.data.results.map((item) => ({
      id: item.login.uuid,
      name: `${item.name.first} ${item.name.last}`,
      email: item.email,
      place: `${item.location.city}, ${item.location.country}`,
      img: item.picture.large,
      role: "Developer",
      work: "Tech Company",
    }));

    // update the state with users
    setUserlist(users);
    setIsloading(false);
  }

  // loading spinner
  if (isloading) {
    return (
      <div className="w-8 h-8 border-4 border-t-blue-500 rounded-full animate-spin m-auto mt-20" />
    );
  }

  return (
    <div className="p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {userlist.map((user) => (
          <div
            key={user.id}
            onClick={() => navigate(`/profile/${user.id}`, { state: { user } })}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md cursor-pointer"
          >
            {/* user image */}
            <img
              src={user.img}
              alt={user.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <div className="text-center">
              <h3 className="font-bold text-lg">{user.name}</h3>
              <p className="text-gray-600">{user.role}</p>
              <p className="text-gray-600">{user.work}</p>
              <p className="text-gray-500 text-sm mt-2">{user.email}</p>
              <p className="text-gray-500 text-sm">{user.place}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
