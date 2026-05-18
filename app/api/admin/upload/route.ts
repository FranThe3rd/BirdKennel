import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { imageUploadDir, slugifyName } from "@/lib/hounds-store"
import type { HoundCollection } from "@/types/hounds"

const validTypes: HoundCollection[] = ["adopted", "available", "foxhounds"]

const allowedMime = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
])

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get("file")
  const type = formData.get("type") as HoundCollection | null
  const nameHint = String(formData.get("name") || "hound")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  if (!type || !validTypes.includes(type)) {
    return NextResponse.json({ error: "Invalid collection type" }, { status: 400 })
  }

  if (!allowedMime.has(file.type)) {
    return NextResponse.json(
      { error: "Only JPG, PNG, WEBP, or GIF images are allowed." },
      { status: 400 }
    )
  }

  const extFromName = path.extname(file.name).toLowerCase()
  const ext =
    extFromName ||
    (file.type === "image/png"
      ? ".png"
      : file.type === "image/webp"
        ? ".webp"
        : file.type === "image/gif"
          ? ".gif"
          : ".jpg")

  const slug = slugifyName(nameHint)
  const filename = `hound-${slug}-${Date.now()}${ext}`
  const uploadDir = imageUploadDir(type)
  const diskPath = path.join(uploadDir, filename)

  await fs.mkdir(uploadDir, { recursive: true })
  const bytes = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(diskPath, bytes)

  const url = `/images/${type}/${filename}`
  return NextResponse.json({ url })
}
