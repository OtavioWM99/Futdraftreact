'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Activity, 
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const performanceData = [
  { month: 'Jan', performance: 85, injuries: 12 },
  { month: 'Fev', performance: 88, injuries: 8 },
  { month: 'Mar', performance: 92, injuries: 5 },
  { month: 'Abr', performance: 87, injuries: 10 },
  { month: 'Mai', performance: 94, injuries: 3 },
  { month: 'Jun', performance: 91, injuries: 6 },
]

const tacticalData = [
  { formation: '4-3-3', usage: 45, winRate: 68 },
  { formation: '4-2-3-1', usage: 30, winRate: 72 },
  { formation: '3-5-2', usage: 15, winRate: 65 },
  { formation: '4-4-2', usage: 10, winRate: 58 },
]

const scoutData = [
  { position: 'Atacante', count: 12, recommended: 3 },
  { position: 'Meio-campo', count: 18, recommended: 5 },
  { position: 'Defesa', count: 15, recommended: 2 },
  { position: 'Goleiro', count: 4, recommended: 1 },
]

const pieData = [
  { name: 'Excelente', value: 35, color: '#00d4aa' },
  { name: 'Bom', value: 40, color: '#1e40af' },
  { name: 'Regular', value: 20, color: '#f59e0b' },
  { name: 'Atenção', value: 5, color: '#dc2626' },
]

export function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do desempenho e análises da equipe
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-primary text-primary">
            <Brain className="w-3 h-3 mr-1" />
            IA Ativa
          </Badge>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Gerar Relatório
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Performance Geral
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">91.2%</div>
            <p className="text-xs text-primary flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +5.2% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Jogadores Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">28</div>
            <p className="text-xs text-muted-foreground">
              3 em recuperação
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Eficiência Tática
            </CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">78.5%</div>
            <p className="text-xs text-orange-500 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              -2.1% vs última semana
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Prospects Base
            </CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">11</div>
            <p className="text-xs text-primary">
              Prontos para promoção
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white">Tendência de Performance</CardTitle>
            <CardDescription>
              Performance da equipe e índice de lesões por mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
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
                  dataKey="performance" 
                  stroke="#00d4aa" 
                  strokeWidth={3}
                  name="Performance (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="injuries" 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  name="Lesões"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Squad Status */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white">Status do Elenco</CardTitle>
            <CardDescription>
              Distribuição por nível de performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1d22', 
                    border: '1px solid #2a2d34',
                    color: '#ffffff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-muted-foreground">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tactical Analysis and Scout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tactical Formations */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white">Análise Tática</CardTitle>
            <CardDescription>
              Uso de formações e taxa de vitória
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={tacticalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2d34" />
                <XAxis dataKey="formation" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1d22', 
                    border: '1px solid #2a2d34',
                    color: '#ffffff'
                  }} 
                />
                <Bar dataKey="winRate" fill="#00d4aa" name="Taxa de Vitória (%)" />
                <Bar dataKey="usage" fill="#1e40af" name="Uso (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Scout Recommendations */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white">Scout Categorias de Base</CardTitle>
            <CardDescription>
              Jogadores avaliados e recomendações por posição
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {scoutData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-xs text-primary font-medium">
                      {item.position.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.position}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.count} avaliados
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={item.recommended > 0 ? "default" : "secondary"}
                    className={item.recommended > 0 ? "bg-primary text-black" : ""}
                  >
                    {item.recommended} recomendados
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Insights da IA
          </CardTitle>
          <CardDescription>
            Recomendações automáticas baseadas em análise de dados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white">
                Otimização de Formação Recomendada
              </p>
              <p className="text-sm text-muted-foreground">
                A formação 4-2-3-1 apresentou 72% de taxa de vitória. Considere aumentar seu uso para 40% dos jogos.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white">
                Atenção: Risco de Lesão Elevado
              </p>
              <p className="text-sm text-muted-foreground">
                3 jogadores apresentam indicadores de fadiga acima do normal. Recomenda-se rotação no próximo jogo.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
            <Clock className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white">
                Janela de Transferência
              </p>
              <p className="text-sm text-muted-foreground">
                Foram identificados 4 jogadores das categorias de base com potencial para integração imediata ao time principal.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}