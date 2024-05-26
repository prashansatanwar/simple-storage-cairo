import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useContract, useDisconnect, useProvider } from "@starknet-react/core";

function ConnectWallet() {
    const { address } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const [ abi, setAbi ] = useState();


    const { provider } = useProvider();

    function getAbi() {
        provider.getClassAt("0x003252eb18679466af2b170874f49b722e24f5751cedb626e068da18a8a170e5").then(val => {
            console.log(val);
            setAbi(val)
        })
    }
 
    useEffect(() => {
        getAbi();
        
    }, [address])

    // console.log(provider.getClassAt("0x003252eb18679466af2b170874f49b722e24f5751cedb626e068da18a8a170e5"));

    return (
        <div className="p-4 my-2 w-full flex flex-col bg-slate-500 rounded-lg">
            <div className="flex mb-3">

                <div className="text-xl font-bold ">Your Wallet</div>

                <div className="text-base ml-auto">
                    {address 
                        ? // disconnect
                            <div>
                                <button onClick={() => disconnect()} className="p-1 px-2 rounded-lg bg-red-600 hover:bg-red-700">
                                    Disconnect Wallet
                                </button>
                            </div>
                        : // connect
                            <div className="w-full flex justify-end">

                                {connectors.map((connector) => (
                                    <button
                                        key={connector.id}
                                        onClick={() => connect({ connector })}
                                        disabled={!connector.available()}
                                        className="p-1 px-2 mx-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
                                    >
                                            Connect {connector.name}
                                    </button>
                                ))}
                            </div>
                    }
                </div>
            </div>

            <div className="h-[3em] flex items-center  p-2 bg-slate-600 rounded-lg">
                {address || <div className="opacity-80 italic">Connect wallet to begin</div>}
            </div>

        </div>
    );
}

export default ConnectWallet