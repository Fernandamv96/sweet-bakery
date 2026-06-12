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

const NAV_LINKS = ["Inicio", "Productos", "Nosotros", "Galería", "Contacto"];

const PRODUCTS = [
  {
    id: 1,
    name: "Cupcake Velvet",
    price: "\.900",
    tag: "Favorito",
    emoji: "🧁",
    desc: "Red velvet con frosting de crema batida y corazón de frutilla",
    color: "#fce4ec",
  },
  {
    id: 2,
    name: "Donut Glaseado",
    price: "\.500",
    tag: "Nuevo",
    emoji: "🍩",
    desc: "Masa esponjosa bañada en glaseado rosa con sprinkles artesanales",
    color: "#fdf3f7",
  },
  {
    id: 3,
    name: "Macaron Duo",
    price: "\.200",
    tag: "Premium",
    emoji: "🫧",
    desc: "Par de macarons parisinos en sabores fresa y vainilla con flor comestible",
    color: "#fce4ec",
  },
  {
    id: 4,
    name: "Torta Cumpleaños",
    price: "\.000",
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

function FloatingDeco() {
  const items = ["✦", "♡", "✿", "·", "✦", "♡", "✿", "·", "✦", "♡"];
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {items.map((sym, i) => (
        <motion.span
          key={i}
          className="absolute select-none"
          style={{
            left: \\%\,
            top: \\%\,
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
        borderBottom: scrolled ? \1px solid \44\ : "none",
        transition: "all 0.4s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between"
    >
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

      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
        style={{ background: "none", border: "none", cursor: "pointer", color: C.darkSoft }}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

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
              borderBottom: \2px solid \\,
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
                    borderBottom: \1px solid \44\,
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

export default function App() {
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
      <div style={{ fontSize: "50px", textAlign: "center", paddingTop: "200px" }}>
        🎀 Andrea Sweet Bakery 🎀
      </div>
      <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
        ¡Tu tienda de postres artesanales está cargando...
      </div>
    </div>
  );
}
