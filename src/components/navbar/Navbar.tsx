"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiMenu, mdiClose } from '@mdi/js';
import { cn } from '@/utils/ui';
import Navigation from '@/utils/interface/navigation';
import Image from 'next/image';

const navigation: Navigation[] = [
  { name: 'Home', path: '/home' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Ajuda', path: '/ajuda' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
    if (pathname === path) {
      e.preventDefault();
    }
  };

  const renderedNavigation = navigation.map((item, index) => {
    const isActive = pathname === item.path;
    return (
      <Link
        key={index}
        href={item.path}
        onClick={(e) => handleLinkClick(e, item.path)}
        className={cn(
          isActive 
            ? 'bg-gray-800 text-white' 
            : 'text-gray-600 hover:bg-gray-800 hover:text-white',
          'block rounded-xl px-3 py-2 text-base font-medium'
        )}
      >
        {item.name}
      </Link>
    );
  });

  return (
    <header className="bg-gray-300">
      <nav className="mx-auto flex items-center justify-between py-2 px-4" aria-label="Navegação">
        <div className="flex items-center">
          <Image
            src="/img/logo-horizontal.png"
            alt="Logo IFTM Horizontal"
            width={120}
            height={100}
            className="w-auto"
          />
        </div>
        {/* Menu Desktop */}
        <div className="hidden md:flex md:gap-x-12">
          {renderedNavigation}
        </div>
        {/* Botão Hambúrguer para Modo Móvel */}
        <div className="md:hidden">
          <button 
            type="button" 
            className="rounded-md p-2.5 text-gray-700" 
            onClick={toggleMenu}
          >
            <Icon path={isOpen ? mdiClose : mdiMenu} size={1} />
          </button>
        </div>
      </nav>
      {/* Menu Móvel */}
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col px-4 py-2">
            {renderedNavigation}
          </div>
        </div>
      )}
    </header>
  );
}
