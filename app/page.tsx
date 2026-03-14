"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Heart, Users, Home as HomeIcon, Dog, ChevronDown, Play, ArrowUpRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

// ─── Single font import ───────────────────────────────────────────────────────
// Playfair Display → headings / display text
// Inter           → all body, labels, UI copy
const fontUrl = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap"

const fontStyle = `
  @import url('${fontUrl}');
  :root {
    --font-display: 'Playfair Display', Georgia, serif;
    --font-body:    'Inter', system-ui, sans-serif;
  }
  .f-display { font-family: var(--font-display); }
  .f-body    { font-family: var(--font-body); }
`

const team = [
  {
    name: "Andrew Bird",
    role: "President",
    image: "/images/team-andrew.jpg",
    description: "Andrew has been dedicated to the field since 2023, passionately working to preserve the rich tradition of North Carolina houndsmen."
  },
  {
    name: "Hanna Bird",
    role: "Vice President",
    image: "/images/team-hanna.jpg",
    description: "Hanna has been a steadfast supporter of the kennel from the start. She ensures every hound is treated with the care of a cherished family member."
  },
  {
    name: "Angel Crowder",
    role: "Caretaker & Trainer",
    image: "/images/team-angel.jpg",
    description: "Angel has been a huge part of the kennel since early 2025. She maintains the kennel, trains hounds, and captures their stories through photography."
  }
]

const stats = [
  { label: "Hounds Rescued", value: "50+", icon: Dog },
  { label: "Happy Adoptions", value: "30+", icon: Heart },
  { label: "Volunteers", value: "10+", icon: Users },
  { label: "Forever Homes", value: "25+", icon: HomeIcon },
]

function AnimatedText({ children, className = "", delay = 0 }: { children: string, className?: string, delay?: number }) {
  const words = children.split(" ")
  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: delay + i * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

function MagneticButton({ children, href, variant = "default", className = "" }: { children: React.ReactNode, href: string, variant?: "default" | "outline", className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
  }
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)"
  }
  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        f-body inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium tracking-wide
        transition-all duration-300 ease-out rounded-sm
        ${variant === "outline"
          ? "border border-current text-current hover:bg-current hover:text-background"
          : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
        }
        ${className}
      `}
      style={{ transition: "transform 0.15s ease-out, background 0.3s ease, box-shadow 0.3s ease" }}
    >
      {children}
    </Link>
  )
}

function ParallaxImage({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.div style={{ y }} className="h-[120%] w-full -mt-[10%] relative">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  )
}

function RevealSection({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const heroOpacity    = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroTextY      = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <main className="min-h-screen overflow-x-hidden relative">
      <style>{fontStyle}</style>
      <SiteHeader />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: heroImageScale }}>
          <Image
            src="/images/hero-foxhounds.jpg"
            alt="American Foxhounds running through the North Carolina countryside"
            fill className="object-cover" priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
        </motion.div>

        <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
            <span className="f-body inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs font-medium mb-8 border border-white/10 tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Established 2024 · Ruffin, NC
            </span>
          </motion.div>

          <h1 className="f-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.05] tracking-tight">
            <AnimatedText delay={0.4}>Preserving the Legacy of</AnimatedText>
            <br />
            <span className="text-primary italic">
              <AnimatedText delay={0.8}>American Foxhounds</AnimatedText>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="f-body text-lg md:text-xl text-white/75 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Bird Kennel is dedicated to training exceptional foxhounds while #FriendsoftheFoxhound provides foster care and adoption services to hounds in need.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton href="/available">
              Adopt a Hound <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton href="/foxhounds" variant="outline" className="text-white border-white/30 hover:bg-white hover:text-foreground">
              Our Foxhounds
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="f-body text-white/50 text-xs uppercase tracking-[0.3em]">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-5 h-5 text-white/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-primary text-primary-foreground py-3.5 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="f-body flex items-center gap-8 mx-8 text-xs font-medium tracking-widest uppercase">
              <span>S.F.S.B. Registered K-978</span>
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
              <span>501c3 Nonprofit</span>
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
              <span>Ruffin, NC</span>
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
              <span>American Foxhounds</span>
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── MISSION ── */}
      <section className="py-32 px-6 relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <RevealSection>
              <span className="f-body inline-block text-primary font-semibold text-xs tracking-[0.25em] uppercase mb-6">
                Our Mission
              </span>
              <h2 className="f-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
                Training <span className="italic text-primary">Excellence</span>,<br />Saving Lives
              </h2>
              <div className="f-body space-y-5 text-muted-foreground text-base leading-relaxed font-light">
                <p>Bird Kennel in Ruffin, NC, is dedicated to training top quality foxhounds for trial hunts, hunting fox and coyotes, deer, or any game you are after. Our kennel is registered with the Standard Foxhound Stud Book.</p>
                <p>#FriendsoftheFoxhound is a 501c3 registered nonprofit providing foster care and adoption services to hunting dogs that are unwanted or at risk of euthanasia.</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-10">
                <Button asChild size="lg" className="f-body rounded-sm">
                  <Link href="/foxhounds">Meet Our Hounds <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="f-body rounded-sm">
                  <Link href="/friends">Learn About Our Mission</Link>
                </Button>
              </div>
            </RevealSection>

            <RevealSection className="relative">
              <ParallaxImage src="/images/kennel-facility.jpg" alt="Bird Kennel facility" className="aspect-[4/5] rounded-xl shadow-2xl" />
              <motion.div
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="absolute -bottom-8 -left-8 bg-card p-7 rounded-xl shadow-2xl border border-border"
              >
                <p className="f-display text-5xl font-bold text-primary">K-978</p>
                <p className="f-body text-muted-foreground text-xs mt-1 tracking-wide uppercase">S.F.S.B. Registered Kennel</p>
              </motion.div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-background/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-background/5" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <RevealSection key={stat.label}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="text-center p-8 rounded-xl bg-background/5 border border-background/10 hover:bg-background/10 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-5">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="f-display text-5xl md:text-6xl font-bold text-background mb-2">{stat.value}</p>
                  <p className="f-body text-background/55 text-xs uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRIENDS OF THE FOXHOUND ── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <RevealSection className="order-2 lg:order-1">
              <div className="relative flex items-center justify-center">
  <Image
    src="/images/logo.png"
    alt="Friends of the Foxhound logo"
    width={420}
    height={420}
    className="object-contain"
  />
</div>                <motion.div className="absolute inset-0 rounded-xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl">
                    <Play className="w-7 h-7 text-primary ml-1" />
                  </div>
                </motion.div>
            </RevealSection>

            <RevealSection className="order-1 lg:order-2">
              <span className="f-body inline-block text-primary font-semibold text-xs tracking-[0.25em] uppercase mb-6">
                #FriendsoftheFoxhound
              </span>
              <h2 className="f-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
                No Foxhound is <span className="italic text-primary">Unwanted</span>
              </h2>
              <div className="f-body space-y-5 text-muted-foreground text-base leading-relaxed font-light">
                <p>They all deserve to live full and healthy lives. A dog that doesn&apos;t want to hunt may be a perfect family companion for someone who would love them unconditionally.</p>
                <p>If you ever come across a Foxhound that needs to be adopted or fostered, please do not hesitate to contact us. It may save their life.</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-10">
                <Button asChild size="lg" className="f-body rounded-sm">
                  <Link href="/available">View Available Hounds <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="f-body rounded-sm">
                  <Link href="/friends#donate"><Heart className="w-4 h-4 mr-2" />Donate</Link>
                </Button>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-32 px-6 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <RevealSection className="text-center mb-20">
            <span className="f-body inline-block text-primary font-semibold text-xs tracking-[0.25em] uppercase mb-6">The Team</span>
            <h2 className="f-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5">
              Meet Our <span className="italic text-primary">Dedicated</span> Team
            </h2>
            <p className="f-body text-muted-foreground text-base max-w-xl mx-auto font-light leading-relaxed">
              Passionate individuals committed to the care and preservation of American Foxhounds.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <RevealSection key={member.name}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 border border-border"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-7">
                      <p className="f-body text-primary font-semibold text-xs uppercase tracking-widest mb-1">{member.role}</p>
                      <h3 className="f-display text-2xl font-semibold text-white">{member.name}</h3>
                    </div>
                  </div>
                  <div className="p-7 bg-card">
                    <p className="f-body text-muted-foreground text-sm leading-relaxed font-light">{member.description}</p>
                  </div>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-primary-foreground/10" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full border border-primary-foreground/10" />
        <div className="max-w-4xl mx-auto text-center relative">
          <RevealSection>
            <h2 className="f-display text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-[1.1]">
              Ready to Give a Foxhound Their{" "}
              <span className="italic">Forever Home?</span>
            </h2>
            <p className="f-body text-base md:text-lg text-primary-foreground/75 mb-12 max-w-xl mx-auto leading-relaxed font-light">
              Every adoption saves a life. Browse our available hounds or contact us to learn more about how you can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton href="/available" variant="outline" className="text-white border-white/30 hover:bg-white hover:text-primary">
                View Available Hounds <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton href="/documents" variant="outline" className="text-white border-white/30 hover:bg-white hover:text-primary">
                Download Adoption Form
              </MagneticButton>
            </div>
          </RevealSection>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
