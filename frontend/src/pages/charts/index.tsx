// **  Components
import {
  CommonTests
  // StressTest
} from './components'

// ** Third Party Styles Import
import 'chart.js/auto'
import { Box } from '@mui/material'

export const Charts = () => {
  return (
    <Box>
      {/* <StressTest /> */}
      <CommonTests />
    </Box>
  )
}
