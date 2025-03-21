// ** React
import { FC } from 'react'

// ** Components
import { Layout } from './core/layout'
import { Navigate, Route, Routes } from 'react-router-dom'

// ** Pages
import { Charts, Home } from './pages'

// ** Styles
import './App.css'

// ** Constants
import { Paths } from './constants/paths'
import { PUBLIC_PAGES } from './constants/pages'

// ** Types
import { PageKey } from './types/pages'

function App() {
  return (
    <Routes>
      <Route element={<Layout title='CayPay' />}>
        {PUBLIC_PAGES.map(({ key, route }) => {
          const Page = pagesMap[key]
          return <Route key={key} path={route} element={<Page />} />
        })}
      </Route>
      <Route path='*' element={<Navigate to={Paths.Home} replace />} />
    </Routes>
  )
}
export default App

const pagesMap: { [key in PageKey]: FC } = {
  home: Home,
  charts: Charts
}
