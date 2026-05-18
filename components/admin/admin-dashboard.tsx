"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Upload,
  Trash2,
  Plus,
  Save,
  LogOut,
  ExternalLink,
  Loader2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  MessageSquare,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type {
  AdoptedHound,
  AvailableHound,
  Foxhound,
  HoundCollection,
} from "@/types/hounds"
import { slugifyName } from "@/lib/slug"

type TabType = HoundCollection | "chatbot"

function reorderItems<T>(items: T[], fromIndex: number, toIndex: number): T[] {
  if (fromIndex === toIndex) return items
  if (fromIndex < 0 || toIndex < 0 || fromIndex >= items.length || toIndex >= items.length) {
    return items
  }
  const next = [...items]
  const [moved] = next.splice(fromIndex, 1)
  next.splice(toIndex, 0, moved)
  return next
}

export function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>("adopted")
  const [adopted, setAdopted] = useState<AdoptedHound[]>([])
  const [available, setAvailable] = useState<AvailableHound[]>([])
  const [foxhounds, setFoxhounds] = useState<Foxhound[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [chatbotPrompt, setChatbotPrompt] = useState("")
  const [defaultChatbotPrompt, setDefaultChatbotPrompt] = useState("")
  const [savingPrompt, setSavingPrompt] = useState(false)

  const loadAll = useCallback(async () => {
    setLoading(true)
    try {
      const [a, b, f, chat] = await Promise.all([
        fetch("/api/admin/hounds?type=adopted").then((r) => r.json()),
        fetch("/api/admin/hounds?type=available").then((r) => r.json()),
        fetch("/api/admin/hounds?type=foxhounds").then((r) => r.json()),
        fetch("/api/admin/chatbot-prompt").then((r) => r.json()),
      ])
      setAdopted(a.hounds || [])
      setAvailable(b.hounds || [])
      setFoxhounds(f.hounds || [])
      setChatbotPrompt(chat.systemPrompt || "")
      setDefaultChatbotPrompt(chat.defaultPrompt || "")
    } catch {
      setMessage("Failed to load data.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  async function saveChatbotPrompt() {
    setSavingPrompt(true)
    setMessage("")
    const res = await fetch("/api/admin/chatbot-prompt", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemPrompt: chatbotPrompt }),
    })
    setSavingPrompt(false)
    if (!res.ok) {
      setMessage("Failed to save chatbot prompt.")
      return
    }
    setMessage("Chatbot prompt saved. New visitors will use the updated instructions.")
  }

  async function saveCollection(type: HoundCollection) {
    setSaving(true)
    setMessage("")
    const hounds =
      type === "adopted"
        ? adopted
        : type === "available"
          ? available
          : foxhounds

    const res = await fetch("/api/admin/hounds", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, hounds }),
    })

    setSaving(false)
    if (!res.ok) {
      setMessage("Save failed. Try again.")
      return
    }
    setMessage(`${type} saved successfully.`)
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  async function uploadImage(
    type: TabType,
    houndId: string,
    houndName: string,
    file: File,
    mode: "gallery" | "single"
  ) {
    setUploadingId(houndId)
    setMessage("")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", type)
    formData.append("name", houndName)

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json().catch(() => ({}))
    setUploadingId(null)

    if (!res.ok) {
      setMessage(data.error || "Upload failed.")
      return
    }

    const url = data.url as string

    if (type === "adopted") {
      setAdopted((prev) =>
        prev.map((h) =>
          h.id === houndId
            ? {
                ...h,
                images: mode === "gallery" ? [...h.images, url] : [url],
              }
            : h
        )
      )
    } else if (type === "available") {
      setAvailable((prev) =>
        prev.map((h) =>
          h.id === houndId
            ? {
                ...h,
                images: mode === "gallery" ? [...h.images, url] : [url],
              }
            : h
        )
      )
    } else {
      setFoxhounds((prev) =>
        prev.map((h) => (h.id === houndId ? { ...h, image: url } : h))
      )
    }

    setMessage("Photo uploaded. Click Save to publish changes.")
  }

  function addAdopted() {
    const id = `hound-${Date.now()}`
    setAdopted((prev) => [
      {
        id,
        name: "New Hound",
        images: [],
        adoptedDate: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        description: "",
      },
      ...prev,
    ])
  }

  function addAvailable() {
    const id = `hound-${Date.now()}`
    setAvailable((prev) => [
      {
        id,
        name: "New Available Hound",
        images: [],
        origin: "",
        description: "",
      },
      ...prev,
    ])
  }

  function addFoxhound() {
    const id = `hound-${Date.now()}`
    setFoxhounds((prev) => [
      {
        id,
        name: "New Foxhound",
        image: "",
        sfsbNumber: null,
        sex: "Unknown",
        whelped: "Unknown",
        litterNumber: null,
        sire: "Unknown",
        gyp: "Unknown",
      },
      ...prev,
    ])
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin" />
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold">Hound Manager</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Upload photos and update listings for the public site.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/" target="_blank">
              <ExternalLink className="w-4 h-4 mr-2" />
              View site
            </Link>
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </Button>
        </div>
      </header>

      {message ? (
        <p className="text-sm rounded-lg bg-secondary px-4 py-3 border border-border">
          {message}
        </p>
      ) : null}

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)}>
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="adopted">Adopted</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="foxhounds">Our Foxhounds</TabsTrigger>
          <TabsTrigger value="chatbot">AI Chatbot</TabsTrigger>
        </TabsList>

        <p className="text-xs text-muted-foreground mt-3">
          Drag cards by the grip handle or use the arrows to change display order on the public site.
        </p>

        <TabsContent value="adopted" className="space-y-4 mt-6">
          <div className="flex flex-wrap gap-2">
            <Button onClick={addAdopted} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add adopted hound
            </Button>
            <Button onClick={() => saveCollection("adopted")} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save adopted"}
            </Button>
          </div>

          {adopted.map((hound, index) => (
            <HoundCard
              key={hound.id}
              index={index}
              total={adopted.length}
              title={hound.name}
              onReorder={(from, to) =>
                setAdopted((prev) => reorderItems(prev, from, to))
              }
              onDelete={() =>
                setAdopted((prev) => prev.filter((h) => h.id !== hound.id))
              }
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name">
                  <Input
                    value={hound.name}
                    onChange={(e) =>
                      setAdopted((prev) =>
                        prev.map((h) =>
                          h.id === hound.id ? { ...h, name: e.target.value } : h
                        )
                      )
                    }
                  />
                </Field>
                <Field label="Adopted date">
                  <Input
                    value={hound.adoptedDate}
                    onChange={(e) =>
                      setAdopted((prev) =>
                        prev.map((h) =>
                          h.id === hound.id
                            ? { ...h, adoptedDate: e.target.value }
                            : h
                        )
                      )
                    }
                  />
                </Field>
              </div>
              <Field label="Description">
                <Textarea
                  value={hound.description}
                  rows={3}
                  onChange={(e) =>
                    setAdopted((prev) =>
                      prev.map((h) =>
                        h.id === hound.id
                          ? { ...h, description: e.target.value }
                          : h
                      )
                    )
                  }
                />
              </Field>
              <ImageGallery
                images={hound.images}
                uploading={uploadingId === hound.id}
                onUpload={(file) =>
                  uploadImage("adopted", hound.id, hound.name, file, "gallery")
                }
                onRemove={(index) =>
                  setAdopted((prev) =>
                    prev.map((h) =>
                      h.id === hound.id
                        ? {
                            ...h,
                            images: h.images.filter((_, i) => i !== index),
                          }
                        : h
                    )
                  )
                }
              />
            </HoundCard>
          ))}
        </TabsContent>

        <TabsContent value="available" className="space-y-4 mt-6">
          <div className="flex flex-wrap gap-2">
            <Button onClick={addAvailable} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add available hound
            </Button>
            <Button onClick={() => saveCollection("available")} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save available"}
            </Button>
          </div>

          {available.map((hound, index) => (
            <HoundCard
              key={hound.id}
              index={index}
              total={available.length}
              title={hound.name}
              onReorder={(from, to) =>
                setAvailable((prev) => reorderItems(prev, from, to))
              }
              onDelete={() =>
                setAvailable((prev) => prev.filter((h) => h.id !== hound.id))
              }
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name">
                  <Input
                    value={hound.name}
                    onChange={(e) =>
                      setAvailable((prev) =>
                        prev.map((h) =>
                          h.id === hound.id ? { ...h, name: e.target.value } : h
                        )
                      )
                    }
                  />
                </Field>
                <Field label="Origin">
                  <Input
                    value={hound.origin}
                    onChange={(e) =>
                      setAvailable((prev) =>
                        prev.map((h) =>
                          h.id === hound.id
                            ? { ...h, origin: e.target.value }
                            : h
                        )
                      )
                    }
                  />
                </Field>
              </div>
              <Field label="Description">
                <Textarea
                  value={hound.description}
                  rows={3}
                  onChange={(e) =>
                    setAvailable((prev) =>
                      prev.map((h) =>
                        h.id === hound.id
                          ? { ...h, description: e.target.value }
                          : h
                      )
                    )
                  }
                />
              </Field>
              <ImageGallery
                images={hound.images}
                uploading={uploadingId === hound.id}
                onUpload={(file) =>
                  uploadImage(
                    "available",
                    hound.id,
                    hound.name,
                    file,
                    "gallery"
                  )
                }
                onRemove={(index) =>
                  setAvailable((prev) =>
                    prev.map((h) =>
                      h.id === hound.id
                        ? {
                            ...h,
                            images: h.images.filter((_, i) => i !== index),
                          }
                        : h
                    )
                  )
                }
              />
            </HoundCard>
          ))}
        </TabsContent>

        <TabsContent value="foxhounds" className="space-y-4 mt-6">
          <div className="flex flex-wrap gap-2">
            <Button onClick={addFoxhound} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add foxhound
            </Button>
            <Button onClick={() => saveCollection("foxhounds")} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save foxhounds"}
            </Button>
          </div>

          {foxhounds.map((hound, index) => (
            <HoundCard
              key={hound.id}
              index={index}
              total={foxhounds.length}
              title={hound.name}
              onReorder={(from, to) =>
                setFoxhounds((prev) => reorderItems(prev, from, to))
              }
              onDelete={() =>
                setFoxhounds((prev) => prev.filter((h) => h.id !== hound.id))
              }
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name">
                  <Input
                    value={hound.name}
                    onChange={(e) => {
                      const name = e.target.value
                      setFoxhounds((prev) =>
                        prev.map((h) =>
                          h.id === hound.id
                            ? {
                                ...h,
                                name,
                                id: h.id.startsWith("hound-")
                                  ? slugifyName(name) || h.id
                                  : h.id,
                              }
                            : h
                        )
                      )
                    }}
                  />
                </Field>
                <Field label="Sex">
                  <Input
                    value={hound.sex}
                    onChange={(e) =>
                      setFoxhounds((prev) =>
                        prev.map((h) =>
                          h.id === hound.id ? { ...h, sex: e.target.value } : h
                        )
                      )
                    }
                  />
                </Field>
                <Field label="S.F.S.B. #">
                  <Input
                    value={hound.sfsbNumber ?? ""}
                    onChange={(e) =>
                      setFoxhounds((prev) =>
                        prev.map((h) =>
                          h.id === hound.id
                            ? {
                                ...h,
                                sfsbNumber: e.target.value || null,
                              }
                            : h
                        )
                      )
                    }
                  />
                </Field>
                <Field label="Whelped">
                  <Input
                    value={hound.whelped}
                    onChange={(e) =>
                      setFoxhounds((prev) =>
                        prev.map((h) =>
                          h.id === hound.id
                            ? { ...h, whelped: e.target.value }
                            : h
                        )
                      )
                    }
                  />
                </Field>
                <Field label="Litter #">
                  <Input
                    value={hound.litterNumber ?? ""}
                    onChange={(e) =>
                      setFoxhounds((prev) =>
                        prev.map((h) =>
                          h.id === hound.id
                            ? {
                                ...h,
                                litterNumber: e.target.value || null,
                              }
                            : h
                        )
                      )
                    }
                  />
                </Field>
                <Field label="Sire">
                  <Input
                    value={hound.sire}
                    onChange={(e) =>
                      setFoxhounds((prev) =>
                        prev.map((h) =>
                          h.id === hound.id ? { ...h, sire: e.target.value } : h
                        )
                      )
                    }
                  />
                </Field>
                <Field label="Gyp" className="sm:col-span-2">
                  <Input
                    value={hound.gyp}
                    onChange={(e) =>
                      setFoxhounds((prev) =>
                        prev.map((h) =>
                          h.id === hound.id ? { ...h, gyp: e.target.value } : h
                        )
                      )
                    }
                  />
                </Field>
              </div>

              <SingleImageField
                image={hound.image}
                uploading={uploadingId === hound.id}
                onUpload={(file) =>
                  uploadImage("foxhounds", hound.id, hound.name, file, "single")
                }
                onRemove={() =>
                  setFoxhounds((prev) =>
                    prev.map((h) =>
                      h.id === hound.id ? { ...h, image: "" } : h
                    )
                  )
                }
              />
            </HoundCard>
          ))}
        </TabsContent>

        <TabsContent value="chatbot" className="space-y-4 mt-6">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h2 className="font-serif text-xl font-semibold">Chatbot instructions</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  This text tells the website AI how to answer visitors. Include hours, policies, and what to collect before an inquiry is submitted.
                </p>
              </div>
            </div>

            <Field label="System prompt">
              <Textarea
                value={chatbotPrompt}
                onChange={(e) => setChatbotPrompt(e.target.value)}
                rows={18}
                className="font-mono text-sm"
                placeholder="Enter chatbot instructions..."
              />
            </Field>

            <div className="flex flex-wrap gap-2">
              <Button onClick={saveChatbotPrompt} disabled={savingPrompt}>
                <Save className="w-4 h-4 mr-2" />
                {savingPrompt ? "Saving..." : "Save chatbot prompt"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setChatbotPrompt(defaultChatbotPrompt)}
                disabled={!defaultChatbotPrompt}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to default
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function HoundCard({
  index,
  total,
  title,
  children,
  onDelete,
  onReorder,
}: {
  index: number
  total: number
  title: string
  children: React.ReactNode
  onDelete: () => void
  onReorder: (from: number, to: number) => void
}) {
  const [dragOver, setDragOver] = useState(false)

  return (
    <article
      onDragOver={(e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "move"
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        const from = Number(e.dataTransfer.getData("text/plain"))
        if (!Number.isNaN(from)) onReorder(from, index)
      }}
      className={`bg-card border rounded-2xl p-6 space-y-4 shadow-sm transition-colors ${
        dragOver ? "border-primary ring-2 ring-primary/20" : "border-border"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = "move"
              e.dataTransfer.setData("text/plain", String(index))
            }}
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-1 shrink-0"
            aria-label={`Drag to reorder ${title}`}
          >
            <GripVertical className="w-5 h-5" />
          </button>
          <span className="text-xs text-muted-foreground shrink-0">#{index + 1}</span>
          <h2 className="font-serif text-xl font-semibold truncate">{title}</h2>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={index === 0}
            onClick={() => onReorder(index, index - 1)}
            aria-label="Move up"
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={index >= total - 1}
            onClick={() => onReorder(index, index + 1)}
            aria-label="Move down"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete} className="text-destructive">
            <Trash2 className="w-4 h-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
      {children}
    </article>
  )
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  )
}

function ImageGallery({
  images,
  uploading,
  onUpload,
  onRemove,
}: {
  images: string[]
  uploading: boolean
  onUpload: (file: File) => void
  onRemove: (index: number) => void
}) {
  return (
    <div className="space-y-3">
      <Label className="text-xs text-muted-foreground">Photos</Label>
      <div className="flex flex-wrap gap-3">
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative w-24 h-24 rounded-lg overflow-hidden border border-border group"
          >
            <Image src={src} alt="" fill className="object-cover" unoptimized />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 bg-black/60 text-white rounded p-1 opacity-0 group-hover:opacity-100 transition"
              aria-label="Remove image"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
        <label className="w-24 h-24 rounded-lg border border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/50 transition text-muted-foreground text-xs gap-1">
          {uploading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Add photo
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onUpload(file)
              e.target.value = ""
            }}
          />
        </label>
      </div>
    </div>
  )
}

function SingleImageField({
  image,
  uploading,
  onUpload,
  onRemove,
}: {
  image: string
  uploading: boolean
  onUpload: (file: File) => void
  onRemove: () => void
}) {
  return (
    <div className="space-y-3">
      <Label className="text-xs text-muted-foreground">Profile photo</Label>
      <div className="flex items-start gap-4">
        {image ? (
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border group">
            <Image src={image} alt="" fill className="object-cover" unoptimized />
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-1 right-1 bg-black/60 text-white rounded p-1"
              aria-label="Remove image"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="w-32 h-32 rounded-lg bg-muted border border-border flex items-center justify-center text-xs text-muted-foreground">
            No photo
          </div>
        )}
        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border cursor-pointer hover:bg-secondary/50 text-sm">
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          Upload photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onUpload(file)
              e.target.value = ""
            }}
          />
        </label>
      </div>
    </div>
  )
}
