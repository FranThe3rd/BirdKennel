"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X, Dog, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Our Foxhounds", href: "/foxhounds" },
  { name: "Registered Litters", href: "/litters" },
  { name: "Friends of the Foxhound", href: "/friends" },
  { name: "Available Hounds", href: "/available" },
  { name: "Adopted Hounds", href: "/adopted" },
  { name: "Events", href: "/events" },
  { name: "Documents", href: "/documents" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm" 
          : "bg-background/95 backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-none"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group" data-cursor-hover>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${
              isScrolled ? "bg-primary" : "bg-primary lg:bg-white/10 lg:backdrop-blur-sm lg:border lg:border-white/20"
            }`}
          >
            <Dog className={`w-6 h-6 transition-colors duration-500 ${isScrolled ? "text-primary-foreground" : "text-primary-foreground lg:text-white"}`} />
          </motion.div>
          <div className="flex flex-col">
            <span className={`font-serif text-lg font-semibold leading-tight transition-colors duration-500 ${
              isScrolled ? "text-foreground" : "text-foreground lg:text-white"
            }`}>
              Bird Kennel
            </span>
            <span className={`text-xs transition-colors duration-500 ${
              isScrolled ? "text-muted-foreground" : "text-muted-foreground lg:text-white/60"
            }`}>
              Ruffin, NC
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex lg:gap-x-1">
          {navigation.slice(0, 5).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-full hover:bg-primary/10 ${
                isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
              }`}
              data-cursor-hover
            >
              {item.name}
            </Link>
          ))}
          <div className="relative group">
            <button 
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-full hover:bg-primary/10 ${
                isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
              }`}
              data-cursor-hover
            >
              More
            </button>
            <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl shadow-2xl py-3 min-w-[200px] backdrop-blur-xl"
              >
                {navigation.slice(5).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-between px-5 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors group/item"
                    data-cursor-hover
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex">
          <Button 
            asChild 
            className={`rounded-full px-6 transition-all duration-500 ${
              isScrolled 
                ? "" 
                : "bg-white text-foreground hover:bg-white/90"
            }`}
            data-cursor-hover
          >
            <Link href="/friends#donate">Donate</Link>
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 -m-2 transition-colors text-foreground"
          onClick={() => setMobileMenuOpen(true)}
          data-cursor-hover
        >
          <span className="sr-only">Open main menu</span>
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/60 backdrop-blur-md" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-card p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <Dog className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="font-serif text-xl font-semibold text-foreground">Bird Kennel</span>
                </Link>
                <button
                  type="button"
                  className="p-2 -m-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between text-lg font-medium text-foreground hover:text-primary transition-colors py-3 border-b border-border group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navigation.length * 0.05 }}
                  className="pt-6 mt-4"
                >
                  <Button asChild className="w-full rounded-full h-12 text-base">
                    <Link href="/friends#donate" onClick={() => setMobileMenuOpen(false)}>
                      Donate Now
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
