import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro";
import SetupVoterZone from "./components/Voter/SetupVoterZone";
import Owner from "./components/Owner/Owner";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Intro />
          <hr />
          <SetupVoterZone />
          <hr />
          <Owner />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
