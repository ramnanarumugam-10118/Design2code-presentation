import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_DARK } from '../assets';
import type { SlideComponent } from './index';

const CARDS = [
  {
    n: '01',
    title: 'AI-powered design',
    body: 'UI from a prompt.',
    icon: (
      <>
        <path d="M9.5 3.5L11 8 15.5 9.5 11 11 9.5 15.5 8 11 3.5 9.5 8 8z" />
        <path d="M18 13l0.7 2 2 0.7-2 0.7-0.7 2-0.7-2-2-0.7 2-0.7z" />
        <path d="M17.5 4l0.5 1.3 1.3 0.5-1.3 0.5-0.5 1.3-0.5-1.3-1.3-0.5 1.3-0.5z" />
      </>
    ),
  },
  {
    n: '02',
    title: 'Design to code',
    body: 'Figma to production. No handoff.',
    icon: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
  },
  {
    n: '03',
    title: 'Content generation',
    body: 'Words for every screen.',
    icon: (
      <>
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="17" x2="14" y2="17" />
      </>
    ),
  },
  {
    n: '04',
    title: 'Visual assets',
    body: 'Icons and illustrations on demand.',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </>
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
    <motion.div variants={softFade} style={{ position: 'absolute', top: 32, right: 80, zIndex: 5 }}>
      <img src={LOGO_DARK} style={{ height: 20, opacity: 0.5 }} alt="ACKO" />
    </motion.div>
    <div className="content" style={{ justifyContent: 'space-between' }}>
      <motion.div variants={fadeUp}>
        <div className="eyebrow">What?</div>
        <h2 className="h-lg" style={{ color: '#fff' }}>
          Four things<br />we're building.
        </h2>
      </motion.div>
      <div className="g4" style={{ flex: 1, marginTop: 36, alignItems: 'stretch' }}>
        {CARDS.map((c) => (
          <motion.div
            key={c.n}
            variants={fadeUp}
            className="card"
            style={{
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderTop: '3px solid #580092',
              gap: 64,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#d1aef9',
                  letterSpacing: '0.18em',
                }}
              >
                {c.n}
              </p>
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ad56ff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {c.icon}
              </svg>
            </div>
            <div>
              <p className="h-md" style={{ color: '#fff', marginBottom: 10 }}>
                {c.title}
              </p>
              <p className="body-sm">{c.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

Slide03.theme = 'dark';
export default Slide03;
