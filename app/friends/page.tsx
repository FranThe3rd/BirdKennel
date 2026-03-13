"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, Dog, Home, Users, ArrowRight, FileText, Instagram, Facebook, ArrowUpRight, Sparkles } from "lucide-react"
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

function ParallaxImage({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="h-[120%] w-full -mt-[10%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  )
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
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <main className="min-h-screen overflow-x-hidden relative">
      <SiteHeader />
      
      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ scale: heroScale }}
        >
          <Image
            src="/images/foxhound-rescue.jpg"
            alt="American Foxhounds at the rescue"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50" />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 w-full"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium mb-8 border border-white/10">
                <Sparkles className="w-4 h-4" />
                501(c)(3) Nonprofit Organization
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[0.95]"
            >
              #Friends<span className="text-primary">ofthe</span>Foxhound
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/80 text-lg leading-relaxed mb-10"
            >
              A nonprofit adoption and foster care service for unwanted American Foxhounds. No foxhound is unwanted, and they all deserve to live full and healthy lives.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="rounded-full px-8 group">
                <Link href="/available" data-cursor-hover>
                  Available Hounds
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-white/30 text-white hover:bg-white hover:text-foreground">
                <a href="#donate" data-cursor-hover>
                  <Heart className="mr-2 h-4 w-4" />
                  Donate Now
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-6 relative">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-secondary -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <RevealSection>
              <span className="inline-block text-primary font-medium text-sm tracking-[0.2em] uppercase mb-6">
                Our Mission
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
                No Foxhound is <span className="italic text-primary">Unwanted</span>
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  A dog that doesn&apos;t want to hunt from being gun shy or just isn&apos;t interested in hunting may be a great family dog for someone who would love them unconditionally.
                </p>
                <p>
                  If you ever come across a Foxhound that needs to be adopted or fostered either at a shelter somewhere or you know someone who has one, please do not hesitate to contact us. <strong className="text-foreground">It may save their life!</strong>
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-10">
                <Button asChild size="lg" className="rounded-full group">
                  <Link href="/available" data-cursor-hover>
                    View Available Hounds
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/adopted" data-cursor-hover>Success Stories</Link>
                </Button>
              </div>
            </RevealSection>
            
            <RevealSection>
              <ParallaxImage
                src="/images/foxhound-closeup.jpg"
                alt="American Foxhound looking for a home"
                className="aspect-[4/5] rounded-2xl shadow-2xl relative"
              />
            </RevealSection>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 px-6 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-background/5" />
        
        <div className="max-w-7xl mx-auto relative">
          <RevealSection className="text-center mb-20">
            <span className="inline-block text-primary font-medium text-sm tracking-[0.2em] uppercase mb-4">
              What We Do
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-background mb-6">
              How We Help <span className="italic text-primary">Foxhounds</span>
            </h2>
            <p className="text-background/70 text-lg max-w-2xl mx-auto">
              Our nonprofit provides comprehensive care and support for American Foxhounds in need.
            </p>
          </RevealSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <RevealSection key={feature.title}>
                <motion.div
                  whileHover={{ y: -8, backgroundColor: "rgba(255,255,255,0.1)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="bg-background/5 backdrop-blur-sm p-8 rounded-2xl border border-background/10 text-center"
                  data-cursor-hover
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-background mb-3">{feature.title}</h3>
                  <p className="text-background/60 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-32 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <RevealSection className="order-2 lg:order-1">
              <ParallaxImage
                src="/images/kennel-facility.jpg"
                alt="Bird Kennel facility"
                className="aspect-[4/5] rounded-2xl shadow-2xl relative"
              />
            </RevealSection>
            
            <RevealSection className="order-1 lg:order-2">
              <span className="inline-block text-primary font-medium text-sm tracking-[0.2em] uppercase mb-6">
                Support Our Mission
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 leading-[1.1]">
                Where Does My <span className="italic text-primary">Donation</span> Go?
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Donations go directly into improving the health of our foster hounds. It may go toward food, medicines and wound treatment, or improvements to the kennel to offer better living conditions for the dogs.
                </p>
                <p>
                  Donations may also be used for merchandise to raise more funds and spread our network so we can help more hounds. <strong className="text-foreground">Absolutely no payments are made to anyone associated with #FriendsoftheFoxhound or Bird Kennel.</strong>
                </p>
                <p>
                  Food donations are fed to the foster hounds only. If we receive too much food and won&apos;t use it, we will donate it to other nonprofit rescues in the area.
                </p>
              </div>
              <Button asChild size="lg" className="mt-10 rounded-full group">
                <a href="mailto:BirdKennels@gmail.com" data-cursor-hover>
                  Contact to Donate
                  <Heart className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              </Button>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-24 px-6 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-primary-foreground/10" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full border border-primary-foreground/10" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <RevealSection>
            <span className="inline-block text-primary-foreground/70 font-medium text-sm tracking-[0.2em] uppercase mb-4">
              Get Involved
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Connect <span className="italic">With Us</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
              You can find us on Instagram, Facebook or Snapchat either by looking up Bird Kennel or using #FriendsoftheFoxhound on a post or story.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <motion.a 
                whileHover={{ scale: 1.05, y: -4 }}
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
                data-cursor-hover
              >
                <Instagram className="w-5 h-5" />
                <span className="font-medium">Instagram</span>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, y: -4 }}
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
                data-cursor-hover
              >
                <Facebook className="w-5 h-5" />
                <span className="font-medium">Facebook</span>
              </motion.a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 group">
                <Link href="/events" data-cursor-hover>
                  View Events
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-white/30 text-white hover:bg-white hover:text-primary">
                <Link href="/documents" data-cursor-hover>
                  <FileText className="mr-2 h-4 w-4" />
                  Documents & Forms
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
