import { nanoid } from 'nanoid'

/** Generate a short unique ID for email document nodes */
export function createId(): string {
  return nanoid(8)
}
