import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { MdOutlineQueryBuilder } from "react-icons/md";
import { AiOutlineFileSearch } from "react-icons/ai";

const Detail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    document.title = "Detail";
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dev-example.sanbercloud.com/api/job-vacancy/${id}`
        );
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const formatRupiah = (price) => {
    if (price === 0) {
      return "Free";
    } else {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);
    }
  };
  return (
    <div className="px-11 pt-7 container mx-auto mb-40">
      <div className="card bg-gray-100 shadow-lg shadow-slate-700  ">
        {job && (
          <>
            <div className="p-9  ">
              <div className="flex items-center justify-center w-full h-64 mx-auto mb-4">
                <img
                  src={job.company_image_url}
                  className="w-full h-full object-cover"
                ></img>
              </div>

              <div className="">
                <h1 className="text-gray-900 font-bold text-4xl mt-3">
                  {job.title}
                </h1>
                <h5 className="text-gray-500 text-xl font-bold mb-3">
                  {job.company_name}
                </h5>
                <div className=" -mt-2">
                  {job.job_status === 0 ? (
                    <span class="bg-gray-100 text-gray-800 text-sm  font-bold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                      Close Hiring
                    </span>
                  ) : (
                    <span class="bg-green-100 text-green-800 text-sm me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 font-bold">
                      Open Hiring
                    </span>
                  )}
                </div>

                <div className="flex item-center">
                  <span className="mt-1">
                    <IoLocationOutline />
                  </span>
                  <span className="ml-2"> {job.company_city}</span>
                </div>

                <div className="flex items-center">
                  <span className="mt-0.5">
                    <MdAttachMoney />
                  </span>
                  <p>
                    <span className="ml-2">
                      {formatRupiah(job.salary_min)} -
                      {formatRupiah(job.salary_max)}
                    </span>
                  </p>
                </div>
                <div className="flex item-center">
                  <span className="mt-1">
                    <AiOutlineFileSearch />
                  </span>
                  <span className="ml-2">{job.job_type}</span>
                </div>
                <div className="flex items-center">
                  <span>
                    <MdOutlineQueryBuilder />
                  </span>
                  <span className="ml-2">{job.job_tenure}</span>
                </div>
                <div>
                  <button className="text-white bg-blue-500 border border-blue-200 focus:outline-none hover:bg-blue-300 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Apply Now
                  </button>
                </div>
                <div>
                  <h6 className=" text-gray-600 font-semibold">
                    Job Description
                  </h6>
                  <p>{job.job_description}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Detail;
