"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, ArrowRight, Calendar, ArrowUpRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
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

const adoptedHounds = [
  {
    name: "Tutter",
    image: "/images/hound-tutter.jpg",
    adoptedDate: "January 10, 2026",
    description: "Tutter was an awesome hound to foster, and he got along well with everyone at the kennel. He loved to eat, go for walks and bark up trees at squirrels and other critters. He was adopted to a loving home with other hounds to play with."
  }
]

const stats = [
  { value: "30+", label: "Hounds Rescued" },
  { value: "25+", label: "Forever Homes" },
  { value: "100%", label: "Love Given" }
]

export default function AdoptedPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <main className="min-h-screen overflow-x-hidden relative">
      <SiteHeader />
      
      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[450px] flex items-end overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <Image
            src="/images/hound-tutter.jpg"
            alt="Adopted foxhounds"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 text-primary font-medium text-sm tracking-[0.2em] uppercase mb-4"
          >
            <Heart className="w-4 h-4" fill="currentColor" />
            Success Stories
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Adopted <span className="italic text-primary">Hounds</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/80 text-lg max-w-2xl leading-relaxed"
          >
            These wonderful foxhounds have found their forever homes. Each adoption is a success story that warms our hearts.
          </motion.p>
        </motion.div>
      </section>

      {/* Adopted Hounds */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          {adoptedHounds.map((hound, index) => (
            <RevealSection key={hound.name}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-card rounded-3xl overflow-hidden shadow-xl border border-border"
                data-cursor-hover
              >
                <div className="grid lg:grid-cols-2">
                  <div className="relative aspect-square lg:aspect-auto overflow-hidden">
                    <Image
                      src={hound.image}
                      alt={hound.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
                      <Heart className="w-4 h-4" fill="currentColor" />
                      Adopted
                    </div>
                  </div>
                  <div className="p-10 lg:p-12 flex flex-col justify-center">
                    <h3 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">{hound.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-8">
                      <Calendar className="w-4 h-4" />
                      <span>Adopted on {hound.adoptedDate}</span>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {hound.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 px-6 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-background/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-background/5" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <RevealSection>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-16">
              Every Adoption Makes a <span className="italic text-primary">Difference</span>
            </h2>
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl bg-background/5 backdrop-blur-sm border border-background/10"
                  data-cursor-hover
                >
                  <p className="text-5xl md:text-6xl font-serif font-bold text-background mb-3">{stat.value}</p>
                  <p className="text-background/60 text-sm uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-primary-foreground/10" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full border border-primary-foreground/10" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <RevealSection>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Be Part of Our Next <span className="italic">Success Story</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              There are hounds waiting for their forever homes right now. Could you be the one to give them a second chance?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 group">
                <Link href="/available" data-cursor-hover>
                  View Available Hounds
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-white/30 text-white hover:bg-white hover:text-primary">
                <Link href="/friends#donate" data-cursor-hover>
                  Support Our Mission
                </Link>
              </Button>
            </div>
          </RevealSection>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
