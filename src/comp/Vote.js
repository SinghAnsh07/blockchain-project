import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";

function Vote({ contract, account, provider }) {
  const [showVote, setShowVote] = useState(false);
  const [loading, setLoading] = useState(false);

  // Toggle vote form visibility
  const toggleVoteForm = () => {
    setShowVote((prevState) => !prevState);
  };

  // Handle vote submission
  const handleVoteSubmit = async (e) => {
    e.preventDefault();

    const voterID = document.getElementById("voterId").value;
    const voterName = document.getElementById("voterName").value;
    const candidateAddress = document.getElementById("CandidateAddress").value;

    if (voterID && voterName && candidateAddress) {
      try {
        setLoading(true);
        const signer = contract.connect(provider.getSigner());
        const tx = await signer.SetVote(
          voterID,
          voterName,
          account.toString(),
          candidateAddress
        );
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Voted Successfully!");
        alert("Vote Cast Successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error during vote submission:", error);
        alert("Error submitting vote. Please try again.");
      } finally {
        setLoading(false);
        setShowVote(false);
      }
    } else {
      alert("Please fill all input fields.");
    }
  };

  return (
    <div>
      <br />
      <div>
        <button
          onClick={toggleVoteForm}
          disabled={!account}
          className="btn btn-dark text-light"
        >
          Vote for Candidate!
        </button>
      </div>
      <br />
      {showVote && (
        <form onSubmit={handleVoteSubmit}>
          <div className="mt-3">
            <p className="h5">Voter Address: {account}</p>
          </div>
          <div className="form-group">
            <label>Your ID</label>
            <input type="text" id="voterId" className="form-control" />
          </div>
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" id="voterName" className="form-control" />
          </div>
          <div className="form-group">
            <label>Candidate Address</label>
            <input type="text" id="CandidateAddress" className="form-control" />
          </div>

          <button type="submit" className="btn btn-dark mt-2" disabled={loading}>
            {!loading ? (
              "Vote Now"
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
      )}
    </div>
  );
}

export default Vote;
