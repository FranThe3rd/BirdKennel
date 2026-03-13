"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"

function RevealSection({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
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
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <main className="min-h-screen overflow-x-hidden relative">
      <Navbar />
      
      {/* Cinematic Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <Image
            src="/images/hero-foxhounds.jpg"
            alt="American Foxhounds"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block text-primary font-medium text-sm tracking-[0.2em] uppercase mb-4"
          >
            S.F.S.B. Registered K-978
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Our <span className="italic text-primary">Foxhounds</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/80 text-lg max-w-2xl leading-relaxed"
          >
            Each hound is registered with the Standard Foxhound Stud Book and comes from proven bloodlines for hunting and trial excellence.
          </motion.p>
        </motion.div>
      </section>

      {/* Foxhounds Grid */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foxhounds.map((hound, index) => (
              <RevealSection key={hound.name}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border group"
                  data-cursor-hover
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={hound.image}
                      alt={hound.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {hound.sfsbNumber && (
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
                        #{hound.sfsbNumber}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-2xl font-semibold text-foreground">{hound.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        hound.sex === "Male" 
                          ? "bg-blue-50 text-blue-700 border border-blue-200" 
                          : hound.sex === "Female"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}>
                        {hound.sex}
                      </span>
                    </div>
                    
                    {hound.sfsbNumber ? (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground">Whelped</span>
                          <span className="text-foreground font-medium">{hound.whelped}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground">Litter #</span>
                          <span className="text-foreground font-medium">{hound.litterNumber}</span>
                        </div>
                        <div className="pt-3 space-y-2">
                          <p className="text-muted-foreground text-xs">
                            <span className="font-semibold text-foreground">Sire:</span> {hound.sire}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            <span className="font-semibold text-foreground">Gyp:</span> {hound.gyp}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm italic">
                        Not registered with S.F.S.B.
                      </p>
                    )}
                  </div>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-background/5" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <RevealSection>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-background mb-6">
              Interested in Our <span className="italic text-primary">Bloodlines?</span>
            </h2>
            <p className="text-background/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Contact us to learn more about our hounds, breeding program, or to schedule a visit to Bird Kennel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 group">
                <Link href="/litters" data-cursor-hover>
                  View Registered Litters
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-background/30 text-background hover:bg-background hover:text-foreground">
                <a href="mailto:BirdKennels@gmail.com" data-cursor-hover>
                  Contact Us
                </a>
              </Button>
            </div>
          </RevealSection>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
