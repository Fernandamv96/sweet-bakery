import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Instagram,
  MessageCircle,
  MapPin,
  Star,
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  Sparkles,
} from "lucide-react";

/* ─── PALETA ─────────────────────────────────────────── */
const C = {
  rose: "#f9a8c0",
  roseStrong: "#ff5f9e",
  roseSoft: "#fde8f0",
  roseMid: "#f4b8cf",
  cream: "#fff8f5",
  white: "#ffffff",
  grayLight: "#f5f5f5",
  grayMid: "#d4d4d4",
  grayText: "#9e9e9e",
  dark: "#3d2c2c",
  darkSoft: "#6b4e4e",
};

/* ─── DATOS ───────────────────────────────────────────── */
const NAV_LINKS = ["Inicio", "Productos", "Nosotros", "Galería", "Contacto"];

const PRODUCTS = [
  {
    id: 1,
    name: "Cupcake Velvet",
    price: "$3.900",
    tag: "Favorito",
    emoji: "🧁",
    desc: "Red velvet con frosting de crema batida y corazón de frutilla",
    color: "#fce4ec",
  },
  {
    id: 2,
    name: "Donut Glaseado",
    price: "$2.500",
    tag: "Nuevo",
    emoji: "🍩",
    desc: "Masa esponjosa bañada en glaseado rosa con sprinkles artesanales",
    color: "#fdf3f7",
  },
  {
    id: 3,
    name: "Macaron Duo",
    price: "$4.200",
    tag: "Premium",
    emoji: "🫧",
    desc: "Par de macarons parisinos en sabores fresa y vainilla con flor comestible",
    color: "#fce4ec",
  },
  {
    id: 4,
    name: "Torta Cumpleaños",
    price: "$28.000",
    tag: "Especial",
    emoji: "🎂",
    desc: "Torta personalizada de 2 pisos, betún de mantequilla y decoración floral",
    color: "#fdf3f7",
  },
];

const GALLERY = [
  { emoji: "🧁", label: "Cupcakes rosados", bg: "#fce4ec" },
  { emoji: "🍩", label: "Donuts glaseados", bg: "#fdf3f7" },
  { emoji: "🎂", label: "Tortas personalizadas", bg: "#fff0f5" },
  { emoji: "🫧", label: "Macarons", bg: "#fce4ec" },
  { emoji: "🍰", label: "Cheesecake", bg: "#fff8f5" },
  { emoji: "🍪", label: "Galletas decoradas", bg: "#fdf3f7" },
];

/* ─── HELPERS ─────────────────────────────────────────── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── FLOATING DECORATIONS ────────────────────────────── */
function FloatingDeco() {
  const items = ["✦", "♡", "✿", "·", "✦", "♡", "✿", "·", "✦", "♡"];
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {items.map((sym, i) => (
        <motion.span
          key={i}
          className="absolute select-none"
          style={{
            left: `${(i * 11 + 5) % 100}%`,
            top: `${(i * 17 + 8) % 100}%`,
            fontSize: i % 3 === 0 ? "10px" : "8px",
            color: i % 2 === 0 ? C.rose : C.roseMid,
            opacity: 0.35,
          }}
          animate={{ y: [0, -18, 0], rotate: [0, 15, 0] }}
          transition={{
            duration: 5 + (i % 4),
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        >
          {sym}
        </motion.span>
      ))}
    </div>
  );
}

/* ─── NAVBAR ──────────────────────────────────────────── */
function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.roseMid}44` : "none",
        transition: "all 0.4s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span style={{ fontSize: 22 }}>🎀</span>
        <div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: C.roseStrong, fontWeight: 700, lineHeight: 1.1 }}>
            Andrea Sweet
          </p>
          <p style={{ fontSize: 9, color: C.grayText, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Bakery
          </p>
        </div>
      </div>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((l) => (
          <li key={l}>
            <button
              onClick={() => scrollTo(l)}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 15,
                color: C.darkSoft,
                letterSpacing: "0.04em",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = C.roseStrong)}
              onMouseLeave={(e) => (e.target.style.color = C.darkSoft)}
            >
              {l}
            </button>
          </li>
        ))}
      </ul>

      {/* Cart icon */}
      <div className="hidden md:flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: C.roseStrong,
            color: C.white,
            border: "none",
            borderRadius: 40,
            padding: "8px 20px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            letterSpacing: "0.04em",
          }}
        >
          <ShoppingBag size={14} />
          Pedido
        </motion.button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
        style={{ background: "none", border: "none", cursor: "pointer", color: C.darkSoft }}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: `2px solid ${C.rose}`,
              padding: "24px 24px 32px",
            }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <button
                  onClick={() => scrollTo(l)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 0",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 18,
                    color: C.darkSoft,
                    background: "none",
                    border: "none",
                    borderBottom: `1px solid ${C.roseMid}44`,
                    cursor: "pointer",
                  }}
                >
                  {l}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── HERO ────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="inicio"
      style={{
        minHeight: "100vh",
        background: `radial-gradient(ellipse 80% 60% at 60% 40%, ${C.roseSoft}, ${C.cream} 70%)`,
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 80,
      }}
    >
      {/* Background blobs */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.rose}55, transparent)`,
          top: "10%",
          right: "-10%",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.roseMid}44, transparent)`,
          bottom: "5%",
          left: "5%",
          filter: "blur(50px)",
        }}
      />

      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT TEXT */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: `${C.rose}33`,
                border: `1px solid ${C.rose}`,
                borderRadius: 40,
                padding: "5px 14px",
                fontSize: 11,
                color: C.roseStrong,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              <Sparkles size={11} /> Artesanal · Hecho con amor
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(40px, 6vw, 72px)",
              lineHeight: 1.05,
              color: C.dark,
              marginBottom: 8,
            }}
          >
            Andrea
            <br />
            <span style={{ color: C.roseStrong }}>Sweet</span>
            <br />
            Bakery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20,
              color: C.darkSoft,
              marginBottom: 36,
              lineHeight: 1.6,
              maxWidth: 380,
              fontStyle: "italic",
            }}
          >
            Handmade with Love — cada postre cuenta una historia dulce, horneada para ti con ingredientes frescos y pasión real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: `0 12px 32px ${C.roseStrong}44` }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: `linear-gradient(135deg, ${C.roseStrong}, #e84f8a)`,
                color: C.white,
                border: "none",
                borderRadius: 50,
                padding: "14px 32px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.05em",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <ShoppingBag size={16} /> Ver Productos
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "transparent",
                color: C.roseStrong,
                border: `1.5px solid ${C.roseStrong}`,
                borderRadius: 50,
                padding: "14px 32px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
            >
              Hacer Pedido
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex gap-8 mt-10"
          >
            {[["500+", "Clientes felices"], ["5★", "Valoración"], ["100%", "Artesanal"]].map(([num, label]) => (
              <div key={label}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: C.roseStrong, fontWeight: 700 }}>{num}</p>
                <p style={{ fontSize: 11, color: C.grayText, letterSpacing: "0.06em" }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative flex justify-center"
        >
          {/* Main circle */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "clamp(280px, 40vw, 440px)",
              height: "clamp(280px, 40vw, 440px)",
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 35%, ${C.white}, ${C.roseSoft})`,
              boxShadow: `0 30px 80px ${C.rose}55, 0 0 0 1px ${C.roseMid}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(100px, 14vw, 170px)",
              position: "relative",
            }}
          >
            🧁
            {/* Orbiting hearts */}
            {["♡", "✦", "🍩", "✿"].map((s, i) => (
              <motion.span
                key={i}
                style={{
                  position: "absolute",
                  fontSize: i % 2 === 0 ? 22 : 16,
                  color: i % 2 === 0 ? C.roseStrong : C.rose,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                transformTemplate={({ rotate }) =>
                  `rotate(${rotate}) translateX(${165 + i * 18}px) rotate(-${rotate})`
                }
              >
                {s}
              </motion.span>
            ))}
          </motion.div>

          {/* Floating cards */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            style={{
              position: "absolute",
              top: "8%",
              left: "0%",
              background: C.white,
              borderRadius: 16,
              padding: "10px 16px",
              boxShadow: `0 8px 30px ${C.rose}33`,
              border: `1px solid ${C.roseMid}55`,
              fontSize: 12,
              color: C.darkSoft,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 20 }}>⭐</span>
            <div>
              <p style={{ fontWeight: 700, color: C.dark, fontSize: 11 }}>Torta Personalizada</p>
              <p style={{ color: C.grayText, fontSize: 10 }}>Pedido hoy ✓</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
            style={{
              position: "absolute",
              bottom: "10%",
              right: "0%",
              background: C.white,
              borderRadius: 16,
              padding: "10px 16px",
              boxShadow: `0 8px 30px ${C.rose}33`,
              border: `1px solid ${C.roseMid}55`,
              fontSize: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Heart size={14} fill={C.roseStrong} color={C.roseStrong} />
              <p style={{ color: C.roseStrong, fontWeight: 700, fontSize: 11 }}>¡Nuevo pedido!</p>
            </div>
            <p style={{ color: C.grayText, fontSize: 10, marginTop: 2 }}>Cupcake Velvet × 12</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          color: C.roseMid,
        }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}

/* ─── PROMO BANNER ────────────────────────────────────── */
function PromoBanner() {
  return (
    <section
      style={{
        background: `linear-gradient(135deg, ${C.roseStrong} 0%, #e84f8a 50%, #d9457e 100%)`,
        padding: "20px 24px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 60, whiteSpace: "nowrap", width: "max-content" }}
      >
        {Array(6).fill(null).map((_, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 13, color: C.white, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              🎀 20% OFF en productos seleccionados
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>✦</span>
            <span style={{ fontSize: 13, color: C.white, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              🍩 Envío gratis sobre $15.000
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>✦</span>
            <span style={{ fontSize: 13, color: C.white, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              🎂 Tortas personalizadas disponibles
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── PRODUCTS ────────────────────────────────────────── */
function Products() {
  const [cart, setCart] = useState([]);
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (id) => {
    setCart((c) => [...c, id]);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="productos" style={{ background: C.cream, padding: "96px 0" }}>
      <div className="container mx-auto px-6 md:px-12">
        <FadeUp className="text-center mb-16">
          <span style={{ fontSize: 11, color: C.roseStrong, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            ✦ Menú
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 52px)", color: C.dark, marginTop: 8 }}>
            Productos <span style={{ color: C.roseStrong }}>Destacados</span>
          </h2>
          <p style={{ color: C.grayText, fontSize: 15, maxWidth: 500, margin: "12px auto 0", fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic" }}>
            Cada pieza es única, elaborada a mano con ingredientes seleccionados
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, boxShadow: `0 20px 50px ${C.rose}44` }}
                style={{
                  background: C.white,
                  borderRadius: 24,
                  overflow: "hidden",
                  border: `1px solid ${C.roseMid}33`,
                  cursor: "pointer",
                  transition: "box-shadow 0.3s",
                }}
              >
                {/* Product image area */}
                <div
                  style={{
                    background: p.color,
                    height: 180,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 72,
                    position: "relative",
                  }}
                >
                  <motion.span
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.4 }}
                  >
                    {p.emoji}
                  </motion.span>
                  {/* Tag */}
                  <span
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      background: C.roseStrong,
                      color: C.white,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: 40,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {p.tag}
                  </span>
                  {/* Heart */}
                  <motion.button
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 14,
                      background: C.white,
                      border: "none",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: `0 2px 8px ${C.rose}44`,
                    }}
                  >
                    <Heart size={14} color={C.roseStrong} />
                  </motion.button>
                </div>

                <div style={{ padding: "18px 18px 20px" }}>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={10} fill={C.roseStrong} color={C.roseStrong} />
                    ))}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: C.dark, marginBottom: 4 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: 12, color: C.grayText, lineHeight: 1.5, marginBottom: 14 }}>{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: C.roseStrong, fontWeight: 700 }}>
                      {p.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAdd(p.id)}
                      style={{
                        background: addedId === p.id ? "#22c55e" : `linear-gradient(135deg, ${C.roseStrong}, #e84f8a)`,
                        color: C.white,
                        border: "none",
                        borderRadius: 40,
                        padding: "8px 18px",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "background 0.3s",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      {addedId === p.id ? (
                        <><span>✓</span> ¡Listo!</>
                      ) : (
                        <><ShoppingBag size={12} /> Comprar</>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ───────────────────────────────────────────── */
function About() {
  return (
    <section id="nosotros" style={{ background: C.white, padding: "96px 0" }}>
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
        {/* Visual side */}
        <FadeUp>
          <div style={{ position: "relative" }}>
            {/* Big circle */}
            <div
              style={{
                width: "clamp(260px, 38vw, 420px)",
                height: "clamp(260px, 38vw, 420px)",
                borderRadius: "50%",
                background: `radial-gradient(circle at 40% 35%, ${C.roseSoft}, ${C.roseMid}44)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(90px, 12vw, 140px)",
                margin: "0 auto",
                position: "relative",
              }}
            >
              👩‍🍳
              {/* Small decorative circles */}
              {[["🧁", -30, 20], ["🍩", "auto", -30], ["🌸", 10, "auto"]].map(([e, t, b], i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7 }}
                  style={{
                    position: "absolute",
                    top: t !== "auto" ? t : undefined,
                    bottom: b !== "auto" ? b : undefined,
                    right: i === 0 ? -30 : undefined,
                    left: i === 2 ? -20 : undefined,
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: C.white,
                    boxShadow: `0 8px 24px ${C.rose}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                  }}
                >
                  {e}
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Text side */}
        <FadeUp delay={0.2}>
          <span style={{ fontSize: 11, color: C.roseStrong, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            ✦ Nuestra Historia
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 44px)", color: C.dark, margin: "12px 0 20px", lineHeight: 1.15 }}>
            Hecho con amor,<br />
            <span style={{ color: C.roseStrong }}>ingrediente por ingrediente</span>
          </h2>
          <p style={{ color: C.darkSoft, lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
            Somos una repostería artesanal fundada con el sueño de llevar dulzura auténtica a cada mesa. Cada postre que preparamos es elaborado a mano, con ingredientes frescos, locales y seleccionados con cuidado.
          </p>
          <p style={{ color: C.darkSoft, lineHeight: 1.8, fontSize: 15, marginBottom: 28 }}>
            No usamos conservantes ni mezclas industriales — solo harina, mantequilla, azúcar, amor y mucha dedicación. Creemos que un postre bien hecho puede convertir cualquier momento en algo especial.
          </p>

          {/* Pills */}
          <div className="flex flex-wrap gap-3">
            {["Sin conservantes", "Ingredientes frescos", "Personalizamos tu pedido", "Entrega a domicilio"].map((tag) => (
              <span
                key={tag}
                style={{
                  background: C.roseSoft,
                  border: `1px solid ${C.roseMid}`,
                  color: C.roseStrong,
                  borderRadius: 40,
                  padding: "6px 14px",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── GALLERY ─────────────────────────────────────────── */
function Gallery() {
  return (
    <section id="galería" style={{ background: C.cream, padding: "96px 0" }}>
      <div className="container mx-auto px-6 md:px-12">
        <FadeUp className="text-center mb-12">
          <span style={{ fontSize: 11, color: C.roseStrong, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            ✦ Galería
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", color: C.dark, marginTop: 8 }}>
            Nuestra <span style={{ color: C.roseStrong }}>Vitrina</span>
          </h2>
          <p style={{ color: C.grayText, fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", marginTop: 8 }}>
            Una probada visual de lo que puedes ordenar
          </p>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((item, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                style={{
                  aspectRatio: "1",
                  borderRadius: 20,
                  background: item.bg,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  border: `1px solid ${C.roseMid}33`,
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <motion.span
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: i * 0.5 }}
                  style={{ fontSize: "clamp(48px, 8vw, 80px)" }}
                >
                  {item.emoji}
                </motion.span>
                <p style={{ fontSize: 12, color: C.darkSoft, fontWeight: 600, letterSpacing: "0.04em" }}>
                  {item.label}
                </p>
                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `${C.roseStrong}dd`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <Instagram size={28} color={C.white} style={{ margin: "0 auto 8px" }} />
                    <p style={{ color: C.white, fontSize: 12, fontWeight: 700 }}>Ver en Instagram</p>
                  </div>
                </motion.div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4} className="text-center mt-10">
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)`,
              color: C.white,
              borderRadius: 50,
              padding: "12px 28px",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            <Instagram size={16} /> Seguirnos en Instagram
          </motion.a>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── CONTACT ─────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.msg) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", msg: "" });
  };

  const INPUT = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: `1px solid ${C.roseMid}`,
    background: C.white,
    fontSize: 14,
    color: C.dark,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contacto" style={{ background: C.white, padding: "96px 0" }}>
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-start">
        {/* Info */}
        <FadeUp>
          <span style={{ fontSize: 11, color: C.roseStrong, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            ✦ Contacto
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 44px)", color: C.dark, margin: "12px 0 20px" }}>
            ¡Haz tu <span style={{ color: C.roseStrong }}>Pedido</span>!
          </h2>
          <p style={{ color: C.darkSoft, fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
            Escríbenos con tu pedido, número de porciones y fecha de entrega. Personalizamos sabores y diseños.
          </p>

          {[
            { icon: <MessageCircle size={20} color={C.roseStrong} />, label: "WhatsApp", val: "+56 9 1234 5678", href: "https://wa.me/56912345678" },
            { icon: <Instagram size={20} color={C.roseStrong} />, label: "Instagram", val: "@andreasweetbakery", href: "https://instagram.com" },
            { icon: <MapPin size={20} color={C.roseStrong} />, label: "Dirección", val: "Av. Los Dulces 123, Santiago", href: "#" },
            { icon: <Mail size={20} color={C.roseStrong} />, label: "Email", val: "hola@andreasweetbakery.cl", href: "mailto:hola@andreasweetbakery.cl" },
          ].map(({ icon, label, val, href }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ x: 4 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                textDecoration: "none",
                marginBottom: 20,
                padding: "14px 18px",
                borderRadius: 16,
                border: `1px solid ${C.roseMid}44`,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.roseSoft)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: C.roseSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
              <div>
                <p style={{ fontSize: 11, color: C.grayText, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>
                  {label}
                </p>
                <p style={{ fontSize: 14, color: C.dark, fontWeight: 600 }}>{val}</p>
              </div>
            </motion.a>
          ))}
        </FadeUp>

        {/* Form */}
        <FadeUp delay={0.2}>
          <div
            style={{
              background: C.cream,
              borderRadius: 28,
              padding: 32,
              border: `1px solid ${C.roseMid}33`,
            }}
          >
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: C.dark, marginBottom: 24 }}>
              Formulario de contacto
            </h3>

            {[["name", "Nombre completo", "text"], ["email", "Correo electrónico", "email"]].map(([key, ph, type]) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <input
                  type={type}
                  placeholder={ph}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  style={INPUT}
                  onFocus={(e) => (e.target.style.borderColor = C.roseStrong)}
                  onBlur={(e) => (e.target.style.borderColor = C.roseMid)}
                />
              </div>
            ))}

            <textarea
              placeholder="Cuéntanos tu pedido (producto, cantidad, fecha de entrega, diseño deseado...)"
              rows={5}
              value={form.msg}
              onChange={(e) => setForm({ ...form, msg: e.target.value })}
              style={{ ...INPUT, resize: "vertical", marginBottom: 20 }}
              onFocus={(e) => (e.target.style.borderColor = C.roseStrong)}
              onBlur={(e) => (e.target.style.borderColor = C.roseMid)}
            />

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: `0 12px 32px ${C.roseStrong}44` }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              style={{
                width: "100%",
                background: sent ? "#22c55e" : `linear-gradient(135deg, ${C.roseStrong}, #e84f8a)`,
                color: C.white,
                border: "none",
                borderRadius: 14,
                padding: "14px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.06em",
                transition: "background 0.4s",
              }}
            >
              {sent ? "✓ ¡Mensaje enviado!" : "Enviar mensaje 🎀"}
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: C.dark, padding: "48px 24px 32px" }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span style={{ fontSize: 24 }}>🎀</span>
              <div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.white, fontWeight: 700 }}>
                  Andrea Sweet Bakery
                </p>
              </div>
            </div>
            <p style={{ color: "#9e8e8e", fontSize: 14, lineHeight: 1.8 }}>
              Postres artesanales hechos con amor, ingredientes frescos y mucha dedicación para cada ocasión especial.
            </p>
          </div>

          {/* Links */}
          <div>
            <p style={{ color: C.rose, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
              Menú
            </p>
            {["Cupcakes", "Donuts", "Macarons", "Tortas personalizadas", "Ediciones especiales"].map((item) => (
              <p key={item} style={{ color: "#9e8e8e", fontSize: 14, marginBottom: 8, cursor: "pointer" }}
                onMouseEnter={(e) => (e.target.style.color = C.rose)}
                onMouseLeave={(e) => (e.target.style.color = "#9e8e8e")}
              >
                {item}
              </p>
            ))}
          </div>

          {/* Social */}
          <div>
            <p style={{ color: C.rose, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
              Síguenos
            </p>
            <div className="flex gap-4 mb-6">
              {[Instagram, MessageCircle].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, y: -3 }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.rose,
                    textDecoration: "none",
                    border: `1px solid rgba(255,255,255,0.1)`,
                  }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
            <p style={{ color: "#9e8e8e", fontSize: 13 }}>
              Lunes a Sábado<br />
              <span style={{ color: C.rose, fontWeight: 600 }}>9:00 AM – 7:00 PM</span>
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <p style={{ color: "#7e6e6e", fontSize: 13 }}>© 2025 Andrea Sweet Bakery — Todos los derechos reservados</p>
          <p style={{ color: "#7e6e6e", fontSize: 13 }}>Hecho con <span style={{ color: C.roseStrong }}>♡</span> en Santiago, Chile</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT APP ────────────────────────────────────────── */
export default function App() {
  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ fontFamily: "'Helvetica Neue', sans-serif", overflowX: "hidden" }}>
      <FloatingDeco />
      <Navbar />
      <Hero />
      <PromoBanner />
      <Products />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
