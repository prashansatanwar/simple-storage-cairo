import React, { useEffect, useState, useMemo } from 'react'
import ConnectWallet from '../components/ConnectWallet'
import { useAccount, useContract, useProvider, useContractWrite, useContractRead } from '@starknet-react/core'


const CONTRACT_ADDRESS = "0x0254a85f6ad50ee9083f42d78d7e2c8b36cfea72eb413ca3a70131994de4b025";

function Home() {
  const { address, account } = useAccount();
  const [abi, setAbi] = useState(null);
  const { provider } = useProvider();
  const { contract } = useContract({ abi, address: CONTRACT_ADDRESS });
  const [newValue, setNewValue] = useState(10); // Assuming you have some state to hold the new value

  const contractReadData = useMemo(() => {
    if (!address || !contract ) return [];


    return [{
      address: contract?.address,
      functionName: 'get',
      abi: contract?.abi,
      args: [address],
      watch: true
    }];

  }, [contract, address]);


  
  const { data, isLoading, error, refetch } = useContractRead(contractReadData);


  const calls = useMemo(() => {
    if (!address || !contract) return [];

    const tx = {
      contractAddress: contract.address,
      functionName: 'set',
      calldata: [address, newValue]
    }
    return [tx];
  }, [contract, address, newValue]);

  const { write } = useContractWrite({ calls });

  function setStoredValue() {
    if (contract && address) {
      try {
        write(newValue);
        refetch();
        console.log("Value set successfully!");
      } catch (error) {
        console.error("Error setting value:", error);
      }
    }
  }
  
    async function getAbi() {
        try {
            const classInfo = await provider.getClassAt(CONTRACT_ADDRESS);
            setAbi(classInfo.abi); 
        } catch (error) {
            console.error("Error fetching ABI:", error);
        }
    }

  useEffect(() => {
      if (address) {
          getAbi();
      }
  }, [address]);

  useEffect(() => {
      if (contract && address) {
          console.log("Contract initialized:", contract);
          // contract.functions.get().then(val => console.log(val));
          setStoredValue();
          refetch();
          console.log("DATA", isLoading, data);
          contract.functions.get().then(val => console.log(val));
      }
  }, [contract, address]);




  return (
    <div className='h-full w-full flex flex-col '>
      <div className='text-4xl font-bold'> Simple Storage </div>

      <ConnectWallet/>

    </div>
  )
}

export default Home