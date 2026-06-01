import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';

interface ScopeItem {
  title: string;
  desc: string;
}

const SCOPE_ITEMS: ScopeItem[] = [
  {
    title: 'Flutter translation is in progress.',
    desc:
      'React is fully operational. Flutter component library and code translation will follow shortly.',
  },
  {
    title: 'Broader rollout has not started.',
    desc:
      'The workflow has been validated in three pilots. Engineering has not yet adopted the component library outside of those pilots.',
  },
  {
    title: 'Migration of existing surfaces is pending.',
    desc:
      'The system covers consumer-facing and enterprise surfaces. Legacy screens and edge cases will need progressive migration.',
  },
  {
    title: 'Quantitative impact data is still being collected.',
    desc:
      'Early signals are positive but full pilot metrics will be shared in the next readout.',
  },
];

// Amber accent stays — keeps the "caveat" tone visually distinct from the
// purple impact slide that comes before it on light theme.
const ACCENT = '#d97706';

const SlideHonestScope: SlideComponent = () => (
  <motion.div
    style={{
      position: 'absolute',
      inset: 0,
    }}
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
        <div className="eyebrow">What's not there yet</div>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: '#000000',
            fontSize: 'clamp(44px, 6vw, 80px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-1.5px',
          }}
        >
          Being clear about{' '}
          <span style={{ color: '#580092' }}>the current edge</span>
        </h2>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 16,
            color: '#585858',
            fontWeight: 400,
            lineHeight: 1.5,
            marginTop: 18,
            maxWidth: 680,
          }}
        >
          A few things are intentionally not done yet. Calling them out so this
          view is accurate, not aspirational.
        </p>
      </motion.div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          minHeight: 0,
        }}
      >
        {SCOPE_ITEMS.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            className="card-light"
            style={{
              position: 'relative',
              padding: '22px 30px 22px 38px',
              overflow: 'hidden',
            }}
          >
            {/* Amber accent bar on the left edge */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 14,
                bottom: 14,
                width: 4,
                background: ACCENT,
                borderRadius: 2,
              }}
            />

            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 19,
                fontWeight: 700,
                color: '#000000',
                letterSpacing: '-0.3px',
                lineHeight: 1.25,
                marginBottom: 6,
              }}
            >
              {item.title}
            </p>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14,
                lineHeight: 1.55,
                color: '#585858',
                fontWeight: 400,
                letterSpacing: '-0.1px',
              }}
            >
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

SlideHonestScope.theme = 'light';
export default SlideHonestScope;
