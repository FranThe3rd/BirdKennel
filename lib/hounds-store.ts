import { promises as fs } from "fs"
import path from "path"
import type {
  AdoptedHound,
  AvailableHound,
  Foxhound,
  HoundCollection,
} from "@/types/hounds"

const dataFile: Record<HoundCollection, string> = {
  adopted: "adopted.json",
  available: "available.json",
  foxhounds: "foxhounds.json",
}

function dataPath(type: HoundCollection) {
  return path.join(process.cwd(), "data", dataFile[type])
}

async function readJson<T>(type: HoundCollection): Promise<T[]> {
  const file = await fs.readFile(dataPath(type), "utf8")
  const parsed = JSON.parse(file)
  if (!Array.isArray(parsed)) {
    throw new Error(`Invalid data file for ${type}`)
  }
  return parsed as T[]
}

async function writeJson<T>(type: HoundCollection, items: T[]) {
  await fs.mkdir(path.dirname(dataPath(type)), { recursive: true })
  await fs.writeFile(dataPath(type), JSON.stringify(items, null, 2), "utf8")
}

export async function getAdoptedHounds() {
  return readJson<AdoptedHound>("adopted")
}

export async function getAvailableHounds() {
  return readJson<AvailableHound>("available")
}

export async function getFoxhounds() {
  return readJson<Foxhound>("foxhounds")
}

export async function getHounds(type: HoundCollection) {
  switch (type) {
    case "adopted":
      return getAdoptedHounds()
    case "available":
      return getAvailableHounds()
    case "foxhounds":
      return getFoxhounds()
  }
}

export async function saveHounds(type: HoundCollection, items: unknown[]) {
  await writeJson(type, items)
}

export { slugifyName } from "@/lib/slug"

export function imageUploadDir(type: HoundCollection) {
  return path.join(process.cwd(), "public", "images", type)
}
