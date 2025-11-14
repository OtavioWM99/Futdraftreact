'use client'

import { useState } from 'react'
import { Login } from './components/login'
import { Navigation } from './components/navigation'
import { Dashboard } from './components/dashboard'
import { PerformanceAnalysis } from './components/performance-analysis'
import { MatchAnalysis } from './components/match-analysis'
import { AlertsPredictions } from './components/alerts-predictions'
import { ExpandedScout } from './components/expanded-scout'
import { TacticalAnalysis } from './components/tactical-analysis'
import { SquadManagement } from './components/squad-management'
import { Reports } from './components/reports'
import { Competitions } from './components/competitions'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState('')
  const [activeSection, setActiveSection] = useState('dashboard')

  const handleLogin = (profile: string) => {
    setUserProfile(profile)
    setIsLoggedIn(true)
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />
      case 'performance':
        return <PerformanceAnalysis />
      case 'match-analysis':
        return <MatchAnalysis />
      case 'tactics':
        return <TacticalAnalysis />
      case 'scout':
        return <ExpandedScout />
      case 'alerts':
        return <AlertsPredictions />
      case 'reports':
        return <Reports />
      case 'competitions':
        return <Competitions />
      case 'squad':
        return <SquadManagement />
      default:
        return <Dashboard />
    }
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background dark flex">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        userProfile={userProfile}
      />
      <main className="flex-1 overflow-auto">
        {renderActiveSection()}
      </main>
    </div>
  )
}