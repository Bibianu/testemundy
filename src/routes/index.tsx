import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  CircleDollarSign,
  Instagram,
  Leaf,
  Menu,
  MessageCircle,
  Phone,
  Ruler,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

import heroImage from "@/assets/mundy/hero.jpg";
import contornoImage from "@/assets/mundy/contorno.jpg";
import sionImage from "@/assets/mundy/sion.jpg";
import luccaImage from "@/assets/mundy/lucca.jpg";
import severoImage from "@/assets/mundy/severo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mundy Construtora | Alto padrão na Zona Sul de Belo Horizonte" },
      { name: "description", content: "Apartamentos de alto padrão e oportunidades de investimento nos melhores bairros da Zona Sul de Belo Horizonte." },
      { property: "og:title", content: "Mundy Construtora | Imóveis que elevam o seu jeito de viver" },
      { property: "og:description", content: "Conheça empreendimentos exclusivos e oportunidades imobiliárias na Zona Sul de Belo Horizonte." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const WHATSAPP = "https://wa.me/5531971113344?text=Olá%2C%20gostaria%20de%20conhecer%20os%20empreendimentos%20Mundy.";

const projects = [
  { name: "Housi Alinea Contorno", neighborhood: "Santo Antônio / Lourdes", rooms: "1 e 2 quartos", area: "24 a 57m²", status: "75% vendido", stage: "Em construção", image: contornoImage },
  { name: "Housi Alinea Sion", neighborhood: "Sion", rooms: "1 e 2 quartos", area: "24 a 43m²", status: "Pronto para rentabilizar", stage: "Pronto para morar", image: sionImage },
  { name: "Residencial Lucca Fonseca", neighborhood: "Cruzeiro", rooms: "2 quartos", area: "74m²", status: "100% vendido", stage: "Pronto para morar", image: luccaImage },
  { name: "Residencial Severo Quintino", neighborhood: "Sion", rooms: "1 e 2 quartos", area: "54 a 74m²", status: "Última unidade", stage: "Pronto para morar", image: severoImage },
];

const filters = ["Todos", "Em construção", "Lançamento", "Pré-lançamento", "Pronto para morar"];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const links = [["A Construtora", "#construtora"], ["Empreendimentos", "#empreendimentos"], ["Diferenciais", "#diferenciais"], ["Investidores", "#investidores"], ["Contato", "#contato"]];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "bg-background/95 shadow-sm backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:flex lg:px-10">
        <a href="#inicio" className={`min-w-0 font-display text-3xl transition-colors ${scrolled || open ? "text-brand" : "text-cream"}`} aria-label="Mundy Construtora — início">Mundy<span className="ml-2 font-body text-[9px] font-semibold uppercase tracking-[0.22em] opacity-65">Construtora</span></a>
        <nav className={`ml-auto hidden items-center gap-7 text-xs font-semibold lg:flex ${scrolled ? "text-brand/70" : "text-cream/80"}`} aria-label="Navegação principal">
          {links.map(([label, href]) => <a key={href} href={href} className="transition-colors hover:text-accent">{label}</a>)}
        </nav>
        <a href="#contato" className="ml-2 hidden rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-brand shadow-sm transition hover:-translate-y-0.5 lg:inline-flex">Fale com um consultor</a>
        <button type="button" onClick={() => setOpen(v => !v)} className={`grid size-11 place-items-center rounded-full border lg:hidden ${scrolled || open ? "border-brand/15 text-brand" : "border-cream/30 text-cream"}`} aria-label={open ? "Fechar menu" : "Abrir menu"}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      <AnimatePresence>{open && <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t bg-background lg:hidden"><div className="space-y-1 px-5 py-5">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b py-3 text-sm font-semibold text-brand">{label}<ChevronRight size={16} /></a>)}</div></motion.nav>}</AnimatePresence>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  return (
    <section id="inicio" ref={ref} className="relative flex min-h-[92svh] items-end overflow-hidden bg-brand">
      <motion.img style={{ y }} src={heroImage} alt="Empreendimento contemporâneo da Mundy Construtora" className="absolute inset-0 h-[112%] w-full object-cover" fetchPriority="high" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--color-brand)_88%,transparent),color-mix(in_oklab,var(--color-brand)_25%,transparent)_68%,transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_oklab,var(--color-brand)_70%,transparent),transparent_55%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8 lg:px-10 lg:pb-24">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8 }} className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">Zona Sul · Belo Horizonte</motion.p>
        <motion.h1 initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .12 }} className="mt-5 max-w-4xl font-display text-5xl leading-[0.94] text-cream sm:text-6xl lg:text-8xl">Imóveis que elevam<br />o seu jeito de <em className="text-accent">viver.</em></motion.h1>
        <motion.p initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .28 }} className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">Apartamentos de alto padrão nos melhores bairros da Zona Sul de Belo Horizonte.</motion.p>
        <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .4 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#empreendimentos" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-bold text-brand transition hover:-translate-y-0.5">Conheça os empreendimentos <ArrowRight size={16} /></a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/35 px-7 py-4 text-sm font-bold text-cream transition hover:bg-cream/10"><MessageCircle size={17} /> Falar no WhatsApp</a>
        </motion.div>
      </div>
      <a href="#empreendimentos" className="animate-scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/70" aria-label="Rolar para os empreendimentos"><ArrowDown size={22} /></a>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState("Todos");
  const visible = filter === "Todos" ? projects : projects.filter(project => project.stage === filter);
  return (
    <section id="empreendimentos" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal><p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Portfólio Mundy</p><div className="mt-3 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"><h2 className="max-w-3xl font-display text-4xl leading-tight text-brand sm:text-5xl">Empreendimentos que unem localização, arquitetura e investimento.</h2><p className="max-w-sm text-sm leading-relaxed text-brand/60">Endereços selecionados com potencial de valorização e uma assinatura construtiva reconhecida.</p></div></Reveal>
        <div className="mt-10 flex gap-2 overflow-x-auto pb-3" role="group" aria-label="Filtrar empreendimentos">{filters.map(item => <button key={item} type="button" onClick={() => setFilter(item)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${filter === item ? "bg-brand text-cream" : "border border-brand/15 text-brand/60 hover:border-brand/40"}`}>{item}</button>)}</div>
        <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2">{visible.map((project, index) => <motion.article layout key={project.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`group relative overflow-hidden rounded-[1.75rem] bg-card ${index === 0 ? "md:row-span-2" : ""}`}><div className={`${index === 0 ? "aspect-[4/5] md:h-full" : "aspect-[16/10]"} overflow-hidden`}><img src={project.image} alt={project.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" /></div><div className="absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_oklab,var(--color-brand)_90%,transparent),transparent_68%)]" /><div className="absolute inset-x-0 bottom-0 p-6 text-cream sm:p-8"><span className="inline-flex rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase text-brand">{project.status}</span><div className="mt-4 flex items-end justify-between gap-4"><div><h3 className="font-display text-2xl sm:text-3xl">{project.name}</h3><p className="mt-1 text-sm text-cream/70">{project.neighborhood} · {project.rooms} · {project.area}</p></div><span className="grid size-11 shrink-0 place-items-center rounded-full bg-cream text-brand transition group-hover:translate-x-1"><ArrowRight size={18} /></span></div><p className="mt-3 max-h-0 overflow-hidden text-xs text-cream/70 opacity-0 transition-all duration-500 group-hover:max-h-8 group-hover:opacity-100">Ver empreendimento e receber condições comerciais</p></div></motion.article>)}</motion.div>
      </div>
    </section>
  );
}

function Institution() {
  const stats = [["24", "anos de história"], ["10", "edifícios entregues"], ["24 mil", "m² construídos"], ["42 mi", "de VGV negociados"]];
  return <section id="construtora" className="bg-sand py-20 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-10"><Reveal className="lg:col-span-5"><p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">A Construtora</p><h2 className="mt-4 font-display text-4xl leading-tight text-brand sm:text-5xl">Há 24 anos, construindo valor na Zona Sul de BH.</h2><p className="mt-6 leading-relaxed text-brand/65">A Mundy une experiência local, arquitetura contemporânea e atenção aos detalhes para criar empreendimentos que atravessam o tempo — para morar ou investir.</p></Reveal><Reveal className="lg:col-span-7" delay={.12}><div className="relative overflow-hidden rounded-[2rem]"><img src={heroImage} alt="Arquitetura de um empreendimento Mundy" loading="lazy" className="aspect-[16/10] w-full object-cover" /><div className="absolute inset-0 bg-brand/10" /></div></Reveal><div className="grid grid-cols-2 gap-8 border-t border-brand/15 pt-10 md:grid-cols-4 lg:col-span-12">{stats.map(([number, label], index) => <Reveal key={label} delay={index * .08}><p className="font-display text-4xl text-brand sm:text-5xl">{number}</p><p className="mt-2 text-xs font-semibold uppercase text-brand/55">{label}</p></Reveal>)}</div></div></section>;
}

function InvestorSection() {
  const [value, setValue] = useState(350000);
  const [months, setMonths] = useState(24);
  const estimated = useMemo(() => value * Math.pow(1.014, months), [value, months]);
  return <section id="investidores" className="relative overflow-hidden bg-brand py-20 text-cream lg:py-28"><img src={sionImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10" /><div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10"><Reveal><p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Para investidores</p><h2 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">Rentabilidade de até <em className="text-accent">1,4% ao mês</em> no seu capital.</h2><p className="mt-6 max-w-lg leading-relaxed text-cream/65">Potencial de valorização, flexibilidade para locação mensal ou diária e imóveis pensados para uma demanda urbana crescente.</p><a href="#contato" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-bold text-brand transition hover:-translate-y-0.5">Quero investir <ArrowRight size={16} /></a></Reveal><Reveal delay={.12}><div className="rounded-[2rem] border border-cream/15 bg-cream/10 p-6 backdrop-blur-md sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Simulação de potencial</p><label className="mt-7 block"><span className="flex justify-between gap-4 text-sm text-cream/70"><span>Valor investido</span><strong className="font-display text-xl text-cream">{value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}</strong></span><input type="range" min="100000" max="1000000" step="10000" value={value} onChange={e => setValue(Number(e.target.value))} className="mt-4 w-full accent-accent" /></label><label className="mt-7 block"><span className="flex justify-between gap-4 text-sm text-cream/70"><span>Prazo</span><strong className="font-display text-xl text-cream">{months} meses</strong></span><input type="range" min="12" max="48" step="6" value={months} onChange={e => setMonths(Number(e.target.value))} className="mt-4 w-full accent-accent" /></label><div className="mt-8 grid grid-cols-2 gap-4 border-t border-cream/15 pt-6"><div><p className="text-[10px] font-bold uppercase text-cream/45">Capital projetado*</p><p className="mt-1 font-display text-2xl">{estimated.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}</p></div><div><p className="text-[10px] font-bold uppercase text-cream/45">Ganho estimado*</p><p className="mt-1 font-display text-2xl text-accent">+{((estimated / value - 1) * 100).toFixed(1).replace(".", ",")}%</p></div></div><p className="mt-5 text-[10px] leading-relaxed text-cream/40">*Simulação ilustrativa, sem garantia de rentabilidade. Valores podem variar conforme mercado e empreendimento.</p></div></Reveal></div></section>;
}

function Differentials() {
  const items = [{ icon: Ruler, title: "Consumo individualizado", text: "Medição independente de água, gás e energia para mais controle." }, { icon: Zap, title: "Energia fotovoltaica", text: "Tecnologia limpa em empreendimentos selecionados." }, { icon: Leaf, title: "Condomínios econômicos", text: "Soluções que reduzem despesas sem comprometer conforto." }, { icon: WalletCards, title: "Negociação facilitada", text: "Apoio próximo para crédito e condições comerciais." }];
  return <section id="diferenciais" className="bg-background py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><Reveal><p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Diferenciais</p><h2 className="mt-4 max-w-3xl font-display text-4xl text-brand sm:text-5xl">Inovação, sustentabilidade e economia.</h2></Reveal><div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border bg-border sm:grid-cols-2 lg:grid-cols-4">{items.map(({ icon: Icon, title, text }, index) => <Reveal key={title} delay={index * .08} className="h-full bg-background p-7"><span className="grid size-12 place-items-center rounded-2xl bg-sage/35 text-brand"><Icon size={22} /></span><h3 className="mt-8 font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-relaxed text-brand/60">{text}</p></Reveal>)}</div></div></section>;
}

function InstagramSection() {
  return <section className="bg-background pb-20 lg:pb-28"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">@mundyconstrutorabh</p><h2 className="mt-3 font-display text-4xl text-brand sm:text-5xl">Acompanhe os lançamentos e novidades.</h2></div><a href="https://www.instagram.com/mundyconstrutorabh/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-brand">Ver perfil <Instagram size={18} /></a></Reveal><div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">{projects.map((project, index) => <a key={project.name} href="https://www.instagram.com/mundyconstrutorabh/" target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden rounded-[1.25rem]" aria-label={`Ver ${project.name} no Instagram`}><img src={project.image} alt={project.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute inset-0 grid place-items-center bg-brand/0 text-cream opacity-0 transition group-hover:bg-brand/45 group-hover:opacity-100"><Instagram /></span></a>)}</div></div></section>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return <section id="contato" className="bg-sand py-20 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-10"><Reveal><p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Contato</p><h2 className="mt-4 font-display text-5xl leading-tight text-brand sm:text-6xl">Encontre seu próximo endereço.</h2><p className="mt-6 max-w-md leading-relaxed text-brand/60">Conte o que você procura. Um consultor Mundy entrará em contato para apresentar as melhores oportunidades.</p><div className="mt-10 space-y-3 text-sm text-brand/65"><a href="tel:+5531971113344" className="flex items-center gap-3"><Phone size={17} /> (31) 97111-3344</a><p className="flex items-start gap-3"><Building2 size={17} className="mt-0.5 shrink-0" /> Rua Paulo Afonso, 54, Santo Antônio<br />Belo Horizonte - MG, CEP 30350-060</p></div></Reveal><Reveal delay={.1}><AnimatePresence mode="wait">{sent ? <motion.div key="sent" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="grid min-h-96 place-items-center rounded-[2rem] bg-card p-8 text-center"><div><span className="mx-auto grid size-16 place-items-center rounded-full bg-success text-cream"><Check size={28} /></span><h3 className="mt-6 font-display text-3xl">Mensagem recebida.</h3><p className="mt-3 text-sm text-brand/60">Obrigado pelo interesse. Nossa equipe falará com você em breve.</p><button type="button" onClick={() => setSent(false)} className="mt-6 text-sm font-bold text-brand underline underline-offset-4">Enviar outra mensagem</button></div></motion.div> : <motion.form key="form" exit={{ opacity: 0 }} onSubmit={submit} className="rounded-[2rem] bg-card p-6 shadow-sm sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-bold text-brand/65">Nome<input required name="name" className="mt-2 w-full rounded-xl border bg-background px-4 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent" /></label><label className="text-xs font-bold text-brand/65">E-mail<input required type="email" name="email" className="mt-2 w-full rounded-xl border bg-background px-4 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent" /></label><label className="text-xs font-bold text-brand/65">Celular<input required type="tel" name="phone" className="mt-2 w-full rounded-xl border bg-background px-4 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent" /></label><label className="text-xs font-bold text-brand/65">Interesse<select required name="interest" className="mt-2 w-full rounded-xl border bg-background px-4 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"><option value="">Selecione</option><option>Comprar para morar</option><option>Investir</option><option>Conhecer um empreendimento</option></select></label></div><button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-bold text-cream transition hover:-translate-y-0.5">Quero falar com um consultor <ArrowRight size={16} /></button><p className="mt-4 text-center text-[10px] text-brand/40">Ao enviar, você concorda em receber o contato da equipe Mundy.</p></motion.form>}</AnimatePresence></Reveal></div></section>;
}

function Footer() {
  return <footer className="bg-brand py-14 text-cream"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><div className="grid gap-10 border-b border-cream/10 pb-10 md:grid-cols-3"><div><p className="font-display text-4xl">Mundy</p><p className="mt-3 text-sm text-cream/50">Alto padrão na Zona Sul de Belo Horizonte.</p></div><div className="grid grid-cols-2 gap-3 text-sm text-cream/60"><a href="#construtora">A Construtora</a><a href="#empreendimentos">Empreendimentos</a><a href="#investidores">Investidores</a><a href="#contato">Contato</a></div><div className="text-sm leading-relaxed text-cream/60"><a href="tel:+5531971113344">(31) 97111-3344</a><br /><a href="mailto:contato@mundyconstrutora.com.br">contato@mundyconstrutora.com.br</a><br /><a href="https://www.instagram.com/mundyconstrutorabh/" target="_blank" rel="noreferrer">Instagram @mundyconstrutorabh</a></div></div><div className="mt-8 flex flex-col gap-3 text-[10px] uppercase text-cream/35 sm:flex-row sm:justify-between"><p>© 2026 Mundy Construtora</p><p>Rua Paulo Afonso, 54 · Santo Antônio · Belo Horizonte</p></div></div></footer>;
}

function HomePage() {
  return <div className="min-h-screen overflow-x-hidden bg-background text-brand"><Header /><main><Hero /><Projects /><Institution /><InvestorSection /><Differentials /><InstagramSection /><Contact /></main><Footer /><a href={WHATSAPP} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-success text-cream shadow-xl transition hover:-translate-y-1" aria-label="Falar com a Mundy no WhatsApp"><MessageCircle size={24} /></a></div>;
}