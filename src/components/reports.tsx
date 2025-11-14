'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Progress } from './ui/progress'
import { 
  FileText, 
  Download,
  Share2,
  Eye,
  Calendar,
  User,
  Users,
  CheckCircle2,
  Clock,
  Send,
  FileSpreadsheet,
  FileImage,
  Mail,
  Archive,
  Star,
  TrendingUp,
  BarChart3,
  Target,
  Activity,
  Shield,
  Zap,
  Brain,
  Filter,
  Search,
  Plus
} from 'lucide-react'
import { 
  AreaChart, 
  Area,
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'

// Tipos de relatórios disponíveis
const reportTemplates = [
  {
    id: 1,
    name: 'Relatório de Performance Semanal',
    category: 'performance',
    description: 'Análise completa da performance individual e coletiva',
    frequency: 'Semanal',
    lastGenerated: '2025-01-12',
    recipients: 5,
    pages: 12,
    autoGenerate: true,
    icon: Activity,
    color: 'primary'
  },
  {
    id: 2,
    name: 'Análise Tática Pós-Jogo',
    category: 'tactical',
    description: 'Relatório detalhado da partida com análise tática',
    frequency: 'Por Jogo',
    lastGenerated: '2025-01-15',
    recipients: 8,
    pages: 18,
    autoGenerate: true,
    icon: Target,
    color: 'accent'
  },
  {
    id: 3,
    name: 'Scout Report - Adversário',
    category: 'scouting',
    description: 'Análise completa do próximo adversário',
    frequency: 'Por Jogo',
    lastGenerated: '2025-01-14',
    recipients: 6,
    pages: 15,
    autoGenerate: false,
    icon: Shield,
    color: 'destructive'
  },
  {
    id: 4,
    name: 'Relatório de Lesões e Recuperação',
    category: 'medical',
    description: 'Status médico do elenco e previsões de retorno',
    frequency: 'Semanal',
    lastGenerated: '2025-01-13',
    recipients: 4,
    pages: 6,
    autoGenerate: true,
    icon: Activity,
    color: 'chart-3'
  },
  {
    id: 5,
    name: 'Análise de Mercado - Contratações',
    category: 'transfers',
    description: 'Relatório executivo de alvos de contratação',
    frequency: 'Mensal',
    lastGenerated: '2025-01-10',
    recipients: 3,
    pages: 22,
    autoGenerate: false,
    icon: Users,
    color: 'chart-5'
  },
  {
    id: 6,
    name: 'Dashboard Executivo Mensal',
    category: 'executive',
    description: 'Resumo executivo para diretoria',
    frequency: 'Mensal',
    lastGenerated: '2025-01-01',
    recipients: 7,
    pages: 10,
    autoGenerate: true,
    icon: BarChart3,
    color: 'primary'
  },
]

// Relatórios gerados recentemente
const recentReports = [
  {
    id: 1,
    name: 'Análise Tática - São Paulo x Palmeiras',
    type: 'Tático',
    date: '2025-01-15',
    time: '18:30',
    size: '4.2 MB',
    format: 'PDF',
    status: 'completed',
    downloads: 12,
    shares: 3
  },
  {
    id: 2,
    name: 'Performance Semanal - Semana 02',
    type: 'Performance',
    date: '2025-01-12',
    time: '10:15',
    size: '3.8 MB',
    format: 'PDF',
    status: 'completed',
    downloads: 8,
    shares: 2
  },
  {
    id: 3,
    name: 'Scout Report - Corinthians',
    type: 'Scout',
    date: '2025-01-14',
    time: '16:45',
    size: '5.1 MB',
    format: 'PDF',
    status: 'completed',
    downloads: 15,
    shares: 4
  },
  {
    id: 4,
    name: 'Relatório Médico - Janeiro 2025',
    type: 'Médico',
    date: '2025-01-13',
    time: '09:20',
    size: '1.9 MB',
    format: 'PDF',
    status: 'completed',
    downloads: 5,
    shares: 1
  },
  {
    id: 5,
    name: 'Análise Financeira - Q4 2024',
    type: 'Financeiro',
    date: '2025-01-08',
    time: '14:00',
    size: '6.7 MB',
    format: 'XLSX',
    status: 'completed',
    downloads: 9,
    shares: 2
  },
]

// Destinatários
const recipients = [
  { id: 1, name: 'Carlos Silva', role: 'Treinador Principal', email: 'carlos@clube.com', active: true },
  { id: 2, name: 'André Santos', role: 'Auxiliar Técnico', email: 'andre@clube.com', active: true },
  { id: 3, name: 'Roberto Costa', role: 'Preparador Físico', email: 'roberto@clube.com', active: true },
  { id: 4, name: 'Marcelo Lima', role: 'Analista de Desempenho', email: 'marcelo@clube.com', active: true },
  { id: 5, name: 'Paulo Mendes', role: 'Diretor de Futebol', email: 'paulo@clube.com', active: true },
  { id: 6, name: 'Fernando Alves', role: 'Coordenador Scout', email: 'fernando@clube.com', active: false },
  { id: 7, name: 'José Oliveira', role: 'Presidente', email: 'jose@clube.com', active: true },
]

// Dados de uso de relatórios
const reportUsage = [
  { month: 'Jul', generated: 24, downloaded: 156, shared: 42 },
  { month: 'Ago', generated: 28, downloaded: 182, shared: 48 },
  { month: 'Set', generated: 32, downloaded: 208, shared: 55 },
  { month: 'Out', generated: 30, downloaded: 195, shared: 51 },
  { month: 'Nov', generated: 35, downloaded: 228, shared: 62 },
  { month: 'Dez', generated: 38, downloaded: 248, shared: 68 },
]

export function Reports() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'performance': return 'bg-primary/20 text-primary border-primary'
      case 'tactical': return 'bg-accent/20 text-accent border-accent'
      case 'scouting': return 'bg-destructive/20 text-destructive border-destructive'
      case 'medical': return 'bg-chart-3/20 text-chart-3 border-chart-3'
      case 'transfers': return 'bg-chart-5/20 text-chart-5 border-chart-5'
      case 'executive': return 'bg-primary/20 text-primary border-primary'
      default: return 'bg-secondary'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'performance': return 'Performance'
      case 'tactical': return 'Tático'
      case 'scouting': return 'Scout'
      case 'medical': return 'Médico'
      case 'transfers': return 'Transferências'
      case 'executive': return 'Executivo'
      default: return category
    }
  }

  const filteredTemplates = selectedCategory === 'all' 
    ? reportTemplates 
    : reportTemplates.filter(t => t.category === selectedCategory)

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Relatórios & Exportações</h1>
          <p className="text-muted-foreground">
            Geração e compartilhamento de relatórios personalizados
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Relatório
        </Button>
      </div>

      {/* KPIs Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Relatórios Este Mês</p>
                <h3 className="text-white mt-1">38</h3>
                <p className="text-xs text-primary mt-1">+8.6% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Downloads Totais</p>
                <h3 className="text-white mt-1">248</h3>
                <p className="text-xs text-accent mt-1">Média 6.5 por relatório</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compartilhamentos</p>
                <h3 className="text-white mt-1">68</h3>
                <p className="text-xs text-chart-3 mt-1">Para 12 destinatários</p>
              </div>
              <div className="w-12 h-12 bg-chart-3/20 rounded-lg flex items-center justify-center">
                <Share2 className="w-6 h-6 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Automação Ativa</p>
                <h3 className="text-white mt-1">4 tipos</h3>
                <p className="text-xs text-chart-5 mt-1">Geração automática</p>
              </div>
              <div className="w-12 h-12 bg-chart-5/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-chart-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs principais */}
      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="templates" className="gap-2">
            <FileText className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="recent" className="gap-2">
            <Clock className="w-4 h-4" />
            Recentes
          </TabsTrigger>
          <TabsTrigger value="distribution" className="gap-2">
            <Send className="w-4 h-4" />
            Distribuição
          </TabsTrigger>
        </TabsList>

        {/* Tab: Templates */}
        <TabsContent value="templates" className="space-y-6">
          {/* Filtros */}
          <div className="flex gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Categorias</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="tactical">Tático</SelectItem>
                <SelectItem value="scouting">Scout</SelectItem>
                <SelectItem value="medical">Médico</SelectItem>
                <SelectItem value="transfers">Transferências</SelectItem>
                <SelectItem value="executive">Executivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid de Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => {
              const Icon = template.icon
              return (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all ${
                    selectedTemplate === template.id 
                      ? 'border-primary shadow-lg shadow-primary/20' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${template.color}/20`}>
                        <Icon className={`w-6 h-6 text-${template.color}`} />
                      </div>
                      {template.autoGenerate && (
                        <Badge variant="outline" className="border-primary text-primary">
                          <Zap className="w-3 h-3 mr-1" />
                          Auto
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-white text-base">{template.name}</CardTitle>
                    <CardDescription className="mt-1">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getCategoryColor(template.category)}>
                        {getCategoryLabel(template.category)}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {template.frequency}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Última geração</p>
                        <p className="text-white">{new Date(template.lastGenerated).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Páginas</p>
                        <p className="text-white">{template.pages} páginas</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Destinatários</p>
                        <p className="text-white">{template.recipients} pessoas</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Formato</p>
                        <p className="text-white">PDF</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-border">
                      <Button className="flex-1 gap-2" size="sm">
                        <FileText className="w-3 h-3" />
                        Gerar
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="w-3 h-3" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Estatísticas de Uso */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Estatísticas de Uso</CardTitle>
              <CardDescription>Geração, downloads e compartilhamentos nos últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={reportUsage}>
                    <defs>
                      <linearGradient id="colorGenerated" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDownloaded" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e40af" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorShared" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2d34" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#9ca3af"
                      tick={{ fill: '#9ca3af' }}
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
                    <Area 
                      type="monotone" 
                      dataKey="generated" 
                      name="Gerados"
                      stroke="#00d4aa" 
                      fillOpacity={1} 
                      fill="url(#colorGenerated)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="downloaded" 
                      name="Downloads"
                      stroke="#1e40af" 
                      fillOpacity={1} 
                      fill="url(#colorDownloaded)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="shared" 
                      name="Compartilhamentos"
                      stroke="#f59e0b" 
                      fillOpacity={1} 
                      fill="url(#colorShared)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Recentes */}
        <TabsContent value="recent" className="space-y-6">
          <div className="space-y-3">
            {recentReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white">{report.name}</h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{new Date(report.date).toLocaleDateString('pt-BR')} às {report.time}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                          <span>•</span>
                          <Badge variant="secondary" className="text-xs">{report.format}</Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            <span>{report.downloads} downloads</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="w-3 h-3" />
                            <span>{report.shares} compartilhamentos</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="w-3 h-3" />
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-3 h-3" />
                        Baixar
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Share2 className="w-3 h-3" />
                        Compartilhar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ações em Massa */}
          <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-primary" />
                <CardTitle className="text-white">Exportação em Massa</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Exporte múltiplos relatórios de uma vez em diferentes formatos
              </p>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Exportar PDF
                </Button>
                <Button variant="outline" className="gap-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  Exportar Excel
                </Button>
                <Button variant="outline" className="gap-2">
                  <FileImage className="w-4 h-4" />
                  Exportar Imagens
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Distribuição */}
        <TabsContent value="distribution" className="space-y-6">
          {/* Lista de Destinatários */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Destinatários</CardTitle>
                  <CardDescription>Gerenciar lista de distribuição de relatórios</CardDescription>
                </div>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Adicionar Destinatário
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recipients.map((recipient) => (
                  <div 
                    key={recipient.id}
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-white">{recipient.name}</p>
                          {recipient.active && (
                            <Badge variant="outline" className="text-xs border-primary text-primary">
                              Ativo
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{recipient.role}</p>
                        <p className="text-xs text-muted-foreground mt-1">{recipient.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      {recipient.active ? (
                        <Button variant="outline" size="sm" className="text-destructive">
                          Desativar
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="text-primary">
                          Ativar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Configurações de Distribuição */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Configurações de Email</CardTitle>
                <CardDescription>Preferências de envio automático</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-white text-sm">Envio automático</span>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-white text-sm">Confirmação de leitura</span>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-white text-sm">Agendamento</span>
                  </div>
                  <Badge variant="secondary">Inativo</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-white">Segurança</CardTitle>
                <CardDescription>Proteção e controle de acesso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-white text-sm">Proteção por senha</span>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-white text-sm">Expiração 30 dias</span>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-white text-sm">Marca d'água</span>
                  </div>
                  <Badge variant="secondary">Inativo</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

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
                  <p className="text-white">Otimizar distribuição de relatórios táticos</p>
                  <p className="text-sm text-muted-foreground">
                    Enviar relatórios pós-jogo até 24h após a partida aumenta engajamento em 45%
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <TrendingUp className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Aumentar frequência de relatórios executivos</p>
                  <p className="text-sm text-muted-foreground">
                    Diretoria solicitou mais relatórios - considerar envios quinzenais
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
