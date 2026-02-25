import type { DevicePreset } from './types'

export const DEVICE_PRESETS: DevicePreset[] = [
  { name: 'Desktop', label: 'desktop', icon: 'Monitor', width: 600 },
  { name: 'Tablet', label: 'tablet', icon: 'Tablet', width: 480 },
  { name: 'Mobile', label: 'mobile', icon: 'Smartphone', width: 320 },
]

export const FONT_OPTIONS = [
  { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: "'Times New Roman', Times, serif" },
  { label: 'Courier New', value: "'Courier New', Courier, monospace" },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
  { label: 'Trebuchet MS', value: "'Trebuchet MS', Helvetica, sans-serif" },
  { label: 'Lucida Sans', value: "'Lucida Sans', 'Lucida Grande', sans-serif" },
  { label: 'Inter', value: "'Inter', Helvetica, Arial, sans-serif" },
  { label: 'Work Sans', value: "'Work Sans', Helvetica, Arial, sans-serif" },
]
