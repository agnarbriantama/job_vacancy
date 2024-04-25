import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

const CreateUpdateJob = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [input, setInput] = useState({
    title: "",
    company_name: "",
    company_city: "",
    job_description: "",
    job_qualification: "",
    job_type: "",
    job_status: "",
    job_tenure: "",
    salary_min: "",
    salary_max: "",
    company_image_url: "",
  });

  useEffect(() => {
    document.title = "Add Job Vacancy ";
    if (id) {
      document.title = "Edit Job Vacancy ";
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://dev-example.sanbercloud.com/api/job-vacancy/${id}`
          );
          const jobStatusString = response.data.job_status.toString();
          setInput((prevInput) => ({
            ...prevInput,
            ...response.data,
            job_status: jobStatusString,
          }));
        } catch (error) {
          console.error("Error fetching job data:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "salary_min" &&
      parseInt(value, 10) > parseInt(input.salary_max, 10)
    ) {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
        salary_max: value,
      }));
    } else if (
      name === "salary_max" &&
      parseInt(value, 10) < parseInt(input.salary_min, 10)
    ) {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
        salary_min: value,
      }));
    } else {
      setInput((prevInput) => ({ ...prevInput, [name]: value }));
    }
  };

  const handleCreateUpdate = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
      if (id) {
        // Update job
        await axios.put(
          `https://dev-example.sanbercloud.com/api/job-vacancy/${id}`,
          input,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        showAlert("success", "Job updated successfully!");
      } else {
        // Create job
        await axios.post(
          "https://dev-example.sanbercloud.com/api/job-vacancy",
          input,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        showAlert("success", "Job created successfully!");
      }

      // Navigasi ke list-job-vacancy
      setTimeout(() => {
        navigate("/dashboard/list-job-vacancy");
      }, 1500);
    } catch (error) {
      console.error("Error creating/updating job:", error);
      showAlert("error", "Failed to create/update job!");
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 rounded-lg bg-gray-100 mt-14">
        <h1 className="font-bold text-center text-2xl">{props.name}</h1>
        <form onSubmit={handleCreateUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Judul Pekerjaan
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={input.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nama Perusahaan
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={input.company_name}
              onChange={handleInputChange}
              name="company_name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Lokasi Perusahaan
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={input.company_city}
              onChange={handleInputChange}
              name="company_city"
              placeholder=""
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gambar Perusahaan
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={input.company_image_url}
              onChange={handleInputChange}
              name="company_image_url"
              placeholder=""
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Kualifikasi Kerja
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={input.job_qualification}
              onChange={handleInputChange}
              name="job_qualification"
              placeholder=""
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Waktu Kerja
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={input.job_type}
              onChange={handleInputChange}
              name="job_type"
              placeholder=""
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tempat Kerja
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={input.job_tenure}
              onChange={handleInputChange}
              name="job_tenure"
              placeholder=""
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gaji
            </label>
            <div className="flex">
              <input
                className="w-1/2 mr-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                // min={0}
                // max={input.salary_max}
                value={input.salary_min}
                onChange={handleInputChange}
                name="salary_min"
                placeholder="Min"
              />

              <input
                className="w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={input.salary_max}
                onChange={handleInputChange}
                name="salary_max"
                placeholder="Max"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Deskripsi Pekerjaan
            </label>

            {/* <textarea
              type="text"
              value={input.job_description}
              onChange={handleInputChange}
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea> */}

            <textarea
              rows="6"
              className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              value={input.job_description}
              onChange={handleInputChange}
              name="job_description"
              placeholder=""
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Staus Pekerjaan
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="jobStatus1"
                name="job_status"
                value="0"
                checked={input.job_status === "0"}
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              <label htmlFor="jobStatus0" className="text-gray-700">
                0
              </label>
              <input
                type="radio"
                id="jobStatus2"
                name="job_status"
                value="1"
                checked={input.job_status === "1"}
                onChange={handleInputChange}
                className="ml-4 mr-2"
                required
              />
              <label htmlFor="jobStatus1" className="text-gray-700">
                1
              </label>
            </div>
          </div>
          <div className="mb-4">
            {alert.show && (
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">{alert.message}</div>
                {/* <Toast.Toggle /> */}
              </Toast>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUpdateJob;
