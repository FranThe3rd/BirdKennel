"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Dog, Home, Users, ArrowRight, FileText, Instagram, Facebook } from "lucide-react"
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

const features = [
  {
    icon: Dog,
    title: "Foster Care",
    description: "We provide temporary housing and care for foxhounds until they find their forever homes."
  },
  {
    icon: Home,
    title: "Adoption Services",
    description: "We carefully match hounds with loving families who will provide them with the care they deserve."
  },
  {
    icon: Heart,
    title: "Medical Care",
    description: "Donations go toward food, medicines, wound treatment, and kennel improvements for our foster hounds."
  },
  {
    icon: Users,
    title: "Community Support",
    description: "We work with shelters and individuals to rescue foxhounds that might otherwise be euthanized."
  }
]

export default function FriendsPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/foxhound-rescue.jpg"
            alt="American Foxhounds at the rescue"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground/70" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto pt-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full text-background text-sm font-medium mb-6">
                501(c)(3) Nonprofit Organization
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 text-balance">
                #FriendsoftheFoxhound
              </h1>
              <p className="text-background/90 text-lg leading-relaxed mb-8">
                A nonprofit adoption and foster care service for unwanted American Foxhounds. No foxhound is unwanted, and they all deserve to live full and healthy lives.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/available">
                    Available Hounds
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10">
                  <a href="#donate">
                    Donate Now
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent font-medium text-sm tracking-wider uppercase">Our Mission</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
                No Foxhound is Unwanted
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                A dog that doesn&apos;t want to hunt from being gun shy or just isn&apos;t interested in hunting may be a great family dog for someone who would love them unconditionally.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                If you ever come across a Foxhound that needs to be adopted or fostered either at a shelter somewhere or you know someone who has one, please do not hesitate to contact us. <strong className="text-foreground">It may save their life!</strong>
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/available">View Available Hounds</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/adopted">Success Stories</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/foxhound-closeup.jpg"
                  alt="American Foxhound looking for a home"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">What We Do</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
              How We Help Foxhounds
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our nonprofit provides comprehensive care and support for American Foxhounds in need.
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="bg-card p-6 rounded-xl border border-border text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/kennel-facility.jpg"
                  alt="Bird Kennel facility"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <span className="text-accent font-medium text-sm tracking-wider uppercase">Support Our Mission</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
                Where Does My Donation Go?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Donations go directly into improving the health of our foster hounds. It may go toward food, medicines and wound treatment, or improvements to the kennel to offer better living conditions for the dogs.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Donations may also be used for merchandise to raise more funds and spread our network so we can help more hounds. <strong className="text-foreground">Absolutely no payments are made to anyone associated with #FriendsoftheFoxhound or Bird Kennel.</strong>
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Food donations are fed to the foster hounds only. If we receive too much food and won&apos;t use it, we will donate it to other nonprofit rescues in the area.
              </p>
              <Button asChild size="lg">
                <a href="mailto:BirdKennels@gmail.com">
                  Contact to Donate
                  <Heart className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Get Involved</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
              Connect With Us
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              You can find us on Instagram, Facebook or Snapchat either by looking up Bird Kennel or using #FriendsoftheFoxhound on a post or story.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg hover:border-primary transition-colors">
                <Instagram className="w-5 h-5 text-primary" />
                <span className="font-medium">Instagram</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg hover:border-primary transition-colors">
                <Facebook className="w-5 h-5 text-primary" />
                <span className="font-medium">Facebook</span>
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/events">
                  View Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/documents">
                  <FileText className="mr-2 h-4 w-4" />
                  Documents & Forms
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
