import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BellRing,
  Building2,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Compass,
  Fingerprint,
  Gauge,
  Heart,
  HeartHandshake,
  Layers3,
  LockKeyhole,
  MessageSquareCode,
  Minus,
  Pause,
  Play,
  Plus,
  Rocket,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
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

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type BusinessType = {
  title: string;
  tag: string;
  body: string;
  image: string;
  imageAlt: string;
  detail: string;
};

type AppScreen = {
  icon: LucideIcon;
  title: string;
  label: string;
  file: string;
  alt: string;
  body: string;
};

const navItems = [
  { label: "Motor", href: "#motor" },
  { label: "Tipos", href: "#tipos" },
  { label: "Funciones", href: "#funciones" },
  { label: "Flujo", href: "#flujo" },
  { label: "App", href: "#visuales" },
  { label: "FAQ", href: "#faq" },
];

const brandLogoSrc = "/mockups/logo_light.png";

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
    body: "Favoritos, historial, valoraciones y una experiencia de reserva que se siente cuidada desde el móvil.",
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
  { tone: "get", tag: "Agenda", title: "Vista del día", body: "Citas confirmadas, pendientes y canceladas sin ruido." },
  { tone: "get", tag: "Servicios", title: "Catálogo vivo", body: "Precios, duraciones, imágenes y trabajadores asignados." },
  { tone: "put", tag: "Equipo", title: "Horarios reales", body: "Turnos, ausencias y disponibilidad siempre sincronizados." },
  { tone: "get", tag: "Clientes", title: "Perfil completo", body: "Datos, favoritos, historial y preferencias de reserva." },
  { tone: "post", tag: "Avisos", title: "Recordatorios", body: "Notificaciones para reducir ausencias y cambios tardíos." },
  { tone: "put", tag: "Gestión", title: "Confirmar y reasignar", body: "Control total cuando una cita necesita moverse." },
  { tone: "get", tag: "Reviews", title: "Reputación", body: "Valoraciones visibles para generar confianza y conversión." },
];

const demoScenarios: DemoScenario[] = [
  {
    id: "booking",
    label: "Reserva",
    badge: "Online",
    tone: "post",
    headline: "Cliente reservando ahora",
    title: "Tu cliente reserva en menos de un minuto",
    description: "Gipsi convierte la intención en una cita clara: servicio, profesional, hora y confirmación desde el móvil.",
    details: [
      { label: "Servicio", value: "Corte + barba" },
      { label: "Profesional", value: "Carlos López" },
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
    title: "Todo el día bajo control",
    description: "El negocio ve qué ocurre, quién atiende cada cita y dónde quedan huecos para vender más sin improvisar.",
    details: [
      { label: "09:30", value: "Color - Ana - Confirmada" },
      { label: "10:30", value: "Corte - Carlos - Pendiente" },
      { label: "12:00", value: "Manicura - Sofía - Confirmada" },
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
    body: "Servicios, precios, duraciones, imágenes y profesionales.",
  },
  {
    icon: CalendarClock,
    title: "Recibe reservas",
    body: "Tus clientes eligen hora disponible sin interrumpir al equipo.",
  },
  {
    icon: Gauge,
    title: "Gestiona el día",
    body: "Confirma, cancela, reasigna y consulta huecos desde el panel.",
  },
  {
    icon: BellRing,
    title: "Fideliza",
    body: "Recordatorios, reviews y una experiencia que invita a volver.",
  },
];

const businessTypes: BusinessType[] = [
  {
    title: "Barbería",
    tag: "Cortes, barba y fades",
    body: "Agenda por silla, profesional y duración real de cada servicio.",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=82",
    imageAlt: "Barbero perfilando el corte de un cliente.",
    detail: "Reservas rápidas",
  },
  {
    title: "Peluquería",
    tag: "Color, peinado y tratamientos",
    body: "Organiza servicios largos, huecos entre citas y disponibilidad del equipo.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=82",
    imageAlt: "Interior de una peluquería moderna con sillones y espejos.",
    detail: "Agenda por profesional",
  },
  {
    title: "Salón de uñas",
    tag: "Manicura y pedicura",
    body: "Permite reservar por técnica, duración, precio y profesional asignado.",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=82",
    imageAlt: "Manicura con uñas esmaltadas en tonos oscuros.",
    detail: "Servicios por duración",
  },
  {
    title: "Centro de estética",
    tag: "Faciales, masajes y cabina",
    body: "Controla cabinas, tratamientos, clientes recurrentes y recordatorios.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=82",
    imageAlt: "Tratamiento facial en un centro de estética.",
    detail: "Cabinas bajo control",
  },
  {
    title: "Cejas y pestañas",
    tag: "Lifting, extensiones y diseño",
    body: "Reserva servicios de precisión con tiempos claros y seguimiento del cliente.",
    image: "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=900&q=82",
    imageAlt: "Aplicación de extensiones de pestañas.",
    detail: "Citas de precisión",
  },
  {
    title: "Otros",
    tag: "Bienestar y servicios locales",
    body: "Adapta Gipsi a cualquier negocio que trabaje con citas, equipo y clientes.",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=82",
    imageAlt: "Herramientas de maquillaje y cuidado personal sobre una mesa.",
    detail: "Flujo flexible",
  },
];

const faqItems: FaqItem[] = [
  {
    id: "que-es",
    question: "¿Qué es Gipsi?",
    answer:
      "Gipsi es una app de reservas y gestión pensada para negocios de belleza, barbería, bienestar y servicios locales. Reúne agenda, clientes, servicios, equipo y notificaciones en un mismo flujo.",
  },
  {
    id: "ayuda-negocio",
    question: "¿Cómo puede ayudar a mi negocio?",
    answer:
      "Ayuda a reducir llamadas y mensajes manuales, permite recibir reservas online 24/7, organiza la agenda diaria y da visibilidad al equipo sobre citas, huecos libres, clientes y estados de reserva.",
  },
  {
    id: "baja",
    question: "¿Puedo darme de baja en cualquier momento?",
    answer:
      "Sí. La idea es que Gipsi sea flexible: puedes dejar de usar el servicio cuando lo necesites, sin atarte a procesos complicados ni afectar a la información esencial de tu negocio.",
  },
];

const appScreens: AppScreen[] = [
  {
    icon: Compass,
    title: "Descubrimiento cercano",
    label: "Inicio",
    file: "/mockups/PHOTO-2026-05-27-10-37-22.jpg",
    alt: "Pantalla de inicio de Gipsi con saludo, categorías, negocios cercanos y recomendaciones.",
    body: "Una entrada clara para encontrar negocios relevantes, explorar categorías y pasar de la inspiración a la reserva sin fricción.",
  },
  {
    icon: Search,
    title: "Búsqueda con intención",
    label: "Búsqueda",
    file: "/mockups/PHOTO-2026-05-27-10-39-07.jpg",
    alt: "Pantalla de búsqueda de Gipsi filtrada por cejas y pestañas con un resultado destacado.",
    body: "Filtros, categorías y favoritos ayudan al cliente a comparar opciones y encontrar el servicio que necesita en pocos toques.",
  },
  {
    icon: Heart,
    title: "Negocios siempre a mano",
    label: "Favoritos",
    file: "/mockups/PHOTO-2026-05-27-10-39-41.jpg",
    alt: "Pantalla de favoritos de Gipsi con negocios guardados por el cliente.",
    body: "Los favoritos reducen pasos en reservas recurrentes y convierten una buena experiencia en una relación que se repite.",
  },
  {
    icon: Building2,
    title: "Ficha pensada para convertir",
    label: "Negocio",
    file: "/mockups/PHOTO-2026-05-27-11-03-14.jpg",
    alt: "Ficha de negocio con dirección, teléfono y servicios disponibles para reservar.",
    body: "Cada negocio presenta información útil, servicios, precios y llamadas a la acción para que el cliente reserve con confianza.",
  },
  {
    icon: CalendarClock,
    title: "Confirmación sin dudas",
    label: "Reserva",
    file: "/mockups/PHOTO-2026-05-27-11-04-56.jpg",
    alt: "Confirmación de solicitud enviada para una reserva.",
    body: "Después de solicitar una cita, el cliente recibe un estado claro y accesos directos para consultar sus próximas reservas.",
  },
  {
    icon: Scissors,
    title: "Citas fáciles de gestionar",
    label: "Cita",
    file: "/mockups/PHOTO-2026-05-27-11-06-24.jpg",
    alt: "Detalle de cita confirmada con fecha, horario, servicio, profesional y notas.",
    body: "La vista de cita reúne lo esencial: estado, horario, servicio, notas y acciones disponibles sin hacer perder tiempo.",
  },
  {
    icon: UsersRound,
    title: "Perfil del cliente",
    label: "Perfil",
    file: "/mockups/PHOTO-2026-05-27-11-08-18.jpg",
    alt: "Pantalla de perfil del cliente con datos de cuenta, seguridad, notificaciones, ayuda y cierre de sesión.",
    body: "El perfil centraliza cuenta, seguridad, preferencias y soporte para que la experiencia siga siendo simple después de reservar.",
  },
];

const heroScreens = appScreens.slice(0, 3);

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
          </div>

          <div className="hero-content section-inner">
            <div className="eyebrow">
              <span className="pulse-dot" />
              App de reservas para negocios modernos
            </div>
            <div className="hero-title-lockup">
              <img className="hero-title-logo" src={brandLogoSrc} alt="" aria-hidden="true" />
              <h1>Gipsi</h1>
            </div>
            <p className="hero-copy">
              Reservas online, agenda del equipo, clientes, servicios y notificaciones en una app pensada para que
              tu negocio llene huecos sin vivir pegado al teléfono.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#funciones">
                Ver funciones
                <ArrowRight size={18} />
              </a>
              <a className="button button-ghost" href="#visuales">
                Ver vistas
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
            <HeroMockups screens={heroScreens} />
          </div>
        </section>

        <section className="section section-tight" id="motor">
          <div className="section-inner">
            <div className="section-heading">
              <span className="section-kicker">Motor de crecimiento</span>
              <h2>Reservas, clientes y equipo en la misma pantalla.</h2>
              <p>
                Gipsi ordena el día a día de negocios de belleza, barbería, bienestar y servicios locales: menos
                llamadas perdidas, menos huecos muertos y más citas confirmadas.
              </p>
            </div>

            <div className="capability-grid">
              {capabilities.map((capability) => (
                <CapabilityCard key={capability.title} capability={capability} />
              ))}
            </div>
          </div>
        </section>

        <BusinessTypesSection />

        <section className="section surface-band" id="funciones">
          <div className="section-inner feature-layout">
            <div className="section-heading compact-heading">
              <span className="section-kicker">Funciones clave</span>
              <h2>Del primer clic a la cita confirmada.</h2>
              <p>
                Una experiencia completa para el cliente y una herramienta de gestión diaria para el negocio, sin
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
              <h2>Funciona antes, durante y después de cada cita.</h2>
              <p>
                Gipsi acompaña todo el ciclo: muestra tu negocio, permite reservar, organiza al equipo y mantiene
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
              <h2>Menos caos operativo. Más citas que llegan a la silla.</h2>
            </div>
            <div className="security-grid">
              <SecurityItem icon={ShieldCheck} title="Datos protegidos" body="Cuentas, sesiones y perfiles con acceso separado por rol." />
              <SecurityItem icon={Fingerprint} title="Roles claros" body="Cliente, negocio y trabajador ven lo que necesitan." />
              <SecurityItem icon={MessageSquareCode} title="Estados visibles" body="Pendiente, confirmada, cancelada o reasignada sin confusión." />
              <SecurityItem icon={Layers3} title="Operación diaria" body="Agenda, equipo, servicios, ausencias y reviews en un mismo lugar." />
            </div>
          </div>
        </section>

        <section className="section" id="visuales">
          <div className="section-inner">
            <div className="section-heading">
              <span className="section-kicker">Experiencia de cliente</span>
              <h2>Una reserva que se entiende a la primera.</h2>
              <p>
                Un recorrido visual por la experiencia que verá tu cliente: descubrir opciones, elegir servicio,
                pedir cita y gestionar todo desde el móvil.
              </p>
            </div>

            <AppScreenCarousel screens={appScreens} />
          </div>
        </section>

        <FaqSection />

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
        <img className="brand-logo" src={brandLogoSrc} alt="" aria-hidden="true" />
        <span>Gipsi</span>
      </a>
      <nav className="nav-links" aria-label="Navegación principal">
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

function BusinessTypesSection() {
  return (
    <section className="section business-types-section" id="tipos">
      <div className="section-inner business-types-heading">
        <div className="section-heading compact-heading">
          <span className="section-kicker">Para cada negocio</span>
          <h2>Gipsi para tu negocio.</h2>
          <p>
            Gipsi se adapta a servicios con cita previa, equipos con horarios y clientes que quieren reservar sin
            esperar respuesta.
          </p>
        </div>

        <div className="business-types-note">
          <Building2 size={24} />
          <span>Elige tu tipo de negocio y deja espacio para crecer con nuevos servicios.</span>
        </div>
      </div>

      <div className="section-inner business-types-grid" aria-label="Tipos de negocio compatibles con Gipsi">
        {businessTypes.map((type) => (
          <article className="business-type-card" key={type.title}>
            <div className="business-type-media">
              <img src={type.image} alt={type.imageAlt} loading="lazy" />
              <span>{type.detail}</span>
            </div>
            <div className="business-type-content">
              <span>{type.tag}</span>
              <h3>{type.title}</h3>
              <p>{type.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
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
            <span>Con Carlos López</span>
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

function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqItems[0].id);

  return (
    <section className="section faq-section" id="faq">
      <div className="section-inner faq-layout">
        <div className="section-heading compact-heading">
          <span className="section-kicker">Preguntas frecuentes</span>
          <h2>Dudas rápidas antes de empezar.</h2>
          <p>
            Respuestas claras para entender qué hace Gipsi, cómo encaja en tu operativa y qué libertad tienes al usarlo.
          </p>
        </div>

        <div className="faq-list">
          {faqItems.map((item) => {
            const isOpen = item.id === openFaqId;
            const answerId = `faq-answer-${item.id}`;

            return (
              <article className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.id}>
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon" aria-hidden="true">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                {isOpen ? (
                  <div className="faq-answer" id={answerId}>
                    <p>{item.answer}</p>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HeroMockups({ screens }: { screens: AppScreen[] }) {
  return (
    <div className="hero-mockups" aria-label="Vistas de la app Gipsi">
      {screens.map((screen, index) => {
        const Icon = screen.icon;

        return (
          <figure className={`hero-phone hero-phone-${index + 1}`} key={screen.file}>
            <img src={screen.file} alt="" aria-hidden="true" draggable={false} loading={index === 0 ? "eager" : "lazy"} />
            <figcaption>
              <Icon size={16} aria-hidden="true" />
              <span>{screen.label}</span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

function AppScreenCarousel({ screens }: { screens: AppScreen[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const isDraggingRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const track = trackRef.current;
      const shouldMove = track && !isPaused && !isDraggingRef.current;

      if (shouldMove) {
        const delta = time - lastTime;
        const maxScroll = track.scrollWidth - track.clientWidth;

        track.scrollLeft += delta * 0.04;

        if (track.scrollLeft >= maxScroll - 1) {
          track.scrollLeft = 0;
        }
      }

      lastTime = time;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [isPaused]);

  const scrollCards = (direction: -1 | 1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(".app-screen-card");

    if (!track || !card) {
      return;
    }

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartX.current = event.clientX;
    dragStartScroll.current = track.scrollLeft;
    track.setPointerCapture(event.pointerId);
  };

  const drag = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;

    if (!track || !isDraggingRef.current) {
      return;
    }

    track.scrollLeft = dragStartScroll.current - (event.clientX - dragStartX.current);
  };

  const stopDrag = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;

    if (!track || !isDraggingRef.current) {
      return;
    }

    isDraggingRef.current = false;
    setIsDragging(false);

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="app-carousel">
      <div className="carousel-controls" aria-label="Controles del carrusel">
        <button className="carousel-button" type="button" aria-label="Vista anterior" title="Vista anterior" onClick={() => scrollCards(-1)}>
          <ChevronLeft size={18} />
        </button>
        <button
          className="carousel-button"
          type="button"
          aria-label={isPaused ? "Reanudar carrusel" : "Pausar carrusel"}
          aria-pressed={isPaused}
          title={isPaused ? "Reanudar" : "Pausar"}
          onClick={() => setIsPaused((current) => !current)}
        >
          {isPaused ? <Play size={18} /> : <Pause size={18} />}
        </button>
        <button className="carousel-button" type="button" aria-label="Vista siguiente" title="Vista siguiente" onClick={() => scrollCards(1)}>
          <ChevronRight size={18} />
        </button>
      </div>

      <div
        ref={trackRef}
        className={`app-screen-carousel ${isDragging ? "is-dragging" : ""}`}
        aria-label="Vistas reales de la app Gipsi"
        onPointerDown={startDrag}
        onPointerMove={drag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
      >
        {screens.map((screen, index) => (
          <AppScreenCard key={screen.file} screen={screen} priority={index === 0} />
        ))}
      </div>
    </div>
  );
}

function AppScreenCard({ screen, priority = false }: { screen: AppScreen; priority?: boolean }) {
  const Icon = screen.icon;

  return (
    <article className="app-screen-card">
      <div className="app-screen-phone">
        <img src={screen.file} alt={screen.alt} draggable={false} loading={priority ? "eager" : "lazy"} />
      </div>
      <div className="app-screen-copy">
        <span className="screen-label">
          <Icon size={16} aria-hidden="true" />
          {screen.label}
        </span>
        <h3>{screen.title}</h3>
        <p>{screen.body}</p>
      </div>
    </article>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-inner footer-inner">
        <a className="brand" href="#top" aria-label="Gipsi">
          <img className="brand-logo" src={brandLogoSrc} alt="" aria-hidden="true" />
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
