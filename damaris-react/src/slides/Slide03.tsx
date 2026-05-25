import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';

const ICON_PROPS = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.6',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const SCOPE_ITEMS = [
  {
    n: '01',
    title: 'A foundational design system',
    body: 'Tokens, atoms, molecules — built ground-up. A single standardised visual language across every surface.',
    icon: (
      <svg {...ICON_PROPS}>
        <polygon points="12 2 22 12 12 22 2 12 12 2" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'AI-powered design tooling',
    body: 'Generate UI from prompts in Figma or Cursor. Refine and ship without manual rebuilding in code.',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M9.5 3.5L11 8 15.5 9.5 11 11 9.5 15.5 8 11 3.5 9.5 8 8z" />
        <path d="M18 13l0.7 2 2 0.7-2 0.7-0.7 2-0.7-2-2-0.7 2-0.7z" />
        <path d="M17.5 4l0.5 1.3 1.3 0.5-1.3 0.5-0.5 1.3-0.5-1.3-1.3-0.5 1.3-0.5z" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Design-to-code translation',
    body: 'Designs translated to React, Flutter, Next JS — production-ready code, no manual handoff.',
    icon: (
      <svg {...ICON_PROPS}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    n: '04',
    title: 'Accessibility & compliance',
    body: 'WCAG 2.0 baked into every component. IRDAI compliant — ahead of the enforcement deadline.',
    icon: (
      <svg {...ICON_PROPS}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

const Slide03: SlideComponent = () => (
  <motion.div
    style={{ position: 'absolute', inset: 0 }}
    variants={staggerParent}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <motion.div
      variants={softFade}
      style={{ position: 'absolute', top: 32, right: 80, zIndex: 5 }}
    >
      <img src={LOGO_LIGHT} style={{ height: 20, opacity: 0.7 }} alt="ACKO" />
    </motion.div>

    <div className="content" style={{ justifyContent: 'space-between' }}>
      <motion.div variants={fadeUp}>
        <div className="eyebrow">In scope</div>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(48px, 6.4vw, 84px)',
            lineHeight: 1.05,
            letterSpacing: '-1.6px',
            color: '#000000',
          }}
        >
          Four bets,<br />
          <span
            style={{
              background:
                'linear-gradient(135deg, #580092 0%, #ad56ff 60%, #d1aef9 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            one system.
          </span>
        </h2>
      </motion.div>

      <div className="g4" style={{ flex: 1, marginTop: 36, alignItems: 'stretch' }}>
        {SCOPE_ITEMS.map((c) => (
          <motion.div
            key={c.n}
            variants={fadeUp}
            className="card-light"
            style={{
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 60,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#580092',
                  letterSpacing: '0.18em',
                }}
              >
                {c.n}
              </p>
              <div style={{ color: '#580092' }}>{c.icon}</div>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(18px, 1.8vw, 22px)',
                  color: '#000000',
                  marginBottom: 10,
                  lineHeight: 1.25,
                  letterSpacing: '-0.3px',
                }}
              >
                {c.title}
              </p>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 400,
                  color: '#585858',
                  lineHeight: 1.55,
                }}
              >
                {c.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

Slide03.theme = 'light';
export default Slide03;
