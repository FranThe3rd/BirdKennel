"use client"

import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Heart, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react"
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

const availableHounds = [
  {
    name: "Bo",
    images: [
      "/images/available/hound-bo.jpg",
      "/images/available/hound-bo2.jpg"
    ],
    origin: "Hertford County, NC",
    description:
      "Bo is a well mannered hound who loves to be outside, going on walks, and playing with friends."
  },
  {
    name: "Rachel & Monica",
    images: [
      "/images/available/hound-monica-rachel.jpg",
      "/images/available/hound-monica-rachel2.jpg"
    ],
    origin: "Hertford County, NC",
    description:
      "Monica and Rachel came from Hertford County NC. They must be adopted together."
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

  const [selectedDog, setSelectedDog] = useState<number | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const [indexes, setIndexes] = useState(availableHounds.map(() => 0))
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexes(prev =>
        prev.map((index, i) => {
          if (hovered === i) return index
          return (index + 1) % availableHounds[i].images.length
        })
      )
    }, 3500)

    return () => clearInterval(interval)
  }, [hovered])

  function nextImage(i: number) {
    setIndexes(prev => {
      const copy = [...prev]
      copy[i] = (copy[i] + 1) % availableHounds[i].images.length
      return copy
    })
  }

  function prevImage(i: number) {
    setIndexes(prev => {
      const copy = [...prev]
      copy[i] =
        (copy[i] - 1 + availableHounds[i].images.length) %
        availableHounds[i].images.length
      return copy
    })
  }

  return (
    <main className="min-h-screen overflow-x-hidden relative">
      <SiteHeader />

      {/* FULLSCREEN IMAGE VIEWER */}
      <AnimatePresence>
        {selectedDog !== null && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setSelectedDog(null)}
              className="absolute top-8 right-8 text-white"
            >
              <X size={32} />
            </button>

            <button
              onClick={() =>
                setSelectedImageIndex(
                  (selectedImageIndex - 1 +
                    availableHounds[selectedDog].images.length) %
                    availableHounds[selectedDog].images.length
                )
              }
              className="absolute left-10 text-white"
            >
              <ChevronLeft size={40} />
            </button>

            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Image
                src={
                  availableHounds[selectedDog].images[selectedImageIndex]
                }
                alt="dog"
                width={1400}
                height={900}
                className="max-h-[90vh] w-auto object-contain rounded-xl"
              />
            </motion.div>

            <button
              onClick={() =>
                setSelectedImageIndex(
                  (selectedImageIndex + 1) %
                    availableHounds[selectedDog].images.length
                )
              }
              className="absolute right-10 text-white"
            >
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="/images/foxhound-rescue.jpg"
            alt="Foxhounds"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 pb-20"
        >
          <span className="inline-flex items-center gap-2 text-primary text-sm uppercase mb-4">
            <Sparkles className="w-4 h-4" />
            #FriendsoftheFoxhound
          </span>

          <h1 className="font-serif text-6xl text-white font-bold">
            Available <span className="italic text-primary">Hounds</span>
          </h1>
        </motion.div>
      </section>

      {/* HOUNDS */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto space-y-12">

          {availableHounds.map((hound, i) => {
            const currentImage = hound.images[indexes[i]]

            return (
              <RevealSection key={hound.name}>
                <motion.div
                  className="bg-card rounded-3xl overflow-hidden shadow-xl border border-border"
                  whileHover={{ y: -4 }}
                >
                  <div className="grid lg:grid-cols-2">

                    {/* IMAGE SLIDESHOW */}
                    <div
                      className="relative aspect-[4/3] overflow-hidden"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImage}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={currentImage}
                            alt={hound.name}
                            fill
                            className="object-cover cursor-zoom-in"
                            onClick={() => {
                              setSelectedDog(i)
                              setSelectedImageIndex(indexes[i])
                            }}
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* ARROWS */}
                      <button
                        onClick={() => prevImage(i)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <button
                        onClick={() => nextImage(i)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    {/* TEXT */}
                    <div className="p-10 lg:p-12 flex flex-col justify-center">

                      <h3 className="font-serif text-4xl font-bold mb-2">
                        {hound.name}
                      </h3>

                      <p className="text-muted-foreground mb-6">
                        {hound.origin}
                      </p>

                      <p className="text-muted-foreground text-lg mb-8">
                        {hound.description}
                      </p>

                      <Button asChild size="lg" className="rounded-full">
                        <a
                          href={`mailto:BirdKennels@gmail.com?subject=Inquiry about adopting ${hound.name}`}
                        >
                          Inquire About {hound.name.split(" ")[0]}
                          <Heart className="ml-2 h-4 w-4" />
                        </a>
                      </Button>

                    </div>
                  </div>
                </motion.div>
              </RevealSection>
            )
          })}

        </div>
      </section>

      <SiteFooter />
    </main>
  )
}