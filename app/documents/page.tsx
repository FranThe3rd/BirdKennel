"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { FileText, Download, ArrowUpRight, ClipboardList, BookOpen, HelpCircle, FileCheck, Undo2, Sparkles } from "lucide-react"
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

const documents = [
  {
    title: "Foxhound Adoption Agreement",
    description: "The official adoption agreement form. Please review and complete this document as part of the adoption process.",
    icon: ClipboardList,
    category: "Adoption",
    file: "/documents/FOXHOUND ADOPTION AGREEMENT.docx"
  },
  {
    title: "Foxhound Adoption Questionnaire",
    description: "A questionnaire to help us understand your lifestyle and match you with the right hound.",
    icon: FileCheck,
    category: "Adoption",
    file: "/documents/FRIENDSOFTHEFOXHOUND ADOPTION QUESTIONAIRE.docx"
  },
  {
    title: "General Information on American Foxhounds",
    description: "Learn about the American Foxhound breed, their temperament, care needs, and history.",
    icon: HelpCircle,
    category: "Resources",
    file: "/documents/GENERAL INFORMATION ON AMERICAN FOXHOUNDS.docx"
  },
  {
    title: "Tips on Housetraining",
    description: "Helpful tips and guidance for housetraining your newly adopted foxhound.",
    icon: BookOpen,
    category: "Resources",
    file: "/documents/TIPS ON HOUSETRAINING.docx"
  },
  {
    title: "Foxhound Buyback / Surrender Policy",
    description: "Information about our policies for returning or surrendering an adopted foxhound.",
    icon: Undo2,
    category: "Policy",
    file: "/documents/BIRD KENNEL FOXHOUND BUYBACK.docx"
  },
]

export default function DocumentsPage() {
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
            Resources
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-background mb-6"
          >
            Forms & <span className="italic text-primary">Documents</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-background/70 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Download important forms and documents for the adoption process, as well as helpful resources for foxhound care.
          </motion.p>
        </div>
      </section>

      {/* Documents List */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {documents.map((doc) => (
              <RevealSection key={doc.title}>
                <motion.div
                  whileHover={{ x: 8, backgroundColor: "hsl(var(--secondary))" }}
                  className="bg-card rounded-2xl border border-border p-8 transition-all group"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <doc.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wider mb-2 px-3 py-1 bg-primary/10 rounded-full">{doc.category}</span>
                          <h3 className="font-serif text-xl font-semibold text-foreground mt-2">{doc.title}</h3>
                          <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{doc.description}</p>
                        </div>
                        <a href={doc.file} download className="shrink-0">
                          <Button variant="outline" className="rounded-full group/btn w-full sm:w-auto">
                            <Download className="w-4 h-4 mr-2 transition-transform group-hover/btn:-translate-y-1" />
                            Download
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-24 px-6 bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <RevealSection>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-card p-10 rounded-2xl border border-border shadow-lg h-full"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  Need Help With Forms?
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  If you have any questions about the adoption forms or need assistance filling them out, don&apos;t hesitate to reach out.
                </p>
                <Button asChild variant="outline" className="rounded-full">
                  <a href="mailto:BirdKennels@gmail.com">
                    Contact Us
                  </a>
                </Button>
              </motion.div>
            </RevealSection>

            <RevealSection>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-primary text-primary-foreground p-10 rounded-2xl shadow-lg h-full"
              >
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <ClipboardList className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-4">
                  Ready to Adopt?
                </h3>
                <p className="text-white/80 mb-8 leading-relaxed">
                  Once you&apos;ve reviewed the documents and filled out the forms, check out our available hounds to find your perfect match.
                </p>
                <Button asChild className="bg-white text-primary hover:bg-white/90 rounded-full group">
                  <Link href="/available">
                    View Available Hounds
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </Button>
              </motion.div>
            </RevealSection>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}