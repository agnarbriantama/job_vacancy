import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login&Register/Login";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import Detail from "./components/Detail";
import Footer from "./components/Navbar/Footer";
import DashboardAdmin from "./components/DashboardAdmin";
import Sidebar from "./components/Navbar/Sidebar";
import ListjobVacancy from "./components/ListjobVacancy";
import CreateUpdateJob from "./components/CreateUpdateJob";
import Register from "./components/Login&Register/Register";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRoute2 from "./components/Login&Register/PrivateRoute2";
import Profile from "./components/Profile";
import ChangePassword from "./components/Login&Register/ChangePassword";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar /> <LandingPage /> <Footer />
              </>
            }
          />
          <Route exact element={<PrivateRoute2 />}>
            <Route exact path="/login" element={<Login />} />
          </Route>
          <Route exact element={<PrivateRoute2 />}>
            <Route exact path="/register" element={<Register />} />
          </Route>
          <Route
            path="/detail/:id"
            element={
              <>
                <Navbar /> <Detail /> <Footer />
              </>
            }
          />
          {/* <Route path="/dashboard" element={<DashboardAdmin />} /> */}
          <Route exact element={<PrivateRoute />}>
            <Route
              exact
              path="/dashboard"
              element={
                <>
                  <Sidebar /> <DashboardAdmin />
                </>
              }
            />
          </Route>
          <Route exact element={<PrivateRoute />}>
            <Route
              path="/dashboard/list-job-vacancy"
              element={
                <>
                  <Sidebar />
                  <ListjobVacancy />
                </>
              }
            />
          </Route>
          <Route exact element={<PrivateRoute />}>
            <Route
              path="/dashboard/list-job-vacancy/create"
              element={
                <>
                  <Sidebar />
                  <CreateUpdateJob
                    name="Add Job Vacancy"
                    button="Tambah Data"
                  />
                </>
              }
            />
          </Route>
          <Route exact element={<PrivateRoute />}>
            <Route
              path="/dashboard/list-job-vacancy/edit/:id"
              element={
                <>
                  <Sidebar />
                  <CreateUpdateJob
                    name="Edit Your Job Vacancy"
                    button="Edit Data"
                  />
                </>
              }
            />
          </Route>
          <Route exact element={<PrivateRoute />}>
            <Route
              path="/dashboard/profile"
              element={
                <>
                  <Sidebar />
                  <Profile />
                </>
              }
            />
          </Route>
          <Route exact element={<PrivateRoute />}>
            <Route
              path="/dashboard/change-password"
              element={
                <>
                  <Sidebar />
                  <ChangePassword />
                </>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <NotFound />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
