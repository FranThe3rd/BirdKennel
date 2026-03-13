"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Bell, Mail, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react"
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

const breedingInfo = [
  {
    title: "S.F.S.B. Registered",
    description: "All our litters are registered with the Standard Foxhound Stud Book, ensuring documented lineage and breed standards."
  },
  {
    title: "Health Focused",
    description: "We prioritize the health and well-being of our hounds, ensuring puppies come from healthy, proven parents."
  },
  {
    title: "Hunting Heritage",
    description: "Our bloodlines are selected for hunting ability, temperament, and the preservation of the American Foxhound tradition."
  }
]

export default function LittersPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-background/5" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-primary font-medium text-sm tracking-[0.2em] uppercase mb-6"
          >
            <Sparkles className="w-4 h-4" />
            S.F.S.B. Registered K-978
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-background mb-6"
          >
            Registered <span className="italic text-primary">Litters</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-background/70 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Stay updated on our breeding program and upcoming litters of registered American Foxhound puppies.
          </motion.p>
        </div>
      </section>

      {/* No Litters Message */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <RevealSection>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-10"
            >
              <Bell className="w-12 h-12 text-primary" />
            </motion.div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              No Registered <span className="italic text-primary">Litters</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              We have not bred our hounds yet, but we will soon! Subscribe to our page to be notified when we have our first litter of registered American Foxhound puppies.
            </p>
            
            <div className="bg-card border border-border rounded-2xl p-10 mb-10 shadow-lg">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                Get Notified
              </h3>
              <p className="text-muted-foreground mb-8">
                Be the first to know when we have puppies available.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 bg-background border border-input rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    data-cursor-hover
                  />
                </div>
                <Button type="submit" className="rounded-full px-6" data-cursor-hover>
                  Subscribe
                </Button>
              </form>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" size="lg" className="rounded-full group">
                <Link href="/foxhounds" data-cursor-hover>
                  View Our Hounds
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href="mailto:BirdKennels@gmail.com" data-cursor-hover>
                  Contact Us
                </a>
              </Button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 px-6 bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-16">
            <span className="inline-block text-primary font-medium text-sm tracking-[0.2em] uppercase mb-4">
              Quality Breeding
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Our <span className="italic text-primary">Program</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Quality over quantity is our approach to breeding American Foxhounds.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6">
            {breedingInfo.map((item, index) => (
              <RevealSection key={item.title}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card p-8 rounded-2xl border border-border shadow-lg h-full"
                  data-cursor-hover
                >
                  <div className="text-5xl font-serif font-bold text-primary/20 mb-4">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
