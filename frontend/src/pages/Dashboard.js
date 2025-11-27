import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container text-center mt-5">
        <h2>You are not logged in</h2>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">Welcome, {user.fullName}</h2>

      <div className="card p-4 shadow">
        <p><strong>Email:</strong> {user.email}</p>
        <p>
          <strong>Role:</strong>{" "}
          <span className="badge bg-info text-dark">{user.role}</span>
        </p>

        <hr />

        <h4>Quick Actions</h4>

        <div className="d-grid gap-2 mt-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/listings")}
          >
            View All Listings
          </button>

          {user.role === "landlord" && (
            <button
              className="btn btn-outline-success"
              onClick={() => navigate("/listings/create")}
            >
              Create New Listing
            </button>
          )}

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/messages")}
          >
            Messages
          </button>

          <button className="btn btn-danger" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
