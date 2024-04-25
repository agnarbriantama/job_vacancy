import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Profile";
    const userDataFromCookies = Cookies.get("user");
    if (userDataFromCookies) {
      const parsedUserData = JSON.parse(userDataFromCookies);

      setUserData(parsedUserData);

      console.log(parsedUserData);
    }
  }, []);

  const formatDate = (created_at) => {
    if (!created_at) {
      return "Tanggal tidak valid";
    }

    const dateObject = new Date(created_at);

    const dateFormatter = new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return dateFormatter.format(dateObject);
  };

  return (
    <div className="p-4 sm:ml-64">
      {userData ? (
        <div className="flex justify-center  mt-32">
          <div className="w-full max-h-screen  max-w-4xl bg-gray-50 border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pt-10 pb-20">
              <h5 className="mb-5 text-4xl font-serif  font-bold text-black dark:text-white">
                Your Account
              </h5>
              <img
                className="w-40 h-40 mb-3 rounded-full shadow-lg"
                src={userData.image_url}
                alt="img url"
              />
              <h5 className="mb-1 text-4xl font-serif  font-bold text-black dark:text-white">
                {userData.name}
              </h5>
              <span className="text-xl font-serif font-bold text-gray-600 dark:text-gray-400">
                {userData.email}
              </span>
              <div className="mb-4 text-sm text-gray-600 italic">
                Create : {formatDate(userData.created_at)}
              </div>
              <div className="">
                <button
                  onClick={() => navigate("/dashboard/change-password")}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Data pengguna tidak ditemukan.</p>
      )}
    </div>
  );
};

export default Profile;
