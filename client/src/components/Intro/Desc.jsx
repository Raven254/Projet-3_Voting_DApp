import "./index.css";

function Desc() {
  return (
    <div className="desc">
      <p className="descAppu1">
        Ceci est une application de vote dont le processus est le suivant :
      </p>
        <ul className="descAppu2">
          <li><strong>L'administrateur</strong> enregistre des électeurs.</li>
          <li><strong>Les électeurs</strong> soumettent des propositions.</li>
          <li><strong>Les électeurs</strong> votent pour leur proposition favorite.</li>
          <li><strong>L'administrateur</strong> lance le décompte et affiche le gagnant.</li>
        </ul>
    </div>
  );
}

export default Desc;
