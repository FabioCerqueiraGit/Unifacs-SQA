import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Compass,
  GraduationCap,
  Lightbulb,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Search,
  Ticket as TicketIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  calculateTotal,
  checkNameRuntime,
  events,
  formatCurrency,
  type CampusEvent,
  type Ticket,
  type TicketCategory,
} from "@/lib/events";
import { buildContactDocument, contactSandbox } from "@/lib/contact";
import { loadCatalog } from "@/lib/catalog";

type Page = "eventos" | "ingressos" | "contato";
const pageFromHash = (): Page =>
  window.location.hash === "#ingressos"
    ? "ingressos"
    : window.location.hash === "#contato"
      ? "contato"
      : "eventos";
function EventArt({
  event,
  large = false,
}: {
  event: CampusEvent;
  large?: boolean;
}) {
  const Icon =
    event.icon === "code" ? Code2 : event.icon === "art" ? Palette : Lightbulb;
  return (
    <div
      className={`event-art art-${event.theme} ${large ? "art-large" : ""}`}
      aria-hidden="true"
    >
      <div className="art-grain" />
      <div className="art-circle" />
      <div className="art-outline" />
      <span className="art-word">
        {event.icon === "code"
          ? "tech."
          : event.icon === "art"
            ? "crie."
            : "conecta."}
      </span>
      <Icon className="art-icon" strokeWidth={1} />
      <span className="art-corner">
        EXPERIÊNCIAS
        <br />
        QUE CONECTAM
      </span>
    </div>
  );
}
function Brand() {
  return (
    <span className="brand">
      <span className="brand-symbol" aria-hidden="true">
        U
      </span>
      <span>
        <strong>UNIFACS</strong>
        <small>EVENTOS</small>
      </span>
    </span>
  );
}
function EventCard({
  event,
  onSelect,
}: {
  event: CampusEvent;
  onSelect: (event: CampusEvent) => void;
}) {
  return (
    <article className="event-card">
      <button
        className="art-button"
        onClick={() => onSelect(event)}
        aria-label={`Ver detalhes de ${event.title}`}
      >
        <EventArt event={event} />
        <span className="date-tile">
          <strong>{event.day}</strong>
          <small>{event.month}</small>
        </span>
      </button>
      <div className="event-card-body">
        <span className="eyebrow blue-text">{event.category}</span>
        <h3>{event.title}</h3>
        <p className="event-subtitle">{event.subtitle}</p>
        <div className="event-detail">
          <MapPin size={15} />
          <span>{event.venue}</span>
        </div>
        <div className="event-detail">
          <Clock3 size={15} />
          <span>{event.time}</span>
        </div>
        <div className="event-card-foot">
          <span>
            A partir de <strong>{formatCurrency(event.price / 2)}</strong>
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSelect(event)}
            aria-label={`Inscrever-se em ${event.title}`}
          >
            <ArrowUpRight />
          </Button>
        </div>
      </div>
    </article>
  );
}
function Booking({
  event,
  onRegister,
}: {
  event: CampusEvent;
  onRegister: (ticket: Ticket) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState<TicketCategory>("Inteira");
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponAttempted, setCouponAttempted] = useState(false);
  checkNameRuntime(name);
  const qty = Number(quantity) || 0;
  const costs = calculateTotal(event.price, qty, category, appliedCoupon);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onRegister({
      id: crypto.randomUUID(),
      event,
      name,
      email,
      cpf,
      quantity: qty,
      category,
      total: costs.total,
      createdAt: new Date().toISOString(),
    });
  }
  return (
    <div className="booking-grid">
      <aside className="booking-aside">
        <EventArt event={event} />
        <div className="booking-info">
          <span className="eyebrow blue-text">{event.category}</span>
          <DialogTitle className="booking-title">{event.title}</DialogTitle>
          <DialogDescription className="booking-description">
            {event.description}
          </DialogDescription>
          <div className="booking-meta">
            <span>
              <CalendarDays size={17} />
              {event.day} de {event.month.toLowerCase()} de 2026
            </span>
            <span>
              <Clock3 size={17} />
              {event.time}
            </span>
            <span>
              <MapPin size={17} />
              {event.venue}
            </span>
          </div>
          <h4>O que te espera</h4>
          <ul className="program-list">
            {event.program.map((item) => (
              <li key={item}>
                <span />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <section className="booking-form-wrap">
        <span className="eyebrow blue-text">VAMOS NOS ENCONTRAR</span>
        <h2>Garanta seu lugar.</h2>
        <p className="muted">Preencha os dados para fazer sua inscrição.</p>
        <form onSubmit={submit} className="booking-form">
          <div className="field">
            <label htmlFor="registration-name">
              Nome completo <span>*</span>
            </label>
            <Input
              id="registration-name"
              autoComplete="off"
              placeholder="Como podemos chamar você?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="registration-email">
              E-mail <span>*</span>
            </label>
            <Input
              id="registration-email"
              type="email"
              autoComplete="off"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="registration-cpf">
              CPF <span>*</span>
            </label>
            <Input
              id="registration-cpf"
              autoComplete="off"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="registration-quantity">
                Quantidade <span>*</span>
              </label>
              <Input
                id="registration-quantity"
                type="number"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="registration-category">Categoria</label>
              <div className="select-wrap">
                <select
                  id="registration-category"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as TicketCategory)
                  }
                >
                  <option>Inteira</option>
                  <option>Estudante</option>
                  <option>Comunidade</option>
                </select>
                <ChevronDown size={15} />
              </div>
            </div>
          </div>
          <div className="field">
            <label htmlFor="registration-coupon">
              Cupom de desconto <small>opcional</small>
            </label>
            <div className="coupon-row">
              <Input
                id="registration-coupon"
                placeholder="Digite seu cupom"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                  setCouponAttempted(false);
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setAppliedCoupon(coupon);
                  setCouponAttempted(true);
                }}
              >
                Aplicar
              </Button>
            </div>
            {couponAttempted && (
              <p
                className={`coupon-message ${appliedCoupon.trim().toUpperCase() === "UNIFACS10" ? "valid" : ""}`}
              >
                {appliedCoupon.trim().toUpperCase() === "UNIFACS10" ? (
                  <>
                    <Check size={13} /> Cupom aplicado
                  </>
                ) : (
                  "Cupom não encontrado."
                )}
              </p>
            )}
          </div>
          <div className="order-summary">
            <div>
              <span>Ingressos · {category.toLowerCase()}</span>
              <span>{formatCurrency(costs.subtotal)}</span>
            </div>
            {costs.discount !== 0 && (
              <div>
                <span>Desconto</span>
                <span>− {formatCurrency(costs.discount)}</span>
              </div>
            )}
            <div className="order-total">
              <strong>Total</strong>
              <strong data-testid="order-total">
                {formatCurrency(costs.total)}
              </strong>
            </div>
          </div>
          <Button className="w-full" size="lg" type="submit">
            Finalizar inscrição <ArrowRight />
          </Button>
          <p className="synthetic-notice">
            Projeto acadêmico. Utilize apenas dados fictícios. Nenhuma cobrança
            será realizada.
          </p>
        </form>
      </section>
    </div>
  );
}
function Contact() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  return (
    <div className="contact-grid">
      <section className="contact-intro">
        <span className="eyebrow blue-text">ESTAMOS POR AQUI</span>
        <h1>
          Boas conversas
          <br />
          começam com
          <br />
          <em>um olá.</em>
        </h1>
        <p>
          Tem uma dúvida sobre os eventos ou quer compartilhar uma ideia? Deixe
          sua mensagem.
        </p>
        <div className="contact-point">
          <span>
            <MessageCircle size={22} />
          </span>
          <div>
            <h3>Vamos conversar</h3>
            <p>Escreva pelo formulário ao lado.</p>
          </div>
        </div>
        <div className="contact-point">
          <span>
            <Compass size={22} />
          </span>
          <div>
            <h3>Experiências que aproximam</h3>
            <p>Salvador e Feira de Santana, Bahia.</p>
          </div>
        </div>
        <div className="contact-decoration" aria-hidden="true">
          <span>olá.</span>
          <ArrowUpRight size={72} strokeWidth={1} />
        </div>
      </section>
      <section className="contact-form-card">
        <h2>Como podemos ajudar?</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(message);
          }}
        >
          <div className="field">
            <label htmlFor="contact-name">Nome</label>
            <Input
              id="contact-name"
              placeholder="Seu nome"
              required
              autoComplete="off"
            />
          </div>
          <div className="field">
            <label htmlFor="contact-email">E-mail</label>
            <Input
              id="contact-email"
              type="email"
              placeholder="voce@exemplo.com"
              required
              autoComplete="off"
            />
          </div>
          <div className="field">
            <label htmlFor="contact-subject">Assunto</label>
            <div className="select-wrap">
              <select id="contact-subject">
                <option>Dúvidas sobre eventos</option>
                <option>Minha inscrição</option>
                <option>Sugestões e ideias</option>
                <option>Outros assuntos</option>
              </select>
              <ChevronDown size={15} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="contact-message">Mensagem</label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Conte um pouco mais…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <Button size="lg" className="w-full" type="submit">
            Enviar mensagem <ArrowUpRight />
          </Button>
          <p className="synthetic-notice">
            Demonstração acadêmica. Use apenas dados fictícios. As mensagens não
            são enviadas a terceiros.
          </p>
        </form>
        {submitted !== null && (
          <section className="message-preview">
            <h3>Sua mensagem</h3>
            <iframe
              title="Mensagem enviada"
              sandbox={contactSandbox}
              referrerPolicy="no-referrer"
              srcDoc={buildContactDocument(submitted)}
              key={submitted}
            />
          </section>
        )}
      </section>
    </div>
  );
}
function Tickets({
  tickets,
  navigate,
}: {
  tickets: Ticket[];
  navigate: (page: Page) => void;
}) {
  return (
    <section className="tickets-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow blue-text">SEUS PRÓXIMOS ENCONTROS</span>
          <h1>Meus ingressos</h1>
        </div>
        <span className="small-counter">
          {tickets.length} {tickets.length === 1 ? "inscrição" : "inscrições"}
        </span>
      </div>
      {tickets.length === 0 ? (
        <div className="empty-tickets">
          <div className="empty-icon">
            <TicketIcon size={42} strokeWidth={1.2} />
          </div>
          <h2>Seu próximo encontro está aqui.</h2>
          <p>
            Explore a agenda e escolha uma experiência.
            <br />
            Seus ingressos aparecerão neste espaço.
          </p>
          <Button size="lg" onClick={() => navigate("eventos")}>
            Explorar eventos <ArrowRight />
          </Button>
        </div>
      ) : (
        <div className="ticket-list">
          {tickets.map((ticket) => (
            <article className="admission-ticket" key={ticket.id}>
              <div className={`ticket-art-mini mini-${ticket.event.theme}`}>
                <span>{ticket.event.day}</span>
                <strong>{ticket.event.month}</strong>
              </div>
              <div className="admission-info">
                <span className="eyebrow blue-text">
                  {ticket.event.category}
                </span>
                <h2>{ticket.event.title}</h2>
                <p>
                  <Clock3 size={14} />
                  {ticket.event.time}
                  <span>·</span>
                  {ticket.category}
                </p>
                <p>
                  <MapPin size={14} />
                  {ticket.event.venue}
                </p>
                <div className="ticket-person">
                  <strong>{ticket.name}</strong>
                  <span>
                    {ticket.quantity}{" "}
                    {ticket.quantity === 1 ? "ingresso" : "ingressos"} ·{" "}
                    {formatCurrency(ticket.total)}
                  </span>
                </div>
              </div>
              <div className="ticket-stub">
                <TicketIcon size={29} strokeWidth={1.2} />
                <span>INSCRIÇÃO</span>
                <strong>{ticket.id.slice(0, 8).toUpperCase()}</strong>
                <small>Demonstrativo</small>
              </div>
            </article>
          ))}
        </div>
      )}
      <p className="session-note">
        Os ingressos desta demonstração ficam disponíveis apenas enquanto esta
        página estiver aberta.
      </p>
    </section>
  );
}
export default function App() {
  const [catalog, setCatalog] = useState<CampusEvent[]>(events);
  const [page, setPage] = useState<Page>(pageFromHash);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    void loadCatalog(controller.signal).then((data) => {
      if (!controller.signal.aborted) setCatalog(data);
    });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    const handle = () => {
      setPage(pageFromHash());
      setMobileMenu(false);
      setSelectedEvent(null);
      window.scrollTo?.({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", handle);
    return () => window.removeEventListener("hashchange", handle);
  }, []);
  function navigate(next: Page) {
    setPage(next);
    setMobileMenu(false);
    window.location.hash = next;
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  }
  const filtered = catalog.filter(
    (e) =>
      (category === "Todos" || e.category === category) &&
      `${e.title} ${e.venue} ${e.category}`
        .toLocaleLowerCase("pt-BR")
        .includes(search.toLocaleLowerCase("pt-BR")),
  );
  return (
    <>
      <div className="utility-bar">
        <div className="container">
          <span>CONHECIMENTO QUE VIRA EXPERIÊNCIA.</span>
          <span>
            Salvador <span className="utility-dot">•</span> Feira de Santana
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="brand-link"
            href="#eventos"
            onClick={() => navigate("eventos")}
            aria-label="UNIFACS Eventos, página inicial"
          >
            <Brand />
          </a>
          <nav
            className={`main-nav ${mobileMenu ? "is-open" : ""}`}
            aria-label="Navegação principal"
          >
            {(["eventos", "ingressos", "contato"] as const).map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={page === item ? "active" : ""}
                aria-current={page === item ? "page" : undefined}
                onClick={() => navigate(item)}
              >
                {item === "ingressos"
                  ? "Meus Ingressos"
                  : item === "eventos"
                    ? "Eventos"
                    : "Contato"}
              </a>
            ))}
          </nav>
          <Button
            className="header-action"
            onClick={() => {
              navigate("eventos");
              setTimeout(
                () =>
                  document
                    .getElementById("agenda")
                    ?.scrollIntoView({ behavior: "smooth" }),
                30,
              );
            }}
          >
            Encontre seu evento <ArrowUpRight />
          </Button>
          <button
            className="mobile-menu"
            aria-label={mobileMenu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenu}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        {page === "eventos" ? (
          <>
            <section className="hero">
              <div className="container hero-inner">
                <div className="hero-copy">
                  <span className="eyebrow">NOVAS IDEIAS. NOVAS CONEXÕES.</span>
                  <h1>
                    O futuro acontece
                    <br />
                    quando a gente
                    <br />
                    <em>se encontra.</em>
                  </h1>
                  <p>
                    Conhecimento, cultura e experiências para ir além.
                    <br className="desktop-break" /> Encontre o evento que tem a
                    ver com você.
                  </p>
                  <Button
                    className="hero-button"
                    size="lg"
                    onClick={() =>
                      document
                        .getElementById("agenda")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Explore a agenda <ArrowDown />
                  </Button>
                  <div className="hero-foot">
                    <span className="hero-rule" />
                    <span>VIVA NOVAS POSSIBILIDADES</span>
                  </div>
                </div>
                <div className="hero-visual" aria-hidden="true">
                  <div className="hero-orbit orbit-one" />
                  <div className="hero-orbit orbit-two" />
                  <div className="hero-red-disc" />
                  <div className="hero-note note-top">
                    <span>IDEIAS QUE</span>
                    <strong>conectam.</strong>
                  </div>
                  <div className="hero-note note-bottom">
                    <strong>VOCÊ +</strong>
                    <strong>O NOVO.</strong>
                    <ArrowUpRight size={70} strokeWidth={1.1} />
                  </div>
                  <span className="hero-spark spark-one">✳︎</span>
                  <span className="hero-spark spark-two">+</span>
                  <div className="hero-caption">
                    <span>VIVA A EXPERIÊNCIA</span>
                    <span>2026 / 27</span>
                  </div>
                </div>
              </div>
            </section>
            <div className="experience-strip">
              <div className="container">
                <span>
                  <Compass /> Novas perspectivas
                </span>
                <span>
                  <GraduationCap /> Conhecimento em movimento
                </span>
                <span>
                  <TicketIcon /> Experiências para lembrar
                </span>
              </div>
            </div>
            <section id="agenda" className="container agenda-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow blue-text">
                    ESCOLHA SUA PRÓXIMA EXPERIÊNCIA
                  </span>
                  <h2>Tem encontro marcado.</h2>
                </div>
                <p>
                  Descubra, participe, transforme.
                  <br />O próximo passo começa aqui.
                </p>
              </div>
              <div className="agenda-tools">
                <div
                  className="category-tabs"
                  aria-label="Filtrar eventos por categoria"
                >
                  {["Todos", "Inovação", "Tecnologia", "Cultura"].map(
                    (item) => (
                      <button
                        key={item}
                        aria-pressed={category === item}
                        className={category === item ? "selected" : ""}
                        onClick={() => setCategory(item)}
                      >
                        {item}
                      </button>
                    ),
                  )}
                </div>
                <div className="search-field">
                  <Search size={17} />
                  <input
                    aria-label="Buscar evento"
                    placeholder="Buscar evento"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              {filtered.length ? (
                <div className="events-grid">
                  {filtered.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onSelect={setSelectedEvent}
                    />
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <Search size={30} />
                  <h3>Nenhum evento por aqui.</h3>
                  <p>Experimente outra busca ou categoria.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearch("");
                      setCategory("Todos");
                    }}
                  >
                    Ver todos os eventos
                  </Button>
                </div>
              )}
              <div className="agenda-caption">
                <span>
                  {filtered.length}{" "}
                  {filtered.length === 1
                    ? "experiência disponível"
                    : "experiências disponíveis"}
                </span>
                <span>Agenda demonstrativa · 2026</span>
              </div>
            </section>
            <section className="connection-section">
              <div className="container connection-inner">
                <div className="connection-icon" aria-hidden="true">
                  <MessageCircle size={62} strokeWidth={1} />
                  <span>+</span>
                </div>
                <div>
                  <span className="eyebrow blue-text">
                    CADA CONEXÃO ABRE UM CAMINHO
                  </span>
                  <h2>Uma ideia? Vamos conversar.</h2>
                  <p>Estamos por aqui para ouvir você.</p>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("contato")}
                >
                  Entre em contato <ArrowUpRight />
                </Button>
              </div>
            </section>
          </>
        ) : (
          <div className="container inner-page">
            <button className="back-link" onClick={() => navigate("eventos")}>
              <ArrowLeft size={15} /> Voltar para eventos
            </button>
            {page === "ingressos" ? (
              <Tickets tickets={tickets} navigate={navigate} />
            ) : (
              <Contact />
            )}
          </div>
        )}
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <Brand />
            <p>
              Ideias se encontram.
              <br />
              <strong>O futuro acontece.</strong>
            </p>
            <nav aria-label="Navegação do rodapé">
              <a href="#eventos" onClick={() => navigate("eventos")}>
                Eventos
              </a>
              <a href="#ingressos" onClick={() => navigate("ingressos")}>
                Meus Ingressos
              </a>
              <a href="#contato" onClick={() => navigate("contato")}>
                Contato
              </a>
            </nav>
            <span className="footer-place">
              <MapPin size={17} /> Bahia, Brasil
            </span>
          </div>
          <div className="footer-bottom">
            <span>
              © 2026 · Projeto acadêmico independente, sem vínculo
              institucional.
            </span>
            <span>Eventos e informações demonstrativos.</span>
          </div>
        </div>
      </footer>
      <Dialog
        open={!!selectedEvent}
        onOpenChange={(open) => {
          if (!open) setSelectedEvent(null);
        }}
      >
        <DialogContent>
          {selectedEvent && (
            <Booking
              key={selectedEvent.id}
              event={selectedEvent}
              onRegister={(ticket) =>
                setTickets((current) => [ticket, ...current])
              }
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
