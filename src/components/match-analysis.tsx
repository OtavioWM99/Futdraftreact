'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Progress } from './ui/progress'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Brain, 
  MapPin, 
  Activity, 
  Target, 
  Timer,
  TrendingUp,
  TrendingDown,
  Zap,
  Video,
  BarChart3
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from 'recharts'

const matchData = {
  homeTeam: 'São Paulo FC',
  awayTeam: 'Palmeiras',
  score: '2-1',
  date: '2025-01-15',
  venue: 'Morumbi'
}

const gameEvents = [
  { time: 12, event: 'Gol', player: 'João Silva', team: 'home', type: 'goal' },
  { time: 28, event: 'Cartão Amarelo', player: 'Carlos Santos', team: 'home', type: 'yellow' },
  { time: 45, event: 'Gol', player: 'Rivaldo', team: 'away', type: 'goal' },
  { time: 67, event: 'Substituição', player: 'Pedro Costa → Lucas Lima', team: 'home', type: 'substitution' },
  { time: 78, event: 'Gol', player: 'João Silva', team: 'home', type: 'goal' },
]

const heatmapData = [
  // Área central - alta atividade
  { x: 45, y: 45, value: 95, size: 80, player: 'João Silva' },
  { x: 52, y: 42, value: 88, size: 70, player: 'Carlos Santos' },
  { x: 48, y: 50, value: 92, size: 75, player: 'Centro Medio' },
  
  // Áreas de meio-campo - atividade média-alta
  { x: 35, y: 35, value: 72, size: 60, player: 'Miguel Santos' },
  { x: 65, y: 38, value: 68, size: 55, player: 'Lateral Direito' },
  { x: 30, y: 55, value: 75, size: 65, player: 'Lateral Esquerdo' },
  { x: 55, y: 28, value: 70, size: 58, player: 'Meio Defensivo' },
  
  // Área ofensiva - atividade média
  { x: 40, y: 20, value: 58, size: 50, player: 'Atacante' },
  { x: 60, y: 25, value: 62, size: 52, player: 'Ponta Direita' },
  { x: 25, y: 30, value: 55, size: 48, player: 'Ponta Esquerda' },
  
  // Área defensiva - atividade baixa-média
  { x: 45, y: 70, value: 45, size: 40, player: 'Zagueiro Central' },
  { x: 35, y: 75, value: 38, size: 35, player: 'Zagueiro Esquerdo' },
  { x: 55, y: 72, value: 42, size: 38, player: 'Zagueiro Direito' },
  { x: 48, y: 85, value: 25, size: 30, player: 'Goleiro' },
  
  // Pontos adicionais para densidade
  { x: 42, y: 40, value: 65, size: 45, player: 'Apoio' },
  { x: 58, y: 48, value: 68, size: 47, player: 'Apoio' },
  { x: 38, y: 52, value: 60, size: 42, player: 'Apoio' },
  { x: 62, y: 35, value: 58, size: 40, player: 'Apoio' },
  { x: 28, y: 45, value: 52, size: 38, player: 'Apoio' },
  { x: 72, y: 50, value: 55, size: 40, player: 'Apoio' },
]

const tacticalData = [
  { minute: 15, possession: 65, attacks: 8, passes: 142 },
  { minute: 30, possession: 58, attacks: 12, passes: 198 },
  { minute: 45, possession: 62, attacks: 15, passes: 267 },
  { minute: 60, possession: 55, attacks: 18, passes: 324 },
  { minute: 75, possession: 60, attacks: 22, passes: 398 },
  { minute: 90, possession: 57, attacks: 26, passes: 445 },
]

const aiInsights = [
  {
    type: 'tactical',
    title: 'Superioridade no Meio-Campo',
    description: 'Equipe dominou o meio-campo com 68% de posse de bola entre os minutos 20-35.',
    confidence: 92,
    recommendation: 'Manter pressão alta nos próximos jogos'
  },
  {
    type: 'performance',
    title: 'Eficiência Ofensiva',
    description: 'Taxa de finalização 23% acima da média da temporada.',
    confidence: 87,
    recommendation: 'Replicar movimentação ofensiva do 1º tempo'
  },
  {
    type: 'defensive',
    title: 'Vulnerabilidade Lateral Direita',
    description: 'Sofremos 4 ataques perigosos pelo lado direito da defesa.',
    confidence: 78,
    recommendation: 'Ajustar cobertura defensiva'
  }
]

export function MatchAnalysis() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [selectedPlayer, setSelectedPlayer] = useState('all')
  const [selectedView, setSelectedView] = useState('heatmap')

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Análise de Partida</h1>
          <p className="text-muted-foreground">
            {matchData.homeTeam} {matchData.score} {matchData.awayTeam} • {matchData.date}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-primary text-primary">
            <Brain className="w-3 h-3 mr-1" />
            IA Ativa
          </Badge>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Video className="w-4 h-4 mr-2" />
            Exportar Vídeo
          </Button>
        </div>
      </div>

      {/* Match Center */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Match Center</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-primary text-black">AO VIVO</Badge>
              <span className="text-sm text-muted-foreground">90+3'</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Score and Stats */}
            <div className="lg:col-span-1">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <p className="font-medium text-white">{matchData.homeTeam}</p>
                    <div className="text-3xl font-bold text-primary">2</div>
                  </div>
                  <div className="text-2xl text-muted-foreground">×</div>
                  <div className="text-center">
                    <p className="font-medium text-white">{matchData.awayTeam}</p>
                    <div className="text-3xl font-bold text-primary">1</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-white">57%</div>
                    <div className="text-xs text-muted-foreground">Posse</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">26</div>
                    <div className="text-xs text-muted-foreground">Ataques</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">8</div>
                    <div className="text-xs text-muted-foreground">Finalizações</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Events Timeline */}
            <div className="lg:col-span-2">
              <h3 className="font-medium text-white mb-4">Eventos da Partida</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {gameEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-secondary rounded-lg">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-xs text-primary font-medium">{event.time}'</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{event.event}</p>
                      <p className="text-xs text-muted-foreground">{event.player}</p>
                    </div>
                    <Badge variant={event.type === 'goal' ? 'default' : 'secondary'}>
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Player and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Análise de Vídeo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Video Placeholder */}
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Player de Vídeo</p>
                  <p className="text-sm text-muted-foreground">Highlights e análises táticas</p>
                </div>
              </div>

              {/* Video Controls */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="outline">
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 mx-4">
                    <Progress value={45} className="h-2" />
                  </div>
                  <span className="text-sm text-muted-foreground">45:23 / 90:00</span>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Gols</Button>
                  <Button size="sm" variant="outline">Lances Perigosos</Button>
                  <Button size="sm" variant="outline">Cartões</Button>
                  <Button size="sm" variant="outline">Substituições</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tactical View */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white">Visualização Tática</CardTitle>
            <div className="flex gap-2">
              <p className="text-sm text-muted-foreground">Análise tática em tempo real</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Field Visualization */}
              <div className="aspect-[3/4] heatmap-container rounded-lg relative border-2 border-white/20 overflow-hidden">
                {/* Field markings */}
                <div className="absolute inset-4 border border-white/60 rounded z-10">
                  {/* Goal areas */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-12 border-b border-l border-r border-white/60"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-12 border-t border-l border-r border-white/60"></div>
                  
                  {/* Penalty areas */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-20 border-b border-l border-r border-white/40"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-20 border-t border-l border-r border-white/40"></div>
                  
                  {/* Center line and circle */}
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white/60"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/60 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/60 rounded-full"></div>
                  
                  {/* Corner arcs */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-b border-r border-white/40 rounded-br-full"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-b border-l border-white/40 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-t border-r border-white/40 rounded-tr-full"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-t border-l border-white/40 rounded-tl-full"></div>
                </div>

                {/* Heatmap Layer */}
                {selectedView === 'heatmap' && (
                  <div className="absolute inset-0 heatmap-overlay">
                    {heatmapData.map((point, index) => {
                      const getHeatClass = (value) => {
                        if (value >= 85) return 'heatmap-point-extreme'
                        if (value >= 70) return 'heatmap-point-high'
                        if (value >= 50) return 'heatmap-point-medium'
                        return 'heatmap-point-low'
                      }

                      return (
                        <div
                          key={index}
                          className={`absolute heatmap-point ${getHeatClass(point.value)}`}
                          style={{
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                            width: `${point.size}px`,
                            height: `${point.size}px`,
                            transform: 'translate(-50%, -50%)',
                            zIndex: Math.floor(point.value / 10)
                          }}
                          title={`${point.player}: ${point.value}% atividade`}
                        />
                      )
                    })}
                  </div>
                )}

                {/* Passing Network */}
                {selectedView === 'passing' && (
                  <div className="absolute inset-0">
                    {/* Passing lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      <line x1="40%" y1="45%" x2="52%" y2="42%" stroke="rgba(0, 212, 170, 0.6)" strokeWidth="3" />
                      <line x1="52%" y1="42%" x2="35%" y2="35%" stroke="rgba(0, 212, 170, 0.4)" strokeWidth="2" />
                      <line x1="45%" y1="45%" x2="65%" y2="38%" stroke="rgba(0, 212, 170, 0.5)" strokeWidth="2" />
                      <line x1="40%" y1="20%" x2="45%" y2="45%" stroke="rgba(0, 212, 170, 0.7)" strokeWidth="4" />
                      <line x1="48%" y1="50%" x2="55%" y2="28%" stroke="rgba(0, 212, 170, 0.3)" strokeWidth="2" />
                    </svg>
                    {/* Player nodes */}
                    {heatmapData.slice(0, 11).map((point, index) => (
                      <div
                        key={index}
                        className="absolute bg-primary rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-black"
                        style={{
                          left: `${point.x}%`,
                          top: `${point.y}%`,
                          width: `${Math.max(16, point.value / 5)}px`,
                          height: `${Math.max(16, point.value / 5)}px`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        title={`${point.player}: ${Math.floor(point.value / 2)} passes`}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                )}

                {/* Movement Tracking */}
                {selectedView === 'movement' && (
                  <div className="absolute inset-0">
                    {heatmapData.slice(0, 8).map((point, index) => (
                      <div key={index}>
                        {/* Movement trail */}
                        <div
                          className="absolute w-1 h-8 bg-gradient-to-t from-primary to-transparent opacity-60"
                          style={{
                            left: `${point.x - 2}%`,
                            top: `${point.y - 5}%`,
                            transform: 'translate(-50%, -50%) rotate(25deg)'
                          }}
                        />
                        {/* Player position */}
                        <div
                          className="absolute w-4 h-4 bg-primary rounded-full border-2 border-white"
                          style={{
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          title={`${point.player}: ${point.value}m percorridos`}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Defensive Actions */}
                {selectedView === 'defensive' && (
                  <div className="absolute inset-0">
                    {heatmapData.filter(point => point.y > 40).map((point, index) => (
                      <div
                        key={index}
                        className="absolute"
                        style={{
                          left: `${point.x}%`,
                          top: `${point.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {/* Defensive zone */}
                        <div className="w-8 h-8 border-2 border-accent rounded-full bg-accent/20" />
                        {/* Player */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Direction Arrow */}
                <div className="absolute top-2 right-2 z-20">
                  <div className="flex items-center gap-1 text-white/60">
                    <div className="w-8 h-px bg-white/60"></div>
                    <div className="w-0 h-0 border-l-4 border-l-white/60 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Heatmap Legend */}
              {selectedView === 'heatmap' && (
                <div className="bg-secondary p-3 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Intensidade de Atividade</p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 heatmap-point-low rounded-full"></div>
                      <span className="text-muted-foreground">Baixa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 heatmap-point-medium rounded-full"></div>
                      <span className="text-muted-foreground">Média</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 heatmap-point-high rounded-full"></div>
                      <span className="text-muted-foreground">Alta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 heatmap-point-extreme rounded-full"></div>
                      <span className="text-muted-foreground">Extrema</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Player Filter */}
              <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por jogador" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Jogadores</SelectItem>
                  <SelectItem value="joao">João Silva</SelectItem>
                  <SelectItem value="carlos">Carlos Santos</SelectItem>
                  <SelectItem value="pedro">Pedro Costa</SelectItem>
                  <SelectItem value="miguel">Miguel Santos</SelectItem>
                </SelectContent>
              </Select>

              {/* View Options */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-white">Opções de Visualização</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    size="sm" 
                    variant={selectedView === 'heatmap' ? 'default' : 'outline'}
                    onClick={() => setSelectedView('heatmap')}
                  >
                    Calor
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedView === 'passing' ? 'default' : 'outline'}
                    onClick={() => setSelectedView('passing')}
                  >
                    Passes
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedView === 'movement' ? 'default' : 'outline'}
                    onClick={() => setSelectedView('movement')}
                  >
                    Movimento
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedView === 'defensive' ? 'default' : 'outline'}
                    onClick={() => setSelectedView('defensive')}
                  >
                    Defesa
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tactical Analysis and AI Insights */}
      <Tabs defaultValue="tactical" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="tactical">Análise Tática</TabsTrigger>
          <TabsTrigger value="ai-insights">Insights IA</TabsTrigger>
          <TabsTrigger value="comparison">Comparação</TabsTrigger>
        </TabsList>

        <TabsContent value="tactical" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">Evolução Tática</CardTitle>
              <CardDescription>
                Métricas táticas durante a partida
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={tacticalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2d34" />
                  <XAxis dataKey="minute" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1d22', 
                      border: '1px solid #2a2d34',
                      color: '#ffffff'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="possession" 
                    stackId="1"
                    stroke="#00d4aa" 
                    fill="#00d4aa"
                    fillOpacity={0.3}
                    name="Posse (%)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="attacks" 
                    stackId="2"
                    stroke="#1e40af" 
                    fill="#1e40af"
                    fillOpacity={0.3}
                    name="Ataques"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-4">
          <div className="grid gap-4">
            {aiInsights.map((insight, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-white">{insight.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {insight.confidence}% confiança
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {insight.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary">{insight.recommendation}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white">Comparação entre Partidas</CardTitle>
              <CardDescription>
                Performance vs média da temporada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-primary">+15%</div>
                  <div className="text-sm text-muted-foreground">Posse de Bola</div>
                  <TrendingUp className="w-4 h-4 text-primary mx-auto mt-1" />
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-primary">+23%</div>
                  <div className="text-sm text-muted-foreground">Finalizações</div>
                  <TrendingUp className="w-4 h-4 text-primary mx-auto mt-1" />
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold text-destructive">-8%</div>
                  <div className="text-sm text-muted-foreground">Passes Errados</div>
                  <TrendingDown className="w-4 h-4 text-destructive mx-auto mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}