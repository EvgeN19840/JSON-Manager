// ** Icons
import HomeIcon from '@mui/icons-material/Home'

// ** Types
import { Page, PageKey } from '@/types/pages'

// ** Constants
import { Paths } from './paths'

export const PAGES_CONFIG: { [key in PageKey]: Page } = {
  home: {
    key: 'home',
    route: Paths.Home,
    type: 'public',
    name: 'JSON Menager',
    icon: <HomeIcon />
  },
  charts: {
    key: 'charts',
    route: Paths.Charts,
    type: 'public',
    name: 'Charts',
    icon: <HomeIcon />
  }
}

export const PUBLIC_PAGES = Object.values(PAGES_CONFIG).filter(page => page.type === 'public')
