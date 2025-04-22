import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
function Sec({ contract, account }) {
  const [loading, setLoading] = useState(false);
  // Set candidate function
  const setCandidate = async (e) => {
    e.preventDefault();
    const address = document.getElementById("address").value;
    const name = document.getElementById("name").value;
    if (address && name) {
      try {
        setLoading(true);
        console.log(`Setting Candidate: ${address}, ${name}`);
        const tx = await contract.SetCandidate(address, name);
        await tx.wait(); // Wait for transaction to be mined
        console.log("Candidate Set Successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error setting candidate:", error);
        alert("Error setting candidate. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill both fields.");
    }
  };
  return (
    <div className="pb-3">
      <form onSubmit={setCandidate}>
        <div className="form-group p-2">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            disabled={!account}
            className="form-control"
          />
        </div>
        <div className="form-group p-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Candidate Name"
            disabled={!account}
            className="form-control"
          />
        </div>
        <button
          type="submit"
          disabled={!account || loading}
          className="btn btn-dark mx-2 mt-2"
        >
          {!loading ? (
            "Set Candidate"
          ) : (
            <ReactBootStrap.Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </button>
      </form>
    </div>
  );
}
export default Sec;