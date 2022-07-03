/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { useWeb3React } from "@web3-react/core";
import { Popover, Transition } from '@headlessui/react'
import useEagerConnect from "../hooks/useEagerConnect";
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Account from "../components/Account";
import TokenBalanceRow from "../components/TokenBalanceRow";
import Image from 'next/image'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

const TOKEN_MAP = [
]

export default function Example() {

    const [tokens, setTokens] = useState(TOKEN_MAP);
    const [text, setText] = useState('');
    const [user, setUser] = useState('0x42F10Bb701ed230222aC6F748320040A0e3ddfAD')
    const [amount, setAmount] = useState(555)

    const { account, library } = useWeb3React();
    const triedToEagerConnect = useEagerConnect();
    const isConnected = typeof account === "string" && !!library;

    function handleToTextChange(event) {
        console.log(event.target.value);
        
        setText(event.target.value);
    }


    function handleFetchToken(event) {
        const arrayToken = text.split(/(?:\r\n|\r|\n)/g);

        const tokenArray = [];
        for (let index = 0; index < arrayToken.length; index++) {
            const element = arrayToken[index];
            const token = {};
            token["address"] = element;
            tokenArray.push(token);
        }
        setTokens(tokenArray);

    }

    function handleToAddressChange(event) {
        setUser(event.target.value);
    }

    function handleToAmountChange(event) {
        if (event.target.value) {
            setAmount(parseFloat(event.target.value));
        } else {
            setAmount(0);
        }
    }


  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <Popover>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <a href="#">
                      <span className="sr-only">Workflow</span>
                      <Image
                        alt="Workflow"
                        width={60}
                        height={60}
                        src="/ezsending.png"
                      />
                    </a>
                    <div className="-mr-2 flex items-center md:hidden">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                  {navigation.map((item) => (
                    <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
                      {item.name}
                    </a>
                  ))}
                </div>
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                    <Image
                        alt="Workflow"
                        width={60}
                        height={60}
                        src="/ezsending.png"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close main menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <main className="mt-10 mx-auto px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-4 xl:mt-28">
            <div className="flex justify-center">
              <Account triedToEagerConnect={triedToEagerConnect} />
            </div>
            <div className='mt-6'>
                Paste your tokens need to be processed
                <textarea
                id="text"
                name="text"
                rows={10}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="0xe6189Edd91d811A010367A1F571f5C44379AABd2&#10;0xC56E3B597856333A2ccD37c4A77421da141FF3be"
                value={text}
                onChange={handleToTextChange}
                />
            </div>
            <div className='mt-4 text-right'>
              <button className="roup py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleFetchToken} >Fetch Tokens</button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <div>Recepient</div>
                <input
                  id="to-address"
                  name="address"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="to address"
                  value={user}
                  onChange={handleToAddressChange}
                  />
              </div>
              <div>
                <div>Amount</div>
                <input
                id="to-amount"
                name="amount"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="to amount"
                value={amount}
                onChange={handleToAmountChange}
                />
              </div>
            </div>
            <div className="container mx-auto mt-6">
                <table className="table-fixed w-full border-separate border border-slate-400">
                    <thead>
                        <tr>
                            <th className="border border-slate-300">Name</th>
                            <th className="border border-slate-300">Symbol</th>
                            <th className="border border-slate-300">Balance</th>
                            <th className="border border-slate-300">TransferTo</th>
                            <th className="border border-slate-300">Amount</th>
                            <th className="border border-slate-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokens.map((item) => (
                            <TokenBalanceRow key={item.address} tokenAddress={item.address} toAddress={user} amount={amount} />
                        ))}
                        
                    </tbody>
                </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
