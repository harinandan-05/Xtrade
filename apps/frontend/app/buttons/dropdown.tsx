"use client"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import { useState } from 'react'


interface Dropdownprops {
  onselect: (symbol:string) => void
}
export default function DropDown({onselect}:Dropdownprops) {
    
  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
        Cryptos
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-green-400" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-900 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              onClick={() => onselect("ETHUSDT")}
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              ETH
            </a>
          </MenuItem>
          <MenuItem>
            <a
            onClick={() => onselect("SOL")}
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              SOL
            </a>
          </MenuItem>
          <MenuItem>
            <a
            onClick={() => onselect("BTCUSDT")}
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              BNB
            </a>
          </MenuItem>  
        </div>
      </MenuItems>
    </Menu>
  )
}
