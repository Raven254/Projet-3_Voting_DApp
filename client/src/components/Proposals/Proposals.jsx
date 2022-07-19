import React from "react";
import "./Proposals.css";

function allProposals( { proposals }) {
    return (
      <div>
        <h3>Liste des propositions</h3>
        <table>
            <tr>
                <th>Id</th>
                <th>Description</th>
            </tr>
            {proposals.map((proposal) => (
                <tr>
                    <td>{proposals.returnValues._proposalId}</td>
                    <td>{proposals.returnValues._desc}</td>
                </tr>
            )
              )});
        </table>
      </div>
    );
}

export default Proposals;