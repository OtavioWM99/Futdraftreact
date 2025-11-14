'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Progress } from './ui/progress'
import { 
  Target, 
  TrendingUp, 
  TrendingDown,
  Shield,
  Zap,
  ArrowUp,
  ArrowDown,
  Users,
  Activity,
  Brain,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  BarChart3,
  Grid3x3,
  Move
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'

// Dados fictícios das formações
const formationsData = [
  { 
    id: 1, 
    formation: '4-3-3', 
    games: 18, 
    wins: 12, 
    draws: 4, 
    losses: 2,
    winRate: 67,
    goalsFor: 34,
    goalsAgainst: 15,
    possession: 58,
    status: 'primary'
  },
  { 
    id: 2, 
    formation: '4-4-2', 
    games: 8, 
    wins: 4, 
    draws: 2, 
    losses: 2,
    winRate: 50,
    goalsFor: 12,
    goalsAgainst: 10,
    possession: 52,
    status: 'secondary'
  },
  { 
    id: 3, 
    formation: '3-5-2', 
    games: 6, 
    wins: 3, 
    draws: 1, 
    losses: 2,
    winRate: 50,
    goalsFor: 9,
    goalsAgainst: 8,
    possession: 55,
    status: 'secondary'
  },
]

// Dados de comparação de formações
const formationComparison = [
  { metric: 'Ataque', '4-3-3': 85, '4-4-2': 72, '3-5-2': 68 },
  { metric: 'Defesa', '4-3-3': 75, '4-4-2': 82, '3-5-2': 88 },
  { metric: 'Meio-Campo', '4-3-3': 78, '4-4-2': 85, '3-5-2': 90 },
  { metric: 'Transição', '4-3-3': 88, '4-4-2': 75, '3-5-2': 70 },
  { metric: 'Pressão', '4-3-3': 92, '4-4-2': 68, '3-5-2': 65 },
]

// Padrões de jogo identificados
const gamePatterns = [
  {
    id: 1,
    title: 'Saída de Bola pelo Lado Esquerdo',
    frequency: 68,
    success: 72,
    description: '68% das saídas de bola acontecem pelo lado esquerdo',
    trend: 'up',
    recommendation: 'Padrão efetivo - manter estratégia',
    type: 'offensive'
  },
  {
    id: 2,
    title: 'Pressão Alta Primeiros 15min',
    frequency: 85,
    success: 78,
    description: 'Recuperações de bola no campo ofensivo aumentam 45%',
    trend: 'up',
    recommendation: 'Intensificar pressão nos primeiros minutos',
    type: 'defensive'
  },
  {
    id: 3,
    title: 'Transição Rápida após Recuperação',
    frequency: 55,
    success: 64,
    description: 'Contra-ataques bem-sucedidos em 64% das recuperações',
    trend: 'stable',
    recommendation: 'Trabalhar finalizações em velocidade',
    type: 'transition'
  },
  {
    id: 4,
    title: 'Cruzamentos da Direita',
    frequency: 42,
    success: 38,
    description: 'Baixa efetividade nos cruzamentos do corredor direito',
    trend: 'down',
    recommendation: 'Revisar movimentação na área',
    type: 'offensive'
  },
]

// Dados de efetividade dos padrões ao longo do tempo
const patternsOverTime = [
  { minute: 15, pressao: 88, transicao: 72, posse: 65 },
  { minute: 30, pressao: 82, transicao: 75, posse: 62 },
  { minute: 45, pressao: 75, transicao: 68, posse: 58 },
  { minute: 60, pressao: 70, transicao: 80, posse: 55 },
  { minute: 75, pressao: 65, transicao: 85, posse: 52 },
  { minute: 90, pressao: 60, transicao: 78, posse: 50 },
]

// Análise do próximo adversário
const opponentData = {
  team: 'Corinthians',
  nextMatch: '2025-01-22',
  venue: 'Neo Química Arena',
  recentForm: ['W', 'W', 'D', 'L', 'W'],
  formation: '4-2-3-1',
  dangerPlayers: [
    { name: 'Yuri Alberto', position: 'ATA', rating: 88, threat: 'high', goals: 12, assists: 5 },
    { name: 'Renato Augusto', position: 'MC', rating: 85, threat: 'medium', goals: 4, assists: 8 },
    { name: 'Fágner', position: 'LD', rating: 82, threat: 'medium', goals: 2, assists: 6 },
  ],
  strengths: [
    { area: 'Transição Ofensiva', level: 85, description: 'Muito rápidos no contra-ataque' },
    { area: 'Bolas Paradas', level: 78, description: 'Perigosos em escanteios e faltas' },
    { area: 'Posse no Meio', level: 72, description: 'Bom controle no meio-campo' },
  ],
  weaknesses: [
    { area: 'Defesa Aérea', level: 45, description: 'Vulneráveis em jogadas aéreas' },
    { area: 'Cobertura Lateral Esq.', level: 52, description: 'Espaços no corredor esquerdo' },
    { area: 'Pressão Alta', level: 48, description: 'Dificuldade sob pressão intensa' },
  ],
  tacticalTrends: [
    'Linha defensiva recuada após marcar gol',
    'Exploram espaços nas costas dos laterais',
    'Alto volume de cruzamentos (média 24/jogo)',
    'Substituições ofensivas aos 60min'
  ]
}

// Performance do adversário
const opponentPerformance = [
  { category: 'Ataque', value: 78 },
  { category: 'Defesa', value: 72 },
  { category: 'Meio-Campo', value: 80 },
  { category: 'Físico', value: 75 },
  { category: 'Mentalidade', value: 82 },
]

export function TacticalAnalysis() {
  const [selectedFormation, setSelectedFormation] = useState('4-3-3')
  const [selectedOpponent, setSelectedOpponent] = useState('Corinthians')

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Análise Tática</h1>
          <p className="text-muted-foreground">
            Formações, padrões de jogo e análise adversária
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="temporada">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="temporada">Temporada 2024/25</SelectItem>
              <SelectItem value="ultimos10">Últimos 10 Jogos</SelectItem>
              <SelectItem value="mes">Último Mês</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs principais */}
      <Tabs defaultValue="formations" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="formations" className="gap-2">
            <Grid3x3 className="w-4 h-4" />
            Formações
          </TabsTrigger>
          <TabsTrigger value="patterns" className="gap-2">
            <Activity className="w-4 h-4" />
            Padrões de Jogo
          </TabsTrigger>
          <TabsTrigger value="opponent" className="gap-2">
            <Target className="w-4 h-4" />
            Análise Adversária
          </TabsTrigger>
        </TabsList>

        {/* Tab: Formações */}
        <TabsContent value="formations" className="space-y-6">
          {/* Cards de formações */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formationsData.map((formation) => (
              <Card 
                key={formation.id}
                className={`cursor-pointer transition-all ${
                  selectedFormation === formation.formation 
                    ? 'border-primary shadow-lg shadow-primary/20' 
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedFormation(formation.formation)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white">{formation.formation}</CardTitle>
                      <CardDescription>{formation.games} jogos</CardDescription>
                    </div>
                    <Badge 
                      variant={formation.status === 'primary' ? 'default' : 'secondary'}
                      className={formation.status === 'primary' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      {formation.status === 'primary' ? 'Principal' : 'Alternativa'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-secondary rounded-lg p-2">
                      <div className="text-primary">{formation.wins}</div>
                      <div className="text-xs text-muted-foreground">Vitórias</div>
                    </div>
                    <div className="bg-secondary rounded-lg p-2">
                      <div className="text-muted-foreground">{formation.draws}</div>
                      <div className="text-xs text-muted-foreground">Empates</div>
                    </div>
                    <div className="bg-secondary rounded-lg p-2">
                      <div className="text-destructive">{formation.losses}</div>
                      <div className="text-xs text-muted-foreground">Derrotas</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Aproveitamento</span>
                      <span className="text-white">{formation.winRate}%</span>
                    </div>
                    <Progress value={formation.winRate} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
                    <div>
                      <div className="text-xs text-muted-foreground">Gols Pró</div>
                      <div className="text-white flex items-center gap-1">
                        <ArrowUp className="w-3 h-3 text-primary" />
                        {formation.goalsFor}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Gols Contra</div>
                      <div className="text-white flex items-center gap-1">
                        <ArrowDown className="w-3 h-3 text-destructive" />
                        {formation.goalsAgainst}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Posse Média</div>
                      <div className="text-white">{formation.possession}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Saldo</div>
                      <div className="text-primary">+{formation.goalsFor - formation.goalsAgainst}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparação de Formações */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Comparação de Formações</CardTitle>
              <CardDescription>Análise radar das principais formações utilizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={formationComparison}>
                    <PolarGrid stroke="#2a2d34" />
                    <PolarAngleAxis 
                      dataKey="metric" 
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]}
                      tick={{ fill: '#9ca3af' }}
                    />
                    <Radar 
                      name="4-3-3" 
                      dataKey="4-3-3" 
                      stroke="#00d4aa" 
                      fill="#00d4aa" 
                      fillOpacity={0.3}
                    />
                    <Radar 
                      name="4-4-2" 
                      dataKey="4-4-2" 
                      stroke="#1e40af" 
                      fill="#1e40af" 
                      fillOpacity={0.3}
                    />
                    <Radar 
                      name="3-5-2" 
                      dataKey="3-5-2" 
                      stroke="#f59e0b" 
                      fill="#f59e0b" 
                      fillOpacity={0.3}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="circle"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#141619', 
                        border: '1px solid #2a2d34',
                        borderRadius: '8px'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recomendações IA */}
          <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <CardTitle className="text-white">Recomendações IA</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Manter 4-3-3 como formação principal</p>
                  <p className="text-sm text-muted-foreground">
                    67% de aproveitamento e melhor saldo de gols (+19)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Considerar 3-5-2 contra times mais fortes</p>
                  <p className="text-sm text-muted-foreground">
                    Maior solidez defensiva e controle de meio-campo
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <AlertTriangle className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Melhorar eficiência ofensiva no 4-4-2</p>
                  <p className="text-sm text-muted-foreground">
                    Apenas 1.5 gols por jogo vs 1.9 no 4-3-3
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Padrões de Jogo */}
        <TabsContent value="patterns" className="space-y-6">
          {/* Cards de padrões */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gamePatterns.map((pattern) => {
              const getTypeColor = (type: string) => {
                switch(type) {
                  case 'offensive': return 'text-primary'
                  case 'defensive': return 'text-accent'
                  case 'transition': return 'text-chart-3'
                  default: return 'text-muted-foreground'
                }
              }

              const getTypeLabel = (type: string) => {
                switch(type) {
                  case 'offensive': return 'Ofensivo'
                  case 'defensive': return 'Defensivo'
                  case 'transition': return 'Transição'
                  default: return type
                }
              }

              const getTrendIcon = (trend: string) => {
                switch(trend) {
                  case 'up': return <TrendingUp className="w-4 h-4 text-primary" />
                  case 'down': return <TrendingDown className="w-4 h-4 text-destructive" />
                  default: return <Activity className="w-4 h-4 text-muted-foreground" />
                }
              }

              return (
                <Card key={pattern.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={getTypeColor(pattern.type)}>
                            {getTypeLabel(pattern.type)}
                          </Badge>
                          {getTrendIcon(pattern.trend)}
                        </div>
                        <CardTitle className="text-white text-base">{pattern.title}</CardTitle>
                        <CardDescription className="mt-1">{pattern.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Frequência</div>
                        <div className="flex items-center gap-2">
                          <Progress value={pattern.frequency} className="h-2 flex-1" />
                          <span className="text-white">{pattern.frequency}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Taxa de Sucesso</div>
                        <div className="flex items-center gap-2">
                          <Progress value={pattern.success} className="h-2 flex-1" />
                          <span className="text-white">{pattern.success}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <div className="flex items-start gap-2">
                        <Brain className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Recomendação IA</p>
                          <p className="text-sm text-white">{pattern.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Gráfico de evolução dos padrões */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Efetividade dos Padrões por Tempo de Jogo</CardTitle>
              <CardDescription>Análise da performance ao longo dos 90 minutos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={patternsOverTime}>
                    <defs>
                      <linearGradient id="colorPressao" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e40af" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorTransicao" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPosse" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2d34" />
                    <XAxis 
                      dataKey="minute" 
                      stroke="#9ca3af"
                      tick={{ fill: '#9ca3af' }}
                      label={{ value: 'Minutos', position: 'insideBottom', offset: -5, fill: '#9ca3af' }}
                    />
                    <YAxis 
                      stroke="#9ca3af"
                      tick={{ fill: '#9ca3af' }}
                      label={{ value: 'Efetividade %', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#141619', 
                        border: '1px solid #2a2d34',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="pressao" 
                      name="Pressão Alta"
                      stroke="#1e40af" 
                      fillOpacity={1} 
                      fill="url(#colorPressao)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="transicao" 
                      name="Transição Rápida"
                      stroke="#00d4aa" 
                      fillOpacity={1} 
                      fill="url(#colorTransicao)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="posse" 
                      name="Posse de Bola"
                      stroke="#f59e0b" 
                      fillOpacity={1} 
                      fill="url(#colorPosse)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Insights adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <CardTitle className="text-white">Pontos Fortes</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Transições rápidas</span>
                  <span className="text-primary">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pressão inicial</span>
                  <span className="text-primary">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Posse lado esq.</span>
                  <span className="text-primary">72%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-chart-3/10 to-transparent border-chart-3/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-chart-3" />
                  <CardTitle className="text-white">A Melhorar</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cruzamentos direita</span>
                  <span className="text-chart-3">38%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Finalização 2º tempo</span>
                  <span className="text-chart-3">42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Bolas paradas</span>
                  <span className="text-chart-3">35%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/10 to-transparent border-accent/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  <CardTitle className="text-white">Estatísticas</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Padrões identificados</span>
                  <span className="text-white">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Taxa de sucesso</span>
                  <span className="text-white">63%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Jogos analisados</span>
                  <span className="text-white">32</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Análise Adversária */}
        <TabsContent value="opponent" className="space-y-6">
          {/* Header do adversário */}
          <Card className="border-destructive/50 bg-gradient-to-br from-destructive/5 to-transparent">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-2xl">{opponentData.team}</CardTitle>
                      <CardDescription>Próximo adversário</CardDescription>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Próxima partida</div>
                  <div className="text-white">{opponentData.nextMatch}</div>
                  <div className="text-sm text-muted-foreground mt-1">{opponentData.venue}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Últimos 5 jogos:</span>
                <div className="flex gap-1">
                  {opponentData.recentForm.map((result, index) => (
                    <Badge 
                      key={index}
                      variant="outline"
                      className={
                        result === 'W' 
                          ? 'bg-primary/20 text-primary border-primary' 
                          : result === 'D'
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-destructive/20 text-destructive border-destructive'
                      }
                    >
                      {result}
                    </Badge>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">Formação principal:</span>
                <Badge className="bg-accent text-accent-foreground">{opponentData.formation}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Performance Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Performance Geral</CardTitle>
                <CardDescription>Análise das características do adversário</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={opponentPerformance}>
                      <PolarGrid stroke="#2a2d34" />
                      <PolarAngleAxis 
                        dataKey="category" 
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                      />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]}
                        tick={{ fill: '#9ca3af' }}
                      />
                      <Radar 
                        name={opponentData.team}
                        dataKey="value" 
                        stroke="#dc2626" 
                        fill="#dc2626" 
                        fillOpacity={0.4}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#141619', 
                          border: '1px solid #2a2d34',
                          borderRadius: '8px'
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Jogadores Perigosos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Jogadores Perigosos</CardTitle>
                <CardDescription>Principais ameaças do adversário</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {opponentData.dangerPlayers.map((player, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                    <div className="w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center">
                      <span className="text-destructive">{player.rating}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white">{player.name}</span>
                        <Badge variant="outline" className="text-xs">{player.position}</Badge>
                        <Badge 
                          variant="outline"
                          className={
                            player.threat === 'high' 
                              ? 'bg-destructive/20 text-destructive border-destructive text-xs' 
                              : 'bg-chart-3/20 text-chart-3 border-chart-3 text-xs'
                          }
                        >
                          {player.threat === 'high' ? 'Alto Risco' : 'Médio Risco'}
                        </Badge>
                      </div>
                      <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                        <span>{player.goals} gols</span>
                        <span>{player.assists} assistências</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Pontos Fortes e Fracos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-destructive/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-destructive" />
                  <CardTitle className="text-white">Pontos Fortes</CardTitle>
                </div>
                <CardDescription>Áreas onde o adversário se destaca</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {opponentData.strengths.map((strength, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm">{strength.area}</span>
                      <span className="text-destructive">{strength.level}%</span>
                    </div>
                    <Progress value={strength.level} className="h-2 mb-1" />
                    <p className="text-xs text-muted-foreground">{strength.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  <CardTitle className="text-white">Pontos Fracos</CardTitle>
                </div>
                <CardDescription>Vulnerabilidades a serem exploradas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {opponentData.weaknesses.map((weakness, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm">{weakness.area}</span>
                      <span className="text-primary">{100 - weakness.level}%</span>
                    </div>
                    <Progress value={100 - weakness.level} className="h-2 mb-1" />
                    <p className="text-xs text-muted-foreground">{weakness.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Tendências Táticas */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <CardTitle className="text-white">Tendências Táticas Identificadas</CardTitle>
              </div>
              <CardDescription>Padrões comportamentais do adversário</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {opponentData.tacticalTrends.map((trend, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-secondary rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{trend}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recomendações Estratégicas */}
          <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <CardTitle className="text-white">Recomendações Estratégicas IA</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Explorar cobertura deficiente no lado esquerdo</p>
                  <p className="text-sm text-muted-foreground">
                    Investir em jogadas pelo corredor esquerdo com sobreposições
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Utilizar jogo aéreo ofensivo</p>
                  <p className="text-sm text-muted-foreground">
                    Aproveitar vulnerabilidade na defesa aérea com cruzamentos e bolas paradas
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <AlertTriangle className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Atenção aos contra-ataques</p>
                  <p className="text-sm text-muted-foreground">
                    Manter equilíbrio defensivo - adversário é muito perigoso nas transições
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Pressão alta nos primeiros 15 minutos</p>
                  <p className="text-sm text-muted-foreground">
                    Time adversário tem dificuldade sob pressão - aproveitar início do jogo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
