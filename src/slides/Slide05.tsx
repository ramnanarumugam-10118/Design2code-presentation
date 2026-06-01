import { motion } from 'framer-motion';
import { softFade, ease } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';

interface Milestone {
  num: string;
  title: string;
  desc: string;
  x: number;
  y: number;
  labelBelow: boolean;
  icon: React.ReactNode;
}

const ICON_PROPS = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.7',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const MILESTONES: Milestone[] = [
  {
    num: '1',
    title: 'Idea',
    desc: 'Where it starts.',
    x: 8, y: 40,
    labelBelow: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...ICON_PROPS}>
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7c.7.6 1 1.4 1 2.3v1h6v-1c0-.9.3-1.7 1-2.3A7 7 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    num: '2',
    title: 'Design via prompt',
    desc: 'Generate from prompts. Refine in Figma.',
    x: 29, y: 72,
    labelBelow: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...ICON_PROPS}>
        <path d="M9.5 3.5L11 8 15.5 9.5 11 11 9.5 15.5 8 11 3.5 9.5 8 8z" />
        <path d="M18 13l0.7 2 2 0.7-2 0.7-0.7 2-0.7-2-2-0.7 2-0.7z" />
        <path d="M17.5 4l0.5 1.3 1.3 0.5-1.3 0.5-0.5 1.3-0.5-1.3-1.3-0.5 1.3-0.5z" />
      </svg>
    ),
  },
  {
    num: '3',
    title: 'Code to dev',
    desc: 'Generated code lands with the dev, ready to plug in.',
    x: 50, y: 40,
    labelBelow: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...ICON_PROPS}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    num: '4',
    title: 'Backend wiring',
    desc: 'Strapi, data, APIs, Segment.',
    x: 71, y: 72,
    labelBelow: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...ICON_PROPS}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6a9 3 0 0 0 18 0V5" />
        <path d="M3 11v6a9 3 0 0 0 18 0v-6" />
      </svg>
    ),
  },
  {
    num: '5',
    title: 'Live',
    desc: 'In production.',
    x: 92, y: 40,
    labelBelow: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...ICON_PROPS}>
        <path d="M4.5 16.5l-2 5 5-2" />
        <path d="M9 12l-4.5 4.5L7 19l2.5-2.5" />
        <path d="M15 5l4 4-7 7-4-4 7-7z" />
        <path d="M13.5 6.5l4 4" />
      </svg>
    ),
  },
];

const SVG_W = 1000;
const SVG_H = 360;
const px = (x: number) => (x / 100) * SVG_W;
const py = (y: number) => (y / 100) * SVG_H;

const buildPath = () => {
  const pts = MILESTONES.map((m) => ({ x: px(m.x), y: py(m.y) }));
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const cur = pts[i];
    const cx1 = (prev.x + cur.x) / 2;
    const cx2 = (prev.x + cur.x) / 2;
    d += ` C ${cx1},${prev.y} ${cx2},${cur.y} ${cur.x},${cur.y}`;
  }
  return d;
};

const ICON_BASE = 64;
const ICON_ACTIVE = 90;

// Circle-stack splits for milestones 3 and 4 — each row is a label stacked
// above a filled circle (same style as the M2 Figma/AI split). The full row
// (label + gap + circle) is centered on the milestone anchor.
// Small icon helpers used inside the split circles.
const SPLIT_ICON_PROPS = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.7',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};
const CodeIcon = () => (
  <svg {...SPLIT_ICON_PROPS}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const DatabaseIcon = () => (
  <svg {...SPLIT_ICON_PROPS}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);
const LinkIcon = () => (
  <svg {...SPLIT_ICON_PROPS}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);
const LayersIcon = () => (
  <svg {...SPLIT_ICON_PROPS}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);
const ActivityIcon = () => (
  <svg {...SPLIT_ICON_PROPS}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

interface SplitItem {
  label: string;
  icon: React.ReactNode;
}

const SPLIT_PILLS: Record<
  string,
  { items: SplitItem[]; rowWidth: number; offsetY?: number }
> = {
  '3': {
    items: [
      { label: 'React', icon: <CodeIcon /> },
      { label: 'Next JS', icon: <CodeIcon /> },
      { label: 'Flutter', icon: <CodeIcon /> },
    ],
    rowWidth: 116,
  },
  '4': {
    items: [
      { label: 'Strapi integration', icon: <DatabaseIcon /> },
      { label: 'API integration', icon: <LinkIcon /> },
      { label: 'Data modeling', icon: <LayersIcon /> },
      { label: 'Segment events', icon: <ActivityIcon /> },
    ],
    rowWidth: 220,
    // Shift the M4 stack upward — at y:72% the curve sits low, so a 4-item
    // stack centered exactly on the anchor pushes its label off the slide.
    // -90 (not -110) leaves the "Segment events" row sitting below the curve.
    offsetY: -90,
  },
};
const SPLIT_CIRCLE_SIZE = 60;
const SPLIT_LABEL_HEIGHT = 16;
const SPLIT_LABEL_GAP = 6;
const SPLIT_ROW_HEIGHT = SPLIT_LABEL_HEIGHT + SPLIT_LABEL_GAP + SPLIT_CIRCLE_SIZE; // 82
const SPLIT_INTER_GAP = 14;

const Slide05: SlideComponent = ({ step = 0 }) => (
  <motion.div
    style={{ position: 'absolute', inset: 0 }}
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
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        style={{ marginBottom: 24 }}
      >
        <div
          className="eyebrow"
          style={{ fontSize: 'clamp(14px, 1.4vw, 20px)' }}
        >
          Workflow
        </div>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(44px, 6vw, 80px)',
            lineHeight: 1.05,
            letterSpacing: '-1.2px',
            color: '#000000',
          }}
        >
          The new workflow.
        </h2>
      </motion.div>

      {/* Flow canvas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease }}
        style={{ flex: 1, position: 'relative', width: '100%', minHeight: 0 }}
      >
        {/* SVG curve */}
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <defs>
            <linearGradient id="flowGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ad56ff" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#580092" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ad56ff" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          {/* Static base path */}
          <motion.path
            d={buildPath()}
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.6, delay: 0.3, ease },
              opacity: { duration: 0.3, delay: 0.3 },
            }}
          />

        </svg>

        {/* Milestones */}
        {MILESTONES.map((m, i) => {
          const isActive = i === step;
          const isPast = i < step;
          const iconSize = isActive ? ICON_ACTIVE : ICON_BASE;
          // Milestone 2 splits into Figma + AI circles with bidirectional arrows.
          const useTwoCircleSplit = m.num === '2' && isActive;
          // Milestones 3 & 4 split into vertical pill stacks.
          const pillSplit = SPLIT_PILLS[m.num];
          const usePillSplit = !!pillSplit && isActive;
          const useSplitView = useTwoCircleSplit || usePillSplit;

          // Stack height adapts to the number of items in the split.
          const splitItemCount = pillSplit?.items.length ?? 0;
          const stackHeight = splitItemCount
            ? splitItemCount * SPLIT_ROW_HEIGHT + (splitItemCount - 1) * SPLIT_INTER_GAP
            : 0;
          const stackCenterY = pillSplit?.offsetY ?? 0;
          const stackTop = stackCenterY - stackHeight / 2;

          // Where the main title/description sits relative to the milestone anchor.
          const labelTop = useTwoCircleSplit
            ? 116
            : usePillSplit
              ? (m.labelBelow
                  ? stackCenterY + stackHeight / 2 + 18
                  : stackCenterY - stackHeight / 2 - 91)
              : (m.labelBelow ? iconSize / 2 + 28 : -(iconSize / 2 + 68));

          return (
            <motion.div
              key={m.num}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.22, ease }}
              style={{
                position: 'absolute',
                left: `${m.x}%`,
                top: `${m.y}%`,
                width: 0,
                height: 0,
                zIndex: 2,
              }}
            >
              {/* Single icon circle — centered on the curve anchor.
                  Fades out when a split view takes over. */}
              <motion.div
                animate={{
                  opacity: useSplitView ? 0 : 1,
                  width: iconSize,
                  height: iconSize,
                  x: -iconSize / 2,
                  y: -iconSize / 2,
                  background: isActive ? '#580092' : '#ffffff',
                  borderColor: isActive ? '#ad56ff' : 'rgba(88,0,146,0.20)',
                  borderWidth: isActive ? 2 : 1,
                  boxShadow: isActive
                    ? '0 16px 52px rgba(88,0,146,0.42), 0 0 0 12px rgba(173,86,255,0.13)'
                    : '0 6px 20px rgba(88,0,146,0.08)',
                }}
                transition={{ duration: 0.38, ease }}
                style={{
                  position: 'absolute',
                  borderRadius: '50%',
                  borderStyle: 'solid',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}
              >
                <motion.span
                  animate={{ color: isActive ? '#ffffff' : '#580092' }}
                  transition={{ duration: 0.35, ease }}
                  style={{ display: 'flex' }}
                >
                  {m.icon}
                </motion.span>
              </motion.div>

              {/* Two-circle split for milestone 2 — Figma (top) + AI (bottom) + arrows */}
              {m.num === '2' && (
                <>
                  {/* Top circle — Figma (pen icon) */}
                  <motion.div
                    animate={{
                      opacity: useTwoCircleSplit ? 1 : 0,
                      scale: useTwoCircleSplit ? 1 : 0.7,
                      y: useTwoCircleSplit ? 0 : 10,
                    }}
                    transition={{ duration: 0.42, ease, delay: useTwoCircleSplit ? 0.05 : 0 }}
                    style={{
                      position: 'absolute',
                      width: 60,
                      height: 60,
                      left: -30,
                      top: -78,
                      borderRadius: '50%',
                      background: '#580092',
                      border: '2px solid #ad56ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      boxShadow:
                        '0 12px 36px rgba(88,0,146,0.32), 0 0 0 8px rgba(173,86,255,0.10)',
                      zIndex: 3,
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </motion.div>

                  {/* "Figma" label above top circle */}
                  <motion.div
                    animate={{
                      opacity: useTwoCircleSplit ? 1 : 0,
                      y: useTwoCircleSplit ? 0 : 6,
                    }}
                    transition={{ duration: 0.35, ease, delay: useTwoCircleSplit ? 0.18 : 0 }}
                    style={{
                      position: 'absolute',
                      left: -60,
                      top: -106,
                      width: 120,
                      textAlign: 'center',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 15,
                      color: '#000000',
                      letterSpacing: '-0.2px',
                      zIndex: 3,
                    }}
                  >
                    Figma
                  </motion.div>

                  {/* Bottom circle — AI (sparkle icon) */}
                  <motion.div
                    animate={{
                      opacity: useTwoCircleSplit ? 1 : 0,
                      scale: useTwoCircleSplit ? 1 : 0.7,
                      y: useTwoCircleSplit ? 0 : -10,
                    }}
                    transition={{ duration: 0.42, ease, delay: useTwoCircleSplit ? 0.1 : 0 }}
                    style={{
                      position: 'absolute',
                      width: 60,
                      height: 60,
                      left: -30,
                      top: 18,
                      borderRadius: '50%',
                      background: '#580092',
                      border: '2px solid #ad56ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      boxShadow:
                        '0 12px 36px rgba(88,0,146,0.32), 0 0 0 8px rgba(173,86,255,0.10)',
                      zIndex: 3,
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9.5 3.5L11 8 15.5 9.5 11 11 9.5 15.5 8 11 3.5 9.5 8 8z" />
                      <path d="M18 13l0.7 2 2 0.7-2 0.7-0.7 2-0.7-2-2-0.7 2-0.7z" />
                      <path d="M17.5 4l0.5 1.3 1.3 0.5-1.3 0.5-0.5 1.3-0.5-1.3-1.3-0.5 1.3-0.5z" />
                    </svg>
                  </motion.div>

                  {/* "AI" label below bottom circle */}
                  <motion.div
                    animate={{
                      opacity: useTwoCircleSplit ? 1 : 0,
                      y: useTwoCircleSplit ? 0 : -6,
                    }}
                    transition={{ duration: 0.35, ease, delay: useTwoCircleSplit ? 0.22 : 0 }}
                    style={{
                      position: 'absolute',
                      left: -60,
                      top: 84,
                      width: 120,
                      textAlign: 'center',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 15,
                      color: '#000000',
                      letterSpacing: '-0.2px',
                      zIndex: 3,
                    }}
                  >
                    AI
                  </motion.div>

                  {/* Bidirectional arrows between the two circles — bigger than before */}
                  <motion.div
                    animate={{
                      opacity: useTwoCircleSplit ? 1 : 0,
                      scale: useTwoCircleSplit ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.3, ease, delay: useTwoCircleSplit ? 0.25 : 0 }}
                    style={{
                      position: 'absolute',
                      left: -23,
                      top: -13,
                      width: 46,
                      height: 26,
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#000000',
                      zIndex: 4,
                    }}
                  >
                    <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                      <path
                        d="M7 20 L7 4 M2 9 L7 4 L12 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                      <path
                        d="M7 2 L7 18 M2 13 L7 18 L12 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </>
              )}

              {/* Circle-stack split for milestones 3 and 4 — label sits ABOVE each filled circle */}
              {pillSplit &&
                pillSplit.items.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    animate={{
                      opacity: usePillSplit ? 1 : 0,
                      scale: usePillSplit ? 1 : 0.85,
                      y: usePillSplit ? 0 : 6,
                    }}
                    transition={{
                      duration: 0.36,
                      ease,
                      delay: usePillSplit ? 0.05 + idx * 0.07 : 0,
                    }}
                    style={{
                      position: 'absolute',
                      left: -pillSplit.rowWidth / 2,
                      top: stackTop + idx * (SPLIT_ROW_HEIGHT + SPLIT_INTER_GAP),
                      width: pillSplit.rowWidth,
                      height: SPLIT_ROW_HEIGHT,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: SPLIT_LABEL_GAP,
                      zIndex: 3,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#000000',
                        letterSpacing: '-0.2px',
                        whiteSpace: 'nowrap',
                        lineHeight: 1,
                        height: SPLIT_LABEL_HEIGHT,
                      }}
                    >
                      {item.label}
                    </span>
                    <div
                      style={{
                        width: SPLIT_CIRCLE_SIZE,
                        height: SPLIT_CIRCLE_SIZE,
                        borderRadius: '50%',
                        background: '#580092',
                        border: '2px solid #ad56ff',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        boxShadow:
                          '0 8px 24px rgba(88,0,146,0.30), 0 0 0 8px rgba(173,86,255,0.10)',
                      }}
                    >
                      {item.icon}
                    </div>
                  </motion.div>
                ))}

              {/* Main title + description label */}
              <motion.div
                animate={{ top: labelTop }}
                transition={{ duration: 0.38, ease }}
                style={{
                  position: 'absolute',
                  left: -150,
                  width: 300,
                  textAlign: 'center',
                  zIndex: 1,
                }}
              >
                <motion.p
                  animate={{
                    fontSize: isActive ? '20px' : '15px',
                    color: isActive || isPast ? '#000000' : '#aaaaaa',
                    fontWeight: isActive ? 700 : 600,
                    opacity: isActive || isPast ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.35, ease }}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    letterSpacing: '-0.2px',
                    marginBottom: 5,
                  }}
                >
                  {m.title}
                </motion.p>
                <motion.p
                  animate={{
                    color: isActive ? '#444444' : isPast ? '#585858' : '#aaaaaa',
                    opacity: isActive || isPast ? 1 : 0.4,
                    fontSize: isActive ? '14px' : '13px',
                  }}
                  transition={{ duration: 0.35, ease }}
                  style={{ fontWeight: 400, lineHeight: 1.4 }}
                >
                  {m.desc}
                </motion.p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </motion.div>
);

Slide05.theme = 'light';
Slide05.steps = 5;
export default Slide05;
