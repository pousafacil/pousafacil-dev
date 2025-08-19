import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LoginPage } from './pages/auth/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { BookingsPage } from './pages/BookingsPage'
import { PaymentsPage } from './pages/PaymentsPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { RoomsPage } from './pages/RoomsPage'
import { RatesPage } from './pages/RatesPage'
import { GuestsPage } from './pages/GuestsPage'
import { CheckInOutPage } from './pages/CheckInOutPage'
import { SmartLocksPage } from './pages/SmartLocksPage'
import { SettingsPage } from './pages/SettingsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout />}> 
        <Route index element={<DashboardPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="rates" element={<RatesPage />} />
        <Route path="guests" element={<GuestsPage />} />
        <Route path="checkin-out" element={<CheckInOutPage />} />
        <Route path="smart-locks" element={<SmartLocksPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}

