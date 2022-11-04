import Head from 'next/head'
import React from 'react';
import Nav from '../components/nav'
import SwapBox from '../components/swapbox'
import {useState} from 'react'

export async function getStaticProps() {
  console.log("initializing");
  try {
    const response = await fetch('https://cdn.furucombo.app/furucombo.tokenlist.json');
    const tokenListJSON = await response.json();
    if (tokenListJSON) return {props: tokenListJSON};
  } catch (error) { console.log('NO PROPS(!): error fetching: ', error);}
  
  return;

}

export default function Home(props) {
  let [isConnected, setisConnected] = useState(false)
  return (
    <>
      <Head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <title>BlackSwap - ultra slim and black decenetralized exchange</title>
          <link rel="shortcut icon" href="circle-64.ico" />
          <link rel="preconnect" href="https://www.zingerbugimages.com/backgrounds/pink_and_blue_stars.gif"></link>
          {/* <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
          <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
          <script src="https://unpkg.com/moralis/dist/moralis.js"></script> */}
      </Head>
      <Nav isConnected={isConnected} setisConnected={setisConnected} />
      {console.log(isConnected)}
      <SwapBox tokens={props.tokens} isConnected={isConnected}/>
    
    </>
  )
}
