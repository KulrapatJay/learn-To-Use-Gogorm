'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';


type NavItemProps = {
    href: string;
    label: ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ href, label }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
      href={href}
      className={`block md:inline-block text-white hover:text-orange-200 py-2 md:py-0 transition duration-300 ${
        isActive ? 'font-bold underline' : ''
      }`}
    >
      {label}
    </Link>
    )
}

export default NavItem;
