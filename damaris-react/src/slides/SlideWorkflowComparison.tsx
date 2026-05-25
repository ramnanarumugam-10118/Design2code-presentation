import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';

type StepStyle = 'neutral' | 'warning' | 'accent';

interface Flow {
  label: string;
  labelColor: string;
  steps: {
    text: string;
    style?: StepStyle;
    note?: string;
    formats?: string[];
  }[];
  caption: string;
  emphasised?: boolean;
}

const FLOWS: Flow[] = [
  {
    label: 'TRADITIONAL',
    labelColor: '#3a3a3a',
    steps: [
      { text: 'Idea' },
      { text: 'Figma' },
      { text: 'Frontend' },
      { text: 'Backend' },
      { text: 'Production' },
    ],
    caption: 'Many handoffs.',
  },
  {
    label: 'AI AS\nPROTOTYPE ONLY',
    labelColor: '#d4517f',
    steps: [
      { text: 'Idea' },
      { text: 'AI prototype', style: 'warning' },
      { text: 'Redesign to match UI', style: 'warning' },
      { text: 'Frontend (from scratch)' },
      { text: 'Backend' },
      { text: 'Production' },
    ],
    caption: 'AI used wrong. Code is rewritten anyway.',
  },
  {
    label: 'STREAMLINED WAY\nWITH AI',
    labelColor: '#580092',
    steps: [
      { text: 'Idea' },
      { text: 'AI in Figma / Cursor', style: 'accent' },
      { text: 'Generated code', style: 'accent' },
      { text: 'Production' },
    ],
    caption: 'Fewer handoffs. Direct to production.',
    emphasised: true,
  },
];

function FlowStep({
  text,
  style,
  note,
  formats,
}: {
  text: string;
  style?: StepStyle;
  note?: string;
  formats?: string[];
}) {
  let bg = 'rgba(255,255,255,0.7)';
  let border = '1px solid rgba(0,0,0,0.10)';
  let color = '#3a3a3a';
  let weight = 500;
  let shadow = '0 2px 8px rgba(0,0,0,0.04)';

  if (style === 'accent') {
    bg = '#580092';
    border = '1px solid #580092';
    color = '#ffffff';
    weight = 600;
    shadow = '0 6px 18px rgba(88,0,146,0.22)';
  } else if (style === 'warning') {
    bg = 'rgba(240,118,165,0.12)';
    border = '1px solid rgba(212,81,127,0.45)';
    color = '#a82a5c';
    weight = 600;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <div
        style={{
          background: bg,
          border,
          borderRadius: 999,
          padding: '11px 20px',
          fontSize: 13,
          color,
          fontWeight: weight,
          whiteSpace: 'nowrap',
          letterSpacing: '-0.1px',
          boxShadow: shadow,
        }}
      >
        {text}
      </div>
      {note && (
        <p
          style={{
            fontSize: 10,
            color: '#d4517f',
            fontStyle: 'italic',
            letterSpacing: 0,
            marginTop: 2,
          }}
        >
          {note}
        </p>
      )}
      {formats && (
        <div style={{ marginTop: 4, textAlign: 'center', lineHeight: 1.3 }}>
          <p
            style={{
              fontSize: 10,
              color: '#888',
              fontStyle: 'italic',
              letterSpacing: 0,
            }}
          >
            in the required format
          </p>
          <p
            style={{
              fontSize: 11,
              color: '#580092',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginTop: 2,
            }}
          >
            {formats.join(' · ')}
          </p>
        </div>
      )}
    </div>
  );
}

const SlideWorkflowComparison: SlideComponent = () => (
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
      <motion.div variants={fadeUp} style={{ marginBottom: 36 }}>
        <div className="eyebrow">Comparison</div>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: '#000000',
            fontSize: 'clamp(52px, 6.8vw, 88px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-1.8px',
          }}
        >
          Three workflows,{' '}
          <span style={{ color: '#ad56ff' }}>head-to-head.</span>
        </h2>
      </motion.div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 40 }}>
        {FLOWS.map((flow) => (
          <motion.div
            key={flow.label}
            variants={fadeUp}
            style={{
              display: 'grid',
              gridTemplateColumns: '240px 1fr',
              alignItems: 'center',
              gap: 40,
              padding: '30px 0',
              borderBottom: flow.emphasised ? 'none' : '1px solid rgba(0,0,0,0.08)',
            }}
          >
            {/* Label + caption */}
            <div>
              <p
                style={{
                  fontSize: 14,
                  color: flow.labelColor,
                  letterSpacing: '0.18em',
                  fontWeight: 800,
                  marginBottom: 12,
                  lineHeight: 1.3,
                  whiteSpace: 'pre-line',
                  minHeight: '2.6em',
                }}
              >
                {flow.label}
              </p>
              <p style={{ fontSize: 13, color: '#666', fontWeight: 400, lineHeight: 1.5 }}>
                {flow.caption}
              </p>
            </div>

            {/* Horizontal flow */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                flexWrap: 'nowrap',
              }}
            >
              {flow.steps.map((step, i) => (
                <div
                  key={i}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <FlowStep
                    text={step.text}
                    style={step.style}
                    note={step.note}
                    formats={step.formats}
                  />
                  {i < flow.steps.length - 1 && (
                    <div
                      style={{
                        color: flow.emphasised ? '#ad56ff' : '#bbb',
                        fontSize: 18,
                        lineHeight: 1,
                        flexShrink: 0,
                        alignSelf: 'flex-start',
                        marginTop: 13,
                      }}
                    >
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

SlideWorkflowComparison.theme = 'light';
export default SlideWorkflowComparison;
