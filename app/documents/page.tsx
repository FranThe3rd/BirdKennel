"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, Download, ArrowRight, ClipboardList, BookOpen, HelpCircle, FileCheck, Undo2 } from "lucide-react"
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

const documents = [
  {
    title: "Foxhound Adoption Form",
    description: "The official adoption application form. Please complete this form to begin the adoption process.",
    icon: ClipboardList,
    category: "Adoption"
  },
  {
    title: "Tips on Housetraining",
    description: "Helpful tips and guidance for housetraining your newly adopted foxhound.",
    icon: BookOpen,
    category: "Resources"
  },
  {
    title: "General Information on Foxhounds",
    description: "Learn about the American Foxhound breed, their temperament, care needs, and history.",
    icon: HelpCircle,
    category: "Resources"
  },
  {
    title: "Foxhound Adoption Questionnaire",
    description: "A questionnaire to help us understand your lifestyle and match you with the right hound.",
    icon: FileCheck,
    category: "Adoption"
  },
  {
    title: "Foxhound Buyback/Surrender Policy",
    description: "Information about our policies for returning or surrendering an adopted foxhound.",
    icon: Undo2,
    category: "Policy"
  }
]

export default function DocumentsPage() {
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
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Resources</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6 text-balance">
              Documents
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Download important forms and documents for the adoption process, as well as helpful resources for foxhound care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            {documents.map((doc, index) => (
              <motion.div
                key={doc.title}
                variants={fadeInUp}
                className="bg-card rounded-xl border border-border p-6 hover:border-primary transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <doc.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{doc.category}</span>
                        <h3 className="font-serif text-lg font-semibold text-foreground mt-1">{doc.title}</h3>
                        <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{doc.description}</p>
                      </div>
                      <Button variant="outline" size="sm" className="shrink-0">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card p-8 rounded-2xl border border-border"
            >
              <FileText className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                Need Help With Forms?
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                If you have any questions about the adoption forms or need assistance filling them out, don&apos;t hesitate to reach out.
              </p>
              <Button asChild variant="outline">
                <a href="mailto:BirdKennels@gmail.com">
                  Contact Us
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card p-8 rounded-2xl border border-border"
            >
              <ClipboardList className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                Ready to Adopt?
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Once you&apos;ve reviewed the documents and filled out the forms, check out our available hounds to find your perfect match.
              </p>
              <Button asChild>
                <Link href="/available">
                  View Available Hounds
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
