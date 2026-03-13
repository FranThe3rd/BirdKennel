"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, Bell, Mail, ArrowRight, ArrowUpRight, Sparkles, Users, Gift } from "lucide-react"
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

const eventTypes = [
  {
    icon: Calendar,
    title: "Adoption Days",
    description: "Meet our available hounds in person and find your perfect match at our adoption events."
  },
  {
    icon: Gift,
    title: "Fundraisers",
    description: "Help us raise funds to support our foster hounds through various charity events."
  },
  {
    icon: Users,
    title: "Community Meetups",
    description: "Connect with other foxhound lovers and share experiences at our community gatherings."
  }
]

export default function EventsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden relative">
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
            Get Involved
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-background mb-6"
          >
            Upcoming <span className="italic text-primary">Events</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-background/70 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Join us at our events to meet our hounds, connect with fellow foxhound enthusiasts, and support our mission.
          </motion.p>
        </div>
      </section>

      {/* No Events Message */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <RevealSection>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-10"
            >
              <Calendar className="w-12 h-12 text-primary" />
            </motion.div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              No Events <span className="italic text-primary">Scheduled</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              We don&apos;t have any events scheduled right now, but we&apos;re always planning something special! Subscribe to be notified when we set up events.
            </p>
            
            <div className="bg-card border border-border rounded-2xl p-10 mb-10 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="font-serif text-2xl font-semibold text-foreground">
                  Get Event Notifications
                </h3>
              </div>
              <p className="text-muted-foreground mb-8">
                Be the first to know about upcoming events, adoption days, and fundraisers.
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
                <Link href="/friends" data-cursor-hover>
                  Learn About Our Mission
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

      {/* Event Types Section */}
      <section className="py-24 px-6 bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-16">
            <span className="inline-block text-primary font-medium text-sm tracking-[0.2em] uppercase mb-4">
              What To Expect
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Types of <span className="italic text-primary">Events</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Here are some of the events you can look forward to in the future.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6">
            {eventTypes.map((item, index) => (
              <RevealSection key={item.title}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card p-8 rounded-2xl border border-border shadow-lg text-center h-full"
                  data-cursor-hover
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-primary" />
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
