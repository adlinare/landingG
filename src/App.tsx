import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  BellRing,
  Building2,
  CalendarClock,
  ChevronRight,
  Clock3,
  Fingerprint,
  Gauge,
  HeartHandshake,
  Layers3,
  LockKeyhole,
  MessageSquareCode,
  Rocket,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
  WandSparkles,
} from "lucide-react";

type Capability = {
  icon: LucideIcon;
  title: string;
  body: string;
  accent: "mint" | "amber" | "blue" | "coral";
};

type FeatureHighlight = {
  tone: "get" | "post" | "put";
  tag: string;
  title: string;
  body: string;
};

type DemoScenario = {
  id: string;
  label: string;
  badge: string;
  tone: "get" | "post" | "put";
  headline: string;
  title: string;
  description: string;
  details: Array<{ label: string; value: string }>;
};

const navItems = [
  { label: "Motor", href: "#motor" },
  { label: "Funciones", href: "#funciones" },
  { label: "Flujo", href: "#flujo" },
  { label: "Mockups", href: "#visuales" },
];

const capabilities: Capability[] = [
  {
    icon: CalendarClock,
    title: "Agenda inteligente",
    body: "Vista diaria, estados de cita, huecos libres y una agenda que todo el equipo entiende al instante.",
    accent: "mint",
  },
  {
    icon: Rocket,
    title: "Reservas online 24/7",
    body: "Tus clientes eligen servicio, profesional y hora sin llamadas, esperas ni mensajes perdidos.",
    accent: "amber",
  },
  {
    icon: HeartHandshake,
    title: "Clientes que vuelven",
    body: "Favoritos, historial, valoraciones y una experiencia de reserva que se siente cuidada desde el movil.",
    accent: "blue",
  },
  {
    icon: UsersRound,
    title: "Equipo sincronizado",
    body: "Trabajadores, horarios, ausencias, invitaciones y fichajes conectados con la operativa real del negocio.",
    accent: "coral",
  },
];

const featureHighlights: FeatureHighlight[] = [
  { tone: "post", tag: "Reservas", title: "Reserva online", body: "Cliente, servicio, profesional y hora en un flujo claro." },
  { tone: "get", tag: "Agenda", title: "Vista del dia", body: "Citas confirmadas, pendientes y canceladas sin ruido." },
  { tone: "get", tag: "Servicios", title: "Catalogo vivo", body: "Precios, duraciones, imagenes y trabajadores asignados." },
  { tone: "put", tag: "Equipo", title: "Horarios reales", body: "Turnos, ausencias y disponibilidad siempre sincronizados." },
  { tone: "get", tag: "Clientes", title: "Perfil completo", body: "Datos, favoritos, historial y preferencias de reserva." },
  { tone: "post", tag: "Avisos", title: "Recordatorios", body: "Notificaciones para reducir ausencias y cambios tardios." },
  { tone: "put", tag: "Gestion", title: "Confirmar y reasignar", body: "Control total cuando una cita necesita moverse." },
  { tone: "get", tag: "Reviews", title: "Reputacion", body: "Valoraciones visibles para generar confianza y conversion." },
];

const demoScenarios: DemoScenario[] = [
  {
    id: "booking",
    label: "Reserva",
    badge: "Online",
    tone: "post",
    headline: "Cliente reservando ahora",
    title: "Tu cliente reserva en menos de un minuto",
    description: "Gipsi convierte la intencion en una cita clara: servicio, profesional, hora y confirmacion desde el movil.",
    details: [
      { label: "Servicio", value: "Corte + barba" },
      { label: "Profesional", value: "Carlos Lopez" },
      { label: "Hora", value: "Martes 10:30" },
      { label: "Estado", value: "Pendiente de confirmar" },
    ],
  },
  {
    id: "schedule",
    label: "Agenda",
    badge: "Hoy",
    tone: "get",
    headline: "Agenda del negocio",
    title: "Todo el dia bajo control",
    description: "El negocio ve que ocurre, quien atiende cada cita y donde quedan huecos para vender mas sin improvisar.",
    details: [
      { label: "09:30", value: "Color - Ana - Confirmada" },
      { label: "10:30", value: "Corte - Carlos - Pendiente" },
      { label: "12:00", value: "Manicura - Sofia - Confirmada" },
      { label: "Huecos", value: "14 disponibles" },
    ],
  },
  {
    id: "team",
    label: "Equipo",
    badge: "Turnos",
    tone: "put",
    headline: "Operativa interna",
    title: "El equipo trabaja con la misma verdad",
    description: "Horarios, ausencias, servicios asignados y fichaje conectados para que la disponibilidad sea real.",
    details: [
      { label: "Trabajadores", value: "8 activos" },
      { label: "Ausencias", value: "2 revisadas" },
      { label: "Fichaje", value: "Entrada abierta" },
      { label: "Turno", value: "09:00 - 17:00" },
    ],
  },
];

const workflow = [
  {
    icon: Scissors,
    title: "Configura",
    body: "Servicios, precios, duraciones, imagenes y profesionales.",
  },
  {
    icon: CalendarClock,
    title: "Recibe reservas",
    body: "Tus clientes eligen hora disponible sin interrumpir al equipo.",
  },
  {
    icon: Gauge,
    title: "Gestiona el dia",
    body: "Confirma, cancela, reasigna y consulta huecos desde el panel.",
  },
  {
    icon: BellRing,
    title: "Fideliza",
    body: "Recordatorios, reviews y una experiencia que invita a volver.",
  },
];

const imageSlots = [
  {
    title: "Hero principal",
    file: "/mockups/hero-product.png",
    body: "Composicion de marca con app cliente, agenda y panel del negocio.",
  },
  {
    title: "App cliente",
    file: "/mockups/customer-app.png",
    body: "Exploracion, ficha del negocio, reserva, favoritos y perfil.",
  },
  {
    title: "Panel negocio",
    file: "/mockups/business-dashboard.png",
    body: "Agenda diaria, equipo, servicios, reservas y estados de cita.",
  },
];

function App() {
  const [activeScenarioId, setActiveScenarioId] = useState(demoScenarios[0].id);

  const activeScenario = useMemo(
    () => demoScenarios.find((scenario) => scenario.id === activeScenarioId) ?? demoScenarios[0],
    [activeScenarioId],
  );

  return (
    <div className="site-shell">
      <Header />

      <main>
        <section className="hero" id="top">
          <div className="hero-media" aria-hidden="true">
            <div className="hero-grid" />
            <div className="hero-signal signal-one">
              <Gauge size={18} />
              <span>Agenda viva</span>
            </div>
            <div className="hero-signal signal-two">
              <Activity size={18} />
              <span>Reserva online</span>
            </div>
          </div>

          <HeroAgendaCard />

          <div className="hero-content section-inner">
            <div className="eyebrow">
              <span className="pulse-dot" />
              App de reservas para negocios modernos
            </div>
            <h1>Gipsi</h1>
            <p className="hero-copy">
              Reservas online, agenda del equipo, clientes, servicios y notificaciones en una app pensada para que
              tu negocio llene huecos sin vivir pegado al telefono.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#funciones">
                Ver funciones
                <ArrowRight size={18} />
              </a>
              <a className="button button-ghost" href="#visuales">
                Preparar mockups
                <Sparkles size={18} />
              </a>
            </div>
            <div className="hero-metrics" aria-label="Resumen de Gipsi">
              <Metric value="24/7" label="reservas online" />
              <Metric value="1" label="agenda central" />
              <Metric value="3" label="roles conectados" />
            </div>
          </div>

          <div className="hero-image-slot">
            <ImageSlot title="Mockup de la app" file="/mockups/hero-product.png" compact />
          </div>
        </section>

        <section className="section section-tight" id="motor">
          <div className="section-inner">
            <div className="section-heading">
              <span className="section-kicker">Motor de crecimiento</span>
              <h2>Reservas, clientes y equipo en la misma pantalla.</h2>
              <p>
                Gipsi ordena el dia a dia de negocios de belleza, barberia, bienestar y servicios locales: menos
                llamadas perdidas, menos huecos muertos y mas citas confirmadas.
              </p>
            </div>

            <div className="capability-grid">
              {capabilities.map((capability) => (
                <CapabilityCard key={capability.title} capability={capability} />
              ))}
            </div>
          </div>
        </section>

        <section className="section surface-band" id="funciones">
          <div className="section-inner feature-layout">
            <div className="section-heading compact-heading">
              <span className="section-kicker">Funciones clave</span>
              <h2>Del primer clic a la cita confirmada.</h2>
              <p>
                Una experiencia completa para el cliente y una herramienta de gestion diaria para el negocio, sin
                convertir la agenda en un puzzle.
              </p>
            </div>

            <ProductDemo
              activeScenario={activeScenario}
              scenarios={demoScenarios}
              onSelect={setActiveScenarioId}
            />
          </div>

          <div className="section-inner feature-rail" aria-label="Funciones destacadas">
            {featureHighlights.map((feature) => (
              <div className="feature-pill" key={`${feature.tag}-${feature.title}`}>
                <span className={`feature-tag feature-tag-${feature.tone}`}>{feature.tag}</span>
                <h3>{feature.title}</h3>
                <span>{feature.body}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="flujo">
          <div className="section-inner integration-grid">
            <div className="section-heading compact-heading">
              <span className="section-kicker">Flujo completo</span>
              <h2>Funciona antes, durante y despues de cada cita.</h2>
              <p>
                Gipsi acompana todo el ciclo: muestra tu negocio, permite reservar, organiza al equipo y mantiene
                al cliente informado para que vuelva.
              </p>
            </div>

            <FlowPreview />
          </div>

          <div className="section-inner workflow">
            {workflow.map((step, index) => (
              <div className="workflow-step" key={step.title}>
                <div className="step-index">{String(index + 1).padStart(2, "0")}</div>
                <step.icon size={24} />
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section security-band">
          <div className="section-inner security-layout">
            <div>
              <span className="section-kicker">Control para el negocio</span>
              <h2>Menos caos operativo. Mas citas que llegan a la silla.</h2>
            </div>
            <div className="security-grid">
              <SecurityItem icon={ShieldCheck} title="Datos protegidos" body="Cuentas, sesiones y perfiles con acceso separado por rol." />
              <SecurityItem icon={Fingerprint} title="Roles claros" body="Cliente, negocio y trabajador ven lo que necesitan." />
              <SecurityItem icon={MessageSquareCode} title="Estados visibles" body="Pendiente, confirmada, cancelada o reasignada sin confusion." />
              <SecurityItem icon={Layers3} title="Operacion diaria" body="Agenda, equipo, servicios, ausencias y reviews en un mismo lugar." />
            </div>
          </div>
        </section>

        <section className="section" id="visuales">
          <div className="section-inner">
            <div className="section-heading">
              <span className="section-kicker">Slots visuales</span>
              <h2>Huecos listos para tus imagenes reales.</h2>
              <p>
                La pagina reserva espacios para mockups, screenshots y composiciones de producto sin romper la
                maquetacion.
              </p>
            </div>

            <div className="visual-grid">
              {imageSlots.map((slot) => (
                <ImageSlot key={slot.file} title={slot.title} file={slot.file} body={slot.body} />
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="section-inner cta-inner">
            <div>
              <span className="section-kicker">Lanza con ventaja</span>
              <h2>Haz que tus clientes reserven mientras tu equipo trabaja.</h2>
            </div>
            <a className="button button-primary button-large" href="mailto:hola@gipsi.com">
              Quiero una demo
              <ChevronRight size={20} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Gipsi">
        <span className="brand-mark">g</span>
        <span>Gipsi</span>
      </a>
      <nav className="nav-links" aria-label="Navegacion principal">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="header-action" href="#funciones">
        Demo
        <CalendarClock size={17} />
      </a>
    </header>
  );
}

function HeroAgendaCard() {
  return (
    <div className="hero-agenda-card">
      <div className="agenda-card-header">
        <div>
          <span>Hoy</span>
          <strong>Agenda del negocio</strong>
        </div>
        <div className="live-chip">
          <Activity size={15} />
          En directo
        </div>
      </div>
      <div className="agenda-card-list">
        <AppointmentRow time="10:30" title="Corte + barba" person="Carlos" status="Confirmada" />
        <AppointmentRow time="12:00" title="Manicura" person="Ana" status="Pendiente" muted />
        <AppointmentRow time="16:30" title="Color y peinado" person="Sofia" status="Nueva reserva" />
      </div>
      <div className="agenda-card-footer">
        <div>
          <strong>14</strong>
          <span>huecos libres hoy</span>
        </div>
        <span className="mini-action">Optimizar agenda</span>
      </div>
    </div>
  );
}

function AppointmentRow({
  time,
  title,
  person,
  status,
  muted = false,
}: {
  time: string;
  title: string;
  person: string;
  status: string;
  muted?: boolean;
}) {
  return (
    <div className={`appointment-row ${muted ? "is-muted" : ""}`}>
      <div className="appointment-time">
        <Clock3 size={16} />
        <span>{time}</span>
      </div>
      <div>
        <strong>{title}</strong>
        <span>{person}</span>
      </div>
      <em>{status}</em>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <article className={`capability-card accent-${capability.accent}`}>
      <div className="capability-icon">
        <capability.icon size={26} />
      </div>
      <h3>{capability.title}</h3>
      <p>{capability.body}</p>
      <div className="card-line" />
    </article>
  );
}

function ProductDemo({
  activeScenario,
  scenarios,
  onSelect,
}: {
  activeScenario: DemoScenario;
  scenarios: DemoScenario[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="product-demo">
      <div className="explorer-tabs" role="tablist" aria-label="Escenarios de producto">
        {scenarios.map((scenario) => (
          <button
            className={scenario.id === activeScenario.id ? "is-active" : ""}
            key={scenario.id}
            type="button"
            role="tab"
            aria-selected={scenario.id === activeScenario.id}
            onClick={() => onSelect(scenario.id)}
          >
            {scenario.label}
          </button>
        ))}
      </div>

      <div className="explorer-content">
        <div>
          <span className={`feature-tag feature-tag-${activeScenario.tone}`}>{activeScenario.badge}</span>
          <span className="scenario-label">{activeScenario.headline}</span>
          <h3>{activeScenario.title}</h3>
          <p>{activeScenario.description}</p>
        </div>

        <div className="product-preview-card">
          <div className="preview-header">
            <div>
              <span>Vista negocio</span>
              <strong>{activeScenario.label}</strong>
            </div>
            <Star size={18} />
          </div>
          <div className="preview-details">
            {activeScenario.details.map((detail) => (
              <div className="preview-detail" key={detail.label}>
                <span>{detail.label}</span>
                <strong>{detail.value}</strong>
              </div>
            ))}
          </div>
          <div className="preview-progress">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowPreview() {
  const steps = [
    "Descubre tu negocio",
    "Elige servicio",
    "Selecciona hora",
    "Confirma la cita",
    "Recibe recordatorio",
    "Vuelve a reservar",
  ];

  return (
    <div className="flow-preview-card">
      <div className="flow-phone">
        <div className="phone-speaker" />
        <div className="phone-header">
          <span>Reserva en Gipsi</span>
          <strong>Corte + barba</strong>
        </div>
        <div className="time-grid" aria-label="Horarios disponibles">
          <span>10:00</span>
          <span className="is-selected">10:30</span>
          <span>11:00</span>
          <span>12:00</span>
          <span>16:30</span>
          <span>18:00</span>
        </div>
        <div className="confirm-strip">
          <CalendarClock size={18} />
          <div>
            <strong>Martes 10:30</strong>
            <span>Con Carlos Lopez</span>
          </div>
        </div>
      </div>

      <div className="flow-steps">
        {steps.map((step, index) => (
          <div className="flow-step-line" key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityItem({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <article className="security-item">
      <Icon size={23} />
      <div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </article>
  );
}

function ImageSlot({
  title,
  file,
  body,
  compact = false,
}: {
  title: string;
  file: string;
  body?: string;
  compact?: boolean;
}) {
  return (
    <article className={`image-slot ${compact ? "compact" : ""}`}>
      <div className="slot-frame">
        <WandSparkles size={compact ? 24 : 30} />
        <span>{title}</span>
        <small>{file}</small>
      </div>
      {body ? <p>{body}</p> : null}
    </article>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-inner footer-inner">
        <a className="brand" href="#top" aria-label="Gipsi">
          <span className="brand-mark">g</span>
          <span>Gipsi</span>
        </a>
        <div className="footer-links">
          <span>Reservas online</span>
          <span>Agenda</span>
          <span>Clientes</span>
          <span>Equipo</span>
          <span>Notificaciones</span>
        </div>
      </div>
    </footer>
  );
}

export default App;
