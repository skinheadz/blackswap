import { useState } from "react";
import Status from './status'
import styles from './nav.module.css'

export default function Nav(connected) {
    
    const [buttonText, SetButtonText] = useState('Connect Wallet 🦊')

    const [isActive, SetIsActive] = useState(false);
    const [isActivating, SetIsActivating] = useState(false); //spinning circle

    const [_error, Set_error] = useState();
    async function connect() {
        if (typeof window.ethereum !== "undefined") {
            try {
                console.log("connecting");
                SetIsActivating(true);
                SetButtonText("connecting");
                const res = await ethereum.request({ method: "eth_requestAccounts" });
                console.log(res);
                if (res) {SetIsActive(true); SetIsActivating(false); SetButtonText("Connected"); connected.setisConnected(() => true)}
            } catch (error) {
                Set_error(error);
                console.log(_error);
            }
            // document.getElementById("swap_button").disabled = false; APP CONTEXT?
        } else {
            SetButtonText("Please install MetaMask")
        }
    }

    return (
        <nav className="bg-[#070707] px-2 py-2.5 fixed w-full z-20 top-0 left-0  outline outline-1 outline-[#461B2B]">
            <div className="container flex flex-wrap md:justify-between justify-center items-center mx-auto space-x-4">
                <a className="pl-2 group/item flex text-md font-bold items-centerflex items-center active:translate-y-0.5 duration-200" href="#">
                    {/* <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="BlackSwap Logo"/> */}
                    <span className="group-hover/item:-translate-x-3 delay-100 duration-300">&lt;&nbsp;</span>
                    <span className="self-center group-hover/item:scale-110  delay-100 duration-300 text-2xl font-bold whitespace-nowrap"> BlackSwap </span>
                    <span className="group-hover/item:translate-x-3 delay-100 duration-300">&nbsp;/&gt;</span>
                </a>
                <div className="flex md:order-2">
                    <ul>
                        <li>
                        
                            <button id="login_button" className="bg-[#461B2B] hover:bg-red-900 shadow font-medium rounded-lg text-sm w-40 py-2.5 mr-3 text-center md:mr-0
                            transition transform  active:translate-y-0.5 active:scale-100 hover:scale-105 motion-reduce:transition-none motion-reduce:active:transform-none duration-300 shadow-2xl"
                             type="submit" onClick={() => connect()}>
                                {/* TODO: CONNECTING SPINNING CIRCLE WHEN CONNECTING {isActivating &&
                                <svg class="animate-spin h-5 w-5 mr-3 bg-sky-400 ..." viewBox="0 0 24 24"></svg>} */}
                                {buttonText}</button>
                        </li>
                    </ul>
                </div>
                <div className="flex">
                    <ul className={`${styles.navbar} flex w-64 flex-row justify-center p-4 mt-4 space-x-12 rounded-lg border-gray-100 md:space-x-8 md:mt-0 border-0`}>
                        <li>
                            <Status isActivating={isActivating} isActive={isActive} error={_error} />
                        </li>
                        <li>
                            <a href="https://github.com/skinheadz" title="Github" rel="noreferrer" target="_blank"><img width="24" height="24" className=" bg-white rounded-full border-2 hover:border-cyan-500" src="GitHub-Mark-120px-plus.png" alt="logo" href='#'/></a>
                        </li>
                    </ul>
                </div>
            </div>
      </nav>
     )
}