'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Heart, 
  Zap, 
  Target,
  Shield,
  Timer,
  AlertTriangle,
  CheckCircle,
  BarChart3
} from 'lucide-react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts'

const playersData = [
  {
    id: 1,
    name: 'João Silva',
    position: 'Atacante',
    age: 24,
    overall: 89,
    form: 92,
    fitness: 85,
    injury_risk: 15,
    image: '/api/placeholder/40/40'
  },
  {
    id: 2,
    name: 'Carlos Santos',
    position: 'Meio-campo',
    age: 27,
    overall: 86,
    form: 88,
    fitness: 92,
    injury_risk: 8,
    image: '/api/placeholder/40/40'
  },
  {
    id: 3,
    name: 'Pedro Costa',
    position: 'Defensor',
    age: 29,
    overall: 84,
    form: 79,
    fitness: 88,
    injury_risk: 22,
    image: '/api/placeholder/40/40'
  },
  {
    id: 4,
    name: 'Lucas Oliveira',
    position: 'Goleiro',
    age: 26,
    overall: 87,
    form: 91,
    fitness: 90,
    injury_risk: 5,
    image: '/api/placeholder/40/40'
  }
]

const selectedPlayerRadarData = [
  { attribute: 'Velocidade', value: 85, fullMark: 100 },
  { attribute: 'Finalização', value: 92, fullMark: 100 },
  { attribute: 'Passe', value: 78, fullMark: 100 },
  { attribute: 'Drible', value: 88, fullMark: 100 },
  { attribute: 'Defesa', value: 45, fullMark: 100 },
  { attribute: 'Físico', value: 82, fullMark: 100 },
]

const performanceHistory = [
  { week: 'S1', rating: 7.2, minutes: 90, goals: 1 },
  { week: 'S2', rating: 8.1, minutes: 87, goals: 2 },
  { week: 'S3', rating: 6.8, minutes: 72, goals: 0 },
  { week: 'S4', rating: 8.5, minutes: 90, goals: 1 },
  { week: 'S5', rating: 7.9, minutes: 85, goals: 1 },
  { week: 'S6', rating: 9.2, minutes: 90, goals: 3 },
]

const physicalMetrics = [
  { metric: 'Distância Percorrida', value: '11.2 km', trend: 'up', change: '+5%' },
  { metric: 'Sprints', value: '18', trend: 'up', change: '+12%' },
  { metric: 'Frequência Cardíaca Média', value: '165 bpm', trend: 'down', change: '-2%' },
  { metric: 'Carga de Trabalho', value: '485 AU', trend: 'up', change: '+8%' },
]

export function PerformanceAnalysis() {
  const [selectedPlayer, setSelectedPlayer] = useState(playersData[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [positionFilter, setPositionFilter] = useState('all')

  const filteredPlayers = playersData.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition = positionFilter === 'all' || player.position === positionFilter
    return matchesSearch && matchesPosition
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Análise de Performance</h1>
          <p className="text-muted-foreground">
            Monitoramento detalhado do desempenho dos jogadores
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <BarChart3 className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Players List */}
        <Card className="bg-card border-border lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-white">Elenco</CardTitle>
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar jogador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Posição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Atacante">Atacante</SelectItem>
                  <SelectItem value="Meio-campo">Meio-campo</SelectItem>
                  <SelectItem value="Defensor">Defensor</SelectItem>
                  <SelectItem value="Goleiro">Goleiro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedPlayer.id === player.id 
                    ? 'bg-primary/20 border border-primary/50' 
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
                onClick={() => setSelectedPlayer(player)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {player.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{player.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{player.overall}</p>
                    <div className="flex items-center gap-1">
                      {player.injury_risk > 20 ? (
                        <AlertTriangle className="w-3 h-3 text-destructive" />
                      ) : (
                        <CheckCircle className="w-3 h-3 text-primary" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Player Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* Player Header */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {selectedPlayer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">{selectedPlayer.name}</h2>
                  <p className="text-muted-foreground">{selectedPlayer.position} • {selectedPlayer.age} anos</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="outline" className="border-primary text-primary">
                      Overall: {selectedPlayer.overall}
                    </Badge>
                    <Badge variant={selectedPlayer.form >= 85 ? "default" : "secondary"}>
                      Forma: {selectedPlayer.form}%
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{selectedPlayer.fitness}%</p>
                    <p className="text-xs text-muted-foreground">Condição Física</p>
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${selectedPlayer.injury_risk > 20 ? 'text-destructive' : 'text-primary'}`}>
                      {selectedPlayer.injury_risk}%
                    </p>
                    <p className="text-xs text-muted-foreground">Risco Lesão</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Tabs */}
          <Tabs defaultValue="attributes" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-secondary">
              <TabsTrigger value="attributes">Atributos</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="physical">Físico</TabsTrigger>
              <TabsTrigger value="ai-insights">IA Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="attributes" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-white">Radar de Atributos</CardTitle>
                  <CardDescription>
                    Análise completa das habilidades do jogador
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={selectedPlayerRadarData}>
                      <PolarGrid stroke="#2a2d34" />
                      <PolarAngleAxis dataKey="attribute" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                      <PolarRadiusAxis 
                        tick={{ fill: '#9ca3af', fontSize: 10 }} 
                        tickCount={6}
                        angle={90}
                      />
                      <Radar
                        name="Atributos"
                        dataKey="value"
                        stroke="#00d4aa"
                        fill="#00d4aa"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-white">Histórico de Performance</CardTitle>
                  <CardDescription>
                    Evolução semanal das avaliações e estatísticas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2d34" />
                      <XAxis dataKey="week" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1d22', 
                          border: '1px solid #2a2d34',
                          color: '#ffffff'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rating" 
                        stroke="#00d4aa" 
                        strokeWidth={3}
                        name="Nota"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Gols</span>
                    </div>
                    <p className="text-2xl font-bold text-white mt-2">8</p>
                    <p className="text-xs text-primary">+2 últimas 6 semanas</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-accent" />
                      <span className="text-sm text-muted-foreground">Assistências</span>
                    </div>
                    <p className="text-2xl font-bold text-white mt-2">5</p>
                    <p className="text-xs text-accent">+1 última semana</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Timer className="w-5 h-5 text-orange-500" />
                      <span className="text-sm text-muted-foreground">Minutos</span>
                    </div>
                    <p className="text-2xl font-bold text-white mt-2">524</p>
                    <p className="text-xs text-muted-foreground">6 jogos</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="physical" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {physicalMetrics.map((metric, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-primary" />
                          <span className="text-sm text-muted-foreground">{metric.metric}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {metric.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-primary" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-destructive" />
                          )}
                          <span className={`text-xs ${metric.trend === 'up' ? 'text-primary' : 'text-destructive'}`}>
                            {metric.change}
                          </span>
                        </div>
                      </div>
                      <p className="text-xl font-bold text-white mt-2">{metric.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-white">Carga de Trabalho Semanal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Carga Atual</span>
                        <span className="text-white">485 AU / 600 AU</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Recuperação</span>
                        <span className="text-primary">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-insights" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Análise IA - {selectedPlayer.name}
                  </CardTitle>
                  <CardDescription>
                    Recomendações personalizadas baseadas em dados
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Recomendação de Treino</p>
                        <p className="text-sm text-muted-foreground">
                          Jogador apresenta excelente forma física. Recomenda-se manter intensidade atual de treino com foco em finalização.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Atenção: Fadiga Muscular</p>
                        <p className="text-sm text-muted-foreground">
                          Detectado aumento na carga de trabalho. Considere rotação ou redução de intensidade na próxima semana.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Potencial de Melhoria</p>
                        <p className="text-sm text-muted-foreground">
                          Atributo 'Passe' com potencial de crescimento de 8 pontos com treino específico por 4 semanas.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}