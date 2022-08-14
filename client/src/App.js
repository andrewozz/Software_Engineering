import { useState } from "react";
//react routing import
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// components import
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./Pages/ResetPassword";
import NavigationBar from "./components/NavigationBar";

// Pages import
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ExplorePage from "./Pages/ExplorePage";
import Search from "./Pages/Search";
import TempPage from "./Pages/TempPage";
import SignupSuccessPage from "./Pages/SignupSuccessPage";
//providers for react state management
import { AuthProvider } from "./context/AuthContext";
import { ResaleFlatProvider } from "./context/ResaleFlatContext";
import { FlatsListingProvider } from "./context/FlatsListingContext";
import { UserProvider } from "./context/UserContext";
import { ImageProvider } from "./context/ImageUploadContext";
import { ProfileImageProvider } from "./context/ProfilePictureContext";
import UserSettings from "./Pages/UserSettings";

// framer imports
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [dropdownToggled, setToggleDropdown] = useState(false);
  const location = useLocation();
  return (
    <div className="App">
      <AuthProvider>
        <ResaleFlatProvider>
          <FlatsListingProvider>
            <UserProvider>
              <ImageProvider>
                <ProfileImageProvider>
                  <div
                    className={dropdownToggled ? "translucentBackground" : ""}
                  ></div>
                  <NavigationBar
                    dropdownToggled={dropdownToggled}
                    setToggleDropdown={setToggleDropdown}
                  />
                  <div className="content">
                    <AnimatePresence exitBeforeEnter>
                      <Routes location={location}>
                        <Route path="/" element={<PrivateRoute />}>
                          {/* @Andrew this is the route to homepanel temp page */}
                          <Route path="/homepanel" element={<TempPage />} />
                          <Route path="/search" element={<Search />} />
                          <Route path="/explore" element={<ExplorePage />} />
                          <Route path="/settings" element={<UserSettings />} />
                          <Route
                            path="/signup-success"
                            element={<SignupSuccessPage />}
                          />
                        </Route>
                        <Route path="/home" element={<Home />} />
                        <Route exact path="/signup" element={<Signup />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route
                          path="/forgot-password"
                          element={<ResetPassword />}
                        />
                      </Routes>
                    </AnimatePresence>
                  </div>
                </ProfileImageProvider>
              </ImageProvider>
            </UserProvider>
          </FlatsListingProvider>
        </ResaleFlatProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
