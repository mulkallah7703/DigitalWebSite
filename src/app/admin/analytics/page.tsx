import { Metadata } from 'next'
import { AnalyticsContent } from './analytics-content'

export const metadata: Metadata = {
  title: 'Analytics',
  description: 'View store analytics and insights',
}

export default function AdminAnalyticsPage() {
  return <AnalyticsContent />
}
