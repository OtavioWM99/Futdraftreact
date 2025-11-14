'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Trophy, 
  Mail, 
  Lock, 
  Shield, 
  User, 
  BarChart3, 
  Eye, 
  Target,
  Users
} from 'lucide-react'

interface LoginProps {
  onLogin: (profile: string) => void
}

const userProfiles = [
  {
    id: 'analista',
    name: 'Analista',
    description: 'Análise de dados e performance',
    icon: BarChart3,
    color: 'bg-primary',
    features: ['Análise de Performance', 'Relatórios IA', 'Métricas Físicas']
  },
  {
    id: 'tecnico',
    name: 'Técnico',
    description: 'Estratégia e tática de jogo',
    icon: Target,
    color: 'bg-accent',
    features: ['Análise Tática', 'Escalações', 'Match Center']
  },
  {
    id: 'scout',
    name: 'Scout',
    description: 'Prospecção de talentos',
    icon: Eye,
    color: 'bg-orange-500',
    features: ['Scout Base', 'Desenvolvimento', 'Banco Talentos']
  },
  {
    id: 'dirigente',
    name: 'Dirigente',
    description: 'Gestão estratégica do clube',
    icon: Users,
    color: 'bg-purple-500',
    features: ['Gestão Elenco', 'Análise Financeira', 'Dashboard Executivo']
  }
]

export function Login({ onLogin }: LoginProps) {
  const [step, setStep] = useState<'login' | 'profile'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [twoFactorCode, setTwoFactorCode] = useState('')
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState('')

  const handleLogin = () => {
    if (!showTwoFactor) {
      setShowTwoFactor(true)
    } else {
      setStep('profile')
    }
  }

  const handleProfileSelect = (profileId: string) => {
    setSelectedProfile(profileId)
  }

  const handleConfirmProfile = () => {
    onLogin(selectedProfile)
  }

  if (step === 'profile') {
    return (
      <div className="min-h-screen bg-background dark flex items-center justify-center p-6">
        <div className="w-full max-w-4xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Trophy className="w-8 h-8 text-black" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">FutDraft</h1>
                <p className="text-muted-foreground">Consultoria</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Selecione seu Perfil</h2>
              <p className="text-muted-foreground">
                Escolha o perfil que melhor representa sua função no clube
              </p>
            </div>
          </div>

          {/* Profile Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userProfiles.map((profile) => {
              const Icon = profile.icon
              const isSelected = selectedProfile === profile.id
              
              return (
                <Card
                  key={profile.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-primary bg-primary/10 ring-2 ring-primary' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleProfileSelect(profile.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg ${profile.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white">{profile.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{profile.description}</p>
                        <div className="space-y-1">
                          {profile.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="mr-1 mb-1 text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-black rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleConfirmProfile}
              disabled={!selectedProfile}
              className="px-8 py-2 bg-primary hover:bg-primary/90"
              size="lg"
            >
              Continuar para Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background dark flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Trophy className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">FutDraft</h1>
              <p className="text-sm text-muted-foreground">Consultoria</p>
            </div>
          </div>
          <div>
            <CardTitle className="text-white">Acesso ao Sistema</CardTitle>
            <CardDescription>
              Faça login com suas credenciais para continuar
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {!showTwoFactor ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white">Autenticação 2FA</h3>
                <p className="text-sm text-muted-foreground">
                  Digite o código de 6 dígitos do seu autenticador
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twoFactor" className="text-white">Código 2FA</Label>
                <Input
                  id="twoFactor"
                  type="text"
                  placeholder="000000"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
              </div>
            </div>
          )}

          <Button 
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!email || !password || (showTwoFactor && twoFactorCode.length !== 6)}
          >
            {!showTwoFactor ? 'Fazer Login' : 'Verificar Código'}
          </Button>

          <div className="text-center">
            <Button variant="link" className="text-muted-foreground">
              Esqueceu sua senha?
            </Button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-primary font-medium">Segurança de Dados</p>
                <p className="text-xs text-muted-foreground">
                  Seus dados são protegidos com criptografia de ponta a ponta
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}