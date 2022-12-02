import "./App.css";
import SmartContract from "./SmartContract";
import WalletCardEthers from "./WallerCardEther";
import WalletCard from "./WalletCard";

function App() {
	return (
		<div className="App">
			<WalletCard />
			<WalletCardEthers />
			<SmartContract />
		</div>
	);
}

export default App;
