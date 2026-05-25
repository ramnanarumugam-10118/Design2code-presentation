import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';

const POINTS = [
  {
    n: '01',
    title: 'Tokens',
    desc:
      'Foundation of the system. Colour, spacing, typography centrally controlled, propagating across every surface.',
  },
  {
    n: '02',
    title: 'Atoms, molecules and organisms',
    desc:
      'Layered from primitives to complex blocks. Each level composable, predictable and reusable.',
  },
  {
    n: '03',
    title: 'Code ready components',
    desc:
      'Production-ready components built in Figma and in code. React library fully operational; Flutter in progress.',
  },
  {
    n: '04',
    title: 'Configurable design',
    desc:
      'Tokens propagate everywhere automatically. Every design decision flows from a single source of truth.',
  },
  {
    n: '05',
    title: 'Accessibility built-in',
    desc:
      'WCAG 2.0 enforced at the component level — not retrofitted. Positioned ahead of the IRDAI enforcement timeline.',
  },
  {
    n: '06',
    title: 'Two systems for two contexts',
    desc:
      'A separate design system for Enterprise (B2B) / internal tools where functional density matters more than consumer aesthetics.',
  },
];

const TOKEN_SWATCHES = ['#580092', '#ad56ff', '#22d3ee', '#ec4899', '#fbbf24'];

function HierarchyRow({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: ReactNode;
}) {
  return (
    <div
      className="card-light"
      style={{
        padding: '14px 22px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        minHeight: 58,
      }}
    >
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 10,
          fontWeight: 700,
          color: '#9f7bc7',
          letterSpacing: '0.18em',
          width: 24,
          flexShrink: 0,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: '#000000',
          width: 110,
          flexShrink: 0,
          letterSpacing: '-0.2px',
        }}
      >
        {name}
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>{children}</div>
    </div>
  );
}

const SlideFoundation: SlideComponent = () => (
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

    <div className="content">
      <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
        <div className="eyebrow">The design system</div>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(40px, 5.2vw, 68px)',
            lineHeight: 1.05,
            letterSpacing: '-1.4px',
            color: '#000000',
          }}
        >
          A proper foundation,{' '}
          <span
            style={{
              background:
                'linear-gradient(135deg, #580092 0%, #ad56ff 60%, #d1aef9 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            built ground-up.
          </span>
        </h2>
      </motion.div>

      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          minHeight: 0,
        }}
      >
        {/* LEFT — numbered text points */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 0,
          }}
        >
          {POINTS.map((p, i) => (
            <div
              key={p.n}
              style={{
                padding: '11px 0',
                borderBottom:
                  i < POINTS.length - 1 ? '1px solid rgba(88,0,146,0.10)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#ad56ff',
                    letterSpacing: '0.14em',
                    flexShrink: 0,
                    minWidth: 22,
                  }}
                >
                  {p.n}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      color: '#000000',
                      marginBottom: 4,
                      letterSpacing: '-0.2px',
                    }}
                  >
                    {p.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 13,
                      color: '#585858',
                      lineHeight: 1.5,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* RIGHT — L0..L4 hierarchy visualization */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            justifyContent: 'center',
          }}
        >
          <HierarchyRow label="L0" name="Tokens">
            <div style={{ display: 'flex', gap: 8 }}>
              {TOKEN_SWATCHES.map((c) => (
                <div
                  key={c}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 5,
                    background: c,
                  }}
                />
              ))}
            </div>
          </HierarchyRow>

          <HierarchyRow label="L1" name="Atoms">
            <div style={{ display: 'flex', gap: 8 }}>
              {[44, 38, 50, 42].map((w, i) => (
                <div
                  key={i}
                  style={{
                    width: w,
                    height: 24,
                    borderRadius: 999,
                    background: 'rgba(88,0,146,0.10)',
                    border: '1px solid rgba(88,0,146,0.20)',
                  }}
                />
              ))}
            </div>
          </HierarchyRow>

          <HierarchyRow label="L2" name="Molecules">
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                <div
                  style={{
                    width: 52,
                    height: 24,
                    borderRadius: 6,
                    background: 'rgba(88,0,146,0.10)',
                    border: '1px solid rgba(88,0,146,0.20)',
                  }}
                />
                <div
                  style={{
                    width: 32,
                    height: 24,
                    borderRadius: 6,
                    background: '#580092',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <div
                  style={{
                    width: 32,
                    height: 24,
                    borderRadius: 6,
                    background: 'rgba(88,0,146,0.10)',
                    border: '1px solid rgba(88,0,146,0.20)',
                  }}
                />
                <div
                  style={{
                    width: 52,
                    height: 24,
                    borderRadius: 6,
                    background: 'rgba(88,0,146,0.10)',
                    border: '1px solid rgba(88,0,146,0.20)',
                  }}
                />
              </div>
            </div>
          </HierarchyRow>

          <HierarchyRow label="L3" name="Organisms">
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: '#580092',
                }}
              />
              <div
                style={{
                  width: 220,
                  height: 28,
                  borderRadius: 6,
                  background: 'rgba(88,0,146,0.08)',
                  border: '1px solid rgba(88,0,146,0.18)',
                }}
              />
            </div>
          </HierarchyRow>

          <HierarchyRow label="L4" name="Page layouts">
            <div
              style={{
                width: 100,
                height: 32,
                borderRadius: 6,
                border: '1.5px dashed rgba(88,0,146,0.32)',
                background: 'rgba(255,255,255,0.4)',
              }}
            />
          </HierarchyRow>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

SlideFoundation.theme = 'light';
export default SlideFoundation;
