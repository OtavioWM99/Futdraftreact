'use client'

import { useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Search, 
  FileText, 
  Settings,
  Trophy,
  Target,
  Activity,
  Brain,
  Eye,
  UserCheck,
  Play,
  Bell,
  LogOut,
  User
} from 'lucide-react'

interface NavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
  userProfile?: string
}

export function Navigation({ activeSection, onSectionChange, userProfile }: NavigationProps) {
  const mainSections = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'performance', label: 'Performance', icon: Activity },
    { id: 'match-analysis', label: 'Match Center', icon: Play },
    { id: 'tactics', label: 'Análise Tática', icon: Target },
    { id: 'scout', label: 'Scout &amp; Base', icon: Eye },
    { id: 'alerts', label: 'Alertas &amp; IA', icon: Bell },
    { id: 'squad', label: 'Gestão Elenco', icon: Users },
  ]

  const additionalSections = [
    { id: 'reports', label: 'Relatórios', icon: FileText },
    { id: 'competitions', label: 'Competições', icon: Trophy },
  ]

  const getProfileInfo = (profile: string) => {
    switch (profile) {
      case 'analista':
        return { name: 'Analista', color: 'bg-primary', icon: BarChart3 }
      case 'tecnico':
        return { name: 'Técnico', color: 'bg-accent', icon: Target }
      case 'scout':
        return { name: 'Scout', color: 'bg-orange-500', icon: Eye }
      case 'dirigente':
        return { name: 'Dirigente', color: 'bg-purple-500', icon: Users }
      default:
        return { name: 'Usuário', color: 'bg-primary', icon: User }
    }
  }

  const profileInfo = userProfile ? getProfileInfo(userProfile) : null

  return (
    <div className="w-64 bg-ea-dark border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Trophy className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="font-semibold text-white">FutDraft</h1>
            <p className="text-sm text-muted-foreground">Consultoria</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      {profileInfo && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
            <div className={`w-8 h-8 rounded-lg ${profileInfo.color} flex items-center justify-center`}>
              <profileInfo.icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{profileInfo.name}</p>
              <p className="text-xs text-muted-foreground">Acesso Completo</p>
            </div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          {mainSections.map((section) => {
            const Icon = section.icon
            const isActive = activeSection === section.id
            
            return (
              <Button
                key={section.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 h-11 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'text-muted-foreground hover:text-white hover:bg-secondary'
                }`}
                onClick={() => onSectionChange(section.id)}
              >
                <Icon className="w-5 h-5" />
                <span dangerouslySetInnerHTML={{ __html: section.label }} />
                {section.id === 'alerts' && (
                  <Badge variant="secondary" className="ml-auto bg-destructive text-destructive-foreground">
                    3
                  </Badge>
                )}
                {section.id === 'match-analysis' && (
                  <Badge variant="secondary" className="ml-auto bg-accent text-accent-foreground">
                    AO VIVO
                  </Badge>
                )}
              </Button>
            )
          })}
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground px-3 py-2">
            Ferramentas
          </p>
          {additionalSections.map((section) => {
            const Icon = section.icon
            const isActive = activeSection === section.id
            
            return (
              <Button
                key={section.id}
                variant="ghost"
                className={`w-full justify-start gap-3 h-10 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-white hover:bg-secondary'
                }`}
                onClick={() => onSectionChange(section.id)}
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-white"
          onClick={() => onSectionChange('settings')}
        >
          <Settings className="w-4 h-4" />
          Configurações
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
        
        <div className="mt-4 p-3 bg-card rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Sistema</span>
          </div>
          <p className="text-xs text-muted-foreground">
            IA conectada • Dados sincronizados
          </p>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs text-primary">Online</span>
          </div>
        </div>
      </div>
    </div>
  )
}