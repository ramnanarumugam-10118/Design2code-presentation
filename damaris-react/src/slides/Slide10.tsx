import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';

const ROWS = [
  { n: '01', title: 'Design system + AI tooling', body: 'Build the foundation.', pill: 'Now', dot: 'amber' as const },
  { n: '02', title: 'Pilots', body: 'Three live. Learning in real time.', pill: 'In progress', dot: 'amber' as const },
  { n: '03', title: 'Expand', body: 'Health, Auto, Car — all next.', pill: 'Up next', dot: 'red' as const },
  { n: '04', title: 'Default', body: 'Anyone at ACKO ships their own ideas.', pill: 'Goal', dot: 'red' as const },
];

const Slide10: SlideComponent = () => (
  <motion.div
    style={{ position: 'absolute', inset: 0 }}
    variants={staggerParent}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <motion.div variants={softFade} style={{ position: 'absolute', top: 32, right: 80, zIndex: 5 }}>
      <img src={LOGO_LIGHT} style={{ height: 20, opacity: 0.7 }} alt="ACKO" />
    </motion.div>
    <div className="content">
      <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
        <div className="eyebrow">Roadmap</div>
        <h2 className="h-lg" style={{ color: '#000000' }}>
          What's next.
        </h2>
      </motion.div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {ROWS.map((row, i) => (
          <motion.div
            key={row.n}
            variants={fadeUp}
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 110px 1fr 150px',
              gap: 20,
              alignItems: 'center',
              padding: '14px 0',
              borderBottom: i === ROWS.length - 1 ? 'none' : '1px solid rgba(88,0,146,0.14)',
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: '#9f9f9f',
                fontWeight: 600,
                letterSpacing: '0.15em',
              }}
            >
              {row.n}
            </p>
            <div className="img-ph light" style={{ height: 70, borderRadius: 8, fontSize: 9 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
            <div>
              <p
                style={{
                  fontSize: 18,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  color: '#000000',
                  marginBottom: 3,
                  letterSpacing: '-0.2px',
                }}
              >
                {row.title}
              </p>
              <p className="body-sm" style={{ fontSize: 13 }}>
                {row.body}
              </p>
            </div>
            <div className="pill" style={{ justifyContent: 'center' }}>
              <div className={'pill-dot ' + row.dot} />
              {row.pill}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

Slide10.theme = 'light';
export default Slide10;
