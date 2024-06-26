'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Separator } from '../ui/separator'
import { LucideMousePointerClick, GitBranch, Database } from 'lucide-react'
import { menuOptions } from '@/lib/constant'
import clsx from 'clsx'
import React from 'react'
import { ModeToggle } from '../global/mode-toggle'


type Props = {}

const MenuOptions = (props: Props) => {
  const pathName = usePathname()
  
  return (
    <>
      <div className="w-[70px] flex-shrink-0"></div>

      <nav className=" dark:bg-black fixed left-0 top-0 h-full overflow-scroll justify-between flex items-center flex-col gap-10 py-6 px-2">
        <div className="flex items-center justify-center flex-col gap-8">
          <Link className="flex font-bold flex-row" href="/">
            UNO
          </Link>
          <TooltipProvider>
            {menuOptions.map((menuItem) => (
              <ul key={menuItem.name}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <li>
                      <Link
                        href={menuItem.href}
                        className={clsx("group h-8 w-8 flex items-center justify-center  scale-[1.5] rounded-lg p-[3px] cursor-pointer", {"dark:bg-[#2F006B] bg-[#EEE0FF] " : pathName === menuItem.href})}
                      >
                        <menuItem.Component selected={pathName === menuItem.href}/>
                      </Link>
                    </li>
                  </TooltipTrigger>
                </Tooltip> 
              </ul>
              ))}
          </TooltipProvider>
          <Separator/>
          <div className="flex items-center flex-col gap-9 dark:bg-[#353346]/30 py-4 px-2 rounded-full h-56 overflow-scroll border-[1px]">
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
              <LucideMousePointerClick className="dark:text-white" size={18}/>
              <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
            </div>
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
              <GitBranch className="dark:text-white" size={18}/>
              <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
            </div>
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
              <Database className="dark:text-white" size={18}/>
              <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
            </div>
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
              <GitBranch className="dark:text-white" size={18}/>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col gap-8">
          <ModeToggle/>      
        </div>
      </nav>
    </>
  )
}

export default MenuOptions