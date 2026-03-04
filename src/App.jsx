import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, Clock, CheckCircle, Zap, ArrowRight, 
  Code2, Monitor, Smartphone, Globe, Layers, Settings, ShieldCheck, 
  PlayCircle, X, Terminal, AlertCircle, Cpu, Layout, Rocket,
  ChevronLeft, ChevronRight, ShoppingCart, Trash2, CreditCard, QrCode, Loader2, Lock, Unlock, Search, ExternalLink, MousePointerClick,
  MapPin, Mail, GraduationCap, Users, UploadCloud, Plus, RotateCcw
} from 'lucide-react';

// IMPORTAÇÃO CORRIGIDA BASEADA NA SUA TELA DO VS CODE
import fotoPerfil from './assets/perfil.jpg';

// =========================================================
//  LÓGICA DE DADOS E MARKETING
// =========================================================

const DATA_LIMITE = new Date(2026, 2, 7, 23, 59, 59); 

const gerarAgendaAutomatica = () => {
  const dias = [];
  const hoje = new Date();
  const horariosBase = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "19:00"];

  for (let i = 0; i < 14; i++) {
    const dataFutura = new Date(hoje);
    dataFutura.setDate(hoje.getDate() + i);
    if (dataFutura.getDay() === 0) continue; 
    
    const dataISO = dataFutura.toISOString().split('T')[0];
    const slots = horariosBase.map(h => ({ hora: h, disponivel: true }));
    dias.push({ data: dataISO, slots: slots });
  }
  return dias;
};

// Projetos Padrão
const PROJETOS_DEFAULT = [
  { 
    id: 1, 
    titulo: "MarVin Provider", 
    desc: "Dashboard PWA simulando ecossistema digital de telecom e fintech. Navegação app-like com menus dinâmicos e painel financeiro interativo.", 
    tags: ["React.js", "PWA", "UI/UX"], 
    img: "https://images.unsplash.com/photo-1616198814651-e71f960c3180?auto=format&fit=crop&w=800&q=80",
    mockupImg: "https://images.unsplash.com/photo-1616198814651-e71f960c3180?auto=format&fit=crop&w=600&h=1200&q=80",
    link: "https://marvinsitbilders.com"
  },
  { 
    id: 2, 
    titulo: "RDO Digital (Construtora)", 
    desc: "Sistema moderno para preenchimento e exportação de Relatório Diário de Obra. Focado na experiência do engenheiro direto do canteiro de obras.", 
    tags: ["JavaScript", "Web App", "Gestão"], 
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    mockupImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&h=1200&q=80",
    link: "https://marvinsitbilders.com"
  },
  { 
    id: 3, 
    titulo: "Contra Mau Olhado", 
    desc: "E-commerce de alta conversão. Interface desenhada para maximizar vendas de produtos com checkout otimizado e design totalmente responsivo.", 
    tags: ["E-commerce", "Frontend", "Vendas"], 
    img: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=800&q=80",
    mockupImg: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=600&h=1200&q=80",
    link: "https://marvinsitbilders.com"
  },
  { 
    id: 4, 
    titulo: "Sistema de Estoque", 
    desc: "Aplicação web para controle de entrada, saída e inventário de materiais de construção civil, com atualização de estado em tempo real.", 
    tags: ["Node.js", "Dashboard", "Sistemas"], 
    img: "https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7a?auto=format&fit=crop&w=800&q=80",
    mockupImg: "https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7a?auto=format&fit=crop&w=600&h=1200&q=80",
    link: "https://marvinsitbilders.com"
  },
  { 
    id: 5, 
    titulo: "Landing Page Psicologia", 
    desc: "Página de captura premium para profissional de saúde, integrada com sistema de agendamento e checkout de consultas.", 
    tags: ["Landing Page", "Conversão", "UX"], 
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
    mockupImg: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&h=1200&q=80",
    link: "https://marvinsitbilders.com"
  },
  { 
    id: 6, 
    titulo: "Quiz App Interativo", 
    desc: "Aplicativo de perguntas e respostas dinâmicas, com gamificação e cálculo de pontuação instantânea, desenvolvido para engajamento.", 
    tags: ["React", "Gamificação", "Lógica"], 
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    mockupImg: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&h=1200&q=80",
    link: "https://marvinsitbilders.com"
  }
];

const DEPOIMENTOS = [
  { id: 1, nome: "Startup Financeira", tempo: "Cliente há 6 meses", texto: "O Marcos transformou nossa ideia em um MVP funcional em tempo recorde. A Landing Page converteu 3x mais que a antiga.", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, nome: "Ana Boutique", tempo: "E-commerce lançado", texto: "Eu não entendia nada de sites. Ele me explicou tudo, configurou o domínio e meu blog já está aparecendo no Google.", foto: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 3, nome: "Roberto Gym", tempo: "Site Institucional", texto: "Design impecável e ultra rápido no celular. Meus alunos adoraram a facilidade para ver os horários.", foto: "https://randomuser.me/api/portraits/men/46.jpg" },
  { id: 4, nome: "Agência VOA", tempo: "Parceiro Recorrente", texto: "Código limpo, organizado e componentizado. É raro achar um dev que também tenha bom gosto para design.", foto: "https://randomuser.me/api/portraits/women/68.jpg" }
];

const FOTO_PERFIL_MARCOS = fotoPerfil;

export default function LandingPageDev() {
  const [modo, setModo] = useState('cliente'); 
  const [adminTab, setAdminTab] = useState('agenda'); 
  const [isPromoAtiva, setIsPromoAtiva] = useState(new Date() < DATA_LIMITE);
  
  // PROTEÇÃO CONTRA CRASH DE CACHE
  const [agenda, setAgenda] = useState(() => {
    try {
      const salvo = localStorage.getItem('agenda_dev_pro_v5');
      if (salvo) {
        const parsed = JSON.parse(salvo);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) { console.error(e); }
    return gerarAgendaAutomatica();
  });

  const [projetos, setProjetos] = useState(() => {
    try {
      const salvo = localStorage.getItem('projetos_dev_pro_v5');
      if (salvo) {
        const parsed = JSON.parse(salvo);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) { console.error(e); }
    return PROJETOS_DEFAULT;
  });

  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horaSelecionada, setHoraSelecionada] = useState(null);
  const [diaAdmin, setDiaAdmin] = useState(null);
  const [agendado, setAgendado] = useState(false);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false); 
  
  const [carrinho, setCarrinho] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });
  
  // =========================================================
  // MÁQUINA DE ESCREVER E ÁUDIO
  // =========================================================
  const fullText = "Marcos Software\nEngineering_"; 
  const [typedText, setTypedText] = useState('');

  const [audioTeclado] = useState(() => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.5;
    audio.loop = true;
    return audio;
  });

  // Função para reiniciar a digitação pelo botão de reload
  const resetTyping = () => {
    setTypedText('');
  };

  // Efeito principal (Hero)
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);

  // Controle do Áudio Sincronizado
  useEffect(() => {
    const isTyping = typedText.length > 0 && typedText.length < fullText.length;

    if (isTyping) {
      // Tenta tocar. Pode ser bloqueado na 1ª vez se o usuário não tiver clicado no site
      audioTeclado.play().catch(e => console.log("Áudio bloqueado pelo navegador até o primeiro clique."));
    } else {
      audioTeclado.pause();
      audioTeclado.currentTime = 0; // Volta para o início
    }
  }, [typedText, audioTeclado, fullText.length]);


  const precoAtual = isPromoAtiva ? 0 : 200;
  const textoBotaoCta = isPromoAtiva ? "AGENDAR BRIEFING GRÁTIS" : "SOLICITAR ORÇAMENTO";

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +DATA_LIMITE - +new Date();
      if (difference > 0) {
        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          min: Math.floor((difference / 1000 / 60) % 60),
          seg: Math.floor((difference / 1000) % 60)
        });
        setIsPromoAtiva(true);
      } else {
        setIsPromoAtiva(false);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const proximoSlide = () => setIndiceAtual((prev) => (prev === DEPOIMENTOS.length - 1 ? 0 : prev + 1));
  const anteriorSlide = () => setIndiceAtual((prev) => (prev === 0 ? DEPOIMENTOS.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(proximoSlide, 6000);
    return () => clearInterval(interval);
  }, [indiceAtual]);

  useEffect(() => {
    localStorage.setItem('agenda_dev_pro_v5', JSON.stringify(agenda));
  }, [agenda]);

  useEffect(() => {
    localStorage.setItem('projetos_dev_pro_v5', JSON.stringify(projetos));
  }, [projetos]);

  useEffect(() => {
    if (agenda.length > 0) {
      if (!diaSelecionado) setDiaSelecionado(agenda[0]);
      if (!diaAdmin) setDiaAdmin(agenda[0]);
    }
  }, [agenda, diaSelecionado, diaAdmin]);

  // FUNÇÕES DE ADMINISTRAÇÃO DO PORTFÓLIO
  const handleProjetoChange = (id, campo, valor) => {
    setProjetos(projetos.map(p => p.id === id ? { ...p, [campo]: valor } : p));
  };

  const handleImageDrop = (e, id, campo) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleProjetoChange(id, campo, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const adicionarProjeto = () => {
    const novo = { 
      id: Date.now(), 
      titulo: "Novo Projeto", 
      desc: "Descrição curta do projeto...", 
      tags: ["Tag1", "Tag2"], 
      img: "", 
      mockupImg: "", 
      link: "#" 
    };
    setProjetos([novo, ...projetos]);
  };

  const removerProjetoAdmin = (id) => {
    setProjetos(projetos.filter(p => p.id !== id));
  };

  const handlePhone = (e) => {
    let v = e.target.value.replace(/\D/g, '');
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    setTelefone(v.substring(0, 15));
  };

  const scrollToBooking = () => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' });

  const adicionarSessaoAoCarrinho = (e) => {
    e.preventDefault();
    if (!diaSelecionado || !horaSelecionada || !nome || !telefone) {
      alert("Por favor, preencha todos os dados e selecione um horário.");
      return;
    }
    const novoItem = { id: Date.now(), tipo: "Consultoria / Briefing Técnico", data: diaSelecionado.data, hora: horaSelecionada.hora, paciente: nome, contato: telefone, preco: precoAtual };
    setCarrinho([novoItem]); 
    setIsCartOpen(true);
    setCheckoutMode(false);
  };

  const processarPagamento = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const novaAgenda = agenda.map(dia => {
        if (dia.data === diaSelecionado?.data) {
          return { ...dia, slots: dia.slots.map(s => s.hora === horaSelecionada?.hora ? { ...s, disponivel: false } : s) };
        }
        return dia;
      });
      setAgenda(novaAgenda);
      setIsProcessing(false);
      setAgendado(true);
      setCarrinho([]);
      setIsCartOpen(false);
      setCheckoutMode(false);
      setNome('');
      setTelefone('');
      setHoraSelecionada(null);
    }, 2000);
  };

  const toggleDisponibilidadeSlot = (dataDia, horaSlot) => {
    const novaAgenda = agenda.map(dia => {
      if (dia.data === dataDia) {
        return { ...dia, slots: dia.slots.map(slot => slot.hora === horaSlot ? { ...slot, disponivel: !slot.disponivel } : slot) };
      }
      return dia;
    });
    setAgenda(novaAgenda);
    setDiaAdmin(novaAgenda.find(d => d.data === dataDia));
  };

  const toggleDiaInteiro = (dataDia, bloquear) => {
    const novaAgenda = agenda.map(dia => {
      if (dia.data === dataDia) {
        return { ...dia, slots: dia.slots.map(slot => ({ ...slot, disponivel: !bloquear })) };
      }
      return dia;
    });
    setAgenda(novaAgenda);
    setDiaAdmin(novaAgenda.find(d => d.data === dataDia));
  };

  const getDiaSemana = (dataIso) => new Date(dataIso + "T00:00:00").toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').toUpperCase();
  const getDiaMes = (dataIso) => new Date(dataIso + "T00:00:00").toLocaleDateString('pt-BR', { day: '2-digit' });
  const formatarDataLegivel = (dataIso) => new Date(dataIso + "T00:00:00").toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });

  const totalCarrinho = carrinho.reduce((acc, item) => acc + item.preco, 0);

  if (agendado) {
    return (
      <div className="container centered">
        <div className="success-card-full animate-fade">
          <CheckCircle size={80} color="var(--primary)" style={{margin: '0 auto 20px'}} />
          <h2>Agendamento Confirmado!</h2>
          <p>Sua reunião de briefing está marcada. Enviei o link do Google Meet para o seu WhatsApp.</p>
          <button className="btn-cta" style={{marginTop: '20px'}} onClick={() => setAgendado(false)}>Voltar ao Site</button>
        </div>
        <style dangerouslySetInnerHTML={{ __html: LP_PRO_STYLES }} />
      </div>
    );
  }

  return (
    <div className="lp-container-main">
      <header className="lp-navbar-fixed">
        <div className="container navbar-content">
          
          {/* LOGO FIXA COMO SOLICITADO */}
          <div className="logo-area clickable-profile" onClick={() => setIsAboutModalOpen(true)}>
            <img 
              src={FOTO_PERFIL_MARCOS} 
              alt="Marcos" 
              className="logo-img-circular" 
              onError={(e) => { e.target.src = "https://via.placeholder.com/35/00f2ea/000000?text=M" }}
            />
            <span className="logo-text">Marcos<span className="primary-text">SoftwareEngineering</span>_</span>
          </div>

          <div className="nav-actions">
            {modo === 'cliente' ? (
              <>
                <button className="btn-nav-outline pulse-btn hide-mobile" onClick={scrollToBooking}>Contratar</button>
                <div className="cart-wrapper" onClick={() => setIsCartOpen(true)}>
                  <ShoppingCart size={24} color="#fff" />
                  {carrinho.length > 0 && <span className="cart-badge-count">{carrinho.length}</span>}
                </div>
              </>
            ) : (
              <span className="admin-badge">ADMIN MODE</span>
            )}
          </div>
        </div>
      </header>

      {/* MODAL SOBRE O ENGENHEIRO DE SOFTWARE */}
      {isAboutModalOpen && (
        <div className="portfolio-modal-overlay animate-fade" onClick={() => setIsAboutModalOpen(false)}>
          <button className="btn-close-modal" onClick={() => setIsAboutModalOpen(false)}><X size={32} /></button>
          
          <div className="about-modal-content interactive-card hover-float" onClick={e => e.stopPropagation()}>
            <div className="about-modal-header">
                <img 
                  src={FOTO_PERFIL_MARCOS} 
                  alt="Marcos" 
                  className="about-modal-photo" 
                  onError={(e) => { e.target.src = "https://via.placeholder.com/80/00f2ea/000000?text=M" }}
                />
                <div className="about-modal-name-area">
                    <h2>Marcos software engineer</h2>
                    <p className="about-modal-username primary-text">@MarcosSoftwareEngineering · he/him</p>
                    <p className="about-modal-bio">Engenharia de Software @ Faculdade Metropolitana de SP</p>
                </div>
            </div>

            <div className="about-modal-stats">
                <div className="stat-item"><Users size={16}/> <strong>9</strong> followers</div>
                <div className="stat-item"><Users size={16}/> <strong>21</strong> following</div>
            </div>

            <div className="about-modal-details">
                <div className="detail-item">
                    <GraduationCap className="primary-text" size={20}/>
                    <p><strong>Engenharia de Software</strong><br/>
                    Faculdade Metropolitana de São Paulo – Em andamento<br/>
                    <span className="text-muted">Foco em engenharia de requisitos, qualidade de software e metodologias ágeis</span></p>
                </div>
                
                <div className="detail-item">
                    <MapPin className="primary-text" size={20}/>
                    <p>Lauro de Freitas, BA | Remote</p>
                </div>
            </div>

            <div className="about-modal-actions">
                <a href="mailto:contato@marvinsitbilders.com" className="btn-nav-outline w-100 flex-center gap-10">
                    <Mail size={18}/> contato@marvinsitbilders.com
                </a>
                <a href="https://www.marvinsitbilders.com" target="_blank" rel="noreferrer" className="btn-cta w-100 flex-center gap-10" style={{marginTop: '10px'}}>
                    <Globe size={18}/> Visitar marvinsitbilders.com
                </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE PORTFÓLIO */}
      {projetoSelecionado && (
        <div className="portfolio-modal-overlay animate-fade" onClick={() => setProjetoSelecionado(null)}>
          <button className="btn-close-modal" onClick={() => setProjetoSelecionado(null)}><X size={32} /></button>
          
          <div className="portfolio-modal-content" onClick={e => e.stopPropagation()}>
            <div className="portfolio-mockup-wrapper">
              <div className="mockup-frame">
                <div className="mockup-notch"></div>
                <div className="mockup-screen">
                  <div className="scroll-hint"><MousePointerClick size={16}/> Role para ver</div>
                  <img src={projetoSelecionado.mockupImg || "https://via.placeholder.com/600x1200/111/333?text=Sem+Imagem"} alt={projetoSelecionado.titulo} className="mockup-img" />
                </div>
              </div>
            </div>

            <div className="portfolio-info-wrapper">
              <span className="section-tag primary-text">Case de Sucesso</span>
              <h2>{projetoSelecionado.titulo}</h2>
              <div className="project-tags-modal">
                {projetoSelecionado.tags.map((tag, idx) => (
                  <span key={idx} className="project-tag-modal">{tag}</span>
                ))}
              </div>
              <p className="project-modal-desc">{projetoSelecionado.desc}</p>
              
              <div className="modal-actions">
                <a href={projetoSelecionado.link} target="_blank" rel="noreferrer" className="btn-cta w-100 flex-center gap-10">
                  Acessar Projeto <ExternalLink size={18}/>
                </a>
                <button className="btn-nav-outline" style={{padding: '16px', marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center', gap: '10px'}} onClick={() => { setProjetoSelecionado(null); scrollToBooking(); }}>
                  Quero um igual <Rocket size={16}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ÁREA ADMINISTRATIVA */}
      {modo === 'admin' ? (
        <div className="admin-dashboard container animate-fade">
          <div className="admin-header-panel">
            <h2>Painel de Controle</h2>
            <p>Gerencie sua disponibilidade e seu portfólio de projetos.</p>
            <button onClick={() => setModo('cliente')} className="btn-nav-outline" style={{marginTop: '15px'}}>Voltar para a Visão do Cliente</button>
            
            <div className="admin-tabs-nav" style={{display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px', borderBottom: '1px solid #333', paddingBottom: '10px'}}>
               <button className={`admin-tab-btn ${adminTab === 'agenda' ? 'active' : ''}`} onClick={() => setAdminTab('agenda')}><CalendarIcon size={16}/> Agenda</button>
               <button className={`admin-tab-btn ${adminTab === 'portfolio' ? 'active' : ''}`} onClick={() => setAdminTab('portfolio')}><Code2 size={16}/> Portfólio (Projetos)</button>
            </div>
          </div>

          {/* ABA AGENDA */}
          {adminTab === 'agenda' && (
            <div className="booking-glass-layout admin-layout animate-fade">
              <div className="selection-column">
                <h3>Calendário</h3>
                <div className="date-scroller">
                  {agenda.map(dia => (
                    <button key={dia.data} className={`date-pill ${diaAdmin?.data === dia.data ? 'active' : ''}`} onClick={() => setDiaAdmin(dia)}>
                      <span className="pill-weekday">{getDiaSemana(dia.data)}</span>
                      <span className="pill-day">{getDiaMes(dia.data)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {diaAdmin && (
                <div className="admin-slots-column">
                  <div className="slots-header">
                    <h3>{formatarDataLegivel(diaAdmin.data)}</h3>
                    <div className="admin-bulk-actions">
                      <button className="btn-small-action block" onClick={() => toggleDiaInteiro(diaAdmin.data, true)}><Lock size={14}/></button>
                      <button className="btn-small-action unblock" onClick={() => toggleDiaInteiro(diaAdmin.data, false)}><Unlock size={14}/></button>
                    </div>
                  </div>
                  <div className="time-grid">
                    {diaAdmin.slots.map((slot, index) => (
                      <button key={index} className={`time-chip admin-chip ${slot.disponivel ? 'available' : 'blocked'}`} onClick={() => toggleDisponibilidadeSlot(diaAdmin.data, slot.hora)}>
                        {slot.hora}
                        {slot.disponivel ? <CheckCircle size={14}/> : <X size={14}/>}
                      </button>
                    ))}
                  </div>
                  <div className="admin-legend">
                    <span className="legend-item"><span className="dot green"></span> Livre</span>
                    <span className="legend-item"><span className="dot red"></span> Ocupado</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ABA PORTFÓLIO */}
          {adminTab === 'portfolio' && (
            <div className="admin-portfolio-manager animate-fade">
               <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '20px'}}>
                  <h3 style={{color: '#fff'}}>Seus Projetos</h3>
                  <button className="btn-nav-outline" onClick={adicionarProjeto} style={{gap: '5px'}}><Plus size={16}/> Novo Projeto</button>
               </div>

               <div className="admin-projects-list">
                  {projetos.map((proj) => (
                    <div key={proj.id} className="admin-project-edit-card">
                       <div className="admin-project-header">
                          <h4>Editar Projeto</h4>
                          <button className="btn-remove-project" onClick={() => removerProjetoAdmin(proj.id)}><Trash2 size={16}/></button>
                       </div>
                       
                       <div className="admin-project-body">
                          <div className="admin-project-text-fields">
                             <div className="input-group">
                               <label>Título do Projeto</label>
                               <input type="text" className="lp-input-dark" value={proj.titulo} onChange={(e) => handleProjetoChange(proj.id, 'titulo', e.target.value)} />
                             </div>
                             <div className="input-group">
                               <label>Descrição</label>
                               <textarea className="lp-input-dark" rows="3" value={proj.desc} onChange={(e) => handleProjetoChange(proj.id, 'desc', e.target.value)}></textarea>
                             </div>
                             <div className="input-group">
                               <label>Tags (Separadas por vírgula)</label>
                               <input type="text" className="lp-input-dark" value={proj.tags.join(', ')} onChange={(e) => handleProjetoChange(proj.id, 'tags', e.target.value.split(',').map(t => t.trim()))} />
                             </div>
                             <div className="input-group">
                               <label>Link Externo (URL)</label>
                               <input type="text" className="lp-input-dark" value={proj.link} onChange={(e) => handleProjetoChange(proj.id, 'link', e.target.value)} />
                             </div>
                          </div>

                          <div className="admin-project-image-fields">
                             <div className="input-group">
                               <label>Imagem Capa do Card (Arraste ou Clique)</label>
                               <div className="drag-drop-zone">
                                 {proj.img ? <img src={proj.img} alt="Capa" /> : <div className="drag-placeholder"><UploadCloud size={24}/><span>Capa</span></div>}
                                 <input type="file" accept="image/*" onChange={(e) => handleImageDrop(e, proj.id, 'img')} />
                               </div>
                             </div>
                             
                             <div className="input-group">
                               <label>Imagem Modal Mockup (Arraste ou Clique)</label>
                               <div className="drag-drop-zone mockup-zone">
                                 {proj.mockupImg ? <img src={proj.mockupImg} alt="Mockup" /> : <div className="drag-placeholder"><UploadCloud size={24}/><span>Mockup</span></div>}
                                 <input type="file" accept="image/*" onChange={(e) => handleImageDrop(e, proj.id, 'mockupImg')} />
                               </div>
                             </div>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* VISÃO DO CLIENTE */}
          {isCartOpen && (
            <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
              <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
                <div className="cart-header">
                  <h3>
                    {checkoutMode ? 
                      <span onClick={() => setCheckoutMode(false)} style={{cursor:'pointer', display:'flex', alignItems:'center', gap:'5px'}}>
                        <ChevronLeft size={20}/> Voltar
                      </span> : `Reserva`
                    }
                  </h3>
                  <button className="btn-close-cart" onClick={() => setIsCartOpen(false)}><X size={24}/></button>
                </div>
                
                <div className="cart-body">
                  {carrinho.length === 0 ? (
                    <div className="empty-cart">
                      <Code2 size={48} style={{opacity: 0.3}}/>
                      <p>Nenhum serviço selecionado.</p>
                      <button className="btn-text-primary" onClick={() => { setIsCartOpen(false); scrollToBooking(); }}>Iniciar Projeto</button>
                    </div>
                  ) : !checkoutMode ? (
                    carrinho.map(item => (
                      <div key={item.id} className="cart-item animate-fade">
                        <div className="cart-item-header">
                          <strong>{item.tipo}</strong>
                          <button onClick={() => removerDoCarrinho(item.id)} className="btn-remove"><Trash2 size={16}/></button>
                        </div>
                        <div className="cart-item-details">
                          <p><CalendarIcon size={14}/> {formatarDataLegivel(item.data)}</p>
                          <p><Clock size={14}/> {item.hora}</p>
                          <p><Monitor size={14}/> {item.paciente}</p>
                        </div>
                        <div className="cart-item-price">
                          {item.preco === 0 ? "VALOR: GRÁTIS" : `R$ ${item.preco.toFixed(2).replace('.', ',')}`}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="checkout-container animate-fade">
                      <div className="payment-tabs">
                        <button className={`payment-tab ${paymentMethod === 'credit' ? 'active' : ''}`} onClick={() => setPaymentMethod('credit')}><CreditCard size={18}/> Cartão</button>
                        <button className={`payment-tab ${paymentMethod === 'pix' ? 'active' : ''}`} onClick={() => setPaymentMethod('pix')}><QrCode size={18}/> Pix</button>
                      </div>
                      {paymentMethod === 'credit' ? (
                        <div className="credit-card-form">
                          <div className="input-group"><label>Número</label><input type="text" placeholder="0000 0000 0000 0000" className="lp-input-dark" /></div>
                          <div className="input-group"><label>Nome</label><input type="text" placeholder="Nome impresso" className="lp-input-dark" /></div>
                          <div className="row-inputs">
                            <div className="input-group"><label>Validade</label><input type="text" placeholder="MM/AA" className="lp-input-dark" /></div>
                            <div className="input-group"><label>CVV</label><input type="text" placeholder="123" className="lp-input-dark" /></div>
                          </div>
                        </div>
                      ) : (
                        <div className="pix-container">
                          <div className="qr-placeholder"><QrCode size={100} color="var(--primary)"/></div>
                          <p>Escaneie para garantir a reserva.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {carrinho.length > 0 && (
                  <div className="cart-footer">
                    <div className="cart-total">
                      <span>Investimento</span>
                      <strong>{totalCarrinho === 0 ? "GRÁTIS" : `R$ ${totalCarrinho.toFixed(2).replace('.', ',')}`}</strong>
                    </div>
                    
                    {!checkoutMode ? (
                      <button className="btn-cta w-100 flex-center gap-10" onClick={() => { if (precoAtual === 0) processarPagamento(); else setCheckoutMode(true); }}>
                        {precoAtual === 0 ? 'CONFIRMAR RESERVA GRÁTIS' : 'CHECKOUT SEGURO'}
                      </button>
                    ) : (
                      <button className="btn-cta w-100 flex-center gap-10" onClick={processarPagamento} disabled={isProcessing}>
                        {isProcessing ? <><Loader2 className="spin" size={20}/> PROCESSANDO...</> : 'CONFIRMAR PAGAMENTO'}
                      </button>
                    )}
                    <p className="secure-checkout"><ShieldCheck size={12}/> Pagamento Criptografado</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* HERO COM TYPEWRITER EM DUAS LINHAS */}
          <section className="hero-section-pro">
            <div className="container hero-grid">
              <div className="hero-text-content">
                <div className="badge-lp"><Cpu size={14} /> Software Engineer</div>
                
                <h1 className="main-headline dynamic-typing" style={{minHeight: '130px', position: 'relative'}}>
                  <span style={{color: 'var(--text-main)'}}>
                    {typedText.split('\n').map((line, i, arr) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </span>
                  
                  {/* Cursor que pisca junto com a digitação e fica no final */}
                  <span className="cursor-blink">|</span>

                  {/* Botão de repetir aparece só quando termina de digitar */}
                  {typedText.length === fullText.length && (
                    <button onClick={resetTyping} className="btn-replay-typing" title="Repetir animação com áudio">
                      <RotateCcw size={20} />
                    </button>
                  )}
                </h1>
                
                <p className="main-subtitle">
                  Transforme ideias em código de alta performance com desenvolvimento especializado de Landing Pages, PWAs e Sistemas Web.
                </p>
                
                <div className="hero-buttons">
                  <button className="btn-cta flex-center gap-10" onClick={scrollToBooking}>{textoBotaoCta} <ArrowRight size={20}/></button>
                  <div className="hero-stats">
                    <span><Rocket size={16} className="primary-text"/> SEO Otimizado</span>
                    <span><Smartphone size={16} className="primary-text"/> Mobile First</span>
                  </div>
                </div>
              </div>
              <div className="hero-image-container hover-float">
                <div className="photo-frame">
                  <img 
                    src={FOTO_PERFIL_MARCOS} 
                    alt="Desenvolvedor" 
                    className="dr-photo" 
                    onError={(e) => { e.target.src = "https://via.placeholder.com/800x1200/111/00f2ea?text=Marcos+Software+Engineering" }}
                  />
                  <div className="photo-accent"></div>
                  <div className="tech-badge react"><Code2 size={16}/> React</div>
                  <div className="tech-badge node"><Cpu size={16}/> Node</div>
                </div>
              </div>
            </div>
          </section>

          {/* AUTHORITY */}
          <section className="authority-strip">
            <div className="container authority-grid">
              <div className="auth-item hover-lift"><Layout size={24} className="primary-text" /><div><strong>Design UI/UX</strong><span>Moderno & Limpo</span></div></div>
              <div className="auth-item hover-lift"><Zap size={24} className="primary-text" /><div><strong>Performance</strong><span>Carregamento Rápido</span></div></div>
              <div className="auth-item hover-lift"><Globe size={24} className="primary-text" /><div><strong>100+ Projetos</strong><span>Entregues no prazo</span></div></div>
            </div>
          </section>

          {/* SESSÃO DE PORTFÓLIO */}
          <section className="portfolio-section-gallery">
            <div className="container">
              <div className="section-header-centered">
                <span className="section-tag primary-text">Portfólio</span>
                <h2 className="section-title">Últimos Projetos Entregues</h2>
                <p style={{color: 'var(--text-muted)'}}>Clique em um projeto para interagir.</p>
              </div>
              
              <div className="projects-scroll-container">
                {projetos.map(projeto => (
                  <div 
                    key={projeto.id} 
                    className="project-card-pro interactive-card"
                    onClick={() => setProjetoSelecionado(projeto)}
                  >
                    <div className="project-img-wrapper">
                      <img src={projeto.img || "https://via.placeholder.com/800x400/111/333?text=Sem+Imagem"} alt={projeto.titulo} className="project-img" />
                      <div className="portfolio-hover-overlay">
                        <Smartphone size={40} className="primary-text pulse-icon" />
                        <span>Ver no Mobile</span>
                      </div>
                    </div>
                    <div className="project-content">
                      <div className="project-tags">
                        {projeto.tags.map((tag, index) => (
                          <span key={index} className="project-tag">{tag}</span>
                        ))}
                      </div>
                      <h3 className="project-title">{projeto.titulo}</h3>
                      <p className="project-desc">{projeto.desc}</p>
                      <span className="project-link">
                        Ver Detalhes <ExternalLink size={16} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="showcase-section-pro">
            <div className="container showcase-grid">
              <div className="showcase-content">
                <span className="section-tag primary-text">O Processo</span>
                <h2 className="showcase-title">Não é apenas código. É <span className="primary-text">estratégia</span>.</h2>
                <p className="showcase-description">Sites lentos perdem vendas. Eu crio experiências digitais focadas na conversão do usuário e na estabilidade do sistema.</p>
                <ul className="benefits-list">
                  <li className="hover-lift"><CheckCircle size={20} className="primary-text" /> Código limpo e escalável</li>
                  <li className="hover-lift"><CheckCircle size={20} className="primary-text" /> Integração com APIs e Pagamentos</li>
                  <li className="hover-lift"><CheckCircle size={20} className="primary-text" /> Painel administrativo intuitivo</li>
                </ul>
              </div>
              <div className="showcase-media-wrapper hover-float" onClick={() => setIsVideoOpen(true)}>
                <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80" alt="Coding Setup" className="showcase-image"/>
                <div className="play-overlay"><PlayCircle size={72} className="primary-text" strokeWidth={1.5} /></div>
              </div>
            </div>
          </section>

          {isVideoOpen && (
            <div className="video-modal-overlay" onClick={() => setIsVideoOpen(false)}>
              <button className="btn-close-video" onClick={() => setIsVideoOpen(false)}><X size={40} color="#000" /></button>
              <div className="video-modal-content" onClick={e => e.stopPropagation()}>
                <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls autoPlay className="real-video-player" />
              </div>
            </div>
          )}

          {/* BENEFITS */}
          <section className="benefits-section-pro">
            <div className="container">
              <div className="section-header-centered"><h2 className="section-title">Serviços Especializados</h2></div>
              <div className="benefits-grid-pro" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '40px' }}>
                <div className="benefit-card-pro interactive-card"><div className="benefit-icon"><Layout size={32}/></div><h4>Landing Pages</h4><p>Páginas focadas em venda e captura de leads.</p></div>
                <div className="benefit-card-pro interactive-card"><div className="benefit-icon"><Search size={32}/></div><h4>PWAs & Apps</h4><p>Aplicações que funcionam como app nativo.</p></div>
                <div className="benefit-card-pro interactive-card"><div className="benefit-icon"><Layers size={32}/></div><h4>Sistemas Web</h4><p>Dashboards, áreas de membros e SaaS.</p></div>
                <div className="benefit-card-pro interactive-card"><div className="benefit-icon"><Smartphone size={32}/></div><h4>Responsividade</h4><p>Funciona perfeito em iPhone, Android e Desktop.</p></div>
              </div>
            </div>
          </section>

          {/* DEPOIMENTOS */}
          <section className="testimonials-section">
            <div className="container">
              <div className="section-header-centered">
                <span className="section-tag primary-text">Feedback</span>
                <h2 className="section-title">O que dizem os clientes</h2>
              </div>
              <div className="carousel-container">
                <button className="nav-btn left" onClick={anteriorSlide}><ChevronLeft size={24}/></button>
                <div className="carousel-viewport">
                  <div className="carousel-track" style={{ transform: `translateX(-${indiceAtual * 100}%)` }}>
                    {DEPOIMENTOS.map((depoimento) => (
                      <div key={depoimento.id} className="carousel-slide">
                        <div className="testimonial-card-carousel hover-float">
                          <div className="stars-row">{[...Array(5)].map((_, i) => (<Zap key={i} size={18} fill="var(--primary)" color="var(--primary)" />))}</div>
                          <p className="testimonial-text">"{depoimento.texto}"</p>
                          <div className="patient-info-card">
                            <img src={depoimento.foto} alt={depoimento.nome} className="patient-photo" />
                            <div className="patient-details"><strong>{depoimento.nome}</strong><span>{depoimento.tempo}</span></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="nav-btn right" onClick={proximoSlide}><ChevronRight size={24}/></button>
              </div>
            </div>
          </section>

          {/* OFFER */}
          <section className="offer-section-special">
            <div className="container">
              <div className={`offer-card-frame ${isPromoAtiva ? 'promo-active' : ''}`}>
                <div className="offer-badge-top">
                  {isPromoAtiva ? <Zap size={16}/> : <AlertCircle size={16}/>} 
                  {isPromoAtiva ? "OFERTA DE LANÇAMENTO" : "AGENDA DISPONÍVEL"}
                </div>
                <div className="offer-grid-internal">
                  <div className="offer-text-side">
                    <h2 className="offer-heading">Consultoria Técnica Inicial</h2>
                    <p className="offer-sub">Vamos analisar sua ideia, definir a stack tecnológica e montar um cronograma de desenvolvimento.</p>
                    <div className="bonuses-list">
                      <div className="bonus-item interactive-card">
                        <div className="bonus-icon"><Search size={24} /></div>
                        <div><strong className="primary-text">BÔNUS 1</strong><p style={{marginTop: '5px'}}>Análise Gratuita de SEO do seu site atual.</p></div>
                      </div>
                      <div className="bonus-item interactive-card">
                        <div className="bonus-icon"><Rocket size={24} /></div>
                        <div><strong className="primary-text">BÔNUS 2</strong><p style={{marginTop: '5px'}}>Planejamento de Arquitetura de Software.</p></div>
                      </div>
                    </div>
                  </div>
                  <div className="offer-cta-side">
                    <div className="price-tag-big">
                      <span className="price-label">Investimento</span>
                      <div className="price-value">
                        {isPromoAtiva ? <><span className="old-price">R$ 200</span> GRÁTIS</> : "R$ 200"}
                      </div>
                      {isPromoAtiva && <span className="price-bonus">Válido por tempo limitado!</span>}
                    </div>
                    
                    <button className="btn-cta flex-center gap-10" onClick={scrollToBooking} style={{marginTop: '15px'}}>
                      AGENDAR BRIEFING <ArrowRight size={20}/>
                    </button>
                    
                    {isPromoAtiva ? (
                      <div className="countdown-timer animate-fade">
                        <p className="countdown-text" style={{width: '100%', marginBottom: '10px'}}>Termina em:</p>
                        <div className="time-box"><span>{timeLeft.dias}</span>d</div><span className="colon">:</span>
                        <div className="time-box"><span>{timeLeft.horas}</span>h</div><span className="colon">:</span>
                        <div className="time-box"><span>{timeLeft.min}</span>m</div><span className="colon">:</span>
                        <div className="time-box"><span>{timeLeft.seg}</span>s</div>
                      </div>
                    ) : (
                      <p className="scarcity-text" style={{marginTop: '15px'}}>* Disponibilidade limitada.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AGENDAMENTO */}
          <section id="agendamento" className="booking-section-pro">
            <div className="container">
              <div className="section-header-centered">
                <h2 className="section-title">Inicie seu Projeto</h2>
                <p style={{color: 'var(--text-muted)'}}>Escolha um horário para alinharmos as expectativas.</p>
              </div>
              <div className="booking-glass-layout hover-float">
                <div className="booking-main-grid">
                  <div className="selection-column">
                    <div className="step-card">
                      <h3><CalendarIcon size={20} className="primary-text" style={{marginRight: '8px'}}/> Data</h3>
                      <div className="date-scroller">
                        {agenda.map(dia => (
                          <button key={dia.data} className={`date-pill ${diaSelecionado?.data === dia.data ? 'active' : ''}`}
                            onClick={() => { setDiaSelecionado(dia); setHoraSelecionada(null); }}>
                            <span className="pill-weekday">{getDiaSemana(dia.data)}</span>
                            <span className="pill-day">{getDiaMes(dia.data)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={`step-card ${!diaSelecionado ? 'disabled' : ''}`}>
                      <h3><Clock size={20} className="primary-text" style={{marginRight: '8px'}}/> Horários</h3>
                      <div className="time-grid">
                        {diaSelecionado?.slots.map((slot, idx) => (
                          <button 
                            key={idx} 
                            disabled={!slot.disponivel}
                            className={`time-chip ${horaSelecionada?.hora === slot.hora ? 'active' : ''} ${!slot.disponivel ? 'blocked' : ''}`}
                            onClick={() => setHoraSelecionada(slot)}
                          >
                            {slot.hora}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`form-column ${!horaSelecionada ? 'locked' : ''}`}>
                    <div className="summary-card-pro">
                      <h3>Dados de Contato</h3>
                      <form onSubmit={adicionarSessaoAoCarrinho}>
                        <input type="text" required placeholder="Nome / Empresa" className="lp-input" 
                               value={nome} onChange={(e) => setNome(e.target.value)} />
                        <input type="tel" required placeholder="WhatsApp (DDD+Número)" className="lp-input" 
                               value={telefone} onChange={handlePhone} />
                        <div className="price-box interactive-card">
                          <span>Sessão de Briefing:</span>
                          <strong className="primary-text">{precoAtual === 0 ? "GRÁTIS" : "R$ 200,00"}</strong>
                        </div>
                        <button type="submit" className="btn-confirm-final flex-center gap-10" disabled={!horaSelecionada}>RESERVAR HORÁRIO</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <footer style={{textAlign: 'center', padding: '60px 20px', background: '#050505', borderTop: '1px solid #222'}}>
            <p style={{color: '#666', fontSize: '14px'}}>© 2026 Marcos Vinicius | MarVin Site Builders.</p>
            <p style={{color: '#444', fontSize: '12px', marginTop: '5px'}}>Estudante de Engenharia de Software</p>
            <button onClick={() => setModo('admin')} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#333', marginTop: '20px'}}><Settings size={14}/></button>
          </footer>
        </>
      )}

      <style dangerouslySetInnerHTML={{ __html: LP_PRO_STYLES }} />
    </div>
  );
}

// =========================================================
//  ESTILOS OTIMIZADOS E COMPLETOS
// =========================================================

const LP_PRO_STYLES = `
  :root { 
    --primary: #00f2ea; 
    --primary-hover: #00f2ea;
    --primary-alt: #00b3ac; 
    --primary-glow: #aafffd; 
    --bg-dark: #09090b; 
    --bg-card: #121214;
    --text-main: #e4e4e7; 
    --text-muted: #a1a1aa; 
    --border-color: rgba(255,255,255,0.1);
    --red-blocked: #ef4444;
    --green-avail: #10b981;
  }
  
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
  html { scroll-behavior: smooth; }
  
  body { 
    font-family: 'Inter', 'Segoe UI', sans-serif; 
    background: var(--bg-dark); 
    color: var(--text-main); 
    overflow-x: hidden; 
    width: 100%;
  }
  
  .lp-container-main { width: 100%; overflow-x: hidden; padding-top: 70px; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; width: 100%; }
  .centered { display: flex; align-items: center; justify-content: center; min-height: 80vh; padding: 20px; }
  .flex-center { display: flex; align-items: center; justify-content: center; }
  .gap-10 { gap: 10px; }
  .w-100 { width: 100%; }
  .text-muted { color: var(--text-muted); }

  .primary-text { color: var(--primary); }
  .section-tag { display: inline-block; margin-bottom: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 12px; }
  .section-title { font-size: clamp(32px, 4vw, 42px); color: #fff; margin-bottom: 20px; font-weight: 800; letter-spacing: -1px; }
  .section-header-centered { text-align: center; margin-bottom: 50px; }

  /* HEADER E LOGO AREA */
  .lp-navbar-fixed { 
    position: fixed; top: 0; left: 0; width: 100%; height: 70px; 
    background: rgba(9, 9, 11, 0.9); backdrop-filter: blur(12px); 
    border-bottom: 1px solid var(--border-color); z-index: 1000; 
    display: flex; align-items: center;
  }
  .navbar-content { display: flex; justify-content: space-between; align-items: center; }
  .logo-area { display: flex; align-items: center; gap: 12px; }
  .clickable-profile { cursor: pointer; transition: 0.3s; }
  .clickable-profile:hover { opacity: 0.8; transform: translateY(-1px); }
  .logo-img-circular { width: 35px; height: 35px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary); box-shadow: 0 0 10px rgba(0,242,234,0.3); }
  .logo-text { font-weight: 800; font-size: 16px; color: #fff; letter-spacing: -0.5px; font-family: monospace; }
  .nav-actions { display: flex; align-items: center; gap: 15px; }
  
  /* BOTÃO CONTRATAR COM ANIMAÇÃO PULSANTE CONSTANTE */
  .btn-nav-outline { 
    background: transparent; border: 1px solid var(--primary); color: var(--primary); 
    padding: 8px 20px; border-radius: 4px; font-weight: 600; cursor: pointer; transition: 0.3s; 
    font-size: 13px; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; 
    display: inline-flex; align-items: center; justify-content: center;
  }
  .btn-nav-outline:hover { background: var(--primary); color: #000; box-shadow: 0 0 15px rgba(0, 242, 234, 0.4); }
  
  @keyframes button-pulse {
    0% { box-shadow: 0 0 0 0 rgba(0, 242, 234, 0.6); }
    70% { box-shadow: 0 0 0 12px rgba(0, 242, 234, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 242, 234, 0); }
  }
  .pulse-btn {
    animation: button-pulse 2s infinite;
  }

  .admin-badge { background: #ef4444; color: #fff; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; }
  
  .cart-wrapper { position: relative; padding: 5px; cursor: pointer; }
  .cart-badge-count { position: absolute; top: -2px; right: -2px; background: var(--primary); color: #000; font-size: 10px; font-weight: 800; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

  /* ESTILOS DO MODAL SOBRE O ENGENHEIRO (PERFIL) */
  .about-modal-content {
      background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px;
      width: 100%; max-width: 550px; padding: 40px; position: relative; overflow: hidden;
      display: flex; flex-direction: column; gap: 25px;
  }
  .about-modal-header { display: flex; align-items: center; gap: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 20px;}
  .about-modal-photo { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid var(--primary); box-shadow: 0 0 20px rgba(0,242,234,0.2); }
  .about-modal-name-area h2 { font-size: 24px; color: #fff; font-weight: 800; letter-spacing: -1px; margin-bottom: 5px; }
  .about-modal-username { font-family: monospace; font-size: 14px; margin-bottom: 8px; }
  .about-modal-bio { color: var(--text-muted); font-size: 14px; line-height: 1.4; }
  
  .about-modal-stats { display: flex; gap: 20px; font-size: 14px; color: var(--text-muted); border-bottom: 1px solid var(--border-color); padding-bottom: 20px; }
  .stat-item { display: flex; align-items: center; gap: 6px; }
  .stat-item strong { color: #fff; font-weight: 700; }

  .about-modal-details { display: flex; flex-direction: column; gap: 15px; }
  .detail-item { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: var(--text-main); line-height: 1.6; }
  .detail-item p strong { color: #fff; }
  .about-modal-actions { display: flex; flex-direction: column; gap: 12px; margin-top: 10px; }

  /* SIDEBAR DE CHECKOUT */
  .cart-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.8); z-index: 2000; display: flex; justify-content: flex-end; }
  .cart-sidebar { width: 100%; max-width: 400px; background: #0e0e10; height: 100%; display: flex; flex-direction: column; animation: slideIn 0.3s ease; border-left: 1px solid var(--border-color); }
  .cart-header { padding: 15px 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; }
  .btn-close-cart { background: transparent; border: none; color: #fff; cursor: pointer; padding: 5px; }
  .cart-body { flex: 1; padding: 20px; overflow-y: auto; }
  .empty-cart { text-align: center; color: var(--text-muted); margin-top: 50px; display: flex; flex-direction: column; align-items: center; gap: 15px; }
  .btn-text-primary { background: none; border: none; color: var(--primary); text-decoration: underline; cursor: pointer; font-size: 14px; }
  
  .cart-item { background: #1a1a1d; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 3px solid var(--primary); }
  .cart-item-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
  .btn-remove { background: none; border: none; color: #ef4444; cursor: pointer; }
  .cart-item-price { margin-top: 15px; color: var(--primary); font-weight: bold; }
  .cart-footer { padding: 20px; border-top: 1px solid var(--border-color); }
  .cart-total { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 18px; }

  .payment-tabs { display: flex; gap: 10px; margin-bottom: 20px; }
  .payment-tab { flex: 1; padding: 10px; background: #222; border: 1px solid #333; color: #fff; border-radius: 6px; cursor: pointer; display: flex; justify-content: center; gap: 5px; }
  .payment-tab.active { background: var(--primary); color: #000; border-color: var(--primary); font-weight: bold; }
  
  .input-group { margin-bottom: 15px; display: flex; flex-direction: column; gap: 5px; }
  .input-group label { font-size: 12px; color: var(--text-muted); }
  .row-inputs { display: flex; gap: 10px; }
  .qr-placeholder { background: #111; padding: 30px; border-radius: 12px; margin: 0 auto 20px; width: fit-content; border: 1px dashed var(--primary); }
  .btn-copy-pix { background: #222; color: #fff; border: 1px solid #444; padding: 10px; border-radius: 6px; width: 100%; cursor: pointer; }

  /* FORMS */
  .lp-input, .lp-input-dark { 
    width: 100%; padding: 12px; background: var(--bg-dark); 
    border: 1px solid var(--border-color); border-radius: 6px; 
    color: #fff; outline: none; font-size: 16px; 
    margin-bottom: 10px; font-family: monospace; transition: 0.3s;
  }
  .lp-input:focus, .lp-input-dark:focus { border-color: var(--primary); box-shadow: 0 0 10px rgba(0,242,234,0.1); }
  
  /* BOTÕES E VIBRAÇÃO MANTIDA */
  @keyframes gradient-flow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  @keyframes subtle-vibrate { 0%, 100% { transform: translateY(0) scale(1); } 2% { transform: translateY(-1px) scale(1.01); } 4% { transform: translateY(1px) scale(0.99); } 6% { transform: translateY(-1px) scale(1.01); } 8% { transform: translateY(0) scale(1); } }

  .btn-cta, .btn-confirm-final { 
    width: 100%; max-width: 300px; padding: 16px; 
    background: linear-gradient(90deg, var(--primary) 0%, var(--primary-glow) 50%, var(--primary) 100%);
    background-size: 200% auto; color: #000; border: none; border-radius: 6px; 
    font-weight: 800; text-transform: uppercase; cursor: pointer; 
    display: inline-flex; align-items: center; justify-content: center; gap: 10px; 
    transition: box-shadow 0.3s ease, transform 0.3s ease; font-size: 14px; letter-spacing: 0.5px;
    box-shadow: 0 0 15px rgba(0, 242, 234, 0.3);
    animation: gradient-flow 10s linear infinite, subtle-vibrate 3s ease-in-out infinite; text-decoration: none;
  }
  .btn-cta:hover, .btn-confirm-final:hover { animation: gradient-flow 3s linear infinite; transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 40px rgba(0, 242, 234, 0.6); }
  .btn-confirm-final:disabled { background: #333; color: #777; cursor: not-allowed; animation: none; box-shadow: none; transform: none; }

  /* CARDS INTERATIVOS E HOVER MANTIDOS */
  .interactive-card { transition: all 0.3s ease; cursor: pointer; }
  .interactive-card:hover { transform: translateY(-5px); border-color: var(--primary); box-shadow: 0 10px 30px rgba(0, 242, 234, 0.05); }
  .hover-float { animation: float 6s ease-in-out infinite; }
  @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
  .hover-lift { transition: transform 0.3s ease; cursor: default; }
  .hover-lift:hover { transform: translateY(-4px); }

  /* HERO SECTION MANTIDA */
  .hero-section-pro { padding: 120px 0 80px; background: radial-gradient(circle at top right, #1a202c 0%, var(--bg-dark) 40%); }
  .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; }
  .badge-lp { display: inline-flex; align-items: center; gap: 8px; background: rgba(0, 242, 234, 0.1); color: var(--primary); padding: 6px 12px; border-radius: 4px; font-weight: 600; margin-bottom: 20px; font-size: 12px; border: 1px solid rgba(0, 242, 234, 0.2); font-family: monospace; }
  .dr-name-header { font-size: 12px; text-transform: uppercase; letter-spacing: 3px; color: var(--text-muted); margin-bottom: 10px; }
  
  .main-headline { font-size: clamp(36px, 5vw, 56px); font-weight: 800; line-height: 1.1; margin: 10px 0 25px; letter-spacing: -1px; }
  
  /* Botão de repetir áudio */
  .btn-replay-typing {
    background: transparent; border: none; color: var(--primary); cursor: pointer;
    margin-left: 15px; opacity: 0.3; transition: 0.3s; vertical-align: middle;
  }
  .btn-replay-typing:hover { opacity: 1; transform: rotate(-90deg); }

  .main-subtitle { font-size: clamp(16px, 2vw, 18px); line-height: 1.6; color: var(--text-muted); margin-bottom: 35px; max-width: 500px; min-height: 58px; }
  .cursor-blink { animation: blink 1s step-end infinite; color: var(--primary); font-weight: bold; }
  @keyframes blink { 50% { opacity: 0; } }

  .dr-photo { width: 100%; border-radius: 20px; border: 1px solid var(--border-color); position: relative; z-index: 2; display: block; filter: grayscale(20%) contrast(1.1); transition: 0.3s; }
  .dr-photo:hover { filter: grayscale(0%); }
  .photo-frame { position: relative; max-width: 450px; margin: 0 auto; }
  .photo-accent { position: absolute; width: 100%; height: 100%; border: 2px solid var(--primary); border-radius: 20px; top: 15px; right: -15px; z-index: 1; opacity: 0.5; transition: 0.3s; }
  .photo-frame:hover .photo-accent { top: 20px; right: -20px; opacity: 0.8; }
  
  .tech-badge { position: absolute; background: #000; color: #fff; padding: 8px 16px; border-radius: 30px; border: 1px solid var(--border-color); display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; z-index: 3; box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
  .tech-badge.react { top: 40px; left: -20px; }
  .tech-badge.node { bottom: 40px; right: -20px; }
  .hero-buttons { display: flex; flex-direction: column; gap: 15px;}
  .hero-stats { display: flex; gap: 20px; margin-top: 5px; font-size: 13px; color: var(--text-muted); font-weight: 500; flex-wrap: wrap; }

  /* AUTHORITY strip mantida */
  .authority-strip { padding: 30px 0; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); background: rgba(255,255,255,0.01); }
  .authority-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 40px; }
  .auth-item { display: flex; align-items: center; gap: 12px; }
  .auth-item strong { display: block; color: #fff; font-size: 14px; }
  .auth-item span { color: var(--text-muted); font-size: 12px; }

  /* SHOWCASE MANTIDO */
  .showcase-section-pro { padding: 80px 0; }
  .showcase-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .showcase-description { color: var(--text-muted); line-height: 1.7; margin-bottom: 30px; font-size: 16px; }
  .benefits-list { list-style: none; display: flex; flex-direction: column; gap: 15px; }
  .benefits-list li { display: flex; align-items: center; gap: 12px; font-weight: 500; font-size: 15px; color: #e4e4e7; }
  
  .showcase-media-wrapper { position: relative; border-radius: 12px; overflow: hidden; cursor: pointer; aspect-ratio: 16/9; border: 1px solid var(--border-color); }
  .showcase-image { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; opacity: 0.8; }
  .showcase-media-wrapper:hover .showcase-image { opacity: 1; transform: scale(1.05); }
  .play-overlay { position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; transition: 0.3s; }
  .showcase-media-wrapper:hover .play-overlay { background: rgba(0,0,0,0.1); }

  /* VIDEO MODAL MANTIDO */
  .video-modal-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.95); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .video-modal-content { width: 100%; max-width: 900px; aspect-ratio: 16/9; background: #000; border-radius: 12px; overflow: hidden; box-shadow: 0 0 50px rgba(0, 242, 234, 0.2); }
  .real-video-player { width: 100%; height: 100%; }
  .btn-close-video { position: absolute; top: 20px; right: 20px; background: #fff; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10001; }

  /* =========================================================
     PORTFÓLIO GALLERY E ADMINISTRAÇÃO MANTIDO
  ========================================================= */
  .portfolio-section-gallery { padding: 100px 0; background: #0c0c0e; border-top: 1px solid var(--border-color); }
  
  .projects-scroll-container {
    display: flex; gap: 30px; overflow-x: auto; padding: 20px 0 40px;
    scroll-snap-type: x mandatory; scrollbar-width: thin; scrollbar-color: var(--primary) transparent;
    -webkit-overflow-scrolling: touch;
  }
  
  .project-card-pro {
    background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px;
    min-width: 350px; flex: 1; display: flex; flex-direction: column; overflow: hidden;
    scroll-snap-align: start; transition: all 0.3s ease;
  }
  
  .project-img-wrapper { width: 100%; height: 220px; overflow: hidden; border-bottom: 1px solid var(--border-color); position: relative; }
  .project-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
  .project-card-pro:hover .project-img { transform: scale(1.1); filter: blur(2px) brightness(0.5); }
  
  .portfolio-hover-overlay {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
    background: rgba(0, 242, 234, 0.1); opacity: 0; transition: opacity 0.3s ease;
  }
  .project-card-pro:hover .portfolio-hover-overlay { opacity: 1; }
  .pulse-icon { animation: subtle-vibrate 1s infinite; }

  .project-content { padding: 30px 25px; display: flex; flex-direction: column; flex: 1; }
  .project-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px; }
  .project-tag { background: rgba(0, 242, 234, 0.05); color: var(--primary); border: 1px solid rgba(0, 242, 234, 0.2); padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; font-family: monospace; text-transform: uppercase; }
  .project-title { font-size: 22px; color: #fff; margin-bottom: 12px; font-weight: 800; letter-spacing: -0.5px; }
  .project-desc { color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 25px; flex: 1; }
  .project-link { display: inline-flex; align-items: center; gap: 8px; color: var(--primary); font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; transition: 0.3s; cursor: pointer;}
  .project-link:hover { gap: 12px; }

  /* ESTILOS DO ADMIN DE PROJETOS */
  .admin-tabs-nav { display: flex; gap: 15px; margin-bottom: 20px;}
  .admin-tab-btn { background: transparent; border: none; color: var(--text-muted); font-size: 16px; font-weight: bold; cursor: pointer; padding: 10px; display: flex; align-items: center; gap: 8px; transition: 0.3s;}
  .admin-tab-btn.active { color: var(--primary); border-bottom: 2px solid var(--primary); }
  .admin-tab-btn:hover { color: #fff; }
  
  .admin-projects-list { display: flex; flex-direction: column; gap: 30px; }
  .admin-project-edit-card { background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 12px; padding: 30px;}
  .admin-project-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 15px;}
  .admin-project-header h4 { color: var(--primary); font-size: 18px;}
  .btn-remove-project { background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.2); padding: 8px; border-radius: 6px; cursor: pointer; transition: 0.3s;}
  .btn-remove-project:hover { background: #ef4444; color: #fff;}
  
  .admin-project-body { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px;}
  .admin-project-text-fields { display: flex; flex-direction: column; gap: 15px; }
  .admin-project-image-fields { display: flex; flex-direction: column; gap: 15px;}
  
  .drag-drop-zone { border: 2px dashed #444; border-radius: 8px; height: 150px; position: relative; overflow: hidden; background: #111; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s;}
  .drag-drop-zone:hover { border-color: var(--primary); background: rgba(0,242,234,0.05);}
  .drag-drop-zone input[type="file"] { position: absolute; width: 100%; height: 100%; opacity: 0; cursor: pointer;}
  .drag-drop-zone img { width: 100%; height: 100%; object-fit: cover;}
  .drag-placeholder { display: flex; flex-direction: column; align-items: center; gap: 10px; color: var(--text-muted); font-size: 12px;}
  .mockup-zone { height: 250px; }

  /* =========================================================
     MODAL DO MOCKUP DE CELULAR
  ========================================================= */
  .portfolio-modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
    background: rgba(0,0,0,0.95); z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    padding: 20px; backdrop-filter: blur(10px);
  }

  .btn-close-modal {
    position: absolute; top: 30px; right: 40px; background: transparent;
    border: none; color: #fff; cursor: pointer; transition: 0.3s; z-index: 10000;
  }
  .btn-close-modal:hover { color: var(--primary); transform: scale(1.1); }

  .portfolio-modal-content { display: flex; max-width: 1000px; width: 100%; align-items: center; gap: 60px; }

  .portfolio-mockup-wrapper { flex: 1; display: flex; justify-content: center; }
  .mockup-frame {
    width: 300px; height: 600px; border: 14px solid #111; border-radius: 40px;
    position: relative; background: #000;
    box-shadow: 0 0 50px rgba(0, 242, 234, 0.2), inset 0 0 20px rgba(255,255,255,0.05);
    overflow: hidden;
  }
  .mockup-notch {
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 120px; height: 25px; background: #111;
    border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; z-index: 10;
  }
  .mockup-screen { width: 100%; height: 100%; overflow-y: auto; scrollbar-width: none; position: relative; }
  .mockup-screen::-webkit-scrollbar { display: none; }
  .mockup-img { width: 100%; height: auto; display: block; min-height: 1200px; object-fit: cover; }
  .scroll-hint {
    position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
    background: rgba(0,0,0,0.8); color: var(--primary); padding: 8px 16px;
    border-radius: 20px; font-size: 12px; display: flex; align-items: center; gap: 5px;
    border: 1px solid var(--primary); z-index: 10; animation: float 2s infinite; pointer-events: none;
  }

  .portfolio-info-wrapper { flex: 1; }
  .portfolio-info-wrapper h2 { font-size: 36px; color: #fff; margin-bottom: 20px; }
  .project-tags-modal { display: flex; gap: 10px; margin-bottom: 25px; flex-wrap: wrap; }
  .project-tag-modal { background: rgba(0, 242, 234, 0.1); color: var(--primary); border: 1px solid rgba(0, 242, 234, 0.3); padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 700; font-family: monospace; text-transform: uppercase; }
  .project-modal-desc { color: var(--text-muted); line-height: 1.8; font-size: 18px; margin-bottom: 40px; }
  .modal-actions { display: flex; flex-direction: column; gap: 15px; max-width: 300px; }

  /* DEPOIMENTOS CAROUSEL MANTIDO */
  .testimonials-section { padding: 80px 0; background: #0c0c0e; border-top: 1px solid var(--border-color); }
  .carousel-container { position: relative; display: flex; align-items: center; justify-content: center; gap: 20px; }
  .carousel-viewport { overflow: hidden; width: 100%; max-width: 700px; }
  .carousel-track { display: flex; transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1); }
  .carousel-slide { min-width: 100%; padding: 0 15px; }
  .testimonial-card-carousel { background: var(--bg-card); padding: 40px 30px; border-radius: 16px; border: 1px solid var(--border-color); text-align: center; min-height: 300px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; }
  .testimonial-card-carousel::before { content: '"'; font-size: 100px; position: absolute; top: 10px; left: 20px; color: rgba(255,255,255,0.05); font-family: serif; }
  .testimonial-text { font-size: 18px; color: #fff; line-height: 1.6; margin-bottom: 30px; font-weight: 300; }
  .patient-info-card { display: flex; align-items: center; gap: 15px; background: rgba(255,255,255,0.03); padding: 10px 20px; border-radius: 40px; border: 1px solid var(--border-color); text-align: left; }
  .patient-photo { width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 1px solid var(--primary); }
  .nav-btn { background: rgba(255,255,255,0.05); color: var(--primary); width: 45px; height: 45px; border-radius: 50%; border: 1px solid var(--border-color); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
  .nav-btn:hover { background: var(--primary); color: #000; }

  /* BENEFITS MANTIDO */
  .benefits-section-pro { padding: 80px 0; }
  .benefit-card-pro { background: var(--bg-card); padding: 30px; border-radius: 12px; border: 1px solid var(--border-color); transition: all 0.3s ease; }
  .benefit-icon { color: var(--primary); margin-bottom: 15px; }

  /* OFFER SECTION E BORDAS NEON MANTIDA */
  .offer-section-special { padding: 80px 0; background: linear-gradient(180deg, var(--bg-dark) 0%, #0d0d10 100%); border-top: 1px solid var(--border-color); }
  .offer-card-frame { border-radius: 20px; background: #0f0f11; padding: 40px; position: relative; overflow: hidden; transition: all 0.5s ease; border: 1px solid var(--border-color); }
  @keyframes dynamic-border-shift { 0% { border-color: var(--primary); box-shadow: 0 0 20px rgba(0,242,234,0.2); } 50% { border-color: var(--primary-alt); box-shadow: 0 0 60px rgba(0,242,234,0.5); } 100% { border-color: var(--primary); box-shadow: 0 0 20px rgba(0,242,234,0.2); } }
  .promo-active { animation: dynamic-border-shift 2.5s ease-in-out infinite; background: radial-gradient(circle at center, rgba(0, 242, 234, 0.05) 0%, rgba(0,0,0,0) 70%) !important; }
  .offer-badge-top { position: absolute; top: 0; left: 50%; transform: translate(-50%, 0); background: linear-gradient(90deg, var(--primary) 0%, var(--primary-glow) 50%, var(--primary) 100%); background-size: 200% auto; animation: gradient-flow 1.5s linear infinite; color: #000; padding: 6px 20px; border-radius: 0 0 10px 10px; font-weight: 800; font-size: 11px; display: flex; align-items: center; gap: 5px; white-space: nowrap; box-shadow: 0 5px 15px rgba(0, 242, 234, 0.3); }
  .offer-grid-internal { display: grid; grid-template-columns: 1.2fr 1fr; gap: 50px; margin-top: 20px; align-items: center; }
  .offer-heading { font-size: clamp(28px, 3vw, 36px); color: #fff; margin-bottom: 15px; font-weight: 700; }
  .offer-sub { color: var(--text-muted); margin-bottom: 30px; font-size: 16px; }
  .bonuses-list { display: flex; flex-direction: column; gap: 15px; }
  .bonus-item { display: flex; gap: 15px; background: rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
  .bonus-icon { color: #000; background: var(--primary); width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .offer-cta-side { background: rgba(0,0,0,0.4); padding: 30px; border-radius: 12px; border: 1px solid var(--border-color); text-align: center; backdrop-filter: blur(5px); display: flex; flex-direction: column; align-items: center; }
  .price-tag-big { display: flex; flex-direction: column; align-items: center; gap: 5px;}
  .price-label { font-size: 12px; text-transform: uppercase; color: var(--text-muted); letter-spacing: 1px; }
  .price-value { font-size: 48px; font-weight: 800; color: #fff; margin: 10px 0; display: flex; align-items: center; justify-content: center; }
  .price-bonus { background: rgba(0, 242, 234, 0.1); color: var(--primary); padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
  .old-price { text-decoration: line-through; color: var(--text-muted); font-size: 24px; margin-right: 10px; opacity: 0.5; }
  .countdown-timer { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; margin-top: 20px; gap: 5px; width: 100%;}
  .time-box { background: rgba(0, 242, 234, 0.1); border: 1px solid rgba(0, 242, 234, 0.3); border-radius: 6px; padding: 8px 12px; min-width: 50px; text-align: center; font-size: 12px; color: var(--primary); }
  .time-box span { display: block; font-size: 22px; font-weight: 800; color: #fff; font-family: monospace; }
  .colon { font-size: 20px; color: var(--text-muted); font-weight: bold; margin: 0 2px; }
  .scarcity-text { color: var(--text-muted); font-size: 12px; font-style: italic; }

  /* BOOKING AREA MANTIDA */
  .booking-section-pro { padding: 80px 0; }
  .booking-glass-layout { background: var(--bg-card); padding: 40px; border-radius: 20px; border: 1px solid var(--border-color); box-shadow: 0 0 40px rgba(0,0,0,0.5); }
  .booking-main-grid, .admin-layout { display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; align-items: flex-start; }
  .selection-column { width: 100%; min-width: 0; }
  .form-column { width: 100%; box-sizing: border-box; background: rgba(255,255,255,0.02); padding: 20px; border-radius: 12px; border: 1px solid var(--border-color); }
  .step-card { background: rgba(0,0,0,0.2); padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 1px solid var(--border-color); }
  .step-card.disabled { opacity: 0.4; pointer-events: none; }
  .date-scroller { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 15px; margin-bottom: 0px; -webkit-overflow-scrolling: touch; scrollbar-width: thin; scrollbar-color: var(--primary) transparent; }
  .date-pill { padding: 15px; border: 1px solid var(--border-color); background: rgba(0,0,0,0.3); color: var(--text-main); border-radius: 8px; min-width: 90px; flex-shrink: 0; cursor: pointer; text-align: center; transition: 0.2s; display: flex; flex-direction: column; gap: 5px;}
  .date-pill:hover { border-color: var(--primary); transform: translateY(-2px); }
  .date-pill.active { background: var(--primary); color: #000; border-color: var(--primary); font-weight: bold; transform: scale(1.05); }
  .pill-weekday { font-size: 11px; text-transform: uppercase; font-weight: 600; }
  .pill-day { font-size: 20px; font-weight: 800; }

  .time-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 10px; }
  .time-chip { padding: 12px 5px; border: 1px solid var(--border-color); background: rgba(0,0,0,0.3); color: var(--text-main); border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px; text-align: center; font-family: monospace; transition: 0.2s; border: 1px solid transparent;}
  .time-chip:hover { border-color: var(--primary); color: var(--primary); transform: translateY(-2px); }
  .time-chip.active { background: var(--primary); color: #000; border-color: var(--primary); transform: scale(1.05); }
  .time-chip.blocked { text-decoration: line-through; opacity: 0.3; cursor: not-allowed; border-color: #333; pointer-events: none; background: rgba(255,0,0,0.05);}
  
  .form-column.locked { opacity: 0.3; pointer-events: none; }
  .summary-card-pro h3 { margin-bottom: 20px; color: #fff; font-size: 18px; font-weight: 700;}
  .price-box { display: flex; justify-content: space-between; padding: 15px; background: rgba(0, 242, 234, 0.1); border-radius: 6px; margin: 20px 0; color: #fff; border: 1px solid rgba(0, 242, 234, 0.2); }
  .secure-checkout { color: var(--text-muted); font-size: 11px; text-align: center; margin-top: 10px; display: flex; align-items: center; justify-content: center; gap: 5px;}

  /* ADMIN SPECIFIC MANTIDO */
  .admin-dashboard { padding-top: 30px; }
  .admin-header-panel { text-align: center; margin-bottom: 40px; }
  .admin-bulk-actions { display: flex; gap: 10px; }
  .btn-small-action { background: transparent; border: 1px solid #333; color: var(--text-muted); padding: 5px 10px; border-radius: 4px; cursor: pointer; }
  .btn-small-action:hover { border-color: #fff; color: #fff; }
  .btn-small-action.block { border-color: var(--red-blocked); color: var(--red-blocked); }
  .btn-small-action.unblock { border-color: var(--green-avail); color: var(--green-avail); }
  .admin-slots-column { background: rgba(255,255,255,0.02); padding: 25px; border-radius: 12px; border: 1px solid var(--border-color); }
  .slots-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 15px;}
  .admin-legend { display: flex; gap: 15px; font-size: 12px; color: var(--text-muted); margin-top: 20px; }
  .legend-item { display: flex; align-items: center; gap: 5px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
  .dot.green { background: var(--green-avail); }
  .dot.red { background: var(--red-blocked); }

  .time-chip.admin-chip { padding: 10px; display: flex; justify-content: space-between; gap: 5px; font-size: 12px;}
  .time-chip.admin-chip.available { border-color: var(--green-avail); color: var(--green-avail); background: rgba(16,185,129,0.05); }
  .time-chip.admin-chip.blocked { border-color: var(--red-blocked); color: var(--red-blocked); text-decoration: none; opacity: 1; background: rgba(239,68,68,0.05); pointer-events: auto; cursor: pointer;}
  .time-chip.admin-chip.blocked:hover { border-color: #ff6b6b; }

  /* SUCCESS CARD FULL MANTIDO */
  .success-card-full { text-align: center; background: var(--bg-card); padding: 60px 40px; border-radius: 20px; border: 1px solid var(--border-color); max-width: 500px; box-shadow: 0 0 50px rgba(0,242,234,0.1); }
  .success-card-full h2 { font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 15px; letter-spacing: -1px; }
  .success-card-full p { color: var(--text-muted); line-height: 1.6; margin-bottom: 30px; }

  /* ========================================= */
  /* MEDIA QUERIES OTIMIZADAS MANTIDAS         */
  /* ========================================= */

  @media (max-width: 992px) {
    .booking-main-grid, .admin-layout { grid-template-columns: 1fr; gap: 50px; }
    .offer-grid-internal { grid-template-columns: 1fr; }
    .hero-grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
    .hero-image-container { order: -1; width: 90%; margin: 0 auto; }
    .showcase-grid { grid-template-columns: 1fr; text-align: center; }
    .benefits-list { display: inline-flex; flex-direction: column; align-items: flex-start; margin: 0 auto; }
    .hero-buttons { display: flex; flex-direction: column; align-items: center; }
    .btn-cta { width: 100%; max-width: 100%; }
    .main-subtitle { margin-left: auto; margin-right: auto; }
    .tech-badge.react { top: 20px; left: 0px; }
    .tech-badge.node { bottom: 20px; right: 0px; }
    
    /* Modal Responsivo Otimizado MANTIDO */
    .portfolio-modal-content { flex-direction: column; text-align: center; gap: 30px; height: 90vh; overflow-y: auto; padding-bottom: 40px;}
    .mockup-frame { width: 280px; height: 560px; border-width: 12px;}
    .modal-actions { margin: 0 auto; }
    .project-tags-modal { justify-content: center; }
    .photo-frame:hover .photo-accent { top: 15px; right: -15px;}
    .btn-close-modal { top: 15px; right: 15px; background: rgba(0,0,0,0.5); border-radius: 50%; padding: 5px;}
    
    /* Admin Mobile Adjustments */
    .admin-project-body { grid-template-columns: 1fr; }
  }

  @media (max-width: 600px) {
    .lp-container-main { padding-top: 60px; }
    .hide-mobile { display: none; }
    .logo-area { gap: 8px;}
    .logo-text { font-size: 14px; }
    .logo-img-circular { width: 30px; height: 30px;}
    .navbar-content { padding: 0 15px; }
    .hero-section-pro { padding: 60px 0; }
    .main-headline { font-size: 32px; }
    .photo-frame { max-width: 320px;}
    .photo-accent { border-width: 1px; top: 10px; right: -10px;}
    .booking-glass-layout { padding: 25px 15px; }
    .date-pill { min-width: 75px; padding: 10px; }
    .pill-weekday { font-size: 9px; }
    .pill-day { font-size: 16px; }
    .time-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .time-chip { font-size: 12px; padding: 10px 3px;}
    .admin-slots-column { padding: 15px; }
    .admin-bulk-actions { flex-direction: column; gap: 5px;}
    .admin-legend { flex-direction: column; gap: 8px;}
    
    .portfolio-section-gallery, .showcase-section-pro, .booking-section-pro, .benefits-section-pro, .testimonials-section, .offer-section-special { padding: 50px 0;}
    .projects-scroll-container { gap: 20px;}
    .project-card-pro { min-width: 280px;}
    .testimonial-card-carousel { padding: 30px 20px;}
    .offer-card-frame { padding: 30px 20px;}
    .price-value { font-size: 36px;}
    .stat-item { font-size: 12px; gap: 4px;}
    
    .about-modal-content { padding: 25px; gap: 15px; width: 95%; max-height: 90vh; overflow-y: auto;}
    .about-modal-header { flex-direction: column; text-align: center; gap: 10px; padding-bottom: 15px;}
    .about-modal-photo { width: 60px; height: 60px; border-width: 2px;}
    .about-modal-name-area h2 { font-size: 18px;}
    .about-modal-bio { font-size: 12px;}
    .detail-item { font-size: 12px;}
    .about-modal-actions .btn-nav-outline, .about-modal-actions .btn-cta { font-size: 11px; padding: 10px; gap: 5px;}
  }
  
  @media (max-width: 380px) {
    .hero-stats { justify-content: center; gap: 10px; font-size: 11px;}
    .price-tag-big .old-price { font-size: 18px;}
    .admin-dashboard { padding-top: 15px; }
  }

  .animate-fade { animation: fadeIn 0.3s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .spin { animation: spin 1s linear infinite; }
`;