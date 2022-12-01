import React, { useState } from "react";
import { ethers } from "ethers";

const WalletCard = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState("Connect Wallet");

	const connectWalletHandler = () => {
		if (window.ethereum) {
			window.ethereum.request({ method: "eth_requestAccounts" }).then((result) => {
				accountChangedHandler(result[0]);
			});
		} else {
			setErrorMessage("Install MetaMask");
		}
	};

	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getUserBalance(newAccount.toString());
	};

	const getUserBalance = (address) => {
		window.ethereum.request({ method: "eth_getBalance", params: [address, "latest"] }).then((balance) => {
			setUserBalance(ethers.utils.formatEther(balance));
		});
	};

	const chainChangedHandler = () => {
		window.location.reload();
	};

	window.ethereum.on("accountsChanged", accountChangedHandler);
	window.ethereum.on("chainChanged", chainChangedHandler);

	return (
		<div className="WalletCard">
			<h4>{"Connection to metamask using window.ethereum methods"}</h4>
			<button onClick={connectWalletHandler}>{connButtonText}</button>
			<div className="accountDisplay">
				<h3>address: {defaultAccount}</h3>
			</div>
			<div className="balanceDisplay">
				<h3>Balance : {userBalance}</h3>
			</div>
			{errorMessage}
		</div>
	);
};

export default WalletCard;
