"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Dog, Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react"
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
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Dog className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold text-background leading-tight">Bird Kennel</span>
                <span className="text-sm text-background/60">LLC • K-978</span>
              </div>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Bird Kennel is a registered LLC in North Carolina. #FriendsoftheFoxhound is a non-profit organization providing foster care and adoption services to American Foxhounds in need.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-background">Navigation</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-background/70 hover:text-background transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-background">Adoption</h3>
            <ul className="space-y-3">
              {navigation.adoption.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-background/70 hover:text-background transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-background">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-background/70">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:336-609-1515" className="hover:text-background transition-colors">(336) 609-1515</a>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:BirdKennels@gmail.com" className="hover:text-background transition-colors">BirdKennels@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>231 Lindseys Drive<br />Ruffin, NC 27326</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Sun-Sat: 8am - 6pm</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-sm text-background/50 text-center md:text-left">
                All donations are processed through #FriendsoftheFoxhound and are not associated with Bird Kennel business operations.
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Subscribe to newsletter"
                className="px-4 py-2 bg-background/10 border border-background/20 rounded-lg text-background placeholder:text-background/50 text-sm flex-1 md:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" variant="secondary" size="sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}
