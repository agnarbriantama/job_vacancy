import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Modal } from "flowbite-react";

const ListjobVacancy = () => {
  const navigate = useNavigate();
  const [fetchStatus, setFetchStatus] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedQualification, setSelectedQualification] = useState("");
  const [selectedCompanyName, setSelectedCompanyName] = useState("");

  useEffect(() => {
    document.title = "List Job Vacancy ";

    if (fetchStatus === true) {
      axios
        .get("https://dev-example.sanbercloud.com/api/job-vacancy")
        .then((response) => setJobs(response.data.data))
        .catch((error) => console.error("Error fetching job list:", error));
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  const filterJobs = (job) => {
    const matchesQualification =
      selectedQualification === "" ||
      job.job_qualification.toLowerCase() ===
        selectedQualification.toLowerCase();

    const matchesCompanyName =
      selectedCompanyName === "" ||
      job.company_name.toLowerCase() === selectedCompanyName.toLowerCase();

    const matchesLocation = locationFilter
      ? job.company_city.toLowerCase() === locationFilter.toLowerCase()
      : true;

    const matchesSearchTerm =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchesQualification &&
      matchesCompanyName &&
      matchesLocation &&
      matchesSearchTerm
    );
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/list-job-vacancy/edit/${id}`);
  };
  const sliceword = (description) => {
    if (description == null) {
      return "Deskripsi Kosong";
    }

    const words = description.split(" ");
    const first8Words = words.slice(0, 8).join(" ");

    return first8Words;
  };
  //delete
  const handleDelete = async (id) => {
    const token = Cookies.get("token");
    try {
      await axios.delete(
        `https://dev-example.sanbercloud.com/api/job-vacancy/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFetchStatus(true);
      // Refresh job list after deletion
      const response = await axios.get(
        "https://dev-example.sanbercloud.com/api/job-vacancy"
      );
      setJobs(response.data.data);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 rounded-lg bg-gray-100 mt-16">
          <h1 className="text-center  font-bold text-4xl">List Job Vacancy</h1>

          <div className="pt-6 flex justify-center">
            <div className="">
              <span>
                <input
                  type="text"
                  placeholder="Cari pekerjaan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border p-2 rounded-md me-4 text-sm"
                />
              </span>
              <span>
                <select
                  value={selectedQualification}
                  onChange={(e) => setSelectedQualification(e.target.value)}
                  className="border p-2 rounded-md me-4 text-sm"
                >
                  <option value="">Semua Kualifikasi</option>
                  {[...new Set(jobs.map((job) => job.job_qualification))].map(
                    (jobQualification) => (
                      <option key={jobQualification} value={jobQualification}>
                        {jobQualification}
                      </option>
                    )
                  )}
                </select>

                <select
                  value={selectedCompanyName}
                  onChange={(e) => setSelectedCompanyName(e.target.value)}
                  className="border p-2 rounded-md me-4 text-sm"
                >
                  <option value="">Semua Perusahaan</option>
                  {[...new Set(jobs.map((job) => job.company_name))].map(
                    (companyName) => (
                      <option key={companyName} value={companyName}>
                        {companyName}
                      </option>
                    )
                  )}
                </select>

                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="border p-2 rounded-md me-4 text-sm"
                >
                  <option value="">Semua Lokasi Perusahaan</option>
                  {[...new Set(jobs.map((job) => job.company_city))].map(
                    (location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    )
                  )}
                </select>
              </span>
            </div>
          </div>
          <div className="mt-2">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="table rounded-lg overflow-hidden w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-blue-400 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-white">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      Judul
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      Nama Perusahaan
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      Kota Perusahaan
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      Kualifikasi Pekerjaan
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      Tempat
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      Lama Kerja
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      Deskripsi Pekerjaan
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      Gaji
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      Status Kerja
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      Action
                    </th>
                  </tr>
                </thead>

                {jobs.filter(filterJobs).map((job, numb) => (
                  <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        key={numb}
                      >
                        {numb + 1}
                      </th>
                      <td className="px-6 py-4">{job.title}</td>
                      <td className="px-6 py-4">{job.company_name}</td>
                      <td className="px-6 py-4">{job.company_city}</td>
                      <td className="px-6 py-4">{job.job_qualification}</td>
                      <td className="px-6 py-4">{job.job_type}</td>
                      <td className="px-6 py-4">{job.job_tenure}</td>
                      <td className="px-6 py-4">
                        {sliceword(job.job_description)}
                      </td>
                      <td className="px-6 py-4">
                        {job.salary_min} - {job.salary_max}
                      </td>
                      <td className="px-6 py-4">{job.job_status}</td>
                      <td className="px-6 py-4 space-x-4 space-x-reverse ">
                        <button
                          type="button"
                          value={job.id}
                          onClick={() => handleEdit(job.id)}
                          className=" text-white bg-yellow-300 border border-yellow-300 focus:outline-none hover:bg-yellow-100 focus:ring-4 focus:ring-yellow-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-800 dark:text-yellow dark:border-yellow-600 dark:hover:bg-yellow-700 dark:hover:border-yellow-600 dark:focus:ring-yellow-700"
                        >
                          Edit
                        </button>
                        <Button
                          color="failure"
                          onClick={() => setOpenModal(true)}
                        >
                          Delete
                        </Button>
                        <Modal
                          show={openModal}
                          onDelete={() => handleDelete(job.id)}
                          className="bg-black opacity-80"
                          onClose={() => setOpenModal(false)}
                        >
                          <Modal.Header>Warning</Modal.Header>
                          <Modal.Body>
                            <div className="space-y-6">
                              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Apakah anda yakin mau dihapus ?
                              </p>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              color="failure"
                              onClick={() =>
                                handleDelete(job.id) && setOpenModal(false)
                              }
                            >
                              I accept
                            </Button>
                            <Button
                              color="gray"
                              onClick={() => setOpenModal(false)}
                            >
                              Decline
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
            <div className="p-4">
              <button
                onClick={() => navigate("/dashboard/list-job-vacancy/create")}
                type="button"
                className=" focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Tambah Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListjobVacancy;
