import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Register Account";
  }, []);

  const validateEmail = (email) => {
    //  format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const register = () => {
    if (!name.trim()) {
      setError("Nama tidak boleh kosong.");
      return;
    }
    if (!image_url.trim()) {
      setError("Gambar tidak boleh kosong.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Format email tidak valid. Mohon periksa kembali.");
      return;
    }

    // Validasi panjang password
    if (password.length < 8) {
      setError("Password baru harus minimal 8 karakter.");
      setSuccess(null);
      return;
    }

    const data = {
      name: name,
      image_url: image_url,
      email: email,
      password: password,
    };

    axios
      .post("https://dev-example.sanbercloud.com/api/register", data)
      .then((response) => {
        // Mengambil ID dari objek pengguna yang dikembalikan
        const userId = response.data.user.id;

        // Menyimpan data pengguna beserta ID
        const userData = {
          id: userId,
          ...response.data.user,
        };
        Cookies.set("user", JSON.stringify(userData), { expires: 1 });
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
        {error && (
          <Alert color="failure" icon={HiInformationCircle}>
            {error}
          </Alert>
        )}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Register Your Account
        </h1>
        <form className="mt-4 space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-sm font-medium text-gray-600"
              htmlFor="image_url"
            >
              Image URL:
            </label>
            <input
              type="text"
              id="image_url"
              name="image_url"
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-sm font-medium text-gray-600"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required=""
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <a
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>

          <button
            type="button"
            onClick={register}
            className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
