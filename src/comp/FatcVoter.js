import React, { useState, useEffect } from "react";

function FetchVoter({ contract }) {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const fetchedVoters = await contract.getVoter();
        setVoters(fetchedVoters);
      } catch (err) {
        console.error("Error fetching voters:", err);
      }
    };

    if (contract) fetchVoters();
  }, [contract]);

  return (
    <div>
      <p className="text-dark h3">Voters Information</p>
      {voters.map((voter) => (
        <div key={voter.voterAddress}>
          <table>
            <tbody>
              <tr className="p-2">
                <td className="p-2">Voter: {voter.name}</td>
                <td className="p-2">Voter Address: {voter.voterAddress}</td>
                <td className="p-2">Voted To: {voter._CandidateAddress}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default FetchVoter;
