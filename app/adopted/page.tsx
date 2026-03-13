"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ArrowRight, Calendar } from "lucide-react"
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

const adoptedHounds = [
  {
    name: "Tutter",
    image: "/images/hound-tutter.jpg",
    adoptedDate: "January 10, 2026",
    description: "Tutter was an awesome hound to foster, and he got along well with everyone at the kennel. He loved to eat, go for walks and bark up trees at squirrels and other critters. He was adopted to a loving home with other hounds to play with."
  }
]

export default function AdoptedPage() {
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
            <span className="text-accent font-medium text-sm tracking-wider uppercase">Success Stories</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6 text-balance">
              Adopted Hounds
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              These wonderful foxhounds have found their forever homes. Each adoption is a success story that warms our hearts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Adopted Hounds Grid */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {adoptedHounds.map((hound, index) => (
              <motion.div
                key={hound.name}
                variants={fadeInUp}
                className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-square md:aspect-auto overflow-hidden">
                    <Image
                      src={hound.image}
                      alt={hound.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Heart className="w-4 h-4" fill="currentColor" />
                      Adopted
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="font-serif text-3xl font-semibold text-foreground mb-2">{hound.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-6">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Adopted on {hound.adoptedDate}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {hound.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">
              Every Adoption Makes a Difference
            </h2>
            <div className="grid grid-cols-3 gap-8">
              {[
                { value: "30+", label: "Hounds Rescued" },
                { value: "25+", label: "Forever Homes" },
                { value: "100%", label: "Love Given" }
              ].map((stat, index) => (
                <div key={stat.label}>
                  <p className="text-4xl md:text-5xl font-serif font-bold mb-2">{stat.value}</p>
                  <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Be Part of Our Next Success Story
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              There are hounds waiting for their forever homes right now. Could you be the one to give them a second chance?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/available">
                  View Available Hounds
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/friends#donate">
                  Support Our Mission
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
