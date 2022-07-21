import { useEffect, useState, Component} from "react";
import useEth from "../../contexts/EthContext/useEth";

const Phase = ({Status}) => {
    //const {state: { contract, accounts }} = useEth();
    //const [Status, setStatus] = useState("0");

    //useEffect (() => {

//    const get Status = () =>{
  //      const test = async() => {
    //    const goStatus = await contract.methods.workflowStatus().call();
      //  console.log("PHASE - 1 Quelle phase ??" + goStatus)
       // setStatus(goStatus);
       // test();
    //}}
        const whatStatus = () => {
            switch(Status) {
            case "0": return("Phase 1 : enregistrement des électeurs.");
                break;
            case "1": return("Phase 2 : enregistrement des propositions.");
                break;
            case "2": return("Phase 3 : fin de l'enregistrement des propositions.");
                break;
            case "3": return("Phase 4 : enregistrement des votes.");
                break;
            case "4": return("Phase 5 : fin de l'enregistrement des votes.");
                break;
            case "5": return("Phase 6 : annonce de la proposition gagnante.");
                break;

                default: return("Phase 1 : enregistrement des électeurs.");
        }}

        console.log("PHASE - 2 Quelle phase ??" + Status)
        whatStatus();
        console.log("PHASE - 3 Quelle phase ??" + Status)

        
      
   // }, [contract, setStatus]);

    return (
        <>
            <div className="StatusBloc">
                <span className="Status"><strong>{whatStatus(Status)}</strong> </span>
            </div> 
        </>
    )}


export default Phase;