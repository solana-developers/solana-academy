<ChapterContainer>
<div>Chapter 1</div><div className="imgCheckedBox" />
</ChapterContainer>

<Difficulty>Difficulty: 2/5 | Estimated reading time: 9 min</Difficulty>

# Reading Data from the Network

# Lesson Objectives

<Spacer />

*By the end of this lesson, you will be able to:*

<Spacer />

- Explain accounts
- Explain SOL and lamports
- Explain public keys
- Explain the JSON RPC API
- Explain web3.js
- Install web3.js
- Use web3.js to create a connection to a Solana node
- Use web3.js to read data from the blockchain (balance, account info, etc.)

## TL;DR

- **Accounts** are like the files in Solana’s network ledger. All state data is stored in an account. Accounts can be used for many things, but for now we’ll focus on the aspect of accounts which store SOL.
- **SOL** is the name of Solana’s native token.
- **Lamports** are fractional SOL and are named after [Leslie Lamport](https://en.wikipedia.org/wiki/Leslie_Lamport).
- **Public keys**, often referred to as addresses, point to accounts on the Solana network. While you must have a specific secret key to perform certain functions within accounts, anyone can read account data with a public key.
- **JSON RPC API**: all interactions with the Solana network happens through the [JSON RPC API](https://docs.solana.com/developing/clients/jsonrpc-api). This is effectively an HTTP POST with a JSON body that represents the method you want to call.
- **@solana/web3.js** is an abstraction on top of the JSON RPC API. It can be installed with <AnimatedCode>npm</AnimatedCode> and allows you to call Solana methods as JavaScript functions. For example, you can use it to query the SOL balance of any account:


<Highlight class="language-typescript">
  async function getBalanceUsingWeb3(address: PublicKey): Promise\<number\> {
      const connection = new Connection(clusterApiUrl('devnet'));
      return connection.getBalance(address);
  }

  const publicKey = new PublicKey('7C4jsPZpht42Tw6MjXWF56Q5RQUocjBBmciEjDa8HRtp')
  getBalanceUsingWeb3(publicKey).then(balance => {
      console.log(balance)
  })
</Highlight>

# Overview

## Accounts

Solana accounts are similar to files in operating systems such as Linux. They hold arbitrary, persistent data and are flexible enough to be used in many different ways.

In this lesson we won’t consider much about accounts beyond their ability to store SOL (Solana’s native token - more on that later). However, accounts are also used to store custom data structures and executable code that can be run as programs. Accounts will be involved in everything you do with Solana.

<Spacer />

### Public Keys

Public keys are often referred to as addresses. The addresses point to accounts on the Solana network. If you want to run a specific program or transfer SOL, you’ll need to provide the necessary public key (or keys) to do so.

Public keys are 256-bit and they are often shown as base-58 encoded strings like 

<Highlight class="language-bash">
  7C4jsPZpht42Tw6MjXWF56Q5RQUocjBBmciEjDa8HRtp
</Highlight>

## The Solana JSON RPC API

<ImageContainer>
    <img alt="Illustration depicting how client-side interaction with the Solana network happens through the JSON RPC API" src="/images/lesson/web3/json-rpc-illustration.png">
</ImageContainer>

<Spacer />

All client interaction with the Solana network happens through Solana’s [JSON RPC API](https://docs.solana.com/developing/clients/jsonrpc-api).

<Spacer />

Per the [JSON-RPC 2.0 specification](https://www.jsonrpc.org/specification):

<Spacer />

<QuoteContainer>
    <img alt="story_image_1_0" src="/images/chapter/light.png">
    <div class="quote">JSON-RPC is a stateless, light-weight remote procedure call (RPC) protocol. Primarily this specification defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over http, or in many various message passing environments. It uses [JSON](http://www.json.org/) ([RFC 4627](http://www.ietf.org/rfc/rfc4627.txt)) as data format.</div>
</QuoteContainer>

<Spacer />

In practice, this specification simply involves sending a JSON object representing a method you want to call. You can do this with sockets, http, and more.

<Spacer />

This JSON object needs four members:

<Spacer />

- <AnimatedCode>jsonrpc</AnimatedCode>: The JSON RPC version number. This needs to be *exactly* <AnimatedCode>"2.0"</AnimatedCode>.
- <AnimatedCode>id</AnimatedCode>: An identifier that you choose for identifying the call. This can be a string or a whole number.
- <AnimatedCode>method</AnimatedCode>: The name of the method you want to invoke.
- <AnimatedCode>params</AnimatedCode>: An array containing the parameters to use during the method invocation.

<Spacer />

So, if you want to call the <AnimatedCode>getBalance</AnimatedCode> method on the Solana network, you could send an HTTP call to a Solana cluster as follows:

<Highlight class="language-typescript">
  async function getBalanceUsingJSONRPC(address: string): Promise\<number\> {
      const url = clusterApiUrl('devnet')
      console.log(url);
      return fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "jsonrpc": "2.0",
              "id": 1,
              "method": "getBalance",
              "params": [
                  address
              ]
          })
      }).then(response => response.json())
      .then(json => {
          if (json.error) {
              throw json.error
          }
          return json['result']['value'] as number;
      })
      .catch(error => {
          throw error
      })
  }
</Highlight>

## Solana’s Web3.js SDK

While the JSON-RPC API is simple enough, it involves a significant amount of tedious boilerplate. To simplify the process of communication, Solana Labs created the <AnimatedCode>@solana/web3.js</AnimatedCode> SDK as an abstraction on top of the JSON-RPC API.

<Spacer />

Web3.js allows you to call the JSON-RPC API methods using JavaScript functions. The SDK provides a suite of helper functions and objects. We’ll cover a lot of the SDK gradually throughout this course, but we won’t go over everything in depth, so be sure to check out the [documentation](https://docs.solana.com/developing/clients/javascript-reference) at some point.

<Spacer />

### Installation

Throughout this course, we’ll mostly be using <AnimatedCode>npm</AnimatedCode>. How to use <AnimatedCode>npm</AnimatedCode> is outside the scope of this course and we’ll assume it’s a tool you use regularly. [Check this out](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/) if that’s not the case.

<Spacer />

To install <AnimatedCode>@solana/web3.js</AnimatedCode>, set up your project the way you normally would then use:

<Spacer />

<AnimatedCode>npm install @solana/web3.js</AnimatedCode>

<Spacer />


### Connect to the Network

Every interaction with the Solana network using <AnimatedCode>@solana/web3.js</AnimatedCode> is going to happen through a <AnimatedCode>Connection</AnimatedCode> object. This object establishes a JSON-RPC connection with a Solana cluster (more on clusters later). For now, we’re going to use the url for the Devnet cluster rather than Mainnet. As the name suggests, this cluster is designed for developer use and testing.

<Highlight class="language-typescript">
const connection = new Connection(clusterApiUrl('devnet'));
</Highlight>

<Spacer />

### Read from the Network

Once you have a <AnimatedCode>Connection</AnimatedCode> object, querying the network is as simple as calling the appropriate methods. For example, to get the balance of a particular address, you do the following:


<Highlight class="language-typescript">
async function getBalanceUsingWeb3(address: PublicKey): Promise\<number\> {
    const connection = new Connection(clusterApiUrl('devnet'));
    return connection.getBalance(address);
}
</Highlight>

The balance returned is in fractional SOL called lamports. A single lamport represents 0.000000001 SOL. Most of the time when dealing with SOL the system will use lamports instead of SOL. Web3.js provides the constant <AnimatedCode>LAMPORTS\_PER\_SOL</AnimatedCode> for making quick conversions.

<Spacer />

...and just like that, now you know how to read data from the Solana blockchain! Once we get into custom data things will get more complicated. But for now, let’s practice what we’ve learned so far.

## Demo

Let’s create a simple website that lets users check the balance at a particular address.

<Spacer />

It’ll look something like this:

<ImageContainer>
    <img alt="Screenshot of demo solution" src="/images/lesson/web3/intro-frontend-demo.png">
</ImageContainer>

<Spacer />

In the interest of staying on topic, we won’t be working entirely from scratch. You can find the starter code [here](https://github.com/Unboxed-Software/solana-intro-frontend/tree/starter). The starter project uses Next.js and Typescript. If you’re used to a different stack, don’t worry! The web3 and Solana principles you’ll learn throughout these lessons are applicable to whichever frontend stack you’re most comfortable with.

<Spacer />

### 1. Get oriented

Once you’ve got the starter code, take a look around. Run the app with <AnimatedCode>npm run dev</AnimatedCode>. Notice that no matter what you put into the address field, when you click “Check SOL Balance” the balance will be a placeholder value of 1000.

<Spacer />

Structurally, the app is composed of <AnimatedCode>index.tsx</AnimatedCode> and <AnimatedCode>AddressForm.tsx</AnimatedCode>. When a user submits the form, the <AnimatedCode>addressSubmittedHandler</AnimatedCode> in <AnimatedCode>index.tsx</AnimatedCode> gets called. That’s where we’ll be adding the logic to update the rest of the UI.

<Spacer />

### 2. Install Dependencies

Use <AnimatedCode>npm install @solana/web3.js</AnimatedCode> to install our dependency on Solana’s Web3 library.

<Spacer />

### 3. Set the address balance

First, import <AnimatedCode>@solana/web3.js</AnimatedCode> at the top of <AnimatedCode>index.tsx</AnimatedCode>.

<Spacer />

Now that the library is available, let’s go into the <AnimatedCode>addressSubmittedHandler</AnimatedCode> and create an instance of <AnimatedCode>PublicKey</AnimatedCode> using the address value from the form input. Next, create an instance of <AnimatedCode>Connection</AnimatedCode> and use it to call <AnimatedCode>getBalance</AnimatedCode>. Pass in the value of the public key you just created. Finally, call <AnimatedCode>setBalance</AnimatedCode>, passing in the result from <AnimatedCode>getBalance</AnimatedCode>. If you’re up to it, try this independently instead of copying from the code snippet below.

<Highlight class="language-typescript">
  import type { NextPage } from 'next'
  import { useState } from 'react'
  import styles from '../styles/Home.module.css'
  import AddressForm from '../components/AddressForm'
  import * as Web3 from '@solana/web3.js'

  const Home: NextPage = () => {
    const [balance, setBalance] = useState(0)
    const [address, setAddress] = useState('')

    const addressSubmittedHandler = (address: string) => {
      setAddress(address)
      const key = new Web3.PublicKey(address)
      const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
      connection.getBalance(key).then(balance => {
        setBalance(balance / Web3.LAMPORTS_PER_SOL)
      })
    }

  ...

  }
</Highlight>

Notice that we are taking the balance returned by Solana and dividing it by <AnimatedCode>LAMPORTS\_PER\_SOL</AnimatedCode>. Lamports are fractional SOL (0.000000001 SOL). Most of the time when dealing with SOL, the system will use lamports instead of SOL. In this case, the balance returned by the network is in lamports. Before setting it to our state, we convert it to SOL using the <AnimatedCode>LAMPORTS\_PER\_SOL</AnimatedCode> constant.

<Spacer />

At this point you should be able to put a valid address into the form field and click “Check SOL Balance” to see both the Address and Balance populate below.

<Spacer />

### 4. Handle invalid addresses

We’re just about done. The only remaining issue is that using an invalid address doesn’t show any error message or change the balance shown. If you open the developer console, you’ll see <AnimatedCode>Error: Invalid public key input</AnimatedCode>. When using the <AnimatedCode>PublicKey</AnimatedCode> constructor, you need to pass in a valid address or you’ll get this error.

<Spacer />

To fix this, let’s wrap everything in a <AnimatedCode>try-catch</AnimatedCode> block and alert the user if their input is invalid.

<Highlight class="language-typescript">
  const addressSubmittedHandler = (address: string) => {
    try {
      setAddress(address)
      const key = new Web3.PublicKey(address)
      const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
      connection.getBalance(key).then(balance => {
        setBalance(balance / Web3.LAMPORTS_PER_SOL)
      })
    } catch (error) {
      setAddress('')
      setBalance(0)
      alert(error)
    }
  }
</Highlight>

<Spacer />

Notice that in the catch block we also cleared out the address and balance to avoid confusion.

<Spacer />

We did it! We have a functioning site that reads SOL balances from the Solana network. You’re well on your way to achieving your grand ambitions on Solana. If you need to spend some more time looking at this code to better understand it, have a look at the complete [solution code](https://github.com/Unboxed-Software/solana-intro-frontend). Hang on tight, these lessons will ramp up quickly.

<Spacer />

<BackgroundContainer>
<div class="exerciseTitle">Challenge</div>
<Spacer />
Since this is the first challenge, we’ll keep it simple. Go ahead and add on to the frontend we’ve already created by including a line item after “Balance”. Have the line item display whether or not the account is an executable account or not. Hint: there’s a <AnimatedCode>getAccountInfo</AnimatedCode> method.
<Spacer />
Your standard wallet address will *not* be executable, so if you want an address that *will* be executable for testing, use 

<Highlight class="language-bash">
CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN
</Highlight>

<ImageContainer>
    <img alt="Screenshot of final challenge solution" src="/images/lesson/web3/intro-frontend-challenge.png">
</ImageContainer>

<Spacer />
If you get stuck feel free to take a look at the [solution code](https://github.com/Unboxed-Software/solana-intro-frontend/tree/challenge-solution).

</BackgroundContainer>

<Spacer />
