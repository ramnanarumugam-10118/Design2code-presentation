import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';

type StepStyle = 'neutral' | 'warning' | 'accent';

interface Step {
  text: string;
  style?: StepStyle;
  doubleArrow?: boolean;
}

interface Flow {
  label: string;
  tag?: string;
  caption: string;
  steps: Step[];
  emphasised?: boolean;
}

const FLOWS: Flow[] = [
  {
    label: 'Traditional',
    caption: 'Multiple handoffs. Code rebuilt at every stage.',
    steps: [
      { text: 'Idea' },
      { text: 'Figma' },
      { text: 'Frontend' },
      { text: 'Backend' },
      { text: 'Design QA', style: 'warning', doubleArrow: true },
      { text: 'Production' },
    ],
  },
  {
    label: 'AI as prototype only',
    caption: 'AI used for mockups — then thrown away. Code is rewritten.',
    steps: [
      { text: 'Idea' },
      { text: 'AI prototype', style: 'warning' },
      { text: 'Redesign in Figma', style: 'warning' },
      { text: 'Frontend (from scratch)' },
      { text: 'Backend' },
      { text: 'Design QA', style: 'warning', doubleArrow: true },
      { text: 'Production' },
    ],
  },
  {
    label: 'Streamlined with AI',
    caption: 'Fewer handoffs. Design and code move as one.',
    steps: [
      { text: 'Idea' },
      { text: 'Design in Figma / Cursor', style: 'accent' },
      { text: 'Backend', style: 'accent' },
      { text: 'Production', style: 'accent' },
    ],
    emphasised: true,
  },
];

function FlowStep({ text, style }: { text: string; style?: StepStyle; doubleArrow?: boolean }) {
  let bg = 'rgba(255,255,255,0.78)';
  let border = '1px solid rgba(0,0,0,0.09)';
  let color = '#3a3a3a';
  let weight = 500;
  let shadow = '0 2px 6px rgba(0,0,0,0.05)';

  if (style === 'accent') {
    bg = '#580092';
    border = 'none';
    color = '#ffffff';
    weight = 600;
    shadow = '0 6px 18px rgba(88,0,146,0.32)';
  } else if (style === 'warning') {
    bg = 'rgba(240,118,165,0.13)';
    border = '1px solid rgba(212,81,127,0.38)';
    color = '#a82a5c';
    weight = 500;
  }

  return (
    <div
      style={{
        background: bg,
        border,
        borderRadius: 10,
        padding: '13px 20px',
        fontSize: 13.5,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color,
        fontWeight: weight,
        whiteSpace: 'nowrap',
        letterSpacing: '-0.15px',
        boxShadow: shadow,
      }}
    >
      {text}
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
      <motion.div variants={fadeUp} style={{ marginBottom: 20 }}>
        <div className="eyebrow">Comparison</div>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: '#000000',
            fontSize: 'clamp(44px, 5.6vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-1.6px',
          }}
        >
          Three workflows,{' '}
          <span style={{ color: '#ad56ff' }}>compared.</span>
        </h2>
      </motion.div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 48 }}>
        {FLOWS.map((flow) => (
          <motion.div key={flow.label} variants={fadeUp}>
            {/* Title above the card */}
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: flow.emphasised ? '#580092' : '#1a1a1a',
                letterSpacing: '-0.4px',
                marginBottom: 10,
              }}
            >
              {flow.label}
            </p>

            {/* Card — steps only, full width */}
            <div
              style={{
                background: flow.emphasised
                  ? 'rgba(88,0,146,0.07)'
                  : 'rgba(255,255,255,0.50)',
                border: flow.emphasised
                  ? '1.5px solid rgba(88,0,146,0.36)'
                  : '1px solid rgba(255,255,255,0.92)',
                borderRadius: 16,
                padding: flow.emphasised ? '20px 28px' : '15px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                flexWrap: 'nowrap',
                overflow: 'hidden',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                boxShadow: flow.emphasised
                  ? '0 8px 40px rgba(88,0,146,0.14), 0 0 0 1px rgba(88,0,146,0.08)'
                  : '0 2px 10px rgba(0,0,0,0.04)',
              }}
            >
              {flow.steps.map((step, i) => {
                const nextStep = flow.steps[i + 1];
                const useDoubleArrow = nextStep?.doubleArrow;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: i === 0 ? 0 : 1 }}>
                    <FlowStep text={step.text} style={step.style} />
                    {i < flow.steps.length - 1 && (
                      <span
                        style={{
                          color: useDoubleArrow ? '#d4517f' : flow.emphasised ? '#ad56ff' : '#ccc',
                          fontSize: useDoubleArrow ? 17 : 15,
                          lineHeight: 1,
                          flexShrink: 0,
                          fontWeight: useDoubleArrow ? 700 : flow.emphasised ? 700 : 400,
                        }}
                      >
                        {useDoubleArrow ? '⇒' : '→'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Subtitle below the card */}
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13.5,
                fontWeight: 500,
                color: flow.emphasised ? '#580092' : '#444',
                lineHeight: 1.5,
                marginTop: 10,
                letterSpacing: '-0.1px',
              }}
            >
              {flow.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

SlideWorkflowComparison.theme = 'light';
export default SlideWorkflowComparison;
