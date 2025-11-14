'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { Avatar, AvatarFallback } from './ui/avatar'
import { 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  Eye, 
  Calendar, 
  MapPin,
  Trophy,
  Target,
  Activity,
  Brain,
  Download,
  Plus,
  BookOpen
} from 'lucide-react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts'

const scoutDatabase = [
  {
    id: 1,
    name: 'Gabriel Mendes',
    age: 17,
    position: 'Atacante',
    club: 'Santos FC Sub-20',
    overall: 76,
    potential: 89,
    height: '1.78m',
    foot: 'Destro',
    value: 'R$ 2.5M',
    contract: '2026',
    status: 'Recomendado',
    rating: 4.5,
    lastUpdated: '2 dias'
  },
  {
    id: 2,
    name: 'Lucas Rodrigues',
    age: 19,
    position: 'Meio-campo',
    club: 'Corinthians Sub-20',
    overall: 73,
    potential: 86,
    height: '1.75m',
    foot: 'Canhoto',
    value: 'R$ 1.8M',
    contract: '2025',
    status: 'Em análise',
    rating: 4.2,
    lastUpdated: '5 dias'
  },
  {
    id: 3,
    name: 'Rafael Costa',
    age: 16,
    position: 'Defensor',
    club: 'Flamengo Sub-17',
    overall: 71,
    potential: 91,
    height: '1.85m',
    foot: 'Destro',
    value: 'R$ 3.2M',
    contract: '2027',
    status: 'Prioridade',
    rating: 4.8,
    lastUpdated: '1 dia'
  }
]

const playerRadarData = [
  { attribute: 'Velocidade', value: 88, fullMark: 100 },
  { attribute: 'Finalização', value: 82, fullMark: 100 },
  { attribute: 'Passe', value: 75, fullMark: 100 },
  { attribute: 'Drible', value: 91, fullMark: 100 },
  { attribute: 'Físico', value: 78, fullMark: 100 },
  { attribute: 'Mental', value: 73, fullMark: 100 },
]

const developmentData = [
  { month: 'Jan', overall: 71, physical: 75, technical: 68, mental: 70 },
  { month: 'Mar', overall: 73, physical: 76, technical: 71, mental: 72 },
  { month: 'Mai', overall: 76, physical: 78, technical: 74, mental: 75 },
  { month: 'Jul', overall: 78, physical: 80, technical: 77, mental: 77 },
  { month: 'Set', overall: 80, physical: 82, technical: 79, mental: 79 },
  { month: 'Nov', overall: 82, physical: 84, technical: 81, mental: 81 },
]

const aiRecommendations = [
  {
    player: 'Gabriel Mendes',
    confidence: 92,
    recommendation: 'Contratação Prioritária',
    reasoning: 'Perfil ideal para sistema ofensivo do clube. Potencial de revenda elevado.',
    timeline: '30 dias',
    investment: 'R$ 2.5M'
  },
  {
    player: 'Rafael Costa',
    confidence: 88,
    recommendation: 'Monitoramento Intenso',
    reasoning: 'Jovem com potencial excepcional. Aguardar maturidade física.',
    timeline: '6 meses',
    investment: 'R$ 3.2M'
  }
]

export function ExpandedScout() {
  const [selectedPlayer, setSelectedPlayer] = useState(scoutDatabase[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [positionFilter, setPositionFilter] = useState('all')
  const [ageFilter, setAgeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredPlayers = scoutDatabase.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition = positionFilter === 'all' || player.position === positionFilter
    const matchesAge = ageFilter === 'all' || 
      (ageFilter === 'young' && player.age <= 17) ||
      (ageFilter === 'teen' && player.age >= 18 && player.age <= 20)
    const matchesStatus = statusFilter === 'all' || player.status === statusFilter
    
    return matchesSearch && matchesPosition && matchesAge && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Prioridade': return 'bg-primary text-black'
      case 'Recomendado': return 'bg-accent text-accent-foreground'
      case 'Em análise': return 'bg-orange-500 text-white'
      default: return 'bg-secondary'
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Scout &amp; Desenvolvimento</h1>
          <p className="text-muted-foreground">
            Banco de talentos e desenvolvimento de jovens
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-primary text-primary">
            <Eye className="w-3 h-3 mr-1" />
            {scoutDatabase.length} Prospects
          </Badge>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Novo Prospect
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters and Players List */}
        <Card className="bg-card border-border lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-white">Banco de Talentos</CardTitle>
            <div className="space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar jogador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="space-y-2">
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Posição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Posições</SelectItem>
                    <SelectItem value="Atacante">Atacante</SelectItem>
                    <SelectItem value="Meio-campo">Meio-campo</SelectItem>
                    <SelectItem value="Defensor">Defensor</SelectItem>
                    <SelectItem value="Goleiro">Goleiro</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={ageFilter} onValueChange={setAgeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Idade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Idades</SelectItem>
                    <SelectItem value="young">Sub-17</SelectItem>
                    <SelectItem value="teen">18-20 anos</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos Status</SelectItem>
                    <SelectItem value="Prioridade">Prioridade</SelectItem>
                    <SelectItem value="Recomendado">Recomendado</SelectItem>
                    <SelectItem value="Em análise">Em análise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                    <p className="text-xs text-muted-foreground">
                      {player.position} • {player.age} anos
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-orange-500" />
                      <span className="text-xs text-muted-foreground">{player.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{player.overall}</p>
                    <Badge 
                      className={`text-xs ${getStatusColor(player.status)}`}
                    >
                      {player.status}
                    </Badge>
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
                  <p className="text-muted-foreground">
                    {selectedPlayer.position} • {selectedPlayer.age} anos • {selectedPlayer.foot}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="outline" className="border-primary text-primary">
                      Overall: {selectedPlayer.overall}
                    </Badge>
                    <Badge className="bg-accent text-accent-foreground">
                      Potencial: {selectedPlayer.potential}
                    </Badge>
                    <Badge className={getStatusColor(selectedPlayer.status)}>
                      {selectedPlayer.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>📍 {selectedPlayer.club}</span>
                    <span>💰 {selectedPlayer.value}</span>
                    <span>📄 Contrato até {selectedPlayer.contract}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-orange-500" />
                    <span className="text-lg font-bold text-white">{selectedPlayer.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Avaliação Geral</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <Tabs defaultValue="attributes" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-secondary">
              <TabsTrigger value="attributes">Atributos</TabsTrigger>
              <TabsTrigger value="development">Desenvolvimento</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
              <TabsTrigger value="ai-analysis">Análise IA</TabsTrigger>
            </TabsList>

            <TabsContent value="attributes" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-white">Radar de Habilidades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={playerRadarData}>
                        <PolarGrid stroke="#2a2d34" />
                        <PolarAngleAxis dataKey="attribute" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                        <PolarRadiusAxis 
                          tick={{ fill: '#9ca3af', fontSize: 10 }} 
                          tickCount={6}
                          angle={90}
                        />
                        <Radar
                          name="Habilidades"
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

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-white">Informações Físicas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Altura</p>
                        <p className="font-medium text-white">{selectedPlayer.height}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pé Preferido</p>
                        <p className="font-medium text-white">{selectedPlayer.foot}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Velocidade</span>
                          <span className="text-white">88/100</span>
                        </div>
                        <Progress value={88} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Resistência</span>
                          <span className="text-white">82/100</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Força</span>
                          <span className="text-white">74/100</span>
                        </div>
                        <Progress value={74} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="development" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-white">Evolução do Jogador</CardTitle>
                  <CardDescription>
                    Progresso nos últimos 12 meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={developmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2d34" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
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
                        dataKey="overall" 
                        stroke="#00d4aa" 
                        strokeWidth={3}
                        name="Overall"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="technical" 
                        stroke="#1e40af" 
                        strokeWidth={2}
                        name="Técnico"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="physical" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        name="Físico"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="mental" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        name="Mental"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="grid gap-4">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-white">Relatórios de Scout</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span className="font-medium text-white">Relatório Técnico</span>
                        <Badge variant="outline">3 dias atrás</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Jogador demonstra excelente técnica individual e visão de jogo. Destaque para a capacidade de finalização e movimentação sem bola. Recomendo acompanhamento próximo."
                      </p>
                      <p className="text-xs text-primary mt-2">- Scout João Silva</p>
                    </div>

                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-accent" />
                        <span className="font-medium text-white">Análise Física</span>
                        <Badge variant="outline">1 semana atrás</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Condicionamento físico adequado para a idade. Boa aceleração e resistência. Necessita trabalho específico de força para nível profissional."
                      </p>
                      <p className="text-xs text-accent mt-2">- Prep. Físico Carlos Santos</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ai-analysis" className="space-y-4">
              <div className="grid gap-4">
                {aiRecommendations.filter(rec => rec.player === selectedPlayer.name).map((recommendation, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Brain className="w-5 h-5 text-primary" />
                        Análise IA - {recommendation.player}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary text-black">
                          {recommendation.confidence}% Confiança
                        </Badge>
                        <Badge variant="outline">
                          {recommendation.recommendation}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {recommendation.reasoning}
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-white">Timeline</p>
                          <p className="text-sm text-primary">{recommendation.timeline}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Investimento</p>
                          <p className="text-sm text-primary">{recommendation.investment}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Aprovar Recomendação
                        </Button>
                        <Button size="sm" variant="outline">
                          Solicitar Mais Dados
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}