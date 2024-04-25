import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import axios from "axios";

const LandingPage = () => {
  const [jobVacancies, setJobVacancies] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedCompanyName, setSelectedCompanyName] = useState("");

  useEffect(() => {
    document.title = "Home";
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dev-example.sanbercloud.com/api/job-vacancy"
        );
        setJobVacancies(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //fungsi filter
  const filterJobs = (job) => {
    const matchesTitle =
      selectedTitle === "" ||
      job.title.toLowerCase() === selectedTitle.toLowerCase();

    const matchesCompanyName =
      selectedCompanyName === "" ||
      job.company_name.toLowerCase() === selectedCompanyName.toLowerCase();

    const matchesLocation =
      locationFilter === "" ||
      job.company_city.toLowerCase() === locationFilter.toLowerCase();

    const matchesSearchTerm =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.job_qualification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.job_type.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchesTitle && matchesCompanyName && matchesLocation && matchesSearchTerm
    );
  };

  //format rupiah
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

  const [currentId, setCurrentId] = useState(-1);
  //handle Detail
  const handleDetail = (event) => {
    let idData = parseInt(event.target.value);
    setCurrentId(idData);
  };

  return (
    <>
      <section>
        <div className="relative h-screen flex items-center justify-center text-white ">
          <img
            src="https://img.freepik.com/free-photo/top-view-person-writing-laptop-with-copy-space_23-2148708035.jpg?w=1060&t=st=1701146606~exp=1701147206~hmac=19b2571616695fac18c830c163b517b68b531c7ec3b9d4b90832a3d6ff4c73d5" // Gantilah dengan path atau URL gambar Anda
            alt="Banner Image"
            className="absolute inset-0 w-full h-screen object-cover filter brightness-50"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative  text-center ">
            <h1 className="text-6xl font-bold mb-4 transition-shadow">
              Selamat Datang Di Kerja<span className=" text-red-600">.in</span>
            </h1>
            <p className="text-lg">Cari Kerja Tanpa Harus Keluar Rumah</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-blue-500 hover:bg-blue-700 hover:text-white px-6 py-2 mt-8 rounded-full font-bold"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* card */}
      <div className="mt-10 mb-5 text-center font-bold text-4xl">
        Job Vacancy
      </div>
      <div className=" p-4 flex justify-around ml-7">
        <div className="">
          <input
            type="text"
            placeholder="Search ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-md me-4 text-sm"
          />
        </div>
        <div className="mb-3">
          <select
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            className="border p-2 rounded-md me-4 text-sm"
          >
            <option value="">Semua Pekerjaan</option>
            {[...new Set(jobVacancies.map((job) => job.title))].map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>

          <select
            value={selectedCompanyName}
            onChange={(e) => setSelectedCompanyName(e.target.value)}
            className="border p-2 rounded-md me-4 text-sm"
          >
            <option value="">Semua Perusahaan</option>
            {[...new Set(jobVacancies.map((job) => job.company_name))].map(
              (company_name) => (
                <option key={company_name} value={company_name}>
                  {company_name}
                </option>
              )
            )}
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="border p-2 rounded-md me-4 text-sm"
          >
            <option value="">Lokasi Perusahaan</option>
            {[...new Set(jobVacancies.map((job) => job.company_city))].map(
              (location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <div
        className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 ml-5  justify-start mb-8  p-4 "
        id="job-vacancy"
      >
        {jobVacancies.filter(filterJobs).map((job) => {
          return (
            <div
              key={job.id}
              className=" max-w-sm hover:bg-slate-100 bg-white border border-gray-200 rounded-lg shadow-lg shadow-slate-700  dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="rounded-t-lg w-full h-40 object-cover "
                src={job.company_image_url}
                alt=""
              />

              <div className="p-3">
                <div className="mb-2">
                  <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {job.title}
                  </h5>
                  <h6 className="text-gray-500 font-bold dark:text-gray-400">
                    {job.company_name}
                  </h6>
                </div>
                <div className=" -mt-2">
                  {job.job_status === 0 ? (
                    <span className="bg-gray-100 text-gray-800 text-sm  font-bold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                      Close Hiring
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-800 text-sm me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 font-bold">
                      Open Hiring
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <span>
                    <IoLocationOutline />
                  </span>

                  <p>
                    <span>{job.company_city}</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <span>
                    <MdAttachMoney />
                  </span>
                  <p>
                    <span>
                      {formatRupiah(job.salary_min)} -
                      {formatRupiah(job.salary_max)}
                    </span>
                  </p>
                </div>
                <div className=" item-center mt-2 text-gray-500">
                  <span>Requirement :</span>
                  <span> {job.job_qualification}</span>
                </div>
                <div className="pt-9 text-right">
                  {/* <Link to={`/detail/${job.id}`} type="button">
                    View Details
                  </Link> */}
                  <button
                    className="text-white bg-blue-700 border border-blue-200 focus:outline-none hover:bg-blue-300 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={() => navigate(`/detail/${job.id}`)}
                  >
                    DETAIL
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            If you need more information please contact us
          </p>
          <form action="#" className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@gmail.com"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                required=""
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows={6}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
                defaultValue={""}
              />
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
