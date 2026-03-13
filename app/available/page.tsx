"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, FileText, Heart, ArrowUpRight, Sparkles } from "lucide-react"
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

const availableHounds = [
  {
    name: "Bo",
    image: "/images/hound-bo.jpg",
    sex: "Male",
    altered: true,
    age: "1-3 years",
    origin: "Hertford County, NC",
    description: "Bo is a well mannered hound who loves to be outside, going on walks, and playing with friends. Come visit him to see if you are right for each other and if he will make a good addition to your family!"
  },
  {
    name: "Rachel & Monica",
    image: "/images/hound-rachel.jpg",
    secondImage: "/images/hound-monica.jpg",
    sex: "Female",
    altered: false,
    age: "1-3 years",
    origin: "Hertford County, NC",
    description: "Monica and Rachel came from Hertford County NC. They have to be homed together as they act like sisters. Two very well mannered hounds that kennel well and love attention. Come meet them today!",
    pairAdoption: true
  }
]

const adoptionSteps = [
  {
    step: "01",
    title: "Browse",
    description: "Look through our available hounds and find one that catches your heart."
  },
  {
    step: "02",
    title: "Apply",
    description: "Download and complete our adoption application form."
  },
  {
    step: "03",
    title: "Meet",
    description: "Schedule a visit to meet your potential new family member."
  },
  {
    step: "04",
    title: "Adopt",
    description: "Complete the adoption process and take your hound home!"
  }
]

export default function AvailablePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <main className="min-h-screen overflow-x-hidden">
      <SiteHeader />
      
      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <Image
            src="/images/foxhound-rescue.jpg"
            alt="American Foxhounds waiting for adoption"
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
            className="inline-flex items-center gap-2 text-primary font-medium text-sm tracking-[0.2em] uppercase mb-4"
          >
            <Sparkles className="w-4 h-4" />
            #FriendsoftheFoxhound
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Available <span className="italic text-primary">Hounds</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/80 text-lg max-w-2xl leading-relaxed"
          >
            These wonderful American Foxhounds are looking for their forever homes. Each one has been lovingly cared for and is ready to become part of your family.
          </motion.p>
        </motion.div>
      </section>

      {/* Available Hounds */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {availableHounds.map((hound, index) => (
              <RevealSection key={hound.name}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="bg-card rounded-3xl overflow-hidden shadow-xl border border-border group"
                  data-cursor-hover
                >
                  <div className="grid lg:grid-cols-2">
                    <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                      <Image
                        src={hound.image}
                        alt={hound.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {hound.pairAdoption && (
                        <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          Pair Adoption
                        </div>
                      )}
                    </div>
                    <div className="p-10 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">{hound.name}</h3>
                          <p className="text-muted-foreground">{hound.origin}</p>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                          hound.sex === "Male" 
                            ? "bg-blue-50 text-blue-700 border border-blue-200" 
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}>
                          {hound.sex}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-muted/50 rounded-xl p-4">
                          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Age</p>
                          <p className="text-foreground font-medium">Est. {hound.age}</p>
                        </div>
                        <div className="bg-muted/50 rounded-xl p-4">
                          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Altered</p>
                          <p className="text-foreground font-medium">{hound.altered ? "Yes" : "No"}</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                        {hound.description}
                      </p>
                      
                      <Button asChild size="lg" className="w-full sm:w-auto rounded-full group/btn">
                        <a 
                          href={`mailto:BirdKennels@gmail.com?subject=Inquiry about adopting ${hound.name}`}
                          data-cursor-hover
                        >
                          Inquire About {hound.name.split(" ")[0]}
                          <Heart className="ml-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Adoption Process */}
      <section className="py-24 px-6 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-16">
            <span className="inline-block text-primary font-medium text-sm tracking-[0.2em] uppercase mb-4">
              How It Works
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Adoption <span className="italic text-primary">Process</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Follow these simple steps to bring a foxhound into your family.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-4 gap-6">
            {adoptionSteps.map((item, index) => (
              <RevealSection key={item.step}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative bg-card rounded-2xl p-8 border border-border shadow-lg text-center group"
                  data-cursor-hover
                >
                  <div className="text-6xl font-serif font-bold text-primary/10 absolute top-4 right-4 group-hover:text-primary/20 transition-colors">
                    {item.step}
                  </div>
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 font-serif font-bold text-xl shadow-lg shadow-primary/20">
                    {parseInt(item.step)}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-primary-foreground/10" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full border border-primary-foreground/10" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <RevealSection>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ready to <span className="italic">Adopt?</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Download the adoption form and questionnaire to start the process, or contact us with any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 shadow-xl group">
                <Link href="/documents" data-cursor-hover>
                  <FileText className="mr-2 h-4 w-4" />
                  Download Adoption Form
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-white/30 text-white hover:bg-white hover:text-primary">
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
