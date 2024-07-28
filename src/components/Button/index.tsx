"use client"
import React from 'react';
import clsx from "clsx";
import { useState } from 'react';
import Link from 'next/link';

interface IProps {
  children: React.ReactNode
  to?: string
  variant?: "danger" | "wide" | "default" | "no-flex"
  outlined?: boolean
  className?: string
  override?: boolean
  type?: "button" | "submit" | "reset" | undefined
  onClick?: (a?: any) => void
};

function Button({ to="", variant="default", outlined=false, className="", override=false, children, type="button", onClick=()=> "", ...rest }: IProps) {
  const [effect, setEffect] = useState(false);
  const styles = (variant: string, outlined: boolean, className: string, override: boolean, effect: boolean) => clsx(
    className,
    ['text-center cursor-pointer whitespace-nowrap'], 
    // Products/Marketplace
    variant === 'danger'
      ? !override && 
          [ 
            outlined && 'p-6 py-2.5 text-sm font-medium border rounded-md border-[#ED3A3A] flex items-center justify-center gap-2 p-3 px-8 md:px-16 text-sm font-bold rounded-md outline-none w-fit focus:outline-[#ED3A3A]',
            !outlined && 'flex items-center justify-center gap-2 p-3 px-8 md:px-16 text-sm font-bold text-white rounded-md outline-none w-fit bg-[#ED3A3A] focus:outline-[#ED3A3A]'
          ]
      
    // Jobs
      : variant === 'wide'
        ? !override && 
              [ outlined && 'p-6 py-2.5 text-sm font-medium bg-white border rounded-md border-primary flex items-center justify-center gap-2 p-3 px-8 md:px-16 text-sm font-bold text-primary rounded-md outline-none w-fit focus:outline-primary',
              !outlined && 'flex items-center justify-center gap-2 p-3 px-8 md:px-16 text-sm font-bold text-white rounded-md outline-none w-fit bg-grad-linear focus:outline-primary'
            ]
   
            // Jobs
      : variant === 'no-flex'
        ? !override && 
        [ outlined && 'p-6 py-2.5 font-medium bg-white border rounded-md border-primary gap-2 p-2 px-2 md:px-3 font-bold text-primary rounded-md outline-none w-fit focus:outline-primary',
        !outlined && 'gap-2 text-sm font-bold text-white rounded-md outline-none w-fit bg-primary focus:outline-primary'
      ]

    // Default
      : !override && 
          [ outlined && 'p-6 py-2.5 font-medium bg-white border rounded-md border-primary flex items-center justify-center gap-2 p-2 px-2 md:px-3 font-bold text-primary rounded-md outline-none w-fit focus:outline-primary',
            !outlined && 'flex items-center justify-center gap-2 text-sm font-bold text-white rounded-md outline-none w-fit bg-primary focus:outline-primary'
          ],

    // Default
    effect && 'animate-button_click'
  )

  return to.length > 0 ? (
    <Link {...rest} onClick={() => { setEffect(true) }} onAnimationEnd={() => { setEffect(false) }} className={styles(variant, outlined, className, override, effect)} href={`${to}`}>
      {children}
    </Link>
  ) : (
    <button {...rest} onClick={() => { setEffect(true); onClick() }} onAnimationEnd={() => { setEffect(false) }} type={type} className={styles(variant, outlined, className, override, effect)}>
      {children}
    </button>
  );
}
               
export default Button;

