"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Bell, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function LittersPage() {
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
              Registered Litters
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Stay updated on our breeding program and upcoming litters of registered American Foxhound puppies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* No Litters Message */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8">
              <Bell className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              No Registered Litters
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We have not bred our hounds yet, but we will soon! Subscribe to our page to be notified when we have our first litter of registered American Foxhound puppies.
            </p>
            
            <div className="bg-card border border-border rounded-2xl p-8 mb-8">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Get Notified
              </h3>
              <p className="text-muted-foreground mb-6">
                Be the first to know when we have puppies available.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button type="submit">
                  Subscribe
                </Button>
              </form>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/foxhounds">
                  View Our Hounds
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

      {/* Info Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              About Our Breeding Program
            </h2>
            <p className="text-muted-foreground text-lg">
              Quality over quantity is our approach to breeding American Foxhounds.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl border border-border"
              >
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
