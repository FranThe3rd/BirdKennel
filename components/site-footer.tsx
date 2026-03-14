"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Dog, Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageCircle, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Our Foxhounds", href: "/foxhounds" },
    { name: "Registered Litters", href: "/litters" },
    { name: "Friends of the Foxhound", href: "/friends" },
  ],
  adoption: [
    { name: "Available Hounds", href: "/available" },
    { name: "Adopted Hounds", href: "/adopted" },
    { name: "Events", href: "/events" },
    { name: "Documents", href: "/documents" },
  ],
}

export function SiteFooter() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <footer ref={ref} className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-3 mb-8 group" data-cursor-hover>
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20"
              >
                <Dog className="w-7 h-7 text-primary-foreground" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold text-background leading-tight">Bird Kennel</span>
                <span className="text-sm text-background/50">LLC • K-978</span>
              </div>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed mb-8">
              Bird Kennel is a registered LLC in North Carolina. #FriendsoftheFoxhound is a non-profit organization providing foster care and adoption services to American Foxhounds in need.
            </p>
            <div className="flex gap-3">
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://www.instagram.com/birdkennels/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background/70 hover:text-background hover:bg-primary transition-colors"
                data-cursor-hover
              >
                <Instagram className="w-4 h-4" />
                <span className="sr-only">Instagram</span>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://www.facebook.com/people/Bird-Kennel/61572717091443/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background/70 hover:text-background hover:bg-primary transition-colors"
                data-cursor-hover
              >
                <Facebook className="w-4 h-4" />
                <span className="sr-only">Facebook</span>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://www.snapchat.com/@birdkennel" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background/70 hover:text-background hover:bg-primary transition-colors"
                data-cursor-hover
              >
                <MessageCircle className="w-4 h-4" />
                <span className="sr-only">Snapchat</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-serif text-lg font-semibold mb-6 text-background">Navigation</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="group flex items-center gap-2 text-background/60 hover:text-background transition-colors text-sm"
                    data-cursor-hover
                  >
                    <span className="w-0 h-px bg-primary transition-all group-hover:w-3" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-serif text-lg font-semibold mb-6 text-background">Adoption</h3>
            <ul className="space-y-3">
              {navigation.adoption.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="group flex items-center gap-2 text-background/60 hover:text-background transition-colors text-sm"
                    data-cursor-hover
                  >
                    <span className="w-0 h-px bg-primary transition-all group-hover:w-3" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-serif text-lg font-semibold mb-6 text-background">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a 
                  href="tel:336-609-1515" 
                  className="flex items-center gap-3 text-background/60 hover:text-background transition-colors group"
                  data-cursor-hover
                >
                  <div className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  (336) 609-1515
                </a>
              </li>
              <li>
                <a 
                  href="mailto:BirdKennels@gmail.com" 
                  className="flex items-center gap-3 text-background/60 hover:text-background transition-colors group"
                  data-cursor-hover
                >
                  <div className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  BirdKennels@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-background/60">
                <div className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>231 Lindseys Drive<br />Ruffin, NC 27326</span>
              </li>
              <li className="flex items-center gap-3 text-background/60">
                <div className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span>Sun-Sat: 8am - 6pm</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-10 border-t border-background/10"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-background mb-2">Stay Updated</h3>
              <p className="text-background/60 text-sm">Subscribe to our newsletter for news and updates.</p>
            </div>
            <form className="flex gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 bg-background/5 border border-background/10 rounded-full text-background placeholder:text-background/40 text-sm flex-1 lg:w-72 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                data-cursor-hover
              />
              <Button 
                type="submit" 
                className="rounded-full px-6"
                data-cursor-hover
              >
                Subscribe
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-background/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-background/40 text-center md:text-left">
              All donations are processed through #FriendsoftheFoxhound and are not associated with Bird Kennel business operations.
            </p>
            <p className="text-xs text-background/40">
              &copy; {new Date().getFullYear()} Bird Kennel LLC. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
