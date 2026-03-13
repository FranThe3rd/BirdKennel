"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, FileText, Heart } from "lucide-react"
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

export default function AvailablePage() {
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
            <span className="text-accent font-medium text-sm tracking-wider uppercase">#FriendsoftheFoxhound</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6 text-balance">
              Available Hounds
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              These wonderful American Foxhounds are looking for their forever homes. Each one has been cared for at Bird Kennel and is ready to become part of your family.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Available Hounds Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {availableHounds.map((hound, index) => (
              <motion.div
                key={hound.name}
                variants={fadeInUp}
                className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-square md:aspect-auto overflow-hidden">
                    <Image
                      src={hound.image}
                      alt={hound.name}
                      fill
                      className="object-cover"
                    />
                    {hound.pairAdoption && (
                      <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Pair Adoption
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-serif text-2xl font-semibold text-foreground">{hound.name}</h3>
                        <p className="text-muted-foreground text-sm">{hound.origin}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        hound.sex === "Male" 
                          ? "bg-blue-100 text-blue-700" 
                          : "bg-pink-100 text-pink-700"
                      }`}>
                        {hound.sex}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Age:</span>
                        <span className="text-foreground">Estimated {hound.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Altered:</span>
                        <span className="text-foreground">{hound.altered ? "Yes" : "No"}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                      {hound.description}
                    </p>
                    
                    <Button asChild className="w-full">
                      <a href="mailto:BirdKennels@gmail.com?subject=Inquiry about adopting {hound.name}">
                        Inquire About {hound.name.split(" ")[0]}
                        <Heart className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Adoption Process */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">How It Works</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
              Adoption Process
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Follow these simple steps to bring a foxhound into your family.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Browse",
                description: "Look through our available hounds and find one that catches your heart."
              },
              {
                step: "2",
                title: "Apply",
                description: "Download and complete our adoption application form."
              },
              {
                step: "3",
                title: "Meet",
                description: "Schedule a visit to meet your potential new family member."
              },
              {
                step: "4",
                title: "Adopt",
                description: "Complete the adoption process and take your hound home!"
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-serif font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Adopt?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Download the adoption form and questionnaire to start the process, or contact us with any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/documents">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Adoption Form
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

      <SiteFooter />
    </main>
  )
}
