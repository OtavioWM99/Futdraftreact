'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Progress } from './ui/progress'
import { 
  Users, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  UserPlus,
  UserCheck,
  UserX,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  Activity,
  Brain,
  Star,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  PieChart,
  BarChart3
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPie,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'

// Dados fictícios de alvos de contratação
const transferTargets = [
  {
    id: 1,
    name: 'Gabriel Mendes',
    position: 'ATA',
    age: 23,
    club: 'Red Bull Bragantino',
    rating: 84,
    marketValue: 8.5,
    salary: 180,
    contract: '2025-12',
    fit: 92,
    priority: 'high',
    stats: { goals: 14, assists: 7, games: 28 },
    strengths: ['Finalização', 'Velocidade', 'Drible'],
    aiScore: 88
  },
  {
    id: 2,
    name: 'Lucas Ferreira',
    position: 'VOL',
    age: 26,
    club: 'Athletico-PR',
    rating: 82,
    marketValue: 6.2,
    salary: 150,
    contract: '2024-12',
    fit: 85,
    priority: 'medium',
    stats: { tackles: 142, interceptions: 89, games: 32 },
    strengths: ['Marcação', 'Passe Longo', 'Posicionamento'],
    aiScore: 81
  },
  {
    id: 3,
    name: 'Rafael Costa',
    position: 'ZAG',
    age: 28,
    club: 'Internacional',
    rating: 85,
    marketValue: 9.8,
    salary: 220,
    contract: '2025-06',
    fit: 88,
    priority: 'high',
    stats: { clearances: 178, aerialWins: 156, games: 30 },
    strengths: ['Jogo Aéreo', 'Liderança', 'Saída de Bola'],
    aiScore: 86
  },
  {
    id: 4,
    name: 'Pedro Henrique',
    position: 'MC',
    age: 21,
    club: 'Santos',
    rating: 78,
    marketValue: 4.5,
    salary: 95,
    contract: '2024-12',
    fit: 79,
    priority: 'low',
    stats: { assists: 9, keyPasses: 112, games: 26 },
    strengths: ['Criatividade', 'Visão de Jogo', 'Técnica'],
    aiScore: 75
  },
]

// Jogadores do elenco com contratos a renovar
const contractRenewals = [
  {
    id: 1,
    name: 'João Silva',
    position: 'ATA',
    age: 28,
    rating: 87,
    contractEnd: '2025-06',
    currentSalary: 280,
    proposedSalary: 350,
    status: 'negotiating',
    importance: 'critical',
    performance: 88,
    daysLeft: 180,
    demandBonus: 15,
    agent: 'Elite Sports'
  },
  {
    id: 2,
    name: 'Carlos Santos',
    position: 'MC',
    age: 32,
    rating: 83,
    contractEnd: '2025-03',
    currentSalary: 220,
    proposedSalary: 200,
    status: 'difficult',
    importance: 'high',
    performance: 79,
    daysLeft: 90,
    demandBonus: 20,
    agent: 'Top Soccer'
  },
  {
    id: 3,
    name: 'Miguel Santos',
    position: 'ZAG',
    age: 25,
    rating: 85,
    contractEnd: '2025-12',
    currentSalary: 190,
    proposedSalary: 240,
    status: 'positive',
    importance: 'high',
    performance: 86,
    daysLeft: 365,
    demandBonus: 10,
    agent: 'Pro Athletes'
  },
  {
    id: 4,
    name: 'Pedro Costa',
    position: 'LD',
    age: 29,
    rating: 81,
    contractEnd: '2024-12',
    currentSalary: 160,
    proposedSalary: 140,
    status: 'uncertain',
    importance: 'medium',
    performance: 75,
    daysLeft: 30,
    demandBonus: 8,
    agent: 'Global Sports'
  },
  {
    id: 5,
    name: 'Lucas Lima',
    position: 'PE',
    age: 24,
    rating: 82,
    contractEnd: '2026-06',
    currentSalary: 170,
    proposedSalary: 210,
    status: 'positive',
    importance: 'medium',
    performance: 84,
    daysLeft: 540,
    demandBonus: 12,
    agent: 'Star Management'
  },
]

// Dados financeiros
const salaryDistribution = [
  { category: 'Atacantes', value: 1850, percentage: 32 },
  { category: 'Meio-Campo', value: 1620, percentage: 28 },
  { category: 'Defensores', value: 1450, percentage: 25 },
  { category: 'Goleiros', value: 880, percentage: 15 },
]

const budgetProjection = [
  { month: 'Jan', receita: 12.5, despesa: 8.2, saldo: 4.3 },
  { month: 'Fev', receita: 11.8, despesa: 8.5, saldo: 3.3 },
  { month: 'Mar', receita: 15.2, despesa: 9.1, saldo: 6.1 },
  { month: 'Abr', receita: 13.4, despesa: 8.8, saldo: 4.6 },
  { month: 'Mai', receita: 18.5, despesa: 10.2, saldo: 8.3 },
  { month: 'Jun', receita: 16.2, despesa: 9.5, saldo: 6.7 },
]

const transferBudget = {
  total: 45.5,
  used: 18.7,
  committed: 12.3,
  available: 14.5,
  salaryBudget: 5.8,
  salaryUsed: 4.2
}

const COLORS = ['#00d4aa', '#1e40af', '#f59e0b', '#8b5cf6']

export function SquadManagement() {
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null)
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null)

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'negotiating': return 'bg-accent text-accent-foreground'
      case 'positive': return 'bg-primary text-primary-foreground'
      case 'difficult': return 'bg-destructive text-destructive-foreground'
      case 'uncertain': return 'bg-chart-3 text-black'
      default: return 'bg-secondary'
    }
  }

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'negotiating': return 'Em Negociação'
      case 'positive': return 'Positivo'
      case 'difficult': return 'Difícil'
      case 'uncertain': return 'Incerto'
      default: return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-destructive text-destructive-foreground'
      case 'medium': return 'bg-chart-3 text-black'
      case 'low': return 'bg-secondary text-secondary-foreground'
      default: return 'bg-secondary'
    }
  }

  const getImportanceColor = (importance: string) => {
    switch(importance) {
      case 'critical': return 'text-destructive'
      case 'high': return 'text-chart-3'
      case 'medium': return 'text-accent'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Gestão de Elenco</h1>
          <p className="text-muted-foreground">
            Contratações, renovações e análise financeira
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* KPIs Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Orçamento Disponível</p>
                <h3 className="text-white mt-1">€{transferBudget.available}M</h3>
                <p className="text-xs text-primary mt-1">de €{transferBudget.total}M total</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Contratos Vencendo</p>
                <h3 className="text-white mt-1">5 jogadores</h3>
                <p className="text-xs text-destructive mt-1">2 urgentes (30 dias)</p>
              </div>
              <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alvos Prioritários</p>
                <h3 className="text-white mt-1">3 jogadores</h3>
                <p className="text-xs text-chart-3 mt-1">Fit médio: 88%</p>
              </div>
              <div className="w-12 h-12 bg-chart-3/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Massa Salarial</p>
                <h3 className="text-white mt-1">72.4%</h3>
                <p className="text-xs text-accent mt-1">€4.2M / €5.8M mês</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <PieChart className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs principais */}
      <Tabs defaultValue="signings" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="signings" className="gap-2">
            <UserPlus className="w-4 h-4" />
            Contratações
          </TabsTrigger>
          <TabsTrigger value="renewals" className="gap-2">
            <UserCheck className="w-4 h-4" />
            Renovações
          </TabsTrigger>
          <TabsTrigger value="financial" className="gap-2">
            <DollarSign className="w-4 h-4" />
            Análise Financeira
          </TabsTrigger>
        </TabsList>

        {/* Tab: Contratações */}
        <TabsContent value="signings" className="space-y-6">
          {/* Filtros */}
          <div className="flex gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Posição" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Posições</SelectItem>
                <SelectItem value="ata">Atacante</SelectItem>
                <SelectItem value="mc">Meio-Campo</SelectItem>
                <SelectItem value="zag">Defensor</SelectItem>
                <SelectItem value="gol">Goleiro</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lista de Alvos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {transferTargets.map((target) => (
              <Card 
                key={target.id}
                className={`cursor-pointer transition-all ${
                  selectedTarget === target.id 
                    ? 'border-primary shadow-lg shadow-primary/20' 
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedTarget(target.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-white">{target.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">{target.position}</Badge>
                        <Badge className={getPriorityColor(target.priority)}>
                          {target.priority === 'high' ? 'Alta' : target.priority === 'medium' ? 'Média' : 'Baixa'}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <span>{target.club}</span>
                        <span>•</span>
                        <span>{target.age} anos</span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-primary">{target.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Fit Score */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Fit Score (IA)</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-primary" />
                        <span className="text-white">{target.fit}%</span>
                      </div>
                    </div>
                    <Progress value={target.fit} className="h-2" />
                  </div>

                  {/* Estatísticas */}
                  <div className="grid grid-cols-3 gap-2 bg-secondary rounded-lg p-3">
                    {Object.entries(target.stats).map(([key, value], index) => (
                      <div key={index} className="text-center">
                        <div className="text-white">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key === 'goals' ? 'Gols' : 
                           key === 'assists' ? 'Assist.' : 
                           key === 'games' ? 'Jogos' :
                           key === 'tackles' ? 'Desarmes' :
                           key === 'interceptions' ? 'Interceptações' :
                           key === 'clearances' ? 'Cortes' :
                           key === 'aerialWins' ? 'Aéreos' :
                           key === 'keyPasses' ? 'Passes Chave' : key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pontos Fortes */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Pontos Fortes</p>
                    <div className="flex flex-wrap gap-1">
                      {target.strengths.map((strength, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Valores */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Valor de Mercado</p>
                      <p className="text-white flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        €{target.marketValue}M
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Salário Estimado</p>
                      <p className="text-white">€{target.salary}K/mês</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Contrato até</p>
                      <p className="text-white">{target.contract}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Score IA</p>
                      <p className="text-primary">{target.aiScore}/100</p>
                    </div>
                  </div>

                  {/* Ação */}
                  <Button className="w-full gap-2">
                    <Target className="w-4 h-4" />
                    Iniciar Negociação
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recomendações IA */}
          <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <CardTitle className="text-white">Recomendações IA de Contratação</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Priorizar Gabriel Mendes e Rafael Costa</p>
                  <p className="text-sm text-muted-foreground">
                    Alto fit score e preenchem lacunas no elenco. Investimento total estimado: €18.3M
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <AlertTriangle className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Lucas Ferreira pode esperar até janela de meio de ano</p>
                  <p className="text-sm text-muted-foreground">
                    Posição já bem coberta no elenco atual - economizar €6.2M
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Considerar empréstimo para Pedro Henrique</p>
                  <p className="text-sm text-muted-foreground">
                    Jovem promissor - empréstimo com opção de compra reduz risco financeiro
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Renovações */}
        <TabsContent value="renewals" className="space-y-6">
          {/* Timeline de Urgência */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Urgente (0-90 dias)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {contractRenewals.filter(p => p.daysLeft <= 90).map((player) => (
                    <div key={player.id} className="text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-white">{player.name}</span>
                        <Badge variant="outline" className="text-xs text-destructive">
                          {player.daysLeft}d
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-chart-3/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-chart-3" />
                  Atenção (90-180 dias)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {contractRenewals.filter(p => p.daysLeft > 90 && p.daysLeft <= 180).map((player) => (
                    <div key={player.id} className="text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-white">{player.name}</span>
                        <Badge variant="outline" className="text-xs text-chart-3">
                          {player.daysLeft}d
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Monitorar (+180 dias)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {contractRenewals.filter(p => p.daysLeft > 180).map((player) => (
                    <div key={player.id} className="text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-white">{player.name}</span>
                        <Badge variant="outline" className="text-xs text-primary">
                          {player.daysLeft}d
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista Detalhada de Renovações */}
          <div className="space-y-4">
            {contractRenewals.map((player) => (
              <Card 
                key={player.id}
                className={`${
                  player.importance === 'critical' 
                    ? 'border-destructive/50' 
                    : player.importance === 'high'
                    ? 'border-chart-3/50'
                    : 'border-border'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-white">{player.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">{player.position}</Badge>
                        <Badge className={getStatusColor(player.status)}>
                          {getStatusLabel(player.status)}
                        </Badge>
                        {player.daysLeft <= 90 && (
                          <Badge variant="outline" className="text-xs text-destructive border-destructive">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {player.daysLeft} dias
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center gap-3">
                        <span>{player.age} anos</span>
                        <span>•</span>
                        <span>Rating: {player.rating}</span>
                        <span>•</span>
                        <span>Performance: {player.performance}%</span>
                        <span>•</span>
                        <span className={getImportanceColor(player.importance)}>
                          {player.importance === 'critical' ? 'Crítico' : 
                           player.importance === 'high' ? 'Alta Importância' : 
                           'Média Importância'}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Informações do Contrato */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm text-muted-foreground mb-3">Detalhes do Contrato</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Vencimento</span>
                            <span className="text-white">{player.contractEnd}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Salário Atual</span>
                            <span className="text-white">€{player.currentSalary}K/mês</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Proposta Clube</span>
                            <span className={player.proposedSalary > player.currentSalary ? 'text-primary' : 'text-destructive'}>
                              €{player.proposedSalary}K/mês
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Bônus Demandado</span>
                            <span className="text-chart-3">€{player.demandBonus}K</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Empresário</span>
                            <span className="text-white text-xs">{player.agent}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance e Análise */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm text-muted-foreground mb-3">Análise de Performance</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-muted-foreground">Performance Atual</span>
                              <span className="text-white text-sm">{player.performance}%</span>
                            </div>
                            <Progress value={player.performance} className="h-2" />
                          </div>
                          
                          {/* Custo-Benefício */}
                          <div className="bg-secondary rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Custo Anual Proposto</span>
                              <span className="text-white">€{(player.proposedSalary * 12 / 1000).toFixed(1)}M</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Valor de Mercado</span>
                              <span className="text-white">~€{((100 - player.age) * 0.5).toFixed(1)}M</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Custo Substituição</span>
                              <span className="text-destructive">€{((100 - player.age) * 0.7).toFixed(1)}M</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex gap-2">
                        {player.status === 'positive' ? (
                          <Button className="flex-1 gap-2" variant="default">
                            <CheckCircle2 className="w-4 h-4" />
                            Renovar
                          </Button>
                        ) : player.status === 'negotiating' ? (
                          <Button className="flex-1 gap-2" variant="secondary">
                            <Clock className="w-4 h-4" />
                            Continuar Negociação
                          </Button>
                        ) : (
                          <Button className="flex-1 gap-2" variant="outline">
                            <Calendar className="w-4 h-4" />
                            Agendar Reunião
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recomendações IA */}
          <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <CardTitle className="text-white">Recomendações IA de Renovação</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Priorizar renovação de João Silva imediatamente</p>
                  <p className="text-sm text-muted-foreground">
                    Jogador crítico com performance de 88% - valor de substituição seria muito alto (€25M+)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <AlertTriangle className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Considerar não renovação de Carlos Santos</p>
                  <p className="text-sm text-muted-foreground">
                    Performance em queda (79%) e 32 anos - economizar €2.4M/ano em salários
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Miguel Santos e Lucas Lima são bons investimentos</p>
                  <p className="text-sm text-muted-foreground">
                    Jovens com alta performance - renovações até 2027 garantem valorização
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Análise Financeira */}
        <TabsContent value="financial" className="space-y-6">
          {/* Overview Orçamentário */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Orçamento de Transferências</CardTitle>
                <CardDescription>Gestão do orçamento da janela atual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Orçamento Total</span>
                    <span className="text-white">€{transferBudget.total}M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Já Utilizado</span>
                    <span className="text-destructive">-€{transferBudget.used}M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Comprometido</span>
                    <span className="text-chart-3">-€{transferBudget.committed}M</span>
                  </div>
                  <div className="h-px bg-border my-2"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Disponível</span>
                    <span className="text-primary">€{transferBudget.available}M</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Utilização do Orçamento</span>
                    <span className="text-white">
                      {((transferBudget.used / transferBudget.total) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress 
                    value={(transferBudget.used / transferBudget.total) * 100} 
                    className="h-3"
                  />
                </div>

                <div className="bg-secondary rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Limite Salarial Mensal</span>
                    <span className="text-white">€{transferBudget.salaryBudget}M</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Salários Atuais</span>
                    <span className="text-white">€{transferBudget.salaryUsed}M</span>
                  </div>
                  <Progress 
                    value={(transferBudget.salaryUsed / transferBudget.salaryBudget) * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-white">Distribuição Salarial</CardTitle>
                <CardDescription>Massa salarial por setor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={salaryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, percentage }) => `${category}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {salaryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#141619', 
                          border: '1px solid #2a2d34',
                          borderRadius: '8px'
                        }}
                        formatter={(value: any) => `€${value}K`}
                      />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {salaryDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-muted-foreground">{item.category}</span>
                      <span className="text-white ml-auto">€{item.value}K</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projeção Financeira */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Projeção Financeira Semestre</CardTitle>
              <CardDescription>Receitas, despesas e saldo operacional</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetProjection}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2d34" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#9ca3af"
                      tick={{ fill: '#9ca3af' }}
                    />
                    <YAxis 
                      stroke="#9ca3af"
                      tick={{ fill: '#9ca3af' }}
                      label={{ value: 'Milhões €', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#141619', 
                        border: '1px solid #2a2d34',
                        borderRadius: '8px'
                      }}
                      formatter={(value: any) => `€${value}M`}
                    />
                    <Legend />
                    <Bar dataKey="receita" name="Receita" fill="#00d4aa" />
                    <Bar dataKey="despesa" name="Despesa" fill="#dc2626" />
                    <Bar dataKey="saldo" name="Saldo" fill="#1e40af" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Métricas Financeiras */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                  <CardTitle className="text-white">Receitas Totais</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-white">€87.6M</h3>
                  <p className="text-sm text-muted-foreground">Projeção semestral</p>
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12.5% vs semestre anterior</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-destructive/10 to-transparent border-destructive/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ArrowDownRight className="w-5 h-5 text-destructive" />
                  <CardTitle className="text-white">Despesas Totais</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-white">€54.3M</h3>
                  <p className="text-sm text-muted-foreground">Projeção semestral</p>
                  <div className="flex items-center gap-1 text-xs text-destructive">
                    <TrendingUp className="w-3 h-3" />
                    <span>+8.2% vs semestre anterior</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/10 to-transparent border-accent/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-accent" />
                  <CardTitle className="text-white">Resultado Líquido</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-white">€33.3M</h3>
                  <p className="text-sm text-muted-foreground">Projeção semestral</p>
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <TrendingUp className="w-3 h-3" />
                    <span>+18.7% vs semestre anterior</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights Financeiros */}
          <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <CardTitle className="text-white">Insights Financeiros IA</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Situação financeira saudável</p>
                  <p className="text-sm text-muted-foreground">
                    Margem operacional de 38% permite investimentos estratégicos
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <AlertTriangle className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Atenção à massa salarial</p>
                  <p className="text-sm text-muted-foreground">
                    72.4% do limite - evitar contratos acima de €200K/mês nas próximas janelas
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Oportunidade de otimização</p>
                  <p className="text-sm text-muted-foreground">
                    Vender 2-3 jogadores sub-utilizados pode liberar €8-12M em orçamento
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
