import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
function Propsal({ contract, account }) {
  const [showPropsal, setShowPropsal] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  // Toggle proposal form visibility
  const togglePropsalForm = () => {
    setShowPropsal(!showPropsal);
  };
  // Handle proposal submission
  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    const accountInput = document.getElementById("Account").value;
    const nameInput = document.getElementById("Name").value;

    if (accountInput && nameInput) {
      setLoading(true);
      try {
        const tx = await contract.RequestForNextVoting(accountInput, nameInput);
        const receipt = await tx.wait();
        console.log("Proposal submitted successfully!");
        console.log(receipt);
        window.location.reload();
      } catch (error) {
        console.error("Error submitting proposal:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill in both fields.");
    }
  };
  // Fetch candidates for next proposal
  const fetchCandidates = async () => {
    try {
      const fetchedCandidates = await contract.getRequestPropsal();
      setCandidates(fetchedCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };
  return (
    <div>
      <br />
      <button onClick={togglePropsalForm} className="btn btn-primary">
        Send Proposal for Next Election
      </button>

      {showPropsal && (
        <form onSubmit={handleProposalSubmit} className="form-group">
          <div className="m-3">
            <p className="h5">Connected Address: {account}</p>
          </div>
          <div className="p-2">
            <label htmlFor="Account">Candidate Address</label>
            <input type="text" id="Account" className="form-control" />
          </div>
          <div className="p-2">
            <label htmlFor="Name">Candidate Name</label>
            <input type="text" id="Name" className="form-control" />
          </div>
          <button type="submit" className="btn btn-dark mt-2">
            {!loading ? (
              "Submit Now!"
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
      <br />
      <div className="mt-3">
        <button onClick={fetchCandidates} className="btn btn-success">
          Fetch Next Candidates
        </button>
        {candidates.length > 0 && (
          <div className="mt-3">
            {candidates.map((candidate) => (
              <div key={candidate._CandidateAddress}>
                <table>
                  <tbody>
                    <tr>
                      <td className="p-2">{candidate.name}</td>
                      <td className="p-2">{candidate._CandidateAddress}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Propsal;