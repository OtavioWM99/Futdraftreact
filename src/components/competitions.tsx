'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Progress } from './ui/progress'
import { 
  Trophy, 
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  Users,
  Target,
  Activity,
  Award,
  Star,
  Flame,
  Shield,
  Zap,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Clock,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Minus,
  Medal
} from 'lucide-react'
import { 
  AreaChart, 
  Area,
  BarChart, 
  Bar,
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'

// Competições ativas
const activeCompetitions = [
  {
    id: 1,
    name: 'Campeonato Brasileiro Série A',
    shortName: 'Brasileirão',
    type: 'league',
    position: 3,
    totalTeams: 20,
    points: 52,
    games: 28,
    wins: 15,
    draws: 7,
    losses: 6,
    goalsFor: 48,
    goalsAgainst: 32,
    status: 'active',
    priority: 'high',
    nextMatch: '2025-01-22',
    objective: 'Título',
    probability: 28
  },
  {
    id: 2,
    name: 'Copa do Brasil',
    shortName: 'Copa do Brasil',
    type: 'cup',
    phase: 'Quartas de Final',
    games: 6,
    wins: 5,
    draws: 0,
    losses: 1,
    goalsFor: 14,
    goalsAgainst: 7,
    status: 'active',
    priority: 'high',
    nextMatch: '2025-01-25',
    objective: 'Título',
    probability: 35
  },
  {
    id: 3,
    name: 'Copa Libertadores da América',
    shortName: 'Libertadores',
    type: 'international',
    phase: 'Oitavas de Final',
    games: 4,
    wins: 2,
    draws: 2,
    losses: 0,
    goalsFor: 8,
    goalsAgainst: 3,
    status: 'active',
    priority: 'critical',
    nextMatch: '2025-02-02',
    objective: 'Semifinal',
    probability: 45
  },
  {
    id: 4,
    name: 'Campeonato Paulista',
    shortName: 'Paulistão',
    type: 'state',
    phase: 'Concluído',
    position: 2,
    games: 15,
    wins: 10,
    draws: 3,
    losses: 2,
    goalsFor: 28,
    goalsAgainst: 12,
    status: 'completed',
    priority: 'low',
    achievement: 'Vice-Campeão'
  },
]

// Tabela do Brasileirão
const leagueTable = [
  { position: 1, team: 'Flamengo', points: 58, games: 28, wins: 17, draws: 7, losses: 4, gf: 52, ga: 28, gd: 24, form: ['W', 'W', 'D', 'W', 'W'] },
  { position: 2, team: 'Palmeiras', points: 55, games: 28, wins: 16, draws: 7, losses: 5, gf: 47, ga: 26, gd: 21, form: ['W', 'W', 'W', 'D', 'L'] },
  { position: 3, team: 'São Paulo FC', points: 52, games: 28, wins: 15, draws: 7, losses: 6, gf: 48, ga: 32, gd: 16, form: ['W', 'D', 'W', 'W', 'D'], highlight: true },
  { position: 4, team: 'Atlético-MG', points: 50, games: 28, wins: 14, draws: 8, losses: 6, gf: 45, ga: 30, gd: 15, form: ['D', 'W', 'L', 'W', 'W'] },
  { position: 5, team: 'Internacional', points: 48, games: 28, wins: 14, draws: 6, losses: 8, gf: 42, ga: 33, gd: 9, form: ['L', 'W', 'W', 'D', 'W'] },
  { position: 6, team: 'Corinthians', points: 46, games: 28, wins: 13, draws: 7, losses: 8, gf: 40, ga: 32, gd: 8, form: ['W', 'L', 'D', 'W', 'L'] },
]

// Próximos jogos
const upcomingMatches = [
  {
    id: 1,
    competition: 'Brasileirão',
    homeTeam: 'São Paulo FC',
    awayTeam: 'Corinthians',
    date: '2025-01-22',
    time: '20:00',
    venue: 'Morumbi',
    importance: 'critical',
    difficulty: 85,
    prediction: { win: 48, draw: 28, loss: 24 }
  },
  {
    id: 2,
    competition: 'Copa do Brasil',
    homeTeam: 'Grêmio',
    awayTeam: 'São Paulo FC',
    date: '2025-01-25',
    time: '21:30',
    venue: 'Arena do Grêmio',
    importance: 'high',
    difficulty: 78,
    prediction: { win: 42, draw: 32, loss: 26 }
  },
  {
    id: 3,
    competition: 'Brasileirão',
    homeTeam: 'São Paulo FC',
    awayTeam: 'Flamengo',
    date: '2025-01-29',
    time: '19:00',
    venue: 'Morumbi',
    importance: 'critical',
    difficulty: 92,
    prediction: { win: 35, draw: 30, loss: 35 }
  },
  {
    id: 4,
    competition: 'Libertadores',
    homeTeam: 'São Paulo FC',
    awayTeam: 'River Plate',
    date: '2025-02-02',
    time: '21:45',
    venue: 'Morumbi',
    importance: 'critical',
    difficulty: 88,
    prediction: { win: 40, draw: 35, loss: 25 }
  },
]

// Performance por competição
const performanceByCompetition = [
  { competition: 'Brasileirão', goals: 48, assists: 32, cleanSheets: 8, winRate: 54 },
  { competition: 'Copa do Brasil', goals: 14, assists: 10, cleanSheets: 3, winRate: 83 },
  { competition: 'Libertadores', goals: 8, assists: 6, cleanSheets: 2, winRate: 50 },
  { competition: 'Paulistão', goals: 28, assists: 18, cleanSheets: 7, winRate: 67 },
]

// Evolução na tabela
const tableEvolution = [
  { round: 5, position: 8 },
  { round: 10, position: 6 },
  { round: 15, position: 4 },
  { round: 20, position: 5 },
  { round: 25, position: 3 },
  { round: 28, position: 3 },
]

// Artilheiros do time
const topScorers = [
  { name: 'João Silva', goals: 18, penalties: 4, assists: 7, minutesPerGoal: 125 },
  { name: 'Pedro Costa', goals: 12, penalties: 2, assists: 5, minutesPerGoal: 185 },
  { name: 'Lucas Lima', goals: 9, penalties: 0, assists: 11, minutesPerGoal: 210 },
  { name: 'Rafael Santos', goals: 7, penalties: 1, assists: 3, minutesPerGoal: 245 },
]

export function Competitions() {
  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(1)

  const getCompetitionColor = (type: string) => {
    switch(type) {
      case 'league': return 'primary'
      case 'cup': return 'chart-3'
      case 'international': return 'destructive'
      case 'state': return 'accent'
      default: return 'secondary'
    }
  }

  const getCompetitionIcon = (type: string) => {
    switch(type) {
      case 'league': return Trophy
      case 'cup': return Award
      case 'international': return Star
      case 'state': return Shield
      default: return Trophy
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'critical': return <Badge className="bg-destructive text-destructive-foreground">Crítica</Badge>
      case 'high': return <Badge className="bg-chart-3 text-black">Alta</Badge>
      case 'medium': return <Badge className="bg-accent text-accent-foreground">Média</Badge>
      case 'low': return <Badge variant="secondary">Baixa</Badge>
      default: return null
    }
  }

  const getFormIcon = (result: string) => {
    switch(result) {
      case 'W': return <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-black">V</div>
      case 'D': return <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs">E</div>
      case 'L': return <div className="w-6 h-6 bg-destructive rounded-full flex items-center justify-center text-xs">D</div>
      default: return null
    }
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Competições</h1>
          <p className="text-muted-foreground">
            Acompanhamento de todas as competições em disputa
          </p>
        </div>
        <Select defaultValue="2024-2025">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Temporada" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024-2025">2024/2025</SelectItem>
            <SelectItem value="2023-2024">2023/2024</SelectItem>
            <SelectItem value="2022-2023">2022/2023</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Competições Ativas</p>
                <h3 className="text-white mt-1">3</h3>
                <p className="text-xs text-primary mt-1">+ 1 finalizada</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aproveitamento Geral</p>
                <h3 className="text-white mt-1">62.8%</h3>
                <p className="text-xs text-primary mt-1">+4.2% vs 2023/24</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Próximas Partidas</p>
                <h3 className="text-white mt-1">4 jogos</h3>
                <p className="text-xs text-chart-3 mt-1">2 críticas</p>
              </div>
              <div className="w-12 h-12 bg-chart-3/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gols Marcados</p>
                <h3 className="text-white mt-1">98 gols</h3>
                <p className="text-xs text-primary mt-1">2.1 por jogo</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs principais */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="overview" className="gap-2">
            <Trophy className="w-4 h-4" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="standings" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Classificação
          </TabsTrigger>
          <TabsTrigger value="calendar" className="gap-2">
            <Calendar className="w-4 h-4" />
            Calendário
          </TabsTrigger>
          <TabsTrigger value="stats" className="gap-2">
            <Activity className="w-4 h-4" />
            Estatísticas
          </TabsTrigger>
        </TabsList>

        {/* Tab: Visão Geral */}
        <TabsContent value="overview" className="space-y-6">
          {/* Cards de Competições */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCompetitions.map((comp) => {
              const Icon = getCompetitionIcon(comp.type)
              const colorClass = getCompetitionColor(comp.type)
              
              return (
                <Card 
                  key={comp.id}
                  className={`cursor-pointer transition-all ${
                    selectedCompetition === comp.id 
                      ? 'border-primary shadow-lg shadow-primary/20' 
                      : comp.status === 'completed'
                      ? 'opacity-60'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedCompetition(comp.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-10 h-10 bg-${colorClass}/20 rounded-lg flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 text-${colorClass}`} />
                          </div>
                          <div>
                            <CardTitle className="text-white text-base">{comp.shortName}</CardTitle>
                            <CardDescription className="text-xs">{comp.name}</CardDescription>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {getPriorityBadge(comp.priority)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {comp.status === 'completed' ? (
                      <div className="text-center py-4">
                        <Badge className="bg-muted text-white mb-2">Concluído</Badge>
                        <p className="text-white">{comp.achievement}</p>
                      </div>
                    ) : (
                      <>
                        {/* Status atual */}
                        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {comp.type === 'league' ? 'Posição' : 'Fase Atual'}
                            </p>
                            <p className="text-white">
                              {comp.type === 'league' ? `${comp.position}º lugar` : comp.phase}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Objetivo</p>
                            <p className="text-white">{comp.objective}</p>
                          </div>
                        </div>

                        {/* Estatísticas */}
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <div className="bg-secondary rounded-lg p-2">
                            <div className="text-primary">{comp.wins}</div>
                            <div className="text-xs text-muted-foreground">V</div>
                          </div>
                          <div className="bg-secondary rounded-lg p-2">
                            <div className="text-muted-foreground">{comp.draws}</div>
                            <div className="text-xs text-muted-foreground">E</div>
                          </div>
                          <div className="bg-secondary rounded-lg p-2">
                            <div className="text-destructive">{comp.losses}</div>
                            <div className="text-xs text-muted-foreground">D</div>
                          </div>
                          <div className="bg-secondary rounded-lg p-2">
                            <div className="text-white">{comp.games}</div>
                            <div className="text-xs text-muted-foreground">J</div>
                          </div>
                        </div>

                        {/* Gols e Aproveitamento */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Gols</p>
                            <div className="flex items-center gap-2">
                              <ArrowUp className="w-3 h-3 text-primary" />
                              <span className="text-white">{comp.goalsFor}</span>
                              <ArrowDown className="w-3 h-3 text-destructive" />
                              <span className="text-white">{comp.goalsAgainst}</span>
                            </div>
                          </div>
                          {comp.type === 'league' && (
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Pontos</p>
                              <p className="text-white">{comp.points}</p>
                            </div>
                          )}
                        </div>

                        {/* Próximo jogo e probabilidade */}
                        {comp.nextMatch && (
                          <div className="pt-3 border-t border-border space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Próximo jogo</span>
                              <span className="text-white">{new Date(comp.nextMatch).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-muted-foreground">Prob. {comp.objective}</span>
                                <span className="text-primary text-xs">{comp.probability}%</span>
                              </div>
                              <Progress value={comp.probability} className="h-2" />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Performance Comparativa */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Performance por Competição</CardTitle>
              <CardDescription>Comparativo de desempenho em todas as competições</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceByCompetition}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2d34" />
                    <XAxis 
                      dataKey="competition" 
                      stroke="#9ca3af"
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#9ca3af"
                      tick={{ fill: '#9ca3af' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#141619', 
                        border: '1px solid #2a2d34',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="goals" name="Gols" fill="#00d4aa" />
                    <Bar dataKey="assists" name="Assistências" fill="#1e40af" />
                    <Bar dataKey="cleanSheets" name="Jogos s/ Sofrer" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Insights IA */}
          <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <CardTitle className="text-white">Insights IA - Gestão de Competições</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Libertadores é a prioridade máxima</p>
                  <p className="text-sm text-muted-foreground">
                    45% de chance de classificação às semifinais - focar elenco principal nesta competição
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <AlertTriangle className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Calendário congestionado em fevereiro</p>
                  <p className="text-sm text-muted-foreground">
                    7 jogos em 3 semanas - considerar rodízio de jogadores para evitar lesões
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Chance real de título do Brasileirão</p>
                  <p className="text-sm text-muted-foreground">
                    3º lugar com 28% de probabilidade de título - sequência de 3 vitórias aumentaria para 42%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Classificação */}
        <TabsContent value="standings" className="space-y-6">
          {/* Tabela do Brasileirão */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Campeonato Brasileiro - Série A</CardTitle>
                  <CardDescription>Classificação atualizada - Rodada 28</CardDescription>
                </div>
                <Badge className="bg-primary text-primary-foreground">Ao Vivo</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leagueTable.map((team) => (
                  <div 
                    key={team.position}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      team.highlight 
                        ? 'bg-primary/20 border border-primary' 
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        team.position <= 4 ? 'bg-primary text-black' :
                        team.position <= 6 ? 'bg-accent text-white' :
                        'bg-muted text-white'
                      }`}>
                        {team.position}
                      </div>
                      <div className="flex-1">
                        <p className={team.highlight ? 'text-white' : 'text-white'}>{team.team}</p>
                      </div>
                    </div>

                    {/* Estatísticas */}
                    <div className="hidden md:flex items-center gap-6 text-sm">
                      <div className="text-center w-12">
                        <p className="text-white">{team.points}</p>
                        <p className="text-xs text-muted-foreground">PTS</p>
                      </div>
                      <div className="text-center w-12">
                        <p className="text-white">{team.games}</p>
                        <p className="text-xs text-muted-foreground">J</p>
                      </div>
                      <div className="text-center w-12">
                        <p className="text-primary">{team.wins}</p>
                        <p className="text-xs text-muted-foreground">V</p>
                      </div>
                      <div className="text-center w-12">
                        <p className="text-muted-foreground">{team.draws}</p>
                        <p className="text-xs text-muted-foreground">E</p>
                      </div>
                      <div className="text-center w-12">
                        <p className="text-destructive">{team.losses}</p>
                        <p className="text-xs text-muted-foreground">D</p>
                      </div>
                      <div className="text-center w-16">
                        <p className="text-white">{team.gd > 0 ? '+' : ''}{team.gd}</p>
                        <p className="text-xs text-muted-foreground">SG</p>
                      </div>
                    </div>

                    {/* Últimos 5 jogos */}
                    <div className="flex gap-1">
                      {team.form.map((result, idx) => (
                        <div key={idx}>
                          {getFormIcon(result)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legenda */}
              <div className="mt-4 pt-4 border-t border-border flex gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                  <span>Libertadores</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-accent"></div>
                  <span>Pré-Libertadores</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Evolução na Tabela */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Evolução na Classificação</CardTitle>
              <CardDescription>Posição ao longo do campeonato</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tableEvolution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2d34" />
                    <XAxis 
                      dataKey="round" 
                      stroke="#9ca3af"
                      tick={{ fill: '#9ca3af' }}
                      label={{ value: 'Rodadas', position: 'insideBottom', offset: -5, fill: '#9ca3af' }}
                    />
                    <YAxis 
                      reversed
                      domain={[1, 20]}
                      stroke="#9ca3af"
                      tick={{ fill: '#9ca3af' }}
                      label={{ value: 'Posição', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#141619', 
                        border: '1px solid #2a2d34',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="position" 
                      stroke="#00d4aa" 
                      strokeWidth={3}
                      dot={{ fill: '#00d4aa', r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Calendário */}
        <TabsContent value="calendar" className="space-y-6">
          <div className="space-y-4">
            {upcomingMatches.map((match) => (
              <Card key={match.id} className={
                match.importance === 'critical' 
                  ? 'border-destructive/50' 
                  : 'border-border'
              }>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-xs">
                      {match.competition}
                    </Badge>
                    {match.importance === 'critical' && (
                      <Badge className="bg-destructive text-destructive-foreground">
                        <Flame className="w-3 h-3 mr-1" />
                        Jogo Decisivo
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center mb-4">
                    <div className="text-right">
                      <p className="text-white">{match.homeTeam}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-white">VS</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(match.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-xs text-muted-foreground">{match.time}</div>
                    </div>
                    <div className="text-left">
                      <p className="text-white">{match.awayTeam}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <MapPin className="w-3 h-3" />
                    <span>{match.venue}</span>
                  </div>

                  {/* Dificuldade */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Dificuldade</span>
                      <span className="text-white text-sm">{match.difficulty}%</span>
                    </div>
                    <Progress value={match.difficulty} className="h-2" />
                  </div>

                  {/* Predição IA */}
                  <div className="bg-secondary rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-primary" />
                      <span className="text-sm text-white">Predição IA</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <div className="text-primary">{match.prediction.win}%</div>
                        <div className="text-muted-foreground">Vitória</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">{match.prediction.draw}%</div>
                        <div className="text-muted-foreground">Empate</div>
                      </div>
                      <div>
                        <div className="text-destructive">{match.prediction.loss}%</div>
                        <div className="text-muted-foreground">Derrota</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab: Estatísticas */}
        <TabsContent value="stats" className="space-y-6">
          {/* Artilheiros */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Artilheiros do Time</CardTitle>
              <CardDescription>Top goleadores em todas as competições</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topScorers.map((player, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      {index === 0 ? (
                        <Medal className="w-5 h-5 text-chart-3" />
                      ) : (
                        <span className="text-primary">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white">{player.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span>{player.goals} gols</span>
                        <span>•</span>
                        <span>{player.assists} assistências</span>
                        {player.penalties > 0 && (
                          <>
                            <span>•</span>
                            <span>{player.penalties} pênaltis</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white">{player.minutesPerGoal}'</p>
                      <p className="text-xs text-muted-foreground">min/gol</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  <CardTitle className="text-white">Ataque</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Gols totais</span>
                  <span className="text-white">98</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Média por jogo</span>
                  <span className="text-white">2.1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Finalizações</span>
                  <span className="text-white">486</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Precisão</span>
                  <span className="text-primary">58%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/10 to-transparent border-accent/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <CardTitle className="text-white">Defesa</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Gols sofridos</span>
                  <span className="text-white">54</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Média por jogo</span>
                  <span className="text-white">1.2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Jogos s/ sofrer</span>
                  <span className="text-white">20</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Desarmes</span>
                  <span className="text-accent">742</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-chart-3/10 to-transparent border-chart-3/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-chart-3" />
                  <CardTitle className="text-white">Geral</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Jogos totais</span>
                  <span className="text-white">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Vitórias</span>
                  <span className="text-white">32</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Posse média</span>
                  <span className="text-white">56%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Aproveitamento</span>
                  <span className="text-chart-3">62.8%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
