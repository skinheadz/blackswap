import { useState, useEffect } from "react";
const qs = require('qs');
const bigNumber = require('bignumber.js');
import styles from './nav.module.css'


export default function SwapBox(props) {

        const [modalDisplay, setModalDisplay] = useState('hidden');

        const [fromTokenText, setFromTokenText] = useState('FROM')
        const [fromTokenURL, setFromTokenURL] = useState('circle.png')
        const [fromTokenAmount, setFromTokenAmount] = useState(0)

        const [toTokenText, setToTokenText] = useState('TO')
        const [toTokenURL, setToTokenURL] = useState('circle.png')
        const [toTokenAmount, setToTokenAmount] = useState(0)

        const [currentTrade, setcurrentTrade] = useState({})
        const [currentSelectSide, setCurrentSelectSide] = useState("")

        const [priceOutput, setpriceOutput] = useState(0)
        const [gasPrice, setgasPrice] = useState(0);

        async function trySwap() {
            console.log('wallet connected: ', props.isConnected);
            if (!props.isConnected) return;
            if (!currentTrade.from || !currentTrade.to) return;
            const erc20abi= [{ "inputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "max_supply", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }];
            
            console.log( "trying swap", erc20abi);

            const Web3 = require('web3');//or try web3-eth-contract |||| loads 1.5MB how to reduce ||| gives provider
            var web3 = new Web3(Web3.givenProvider);
            const _provider = web3.givenProvider;
            console.log("provider", _provider);
            let accounts;
            try {
            accounts = await ethereum.request({ method: "eth_accounts" });
            } catch (error) {console.log(error);}
            if (!accounts) return;
            const takerAddress = accounts[0];
            console.log('givenProvider output', _provider);
            console.log("takerAddress: ", takerAddress);


            //allowance
            const ERC20Contract = new web3.eth.Contract(erc20abi, currentTrade.from.address)
            console.log("contract: ", ERC20Contract);

            const maxApproval = new bigNumber(2).pow(64).minus(1);

            const tx = await ERC20Contract.methods.approve(
                currentTrade.from.address,
                maxApproval
            )
            .send({ from: takerAddress })
            .then(tx => 
               console.log("tx: ", tx))
            .catch(error => console.log("USER DENIED: ", error))
            
            const swapQuoteJSON = await getQuote(takerAddress);
            if (swapQuoteJSON.from){ console.log("Im waiting on : ", swapQuoteJSON);
            setQuoteCode(swapQuoteJSON.code);
            const receipt = await web3.eth.sendTransaction(swapQuoteJSON);
            console.log("receipt:", receipt);}
            // 
            
            }

        async function getQuote(address) {
            if (!currentTrade.from || !currentTrade.to) return;//implement two way price fetching
                
                console.log("quote:", currentTrade, fromTokenAmount);
                let amountFrom = Number(fromTokenAmount * 10 ** currentTrade.from.decimals);
                

                const params = {
                    sellToken: currentTrade.from.address,
                    buyToken: currentTrade.to.address,
                    sellAmount: amountFrom,
                    takerAddress: address
                }

                const res = await fetch(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`);
                const swapQuoteJSON = await res.json(); 
                console.log("quote: ", swapQuoteJSON);
                return swapQuoteJSON;
        }

        async function getPrice() {
            if (!currentTrade.from || !currentTrade.to || fromTokenAmount === 0) return;//implement two way price fetching
                console.log("price:", currentTrade, fromTokenAmount);
                const amountFrom = fromTokenAmount * 10 ** currentTrade.from.decimals;

                const params = {
                    sellToken: currentTrade.from.address,
                    buyToken: currentTrade.to.address,
                    sellAmount: amountFrom
                }

                const res = await fetch(`https://api.0x.org/swap/v1/price?${qs.stringify(params)}`);
                const swapPriceJSON = await res.json(); 
                console.log("price: ", swapPriceJSON);
                setpriceOutput(swapPriceJSON.buyAmount / (10 ** currentTrade.to.decimals));
                setgasPrice(swapPriceJSON.gasPrice / (10 ** 9));

        }

        async function selectToken(token){
            closeModal();
            if (currentSelectSide === "from") {
            setcurrentTrade({...currentTrade, from: token});
        } else if (currentSelectSide === "to") { 
            setcurrentTrade({...currentTrade, to: token});
        } else console.log("error: ", currentSelectSide)
        }

        useEffect(() => {
            console.log("Changing from token and updating price on input: ", fromTokenAmount);
            getPrice();
        }, [fromTokenAmount])
        
        useEffect(() => {
            console.log(currentTrade, "changed");
            if (currentSelectSide === "from" && currentTrade.from) {
                setFromTokenText(currentTrade.from.symbol);
                setFromTokenURL(currentTrade.from.logoURI);
            } else if (currentSelectSide === "to" && currentTrade.to) {
                setToTokenText(currentTrade.to.symbol);
                setToTokenURL(currentTrade.to.logoURI)
            } else console.log("error: ", currentSelectSide)
            //LOG CURRENT TRADE OBJECT
            getPrice();
            // eslint-disable-next-line react-hooks/exhaustive-deps

        }, [currentTrade])

        function handleInput(event) {
            event.target.value = event.target.value.replace(/[^\d.]+/g,'');
            const amount = Number(event.target.value);
            console.log(typeof amount, amount)
            console.log(currentSelectSide);
            setFromTokenAmount(amount); //gets called cant access within this funciton
        }

        const [searchq, setSearchq] = useState('');

        function handleSearch(event) {
            setSearchq(event.target.value);
            console.log(searchq);
        }

        // options with default values
        function openModal(side) {
            setCurrentSelectSide(side);
            setModalDisplay("block")
        }
        function closeModal() {
            setModalDisplay("hidden")
        }

    return (
        <>


        <div className="flex items-center justify-center h-screen  ">
            <div className="overscroll-none d:flex-row md:max-w-xl rounded-2xl shadow-xl hover:shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/50">
           
            <div className={`${styles.navbar}  w-full max-w-sm rounded-xl border-2 border-[#461B2B] shadow-2xl p-6`}>
                <h5 className="mb-3 text-base font-semibold text-xl">
                    Swap Tokens:
                </h5>


                {/* whole list as li */}
                <ul className="my-2 space-y-2 group/topbottomlight">

                    {/* from text and modal */}

                    <li>
                        <a href="#" className="group-hover/topbottomlight:shadow-cyan-500/50 group-hover/topbottomlight:shadow-inner group-hover/topbottomlight:border-r group-hover/topbottomlight:border-l group-hover/topbottomlight:border-cyan-500 bg-gray-800/25 
                        rounded-sm hover:bg-gray-800/50 flex items-center p-3 text-base font-bold group">
                            
                            <img onClick={() => openModal("from")} className="mr-2 w-6 h-6 scale-125 border-2 border-gray-800/25 rounded-full" src={fromTokenURL} alt='from'/>
                            <button onClick={() => openModal("from")} className='flex-1 ml-3 whitespace-nowrap'>{fromTokenText}</button>
                            <input type="text" pattern="[0-9.]+" onInput={handleInput} className="form-input appearance-none inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-800/50 rounded"></input>
                        </a>
                   


           
                            <div id="modal" className={`z-10 w-full bg-gray-800/25 rounded ${modalDisplay} `} tabIndex="-1"  role="dialog">
                            


                                        {/* list */}
                                 <ul className="overflow-y-auto py-1 h-48 ">
                                    {props.tokens.map((tokenInfo) => (
                                    tokenInfo.chainId == 1 && (
                                    <a key={tokenInfo.symbol} href='#' onClick={() => selectToken(tokenInfo)}>
                                        {/* if searchq doesnt exist show full list */}
                                        {!searchq ? <li className="flex" key={tokenInfo.symbol}>
                                        <img key={tokenInfo.symbol} className="mr-2 w-6 h-6 rounded-full" src={tokenInfo.logoURI} alt='logo'/>
                                            {tokenInfo.symbol}</li>
                                        :
                                        tokenInfo.symbol.toLowerCase().includes(searchq) &&
                                        <li className="flex" key={tokenInfo.symbol}> 
                                            <img key={tokenInfo.symbol} className="mr-2 w-6 h-6 rounded-full" src={tokenInfo.logoURI} alt='logo'/>{tokenInfo.symbol}</li>}
                                    </a>)
                                    ))}

                                </ul>

                                             {/* search TODO: */}
                                <a className="flex justify-center items-center text-blue-600">
                                    <svg className="mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
                                    <input type='text' onInput={handleSearch} placeholder="Search" className="form-input inline-flex items-center justify-center  p-2 pl-10 ml-3 text-xs font-medium text-gray-500 bg-gray-800/50 rounded"/> 
                        
                                    {/* close button */}
                                    <button className="w-7" type="button" onClick={closeModal}>&times;</button>
                                </a>

                            </div>

                    </li>
       {/* modal end here, to text*/}
            <li>
                <a  href="#" className="bg-gray-800/25 hover:bg-gray-800/50 rounded-xl flex items-center p-3 text-base font-bold ">
                    <img onClick={() => openModal("to")} className="mr-2 w-6 h-6 scale-125 border-2 border-gray-800/25 rounded-full" src={toTokenURL} alt='to'/>
                    <button onClick={() => openModal("to")} className="flex-1 ml-3 whitespace-nowrap">{toTokenText}</button>
                    <input type="text" pattern="[0-9.]+" placeholder={priceOutput.toFixed(4)} className="form-input inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-800/50  rounded"/>
                </a>
            </li>
            {/* swapbutton */}
            <li>
                <a href="#" className="hover:shadow-cyan-500/50 hover:shadow-md hover:border-l hover:border-r hover:border-cyan-500 flex items-center p-3 text-base font-bold group hover:shadowƒ">                    
                    {!props.isConnected && <button onClick={trySwap} className="flex-1 ml-3 whitespace-nowrap ">Please Connect</button>}
                    {props.isConnected && <button onClick={trySwap} className="flex-1 ml-3 whitespace-nowrap">Swap</button>}
                </a>
            </li>

        </ul>
        <div>
            <a href="#" className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline">
                Network Fee: {gasPrice} gw</a>
        </div>
    </div>
    </div>
    </div>
        </>

    )
}
