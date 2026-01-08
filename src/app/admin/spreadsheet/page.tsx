'use client'

import { useState } from 'react'
import { FileSpreadsheet, RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/components/providers/language-provider'

export default function SpreadsheetSyncPage() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [lastSync, setLastSync] = useState<{
    success: boolean
    rowsProcessed: number
    rowsCreated: number
    rowsUpdated: number
    rowsDeleted: number
  } | null>(null)

  const handleSync = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/sync-spreadsheet', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Sync failed')
      }

      setLastSync(data)
      toast({
        title: t('spreadsheet.syncCompleted'),
        description: t('spreadsheet.processedRows').replace('{count}', data.rowsProcessed.toString()),
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: t('spreadsheet.syncFailedTitle'),
        description: error instanceof Error ? error.message : t('auth.somethingWrong'),
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('spreadsheet.title')}</h1>
        <p className="text-muted-foreground">
          {t('spreadsheet.desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sync Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5" />
              {t('spreadsheet.googleSheets')}
            </CardTitle>
            <CardDescription>
              {t('spreadsheet.autoSync')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-secondary/50">
              <h4 className="font-medium mb-2">{t('spreadsheet.format')}</h4>
              <p className="text-sm text-muted-foreground mb-3">
                {t('spreadsheet.formatDesc')}
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t('spreadsheet.columnA')}</li>
                <li>• {t('spreadsheet.columnB')}</li>
                <li>• {t('spreadsheet.columnC')}</li>
                <li>• {t('spreadsheet.columnD')}</li>
                <li>• {t('spreadsheet.columnE')}</li>
                <li>• {t('spreadsheet.columnF')}</li>
                <li>• {t('spreadsheet.columnG')}</li>
                <li>• {t('spreadsheet.columnH')}</li>
                <li>• {t('spreadsheet.columnI')}</li>
              </ul>
            </div>

            <Button
              onClick={handleSync}
              className="w-full"
              variant="gradient"
              loading={isLoading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {t('spreadsheet.syncNow')}
            </Button>
          </CardContent>
        </Card>

        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('spreadsheet.syncStatus')}</CardTitle>
            <CardDescription>{t('spreadsheet.lastSync')}</CardDescription>
          </CardHeader>
          <CardContent>
            {lastSync ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {lastSync.success ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="font-medium">
                    {lastSync.success ? t('spreadsheet.syncSuccessful') : t('spreadsheet.syncFailed')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-2xl font-bold">{lastSync.rowsProcessed}</p>
                    <p className="text-sm text-muted-foreground">{t('spreadsheet.rowsProcessed')}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-2xl font-bold text-green-500">{lastSync.rowsCreated}</p>
                    <p className="text-sm text-muted-foreground">{t('spreadsheet.created')}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-2xl font-bold text-blue-500">{lastSync.rowsUpdated}</p>
                    <p className="text-sm text-muted-foreground">{t('spreadsheet.updated')}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-2xl font-bold text-red-500">{lastSync.rowsDeleted}</p>
                    <p className="text-sm text-muted-foreground">{t('spreadsheet.deleted')}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('spreadsheet.noSyncYet')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('spreadsheet.clickSync')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>{t('spreadsheet.setupInstructions')}</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <ol className="space-y-2 text-muted-foreground">
            <li>{t('spreadsheet.instruction1')}</li>
            <li>{t('spreadsheet.instruction2')}</li>
            <li>{t('spreadsheet.instruction3')}</li>
            <li>{t('spreadsheet.instruction4')}</li>
            <li>{t('spreadsheet.instruction5')}</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
