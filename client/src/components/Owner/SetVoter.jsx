import { useEffect, useState, Component} from "react";
import useEth from "../../contexts/EthContext/useEth";

function SetVoter() {
  const { state: { contract, accounts } } = useEth();

  const [listVotersAddress, setListVotersAddress] = useState([]);

  const addVoter = async() => {
      const addr = document.getElementById("addVoter").value;
      console.log("SETVOTER - L'adresse enregistrée est : " + addr);
      if(addr.length === 42){
      const transac = await contract.methods.addVoter(addr).send({from: accounts[0]});
      console.log("SETVOTER - La transac est : " + transac);

      const event = transac.events.voterRegistered.returnValues.VoterAddress;
      alert("L'utilisateur " + event + " a bien été ajouté.");

      let options = {
        fromBlock: 0,
        toBlock: 'latest',
      };

      const listVoters = await contract.getPastEvents('VoterRegistered', options);
      setListVotersAddress(listVoters);
  } else {
    alert("L'adresse n'est pas bonne.");
  }

  }

  return(
    <>
    <div className="addVoter">
        <input type="text" id="addVoter" placeholder="Entrez l'adresse de l'électeur à ajouter." />
        <button className="butt" onClick={() => addVoter()}>Envoyer</button>
    </div>
    
    <div>
      <p>Voici les adresses ayant interagi avec le contrat :</p>
        <table>
          {listVotersAddress.map((addresse) => (
            <tr>
              <td>{addresse.returnValues.addr}</td>
            </tr>
          ))}
        </table>
    </div>
    </>
  )
}

export default SetVoter;
