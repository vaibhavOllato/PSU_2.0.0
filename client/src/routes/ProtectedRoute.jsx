// import { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const hasPaid = user?.payment_status === "Paid";
//   const assessmentNotStarted = user?.assessment_status !== 1;

//   const [showModal, setShowModal] = useState(false);
//   const [redirect, setRedirect] = useState(false);

//   useEffect(() => {
//     if (!hasPaid || !assessmentNotStarted) {
//       setShowModal(true);
//     }
//   }, [hasPaid, assessmentNotStarted]);

//   const handleClose = () => {
//     setShowModal(false);
//     setRedirect(true);
//   };

//   if (redirect) {
//     return <Navigate to="/package" replace />;
//   }

//   if ((!hasPaid || !assessmentNotStarted) && showModal) {
//     return (
//       <div style={styles.backdrop}>
//         <div style={styles.modal}>
//           <h2 style={styles.title}>Access Denied</h2>
//           <p style={styles.message}>
//             {!hasPaid
//               ? "Please purchase a plan to access this page."
//               : "You have already completed the assessment."}
//           </p>
//           <button style={styles.button} onClick={handleClose}>
//             Go to Packages
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return children;
// };

// // Inline styles
// const styles = {
//   backdrop: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     height: "100vh",
//     width: "100vw",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 999,
//   },
//   modal: {
//     backgroundColor: "#fff",
//     padding: "2rem",
//     borderRadius: "10px",
//     textAlign: "center",
//     maxWidth: "400px",
//     width: "90%",
//   },
//   title: {
//     marginBottom: "1rem",
//     fontSize: "1.5rem",
//     fontWeight: "bold",
//     color: "#dd6e42",
//   },
//   message: {
//     marginBottom: "1.5rem",
//   },
//   button: {
//     padding: "0.6rem 1.2rem",
//     fontSize: "1rem",
//     borderRadius: "6px",
//     backgroundColor: "#c85d3b",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer",
//   },
// };

// export default ProtectedRoute;

import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const hasPaid = user?.payment_status === 1; // 1 = Paid, 0 = Not Paid
  const assessmentNotStarted = user?.assessment_status !== 1;

  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!hasPaid || !assessmentNotStarted) {
      setShowModal(true);
    }
  }, [hasPaid, assessmentNotStarted]);

  const handleClose = () => {
    setShowModal(false);
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/package" replace />;
  }

  if ((!hasPaid || !assessmentNotStarted) && showModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl animate-scaleIn text-center">
          <h2 className="text-2xl font-bold text-[#dd6e42] mb-3">
            Access Denied
          </h2>
          <p className="text-gray-700 mb-6">
            {!hasPaid
              ? "Please purchase a plan to access this page."
              : "You have already completed the assessment."}
          </p>
          <button
            onClick={handleClose}
            className="bg-[#c85d3b] hover:bg-[#b34e30] text-white px-5 py-2 rounded-lg transition duration-200"
          >
            Go to Packages
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
