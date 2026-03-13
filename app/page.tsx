"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Heart, Users, Home as HomeIcon, Dog, ChevronDown } from "lucide-react"
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

const team = [
  {
    name: "Andrew Bird",
    role: "President",
    image: "/images/team-andrew.jpg",
    description: "Andrew has been dedicated to the field since 2023, passionately working to preserve the rich tradition of North Carolina houndsmen. With a deep love for American foxhounds, he is committed to ensuring that this cherished heritage continues for future generations."
  },
  {
    name: "Hanna Bird",
    role: "Vice President",
    image: "/images/team-hanna.jpg",
    description: "Hanna has been a steadfast supporter of the kennel from the start. She has a deep love for our foxhounds and makes certain that every hound is treated with the same care and affection as a cherished family member. She helps maintain the kennel, promote events, and creates merchandise."
  },
  {
    name: "Angel Crowder",
    role: "Caretaker & Trainer",
    image: "/images/team-angel.jpg",
    description: "Angel has been a huge part of the kennel since early 2025. She has spent countless hours maintaining the kennel, feeding the hounds and being a friend to the countless hounds that come and go. She assists in training hounds and takes photos to help promote the kennel."
  }
]

const stats = [
  { label: "Hounds Rescued", value: "50+", icon: Dog },
  { label: "Happy Adoptions", value: "30+", icon: Heart },
  { label: "Volunteers", value: "10+", icon: Users },
  { label: "Forever Homes", value: "25+", icon: HomeIcon },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-foxhounds.jpg"
            alt="American Foxhounds running through the North Carolina countryside"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-background text-sm font-medium mb-6">
              Established 2024 • Ruffin, NC
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-background mb-6 leading-tight text-balance"
          >
            Preserving the Legacy of American Foxhounds
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-background/90 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Bird Kennel is dedicated to training top quality foxhounds while #FriendsoftheFoxhound provides foster care and adoption services to hounds in need.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="text-base px-8">
              <Link href="/available">
                Adopt a Hound
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 bg-background/10 border-background/30 text-background hover:bg-background/20 hover:text-background">
              <Link href="/foxhounds">
                Our Foxhounds
              </Link>
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-background/60 animate-bounce" />
        </motion.div>
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
              <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Mission</span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
                Training Excellence, Saving Lives
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Bird Kennel in Ruffin, NC, is dedicated to training top quality foxhounds for trial hunts, hunting fox and coyotes, deer, or any game you are after. Our kennel is registered with the Standard Foxhound Stud Book.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                #FriendsoftheFoxhound is a 501c3 registered nonprofit adoption and foster care service for hunting dogs that no longer hunt, don&apos;t perform as desired and are unwanted, or are set to be euthanized by shelters or individuals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/foxhounds">Meet Our Hounds</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/friends">Learn About Our Mission</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/kennel-facility.jpg"
                  alt="Bird Kennel facility in Ruffin, NC"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl border border-border">
                <p className="text-4xl font-serif font-bold text-primary">K-978</p>
                <p className="text-muted-foreground text-sm">S.F.S.B. Registered</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Friends of the Foxhound Preview */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/foxhound-closeup.jpg"
                  alt="American Foxhound close-up portrait"
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
              <span className="text-accent font-medium text-sm tracking-wider uppercase">#FriendsoftheFoxhound</span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
                No Foxhound is Unwanted
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                They all deserve to live full and healthy lives. A dog that doesn&apos;t want to hunt from being gun shy or just isn&apos;t interested may be a great family dog for someone who would love them unconditionally.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                If you ever come across a Foxhound that needs to be adopted or fostered either at a shelter somewhere or you know someone who has one, please do not hesitate to contact us. It may save their life!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/available">
                    View Available Hounds
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/friends#donate">Donate</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Team</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
              Meet the Dedicated Team
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Passionate individuals committed to the care and preservation of American Foxhounds.
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-primary font-medium text-sm">{member.role}</p>
                  <h3 className="font-serif text-xl font-semibold text-foreground mt-1 mb-3">{member.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Ready to Give a Foxhound Their Forever Home?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Every adoption saves a life. Browse our available hounds or contact us to learn more about how you can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-base px-8">
                <Link href="/available">
                  View Available Hounds
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/documents">
                  Download Adoption Form
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
