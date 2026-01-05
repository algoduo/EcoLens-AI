import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS classes while handling conflicts efficiently.
 * This is required for Shadcn UI components to render correctly.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}