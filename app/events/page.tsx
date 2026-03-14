"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, Bell, Mail, ArrowRight, ArrowUpRight, Sparkles, Users, Gift, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

// ─── ADD NEW EVENTS HERE ──────────────────────────────────────────────────────
// To add a new event, copy one object and paste it into the array below.
// Set image to null if you don't have one yet — a placeholder will show instead.
const events = [
  /*
  {
    title: "Spring Adoption Day",
    date: "April 19, 2025",
    time: "10:00 AM – 3:00 PM",
    location: "Bird Kennel, Ruffin, NC",
    description: "Come meet our available hounds in person! This is a great opportunity to find your perfect foxhound companion. We'll have hounds of all ages available for adoption, and our team will be on hand to answer any questions about the breed and the adoption process.",
    category: "Adoption Day",
    image: "/images/events/spring-adoption.jpg", // set to null if no image
  },
  */
]
// ─────────────────────────────────────────────────────────────────────────────

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
  const hasEvents = events.length > 0

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

      {/* Events List OR No Events Message */}
      {hasEvents ? (
        <section className="py-24 px-6 bg-background">
          <div className="max-w-5xl mx-auto space-y-10">
            {events.map((event, index) => (
              <RevealSection key={index}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg group"
                >
                  <div className="grid md:grid-cols-2">
                    {/* Image */}
                    <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px] bg-secondary overflow-hidden">
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-secondary">
                          <Calendar className="w-16 h-16 text-primary/30" />
                          <span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">Event Photo Coming Soon</span>
                        </div>
                      )}
                      {/* Category badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wider px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <h2 className="font-serif text-3xl font-bold text-foreground mb-5">{event.title}</h2>

                      <div className="space-y-2.5 mb-6">
                        <div className="flex items-center gap-3 text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4 text-primary shrink-0" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground text-sm">
                          <Clock className="w-4 h-4 text-primary shrink-0" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground text-sm">
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <Button asChild size="lg" className="rounded-full group/btn">
                          <Link href="/available">
                            View Available Hounds
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full">
                          <a href="mailto:BirdKennels@gmail.com">RSVP / Contact</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </section>
      ) : (
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



              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline" size="lg" className="rounded-full group">
                  <Link href="/friends">
                    Learn About Our Mission
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <a href="mailto:BirdKennels@gmail.com">Contact Us</a>
                </Button>
              </div>
            </RevealSection>
          </div>
        </section>
      )}

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
            {eventTypes.map((item) => (
              <RevealSection key={item.title}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-card p-8 rounded-2xl border border-border shadow-lg text-center h-full"
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