import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_DARK } from '../assets';
import type { SlideComponent } from './index';

interface Shift {
  title: string;
  desc: string;
  iconColor: string;
  chipBg: string;
  icon: React.ReactNode;
}

const ICON_PROPS = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.8',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const SHIFTS: Shift[] = [
  {
    title: 'Cycle time compression',
    desc:
      'The path from idea to launch is significantly shorter. Manual rebuild and iterative QA loops are largely eliminated.',
    iconColor: '#fbbf24',
    chipBg: 'rgba(251,191,36,0.14)',
    icon: (
      <svg {...ICON_PROPS}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: 'Engineering efficiency',
    desc:
      'Code output follows framework conventions and design standards. Engineers spend their time on integration and logic, not recreating UI.',
    iconColor: '#22d3ee',
    chipBg: 'rgba(34,211,238,0.14)',
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    ),
  },
  {
    title: 'Design unbottlenecked',
    desc:
      'Anyone with the right judgement can create or modify designs. Capability is decoupled from Figma expertise.',
    iconColor: '#c084fc',
    chipBg: 'rgba(192,132,252,0.14)',
    icon: (
      <svg {...ICON_PROPS}>
        <polygon points="12 2 22 12 12 22 2 12 12 2" />
      </svg>
    ),
  },
  {
    title: 'Systemic visual consistency',
    desc:
      'Because everything flows from one token-based system, consistency is enforced structurally — not through manual review.',
    iconColor: '#ec4899',
    chipBg: 'rgba(236,72,153,0.14)',
    icon: (
      <svg {...ICON_PROPS}>
        <line x1="21" y1="6" x2="3" y2="6" />
        <line x1="15" y1="12" x2="3" y2="12" />
        <line x1="17" y1="18" x2="3" y2="18" />
      </svg>
    ),
  },
  {
    title: 'Easy change management',
    desc:
      'Token-based architecture means a colour, spacing, or component change propagates everywhere from one update.',
    iconColor: '#fb923c',
    chipBg: 'rgba(251,146,60,0.14)',
    icon: (
      <svg {...ICON_PROPS}>
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
  {
    title: 'Accessibility — ahead of the deadline',
    desc:
      'WCAG 2.0 is built into the system. We are positioned ahead of the IRDAI enforcement timeline.',
    iconColor: '#4ade80',
    chipBg: 'rgba(74,222,128,0.14)',
    icon: (
      <svg {...ICON_PROPS}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

const Slide08: SlideComponent = () => (
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
      <img src={LOGO_DARK} style={{ height: 20, opacity: 0.5 }} alt="ACKO" />
    </motion.div>

    <div className="content">
      <motion.div variants={fadeUp} style={{ marginBottom: 30 }}>
        <div className="eyebrow" style={{ color: '#ad56ff' }}>
          What this changes
        </div>
        <h2 className="h-lg" style={{ color: '#ffffff' }}>
          Six shifts,{' '}
          <span style={{ color: '#ad56ff' }}>across the org</span>
        </h2>
      </motion.div>

      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 16,
          minHeight: 0,
        }}
      >
        {SHIFTS.map((shift) => (
          <motion.div
            key={shift.title}
            variants={fadeUp}
            className="card"
            style={{
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: shift.chipBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: shift.iconColor,
                flexShrink: 0,
              }}
            >
              {shift.icon}
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#ffffff',
                  letterSpacing: '-0.3px',
                  lineHeight: 1.25,
                  marginBottom: 8,
                }}
              >
                {shift.title}
              </p>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  color: '#9f9f9f',
                  fontWeight: 400,
                  lineHeight: 1.55,
                }}
              >
                {shift.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

Slide08.theme = 'dark';
export default Slide08;
