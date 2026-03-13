"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const foxhounds = [
  {
    name: "Winn-Dixie",
    image: "/images/hound-winn-dixie.jpg",
    sfsbNumber: "290103",
    sex: "Female",
    whelped: "July 10, 2023",
    litterNumber: "L133505",
    sire: "Big House Randy (271902)",
    gyp: "Night Moves Michaela (258868)"
  },
  {
    name: "Goose",
    image: "/images/hound-goose.jpg",
    sfsbNumber: "290101",
    sex: "Male",
    whelped: "July 10, 2023",
    litterNumber: "L133505",
    sire: "Big House Randy (271902)",
    gyp: "Night Moves Michaela (258868)"
  },
  {
    name: "Penny",
    image: "/images/hound-penny.jpg",
    sfsbNumber: "290102",
    sex: "Female",
    whelped: "July 10, 2023",
    litterNumber: "L133505",
    sire: "Big House Randy (271902)",
    gyp: "Night Moves Michaela (258868)"
  },
  {
    name: "Rocket",
    image: "/images/hound-rocket.jpg",
    sfsbNumber: "292003",
    sex: "Male",
    whelped: "July 4, 2022",
    litterNumber: "L129332",
    sire: "Fast Lane's Nitro (251109)",
    gyp: "Fast Lane's Amber (282878)"
  },
  {
    name: "Dynomite",
    image: "/images/hound-dynomite.jpg",
    sfsbNumber: "293792",
    sex: "Male",
    whelped: "March 30, 2022",
    litterNumber: "L123296",
    sire: "Elmore's Toby (248873)",
    gyp: "Nordstrom's T&T Pearl (271973)"
  },
  {
    name: "Crystal",
    image: "/images/hound-crystal.jpg",
    sfsbNumber: "293791",
    sex: "Female",
    whelped: "March 30, 2022",
    litterNumber: "L123296",
    sire: "Elmore's Toby (248873)",
    gyp: "Nordstrom's T&T Pearl (271973)"
  },
  {
    name: "Biscuit",
    image: "/images/hound-biscuit.jpg",
    sfsbNumber: null,
    sex: "Unknown",
    whelped: "Unknown",
    litterNumber: null,
    sire: "Unknown",
    gyp: "Unknown"
  }
]

export default function FoxhoundsPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">S.F.S.B. Registered</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6 text-balance">
              Our Foxhounds
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Meet our registered American Foxhounds at Bird Kennel. Each hound is registered with the Standard Foxhound Stud Book and comes from proven bloodlines for hunting and trial excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Foxhounds Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {foxhounds.map((hound, index) => (
              <motion.div
                key={hound.name}
                variants={fadeInUp}
                className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={hound.image}
                    alt={hound.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {hound.sfsbNumber && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      #{hound.sfsbNumber}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-2xl font-semibold text-foreground">{hound.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      hound.sex === "Male" 
                        ? "bg-blue-100 text-blue-700" 
                        : hound.sex === "Female"
                        ? "bg-pink-100 text-pink-700"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {hound.sex}
                    </span>
                  </div>
                  
                  {hound.sfsbNumber ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">S.F.S.B. #:</span>
                        <span className="text-foreground font-medium">{hound.sfsbNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Whelped:</span>
                        <span className="text-foreground">{hound.whelped}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Litter #:</span>
                        <span className="text-foreground">{hound.litterNumber}</span>
                      </div>
                      <div className="pt-3 border-t border-border mt-3">
                        <p className="text-muted-foreground mb-1">
                          <span className="font-medium text-foreground">Sire:</span> {hound.sire}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Gyp:</span> {hound.gyp}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Not registered with S.F.S.B.
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Interested in Our Bloodlines?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Contact us to learn more about our hounds, breeding program, or to schedule a visit to Bird Kennel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/litters">
                  View Registered Litters
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="mailto:BirdKennels@gmail.com">
                  Contact Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
