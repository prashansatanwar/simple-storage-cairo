import React, { useEffect, useState } from 'react'
import ConnectWallet from '../components/ConnectWallet'
import { useAccount, useContract, useProvider } from '@starknet-react/core'

function Home() {
  const { address } = useAccount();
  const { provider } = useProvider();
  // const { contract } = useContract({abi: provider.getClassAt(address), address: address})

  // console.log( provider.getClassAt(address?.toString()));
  return (
    <div className='h-full w-full flex flex-col '>
      <div className='text-4xl font-bold'> Simple Storage </div>

      <ConnectWallet/>

      {address}
      {/* {console.log(abi)} */}

      {/* <div>
        <span>Data in Storage: </span>
      </div>

      <div>
        <button>
          Get Data
        </button>
        <div>
            <form>
                <input type='text' placeholder='enter data' className='border-2'/>
            </form>
          <span>Set Data</span>
        </div>
      </div> */}
    </div>
  )
}

export default Home