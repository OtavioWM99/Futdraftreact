'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { Switch } from './ui/switch'
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target, 
  Activity, 
  TrendingUp,
  Users,
  Heart,
  Shield,
  Zap,
  Bell,
  Settings,
  Calendar,
  BarChart3
} from 'lucide-react'

const injuryAlerts = [
  {
    id: 1,
    player: 'Pedro Costa',
    risk: 78,
    type: 'muscular',
    position: 'Defensor',
    recommendation: 'Reduzir carga de treino por 3 dias',
    priority: 'high',
    factors: ['Fadiga muscular elevada', 'Histórico de lesão', 'Sobrecarga de jogos']
  },
  {
    id: 2,
    player: 'Carlos Santos',
    risk: 45,
    type: 'articular',
    position: 'Meio-campo',
    recommendation: 'Monitoramento preventivo',
    priority: 'medium',
    factors: ['Impactos repetidos', 'Idade avançada']
  },
  {
    id: 3,
    player: 'João Silva',
    risk: 23,
    type: 'overuse',
    position: 'Atacante',
    recommendation: 'Rotação recomendada',
    priority: 'low',
    factors: ['Alto volume de sprints']
  }
]

const tacticalPredictions = [
  {
    formation: '4-2-3-1',
    probability: 72,
    effectiveness: 'alta',
    recommendation: 'Formação ideal para próximo adversário',
    pros: ['Controle do meio-campo', 'Flexibilidade ofensiva'],
    cons: ['Vulnerabilidade nas laterais']
  },
  {
    formation: '3-5-2',
    probability: 58,
    effectiveness: 'média',
    recommendation: 'Alternativa para jogos fora de casa',
    pros: ['Solidez defensiva', 'Superioridade numérica no meio'],
    cons: ['Menos opções ofensivas']
  }
]

const lineupPredictions = [
  {
    player: 'João Silva',
    position: 'ATA',
    probability: 95,
    form: 92,
    fitness: 88,
    recommendation: 'Titular confirmado'
  },
  {
    player: 'Carlos Santos',
    position: 'MC',
    probability: 87,
    form: 85,
    fitness: 94,
    recommendation: 'Titular provável'
  },
  {
    player: 'Pedro Costa',
    position: 'ZAG',
    probability: 45,
    form: 78,
    fitness: 72,
    recommendation: 'Avaliar condição física'
  },
  {
    player: 'Lucas Lima',
    position: 'MC',
    probability: 78,
    form: 89,
    fitness: 91,
    recommendation: 'Opção para titular'
  }
]

const trainingRecommendations = [
  {
    type: 'Físico',
    intensity: 75,
    focus: 'Resistência aeróbica',
    duration: '90 min',
    players: ['João Silva', 'Carlos Santos', 'Miguel Torres'],
    notes: 'Foco em recuperação ativa pós-jogo'
  },
  {
    type: 'Tático',
    intensity: 85,
    focus: 'Transições ofensivas',
    duration: '120 min',
    players: ['Meio-campo', 'Ataque'],
    notes: 'Preparação para próximo adversário'
  },
  {
    type: 'Técnico',
    intensity: 60,
    focus: 'Finalizações',
    duration: '60 min',
    players: ['João Silva', 'Roberto Costa', 'Anderson Lima'],
    notes: 'Trabalho específico de finalização'
  }
]

export function AlertsPredictions() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [autoReports, setAutoReports] = useState(true)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive border-destructive bg-destructive/10'
      case 'medium': return 'text-orange-500 border-orange-500 bg-orange-500/10'
      case 'low': return 'text-primary border-primary bg-primary/10'
      default: return 'text-muted-foreground'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertTriangle
      case 'medium': return Clock
      case 'low': return CheckCircle
      default: return Bell
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Alertas &amp; Previsões IA</h1>
          <p className="text-muted-foreground">
            Notificações inteligentes e previsões baseadas em dados
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-primary text-primary">
            <Brain className="w-3 h-3 mr-1" />
            27 Alertas Ativos
          </Badge>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Settings Panel */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações de Alertas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Notificações Push</p>
                <p className="text-xs text-muted-foreground">Receber alertas em tempo real</p>
              </div>
              <Switch 
                checked={notificationsEnabled} 
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Relatórios Automáticos</p>
                <p className="text-xs text-muted-foreground">Geração diária de insights</p>
              </div>
              <Switch 
                checked={autoReports} 
                onCheckedChange={setAutoReports}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="injuries" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-secondary">
          <TabsTrigger value="injuries">Alertas Lesão</TabsTrigger>
          <TabsTrigger value="tactical">Sugestões Táticas</TabsTrigger>
          <TabsTrigger value="lineup">Escalação IA</TabsTrigger>
          <TabsTrigger value="training">Treino Personalizado</TabsTrigger>
        </TabsList>

        <TabsContent value="injuries" className="space-y-4">
          <div className="grid gap-4">
            {injuryAlerts.map((alert) => {
              const IconComponent = getPriorityIcon(alert.priority)
              
              return (
                <Card key={alert.id} className={`border ${getPriorityColor(alert.priority)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-current/20 flex items-center justify-center">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-white">{alert.player}</h3>
                          <Badge variant="outline">{alert.position}</Badge>
                          <Badge variant={alert.priority === 'high' ? 'destructive' : 'outline'}>
                            Risco: {alert.risk}%
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Fatores de Risco:</p>
                            <div className="flex flex-wrap gap-1">
                              {alert.factors.map((factor, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {factor}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-sm text-primary">{alert.recommendation}</span>
                          </div>
                          
                          <Progress value={alert.risk} className={`h-2 ${alert.priority === 'high' ? '[&>div]:bg-destructive' : ''}`} />
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Ver Detalhes
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Aplicar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="tactical" className="space-y-4">
          <div className="grid gap-6">
            {tacticalPredictions.map((prediction, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-bold text-white">{prediction.formation}</h3>
                        <Badge className="bg-primary text-black">
                          {prediction.probability}% efetividade
                        </Badge>
                        <Badge variant={prediction.effectiveness === 'alta' ? 'default' : 'secondary'}>
                          {prediction.effectiveness} recomendação
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {prediction.recommendation}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-primary mb-2">Vantagens:</p>
                          <ul className="space-y-1">
                            {prediction.pros.map((pro, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-primary" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-orange-500 mb-2">Atenção:</p>
                          <ul className="space-y-1">
                            {prediction.cons.map((con, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                <AlertTriangle className="w-3 h-3 text-orange-500" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lineup" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">Escalação Sugerida pela IA</CardTitle>
              <CardDescription>
                Baseada em forma física, performance e análise do adversário
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lineupPredictions.map((player, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-xs text-primary font-medium">{player.position}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{player.player}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3 text-primary" />
                          <span className="text-xs text-muted-foreground">Forma: {player.form}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3 text-accent" />
                          <span className="text-xs text-muted-foreground">Físico: {player.fitness}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary">{player.probability}%</div>
                      <div className="text-xs text-muted-foreground">{player.recommendation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <div className="grid gap-4">
            {trainingRecommendations.map((training, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-white">Treino {training.type}</h3>
                        <Badge variant="outline">{training.duration}</Badge>
                        <Badge className="bg-accent text-accent-foreground">
                          Intensidade: {training.intensity}%
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Foco:</strong> {training.focus}
                      </p>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Jogadores:</strong> {training.players.join(', ')}
                      </p>
                      
                      <p className="text-sm text-primary">
                        {training.notes}
                      </p>
                      
                      <Progress value={training.intensity} className="h-2 mt-2" />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Calendar className="w-3 h-3 mr-1" />
                        Agendar
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Aplicar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}