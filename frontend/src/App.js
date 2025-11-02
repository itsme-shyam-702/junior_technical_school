// ✅ frontend/src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Admissions from "./pages/Admissions";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import AdmissionDashboard from "./pages/AdmissionDashboard";
import InboxDashboard from "./pages/InboxDashboard";

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/contact" element={<Contact />} />

              {/* Clerk sign-in and sign-up pages */}
              <Route path="/sign-in/*" element={<RedirectToSignIn />} />
              <Route path="/login" element={<Navigate to="/sign-in" replace />} />

              {/* Protected Routes */}
              <Route
                path="/events"
                element={
                  <SignedIn>
                    <Events />
                  </SignedIn>
                }
              />
              <Route
                path="/gallery"
                element={
                  <SignedIn>
                    <Gallery />
                  </SignedIn>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <SignedIn>
                    <AdmissionDashboard />
                  </SignedIn>
                }
              />
              <Route
                path="/inbox"
                element={
                  <SignedIn>
                    <InboxDashboard />
                  </SignedIn>
                }
              />

              {/* Catch all other routes */}
              <Route
                path="*"
                element={
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;
