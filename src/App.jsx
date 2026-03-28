import React from 'react';
import bannerImage from './assets/banner.png'; // Imagem de fundo para a seção hero

// --- DADOS DINÂMICOS ---
const skillsData = {
  frontend: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5/CSS3'],
  backend: ['Node.js', 'Python', 'FastAPI', 'Java', 'Kotlin'],
  tools: ['PostgreSQL', 'MySQL', 'Git/GitHub', 'Docker', 'Firebase']
};

const projectsData = [
  {
    title: 'Sistema de Gestão de Inventário',
    desc: 'Web app para controle de estoque em tempo real para construção civil. Inclui alertas automatizados de estoque baixo e monitoramento dinâmico.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    link: 'https://github.com/MarcosSoftwareEngineering'
  },
  {
    title: 'WhatsApp Backup Chatbot',
    desc: 'Bot automatizado desenvolvido em Python para integração com WhatsApp, focado em geração de relatórios e automação de backups.',
    tags: ['Python', 'FastAPI', 'WhatsApp API'],
    link: 'https://github.com/MarcosSoftwareEngineering'
  },
  {
    title: 'Studios Delivery Checklist',
    desc: 'Aplicação de checklist para entregas. Foco em usabilidade e design responsivo para controle de qualidade.',
    tags: ['JavaScript', 'HTML/CSS', 'Git'],
    link: 'https://github.com/MarcosSoftwareEngineering/studios-delivery-checklist'
  }
];

const App = () => {
  // --- ESTILOS GLOBAIS (Light Mode / Clear) ---
  const theme = {
    bgApp: '#ffffff',
    bgSection: '#f8f9fa',
    textPrimary: '#212529',
    textSecondary: '#555555',
    accent: '#0056b3',
    border: '#e9ecef',
  };

  const styles = {
    container: { backgroundColor: theme.bgApp, color: theme.textPrimary, fontFamily: 'Inter, sans-serif', margin: 0, padding: 0 },
    section: { padding: '80px 20px', maxWidth: '1100px', margin: '0 auto' },
    title: { fontSize: '2.5rem', color: theme.textPrimary, borderBottom: `2px solid ${theme.border}`, paddingBottom: '10px', marginBottom: '40px', textAlign: 'center' },
    text: { fontSize: '1.1rem', lineHeight: '1.8', color: theme.textSecondary },
    btnPrimary: { backgroundColor: theme.accent, color: '#fff', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', border: 'none', cursor: 'pointer' },
    btnOutline: { backgroundColor: 'transparent', color: theme.accent, border: `1px solid ${theme.accent}`, padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', marginLeft: '10px' },
    card: { backgroundColor: '#ffffff', border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' },
    grid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
    grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' },
    tag: { backgroundColor: 'rgba(0, 86, 179, 0.08)', color: theme.accent, padding: '6px 12px', borderRadius: '12px', fontSize: '0.85rem', margin: '4px', display: 'inline-block', fontWeight: '600' }
  };

  return (
    <div style={styles.container}>
      
      {/* --- ESTILOS DE ANIMAÇÃO E UX --- */}
      <style>{`
        html { scroll-behavior: smooth; }
        .hover-card { transition: all 0.3s ease; height: 100%; display: flex; flex-direction: column; }
        .hover-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.08); border-color: transparent; }
        .tag-hover { transition: all 0.2s ease; cursor: default; }
        .tag-hover:hover { background-color: rgba(0, 86, 179, 0.15) !important; transform: scale(1.05); }
        .input-focus { transition: border-color 0.3s ease, box-shadow 0.3s ease; outline: none; }
        .input-focus:focus { border-color: ${theme.accent} !important; box-shadow: 0 0 0 3px rgba(0,86,179,0.15); }
        .btn-hover { transition: background-color 0.3s, transform 0.2s; }
        .btn-hover:hover { background-color: #004494 !important; transform: translateY(-2px); }
        .link-hover { transition: color 0.2s; }
        .link-hover:hover { color: #003d82 !important; text-decoration: underline !important; }
        
        /* NOVO ESTILO DO BOTÃO DE PROJETO */
        .btn-project {
          display: block;
          width: 100%;
          text-align: center;
          padding: 12px;
          margin-top: 20px;
          border: 2px solid ${theme.accent};
          border-radius: 6px;
          color: ${theme.accent};
          background-color: transparent;
          text-decoration: none;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        .btn-project:hover {
          background-color: ${theme.accent};
          color: #ffffff;
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section style={{
        position: 'relative',
        backgroundImage: `linear-gradient(to right, rgba(13, 17, 23, 0.95), rgba(13, 17, 23, 0.6)), url(${bannerImage})`,
        backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ position: 'absolute', top: '40px', left: '40px' }}>
          <h1 style={{ fontSize: '2rem', color: '#fff', margin: 0, fontWeight: 'bold', letterSpacing: '1px' }}>Marcos Vinicius</h1>
        </div>
        <div style={{ ...styles.section, width: '100%', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#e6edf3', fontWeight: '400', marginBottom: '20px' }}>Software Engineer | React, Node.js, Python</h2>
          <p style={{ fontSize: '1.3rem', lineHeight: '1.8', color: '#c9d1d9', maxWidth: '700px', margin: '0 auto 40px auto' }}>
            Especialista em Front-end e Engenharia de Software. Transformando requisitos complexos em interfaces de alto desempenho.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <a href="#projetos" style={styles.btnPrimary} className="btn-hover">Ver Projetos</a>
            {/* LINK DE DOWNLOAD CONFIGURADO */}
            <a href="/curriculo-marcos-vinicius.pdf" download style={{ ...styles.btnOutline, color: '#fff', borderColor: '#fff' }}>Download CV</a>
          </div>
        </div>
      </section>

      {/* 2. RESUMO PROFISSIONAL (Sobre) */}
      <section id="sobre" style={styles.section}>
        <h2 style={{...styles.title, textAlign: 'left'}}>Sobre Mim</h2>
        <div style={styles.grid2}>
          <div>
            <p style={styles.text}>
              Sou um Engenheiro de Software com forte foco em desenvolvimento Front-end e criação de arquiteturas escaláveis. Com base sólida em Análise e Desenvolvimento de Sistemas e especialização em Engenharia de Software, atuo desenhando soluções que unem código limpo (Clean Architecture) e interfaces dinâmicas.
            </p>
            <p style={styles.text}>
              Como fundador da Marvin Site Builders e desenvolvedor freelancer, tenho experiência prática gerenciando o ciclo completo de vida de aplicações, desde o levantamento de requisitos até o deploy.
            </p>
          </div>
          <div style={{...styles.card, backgroundColor: theme.bgSection}} className="hover-card">
            <h3 style={{ color: theme.textPrimary, marginTop: 0 }}>Foco Atual</h3>
            <p style={styles.text}>🚀 Engenharia de Software Aplicada</p>
            <p style={styles.text}>⚛️ Ecossistema React & Front-end Avançado</p>
            <p style={styles.text}>⚙️ Arquitetura de Software (SOLID, Clean Code)</p>
          </div>
        </div>
      </section>

      {/* 4. HABILIDADES TÉCNICAS */}
      <section id="habilidades" style={styles.section}>
        <h2 style={styles.title}>Habilidades Técnicas</h2>
        <div style={styles.grid3}>
          <div style={styles.card} className="hover-card">
            <h3 style={{ color: theme.textPrimary, textAlign: 'center' }}>Front-end</h3>
            <div style={{ textAlign: 'center' }}>
              {skillsData.frontend.map(tech => <span key={tech} style={styles.tag} className="tag-hover">{tech}</span>)}
            </div>
          </div>
          <div style={styles.card} className="hover-card">
            <h3 style={{ color: theme.textPrimary, textAlign: 'center' }}>Back-end</h3>
            <div style={{ textAlign: 'center' }}>
              {skillsData.backend.map(tech => <span key={tech} style={styles.tag} className="tag-hover">{tech}</span>)}
            </div>
          </div>
          <div style={styles.card} className="hover-card">
            <h3 style={{ color: theme.textPrimary, textAlign: 'center' }}>Banco de Dados & Ferramentas</h3>
            <div style={{ textAlign: 'center' }}>
              {skillsData.tools.map(tech => <span key={tech} style={styles.tag} className="tag-hover">{tech}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJETOS EM DESTAQUE */}
      <section id="projetos" style={{ backgroundColor: theme.bgSection, padding: '80px 0' }}>
        <div style={styles.section}>
          <h2 style={styles.title}>Projetos em Destaque</h2>
          <div style={styles.grid3}>
            
            {projectsData.map((project, index) => (
              <div key={index} style={styles.card} className="hover-card">
                <h3 style={{ color: theme.textPrimary, textAlign: 'center', marginTop: 0 }}>{project.title}</h3>
                <p style={{ ...styles.text, fontSize: '0.95rem', textAlign: 'center', flexGrow: 1 }}>{project.desc}</p>
                <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                  {project.tags.map(tag => <span key={tag} style={styles.tag} className="tag-hover">{tag}</span>)}
                </div>
                {/* BOTÃO COM TARGET BLANK JÁ CONFIGURADO ANTERIORMENTE */}
                <a href={project.link} className="btn-project" target="_blank" rel="noopener noreferrer">
                  Ver no GitHub
                </a>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 5. EXPERIÊNCIA E FORMAÇÃO */}
      <section id="experiencia" style={styles.section}>
        <h2 style={{...styles.title, textAlign: 'left'}}>Experiência e Formação</h2>
        <div style={styles.grid2}>
          <div className="hover-card" style={{ padding: '15px', borderRadius: '8px' }}>
            <h3 style={{ color: theme.accent, fontSize: '1.5rem' }}>🎓 Acadêmico</h3>
            <div style={{ borderLeft: `2px solid ${theme.accent}`, paddingLeft: '20px', margin: '20px 0' }}>
              <h4 style={{ color: theme.textPrimary, margin: '0 0 5px 0' }}>Pós-graduação em Engenharia de Software</h4>
              <p style={styles.text}>Faculdade Metropolitana de São Paulo • <span style={{fontWeight: '600', color: theme.accent}}>Em andamento</span></p>
              <br/>
              <h4 style={{ color: theme.textPrimary, margin: '0 0 5px 0' }}>Análise e Desenvolvimento de Sistemas</h4>
              <p style={styles.text}>Estácio de Sá • Último semestre</p>
            </div>
            <p style={styles.text}><strong>Princípios Adotados:</strong> Clean Architecture, SOLID, Metodologias Ágeis (Scrum/Kanban).</p>
          </div>
          <div className="hover-card" style={{ padding: '15px', borderRadius: '8px' }}>
            <h3 style={{ color: theme.accent, fontSize: '1.5rem' }}>💼 Profissional</h3>
            <div style={{ borderLeft: `2px solid ${theme.accent}`, paddingLeft: '20px', margin: '20px 0' }}>
              <h4 style={{ color: theme.textPrimary, margin: '0 0 5px 0' }}>Founder & Web Developer</h4>
              <p style={styles.text}>Marvin Site Builders • Freelance</p>
              <p style={{ ...styles.text, fontSize: '0.9rem' }}>Desenvolvimento de landing pages e sites corporativos focados em conversão e performance.</p>
              <br/>
              <h4 style={{ color: theme.textPrimary, margin: '0 0 5px 0' }}>Desenvolvedor / Estagiário</h4>
              <p style={styles.text}>CS Sustentáveis</p>
              <p style={{ ...styles.text, fontSize: '0.9rem' }}>Desenvolvimento de ferramentas internas, como listas de presença online e controle de estoque.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTATO E LINKS */}
      <section id="contato" style={styles.section}>
        <h2 style={styles.title}>Vamos conversar?</h2>
        <div style={styles.grid2}>
          <div>
            <p style={styles.text}>Estou sempre aberto a discutir novos projetos, oportunidades de software engineering e ideias inovadoras.</p>
            <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {/* LINKS EXTERNOS AGORA COM TARGET="_BLANK" E REL="NOOPENER NOREFERRER" */}
              <a href="https://github.com/MarcosSoftwareEngineering" target="_blank" rel="noopener noreferrer" className="link-hover" style={{ color: theme.accent, textDecoration: 'none', fontSize: '1.2rem', fontWeight: '500' }}>🐙 GitHub: /MarcosSoftwareEngineering</a>
              <a href="https://linkedin.com/in/marcosvinicius" target="_blank" rel="noopener noreferrer" className="link-hover" style={{ color: theme.accent, textDecoration: 'none', fontSize: '1.2rem', fontWeight: '500' }}>💼 LinkedIn: /marcosvinicius</a>
              <a href="mailto:contato@exemplo.com" className="link-hover" style={{ color: theme.accent, textDecoration: 'none', fontSize: '1.2rem', fontWeight: '500' }}>✉️ E-mail: me@exemplo.com</a>
            </div>
          </div>
          
          {/* Formulário Simples com UX de foco */}
          <div style={styles.card} className="hover-card">
            <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" placeholder="Seu Nome" className="input-focus" style={{ padding: '14px', borderRadius: '6px', border: `1px solid ${theme.border}`, backgroundColor: '#fff', color: theme.textPrimary, fontSize: '1rem' }} />
              <input type="email" placeholder="Seu E-mail" className="input-focus" style={{ padding: '14px', borderRadius: '6px', border: `1px solid ${theme.border}`, backgroundColor: '#fff', color: theme.textPrimary, fontSize: '1rem' }} />
              <textarea placeholder="Sua Mensagem" rows="4" className="input-focus" style={{ padding: '14px', borderRadius: '6px', border: `1px solid ${theme.border}`, backgroundColor: '#fff', color: theme.textPrimary, resize: 'vertical', fontSize: '1rem' }}></textarea>
              <button type="button" style={styles.btnPrimary} className="btn-hover">Enviar Mensagem</button>
            </form>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '30px', borderTop: `1px solid ${theme.border}`, backgroundColor: theme.bgSection, color: theme.textSecondary }}>
        <p>&copy; {new Date().getFullYear()} Marcos Vinicius. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
