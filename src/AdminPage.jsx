import React, { useEffect, useState } from "react";
import "./AdminPage.css";

const AdminPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Backend API URL (your Render backend)
  const API_BASE = "https://psna-admin-backend-10-11-25.onrender.com";

  // ✅ Fetch all applicants on load
  useEffect(() => {
    fetch(`${API_BASE}/api/applicants`)
      .then((res) => res.json())
      .then((data) => {
        setApplicants(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching applicants:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1 className="admin-title">PSNA Foundation Technology</h1>
        <h3 className="admin-subtitle">Application Form Details</h3>

        <table className="admin-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Company</th>
              <th>Date</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {applicants.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-records">
                  No records found
                </td>
              </tr>
            ) : (
              applicants.map((applicant, index) => (
                <tr key={applicant._id}>
                  <td>{index + 1}</td>
                  <td>{applicant.fullName}</td>
                  <td>{applicant.businessName}</td>
                  <td>
                    {new Date(applicant.submissionDate).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        window.open(
                          `${API_BASE}/api/applicants/${applicant._id}/pdf`,
                          "_blank"
                        )
                      }
                      className="download-btn"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
