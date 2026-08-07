import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppStateProvider } from './context/AppState'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { LandingPage } from './pages/LandingPage'
import { SearchPage } from './pages/SearchPage'
import { DetailPage } from './pages/DetailPage'
import { MapPage } from './pages/MapPage'
import { AgentPage } from './pages/AgentPage'
import { AgentDashboardPage } from './pages/AgentDashboardPage'
import { ListPropertyPage } from './pages/ListPropertyPage'
import { NeighborhoodsPage } from './pages/NeighborhoodsPage'
import { NeighborhoodPage } from './pages/NeighborhoodPage'
import { MarketNotesPage } from './pages/MarketNotesPage'
import { ContactPage } from './pages/ContactPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { TermsPage } from './pages/TermsPage'
import { FeesPage } from './pages/FeesPage'
import { NotFoundPage } from './pages/NotFoundPage'

/** The cinematic landing page at '/' is the front door: full-bleed hero,
 *  no top Navbar (the hero carries its own wordmark instead). It still
 *  gets the standard Footer, since legal/contact links belong on every
 *  page, marketing or not. Every other route is the actual app, which
 *  keeps both Navbar and Footer. This is a UI-only distinction, not a
 *  security boundary: there is no backend, so nothing here actually
 *  prevents someone from loading /app/search directly. It just controls
 *  what the first impression looks like. */
function Shell() {
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

  return (
    <>
      {!isLanding && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="/app" element={<HomePage />} />
        <Route path="/app/search" element={<SearchPage />} />
        <Route path="/app/listing/:id" element={<DetailPage />} />
        <Route path="/app/map" element={<MapPage />} />
        <Route path="/app/agent/:id" element={<AgentPage />} />
        <Route path="/app/agent/:id/dashboard" element={<AgentDashboardPage />} />
        <Route path="/app/list-property" element={<ListPropertyPage />} />
        <Route path="/app/neighborhoods" element={<NeighborhoodsPage />} />
        <Route path="/app/neighborhoods/:slug" element={<NeighborhoodPage />} />
        <Route path="/app/market-notes" element={<MarketNotesPage />} />
        <Route path="/app/contact" element={<ContactPage />} />
        <Route path="/app/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/app/terms" element={<TermsPage />} />
        <Route path="/app/fees" element={<FeesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <Shell />
      </AppStateProvider>
    </BrowserRouter>
  )
}
