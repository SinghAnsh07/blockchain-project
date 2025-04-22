import React, { useEffect, useState } from "react";

function FetchCandi({ contract }) {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const info = await contract.getCandidate();
        setCandidates(info);
      } catch (err) {
        console.error("Error fetching candidates:", err);
      }
    };

    if (contract) fetchCandidates();
  }, [contract]);

  return (
    <div>
      <p className="text-dark h3">Candidates</p>
      {candidates.map((candidate, index) => (
        <div key={candidate._CandidateAddress || index}>
          <table>
            <tbody>
              <tr>
                <td className="p-2">Candidate Name: {candidate.name}</td>
                <td className="p-2">
                  Candidate Address: {candidate._CandidateAddress}
                </td>
                <td className="p-2">Votes: {candidate.vote.toString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default FetchCandi;
