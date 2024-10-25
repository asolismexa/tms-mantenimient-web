import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { TabPanel } from '@/components/tabs/TabPanel'
import { useReportDetailStore } from '@/store/reportDetailStore'
import { ReportDetailTab } from '@/components/tabs/ReportDetailTab'
import { ReportObservationsTab } from '@/components/tabs/ReportObservationsTab'
import { ReportEvidencesTab } from '@/components/tabs/ReportEvidencesTab'

export function ReportDetailTabs () {
  const tab = useReportDetailStore(state => state.dialogTab)
  const setDialogTab = useReportDetailStore(state => state.setDialogTab)

  const handleChange = (_, newValue) => {
    setDialogTab(newValue)
  }

  return (
    <Box width='100%'>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="DETALLE" tabIndex={0} />
        <Tab label="OBSERVACIONES" tabIndex={1} />
        <Tab label="EVIDENCIAS" tabIndex={2} />
      </Tabs>
      <TabPanel index={0} value={tab}>
        <ReportDetailTab />
      </TabPanel>
      <TabPanel index={1} value={tab}>
        <ReportObservationsTab />
      </TabPanel>
      <TabPanel index={2} value={tab}>
        <ReportEvidencesTab />
      </TabPanel>
    </Box>
  )
}
