import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import RegisterForm from "./pages/RegisterForm";
import ForgotPasswordForm from "./pages/ForgotPasswordForm";
import LoginWithOTPForm from "./pages/LoginWithOTPForm";
import { AuthProvider } from "./context/AuthContext";
import Package from "./pages/Package";
import Language from "./pages/Language";
import Instructions from "./pages/Instructions";
import AssessmentComponent from "./pages/Assessment";
import Summary from "./pages/Summary";
import Report from "./pages/Report";
import { PDFViewer } from "@react-pdf/renderer";
import EnglishReport from "./pages/Reports/EnglishReport";
import { Buffer } from "buffer";
if (!window.Buffer) window.Buffer = Buffer;

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/login-otp" element={<LoginWithOTPForm />} />

          {/* Protected Routes (With Sidebar & Header) */}
          <Route path="/*" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="package" element={<Package />} /> {/* Fix: Remove / */}
            <Route path="language" element={<Language />} />{" "}
            {/* Fix: Remove / */}
            <Route path="instructions" element={<Instructions />} />{" "}
            {/* Fix: Remove / */}
            <Route path="assessment" element={<AssessmentComponent />} />{" "}
            {/* Fix: Remove / */}
            <Route path="report" element={<Report />} /> {/* Fix: Remove / */}
            <Route
              path="english-report"
              element={
                <PDFViewer width="100%" height="800px">
                  <EnglishReport />
                </PDFViewer>
              }
            />
            <Route path="summary" element={<Summary />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
