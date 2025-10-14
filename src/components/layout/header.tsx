
"use client";

import Link from "next/link";
import { Menu, X, Instagram, Facebook } from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from 'react';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Logo } from "@/components/ui/logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/memorial", label: "Memorial" },
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/espaco", label: "Nosso Espaço" },
  { href: "/planos", label: "Planos" },
];

const whatsappUrl = "https://wa.me/551142405253?text=Olá!%20Tudo%20bem?%20Gostaria%20de%20ser%20atendido%20e%20saber%20mais";


export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-20 items-center">
        
        {/* Left Side: Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>
        
        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary whitespace-nowrap",
                pathname === link.href ? "text-primary" : "text-gray-600"
              )}
            >
              {link.label}
            </Link>
          ))}
           <Link href="/contato" className={cn("transition-colors hover:text-primary whitespace-nowrap", pathname === "/contato" ? "text-primary" : "text-gray-600")}>
              Contato
            </Link>
        </nav>
        
        {/* Right Side: Contact Button */}
        <div className="hidden md:flex items-center ml-auto flex-shrink-0">
           <Button asChild>
            <Link href={whatsappUrl} target="_blank">
              Fale Conosco
            </Link>
          </Button>
        </div>

        {/* Mobile: Spacer to center logo and menu trigger */}
        <div className="md:hidden flex-1"></div>


        {/* Mobile Navigation Trigger */}
        <div className="md:hidden ml-auto">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
               <SheetHeader className="sr-only">
                  <SheetTitle>Menu Principal</SheetTitle>
                  <SheetDescription>Navegue pelas seções do site.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full p-4">
                <div className="flex justify-between items-center mb-8">
                  <Logo />
                   <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X />
                        <span className="sr-only">Fechar menu</span>
                     </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-6 text-lg font-medium">
                  {navLinks.map((link) => (
                     <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "transition-colors hover:text-primary",
                            pathname === link.href ? "text-primary" : "text-gray-700"
                          )}
                        >
                          {link.label}
                        </Link>
                     </SheetClose>
                  ))}
                   <SheetClose asChild>
                        <Link
                            href="/contato"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "transition-colors hover:text-primary",
                                pathname === "/contato" ? "text-primary" : "text-gray-700"
                            )}
                        >
                            Contato
                        </Link>
                    </SheetClose>
                </nav>
                 <div className="mt-auto flex flex-col gap-4">
                    <Button asChild size="lg">
                        <Link href={whatsappUrl} target="_blank">
                            Fale Conosco
                        </Link>
                    </Button>
                    <div className="flex justify-center gap-4">
                         <a href="https://www.instagram.com/petestrelacrematorio/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors"><Instagram size={24} /></a>
                         <a href="https://www.facebook.com/profile.php?id=100085433544976" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors"><Facebook size={24} /></a>
                    </div>
                 </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
