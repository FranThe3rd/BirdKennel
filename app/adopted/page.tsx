"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Heart, Calendar, ArrowUpRight, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react"

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
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}


const adoptedHounds = [
  {
    name: "Tutter",
    images: [
      "/images/hound-tutter.jpg",
      "/images/hound-tutter2.jpg"
    ],
    adoptedDate: "January 10, 2026",
    description:
      "Tutter was an awesome hound to foster and got along well with everyone. He loved to eat, go for walks, and bark up trees at squirrels."
  }
]


const stats = [
  { value: "30+", label: "Hounds Rescued" },
  { value: "25+", label: "Forever Homes" },
  { value: "100%", label: "Love Given" }
]


export default function AdoptedPage() {

  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])


  const [indexes, setIndexes] = useState(adoptedHounds.map(() => 0))
  const [paused, setPaused] = useState(false)

  const [selectedDog, setSelectedDog] = useState<number | null>(null)
  const [modalIndex, setModalIndex] = useState(0)


  useEffect(() => {

    if (paused) return

    const interval = setInterval(() => {

      setIndexes(prev =>
        prev.map((index, i) =>
          (index + 1) % adoptedHounds[i].images.length
        )
      )

    }, 3500)

    return () => clearInterval(interval)

  }, [paused])


  const nextImage = (i: number) => {
    setIndexes(prev => {
      const copy = [...prev]
      copy[i] = (copy[i] + 1) % adoptedHounds[i].images.length
      return copy
    })
  }

  const prevImage = (i: number) => {
    setIndexes(prev => {
      const copy = [...prev]
      copy[i] = (copy[i] - 1 + adoptedHounds[i].images.length) % adoptedHounds[i].images.length
      return copy
    })
  }


  const modalNext = () => {
    if (selectedDog === null) return
    setModalIndex((modalIndex + 1) % adoptedHounds[selectedDog].images.length)
  }

  const modalPrev = () => {
    if (selectedDog === null) return
    setModalIndex(
      (modalIndex - 1 + adoptedHounds[selectedDog].images.length) %
      adoptedHounds[selectedDog].images.length
    )
  }


  return (
    <main className="min-h-screen overflow-x-hidden relative">

      <SiteHeader />



      {/* FULLSCREEN MODAL */}

      <AnimatePresence>

        {selectedDog !== null && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
          >

            <button
              onClick={() => setSelectedDog(null)}
              className="absolute top-6 right-6 text-white"
            >
              <X size={34} />
            </button>

            <button
              onClick={modalPrev}
              className="absolute left-6 text-white"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={modalNext}
              className="absolute right-6 text-white"
            >
              <ChevronRight size={40} />
            </button>

            <Image
              src={adoptedHounds[selectedDog].images[modalIndex]}
              alt="Dog"
              width={1400}
              height={1000}
              className="max-h-[90vh] w-auto object-contain rounded-xl"
            />

          </motion.div>

        )}

      </AnimatePresence>



      {/* HERO */}

      <section ref={heroRef} className="relative h-[60vh] min-h-[450px] flex items-end overflow-hidden">

        <motion.div className="absolute inset-0 bg-black" style={{ y: heroY }}>

         

        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full"
        >

          <span className="inline-flex items-center gap-2 text-primary text-sm tracking-[0.2em] uppercase mb-4">
            <Heart className="w-4 h-4" fill="currentColor" />
            Success Stories
          </span>

          <h1 className="font-serif text-6xl text-white font-bold">
            Adopted <span className="italic text-primary">Hounds</span>
          </h1>

        </motion.div>

      </section>



      {/* ADOPTED HOUNDS */}

      <section className="py-24 px-6 bg-background">

        <div className="max-w-5xl mx-auto">

          {adoptedHounds.map((hound, i) => {

            const image = hound.images[indexes[i]]

            return (

              <RevealSection key={hound.name}>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-3xl overflow-hidden shadow-xl border border-border"
                >

                  <div className="grid lg:grid-cols-2">


                    {/* SLIDESHOW IMAGE */}

                    <div
                      className="relative aspect-square overflow-hidden group"
                      onMouseEnter={() => setPaused(true)}
                      onMouseLeave={() => setPaused(false)}
                    >

                      <AnimatePresence mode="wait">

                        <motion.div
                          key={image}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0"
                        >

                          <Image
                            src={image}
                            alt={hound.name}
                            fill
                            className="object-cover cursor-zoom-in"
                            onClick={() => {
                              setSelectedDog(i)
                              setModalIndex(indexes[i])
                            }}
                          />

                        </motion.div>

                      </AnimatePresence>


                      {/* ARROWS */}

                      <button
                        onClick={() => prevImage(i)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <button
                        onClick={() => nextImage(i)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <ChevronRight size={18} />
                      </button>


                      <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm flex items-center gap-2">
                        <Heart className="w-4 h-4" fill="currentColor" />
                        Adopted
                      </div>

                    </div>



                    {/* TEXT */}

                    <div className="p-10 lg:p-12 flex flex-col justify-center">

                      <h3 className="font-serif text-5xl font-bold mb-4">
                        {hound.name}
                      </h3>

                      <div className="flex items-center gap-2 text-muted-foreground mb-8">
                        <Calendar className="w-4 h-4" />
                        Adopted on {hound.adoptedDate}
                      </div>

                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {hound.description}
                      </p>

                    </div>

                  </div>

                </motion.div>

              </RevealSection>

            )

          })}

        </div>

      </section>



      {/* STATS */}

      <section className="py-24 px-6 bg-foreground text-background">

        <div className="max-w-4xl mx-auto text-center">

          <RevealSection>

            <h2 className="font-serif text-5xl font-bold mb-16">
              Every Adoption Makes a <span className="italic text-primary">Difference</span>
            </h2>

            <div className="grid grid-cols-3 gap-8">

              {stats.map(stat => (

                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl bg-background/5 border border-background/10"
                >

                  <p className="text-6xl font-serif font-bold mb-3">
                    {stat.value}
                  </p>

                  <p className="text-background/60 text-sm uppercase tracking-wider">
                    {stat.label}
                  </p>

                </motion.div>

              ))}

            </div>

          </RevealSection>

        </div>

      </section>


      <SiteFooter />

    </main>
  )
}