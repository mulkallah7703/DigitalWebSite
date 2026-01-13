import { Metadata } from 'next'
import { SettingsContent } from './settings-content'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage admin settings',
}

export default function AdminSettingsPage() {
  return <SettingsContent />
}
