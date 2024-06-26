import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (process.env.VERCEL_ENV === "production") {
    return `https://uno-saas.vercel.app`
  }
  return 'https://localhost:3000' // default to localhost for local development
}

export function getWebhookUrl() {
  if (process.env.VERCEL_ENV === "production") {
    return `https://uno-saas.vercel.app`
  }
  return `${process.env.NGROK_URI}` // default to localhost ngrok webhook for local development
}