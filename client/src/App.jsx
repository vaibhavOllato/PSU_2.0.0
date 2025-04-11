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
import BookSession from "./pages/sessions/BookSession";
import SessionManagement from "./pages/SessionManagement";
import PrivateRoute from "./routes/PrivateRoute";
import Setting from "./pages/Setting";
import { NotificationProvider } from "./context/NotificationProvider";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentFailurePage from "./pages/PaymentFailurePage";
import AssessmentSubmitted from "./pages/AssessmentSubmitted";
if (!window.Buffer) window.Buffer = Buffer;

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/login-otp" element={<LoginWithOTPForm />} />

            {/* Protected Routes */}

            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="package" element={<Package />} />{" "}
              <Route path="language" element={<Language />} />{" "}
              <Route path="instructions" element={<Instructions />} />{" "}
              <Route path="assessment" element={<AssessmentComponent />} />{" "}
              <Route path="assessment-submitted" element={<AssessmentSubmitted />} />{" "}
              <Route path="report" element={<Report />} />
              <Route
                path="english-report"
                element={
                  <PDFViewer width="100%" height="800px">
                    <EnglishReport />
                  </PDFViewer>
                }
              />
              <Route path="summary" element={<Summary />} />
              <Route path="book-session" element={<BookSession />} />
              <Route
                path="session-management"
                element={<SessionManagement />}
              />
              <Route path="profile-setting" element={<Setting />} />
              {/* <Route path="/payment-success" element={<PaymentSuccessPage />} /> */}
              {/* <Route path="/payment-failure" element={<PaymentFailurePage />} /> */}
            </Route>
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}
