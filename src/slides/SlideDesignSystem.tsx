import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ease } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';
import { Button } from '@acko/button';
import { TextInput } from '@acko/text-input';
import { Textarea } from '@acko/textarea';
import { Checkbox } from '@acko/checkbox';
import { RadioGroup } from '@acko/radio';

type LayoutKey = 'kit' | 'mobile' | 'web';

interface LayoutState {
  left: string;
  top: string;
  width: string | number;
  height: number;
}

type CompId = 'button' | 'textField' | 'dateField' | 'textArea' | 'checkboxRadio';

interface CompDef {
  id: CompId;
  isButton?: boolean;
  kit: LayoutState;
  mobile: LayoutState;
  web: LayoutState;
}

// Kit layout follows the paper-sketch reference:
//   - Button (the seed) centered
//   - TextField top-left (small pill)
//   - TextArea top-right (medium block)
//   - Checkbox + Radio combo bottom-left
//   - Card bottom-right (largest block)
// Mobile + web are the morph targets driven by the chat-input prompts.
// Mobile column: 280 px wide (calc(50% - 140px)) — wider than before so the
// inputs hug the phone bezel, leaving less wasted side padding.
// All form rows live inside the phone frame (12%–84%) with ~4% top/bottom safe areas.
const COMPS: CompDef[] = [
  {
    id: 'textField',
    kit:    { left: '10%', top: '26%', width: '22%', height: 64 },
    mobile: { left: 'calc(50% - 140px)', top: '21%', width: 280, height: 64 },
    web:    { left: '20%', top: '23%', width: '60%', height: 64 },
  },
  {
    id: 'dateField',
    kit:    { left: '10%', top: '40%', width: '22%', height: 64 },
    mobile: { left: 'calc(50% - 140px)', top: '31%', width: 280, height: 64 },
    web:    { left: '20%', top: '33%', width: '60%', height: 64 },
  },
  {
    id: 'textArea',
    kit:    { left: '58%', top: '14%', width: '30%', height: 150 },
    mobile: { left: 'calc(50% - 140px)', top: '41%', width: 280, height: 90 },
    web:    { left: '20%', top: '43%', width: '60%', height: 110 },
  },
  {
    id: 'checkboxRadio',
    kit:    { left: '10%', top: '63%', width: '30%', height: 110 },
    mobile: { left: 'calc(50% - 140px)', top: '57%', width: 280, height: 115 },
    web:    { left: '20%', top: '63%', width: '60%', height: 100 },
  },
  {
    id: 'button',
    isButton: true,
    kit:    { left: 'calc(50% - 64px)', top: 'calc(50% - 22px)', width: 128, height: 44 },
    mobile: { left: 'calc(50% - 140px)', top: '76%', width: 280, height: 48 },
    web:    { left: '20%', top: '78%', width: '60%', height: 52 },
  },
];

const ENTRY_DELAYS: Record<CompId, number> = {
  button: 0.6,
  textField: 1.45,
  dateField: 1.52,
  textArea: 1.60,
  checkboxRadio: 1.72,
};

function getLayoutKey(step: number): LayoutKey {
  if (step >= 2) return 'web';
  if (step === 1) return 'mobile';
  return 'kit';
}

const CHAT_MESSAGES = [
  'Build a simple claim form for mobile',
  'Now build it for desktop',
];

// ---------- Real ACKO components ----------
// Imported from @acko/* via Nexus. Per-component CSS + tokens loaded once in
// src/acko.css (which main.tsx imports). Each visual is a thin wrapper that
// supplies realistic copy and noop handlers so the displayed slide looks like
// a real claim form rather than empty controls.

function AckoTextFieldVisual({ layoutKey }: { layoutKey: LayoutKey }) {
  // Kit = library showcase with generic placeholder copy.
  // Mobile/web = real claim form with domain copy.
  const isKit = layoutKey === 'kit';
  return (
    <div style={{ width: '100%' }}>
      <TextInput
        label={isKit ? 'Label' : 'Mobile number'}
        value={isKit ? '' : '+91 98765 43210'}
        placeholder={isKit ? 'Enter text' : ''}
        onChange={() => {}}
        size="md"
      />
    </div>
  );
}

function AckoDateFieldVisual({ layoutKey }: { layoutKey: LayoutKey }) {
  const isKit = layoutKey === 'kit';
  const calendarIcon = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
  return (
    <div style={{ width: '100%' }}>
      <TextInput
        label={isKit ? 'Label' : 'Date of incident'}
        value={isKit ? '' : '24 May 2026'}
        placeholder={isKit ? 'Select date' : ''}
        onChange={() => {}}
        size="md"
        iconRight={calendarIcon}
        readOnly
      />
    </div>
  );
}

function AckoTextAreaVisual({ layoutKey }: { layoutKey: LayoutKey }) {
  const isKit = layoutKey === 'kit';
  return (
    <div style={{ width: '100%' }}>
      <Textarea
        label={isKit ? 'Label' : 'Tell us about the claim'}
        value={
          isKit
            ? ''
            : 'Hit a pothole on the highway near Whitefield. Front bumper cracked, headlight flickering.'
        }
        placeholder={isKit ? 'Enter description' : ''}
        onChange={() => {}}
        rows={3}
      />
    </div>
  );
}

function AckoCheckboxRadioVisual({ layoutKey }: { layoutKey: LayoutKey }) {
  const isKit = layoutKey === 'kit';
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        justifyContent: 'center',
      }}
    >
      <Checkbox
        label={isKit ? 'Checkbox label' : 'I agree to the terms & conditions'}
        checked={true}
        onChange={() => {}}
        size="sm"
      />
      <RadioGroup
        label={isKit ? 'Radio group' : 'Who was driving the car?'}
        options={
          isKit
            ? [
                { value: 'a', label: 'Option A' },
                { value: 'b', label: 'Option B' },
              ]
            : [
                { value: 'myself', label: 'Myself' },
                { value: 'others', label: 'Others' },
              ]
        }
        value={isKit ? 'a' : 'myself'}
        onChange={() => {}}
        orientation="horizontal"
        size="sm"
      />
    </div>
  );
}

function renderVisual(id: CompId, layoutKey: LayoutKey) {
  switch (id) {
    case 'textField':     return <AckoTextFieldVisual layoutKey={layoutKey} />;
    case 'dateField':     return <AckoDateFieldVisual layoutKey={layoutKey} />;
    case 'textArea':      return <AckoTextAreaVisual layoutKey={layoutKey} />;
    case 'checkboxRadio': return <AckoCheckboxRadioVisual layoutKey={layoutKey} />;
    default:              return null;
  }
}

// ---------- Component placeholder ----------

function Comp({ comp, layoutKey }: { comp: CompDef; layoutKey: LayoutKey }) {
  const pos = comp[layoutKey];
  const entryDelay = ENTRY_DELAYS[comp.id] ?? 1.5;

  const commonStyle: React.CSSProperties = {
    position: 'absolute',
    left: pos.left,
    top: pos.top,
    width: pos.width,
    height: pos.height,
    zIndex: comp.isButton ? 3 : 1,
  };

  if (comp.isButton) {
    return (
      <motion.div
        layout
        initial={{ scale: 3.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          scale: { duration: 0.9, delay: entryDelay, ease },
          opacity: { duration: 0.3, delay: entryDelay, ease },
          layout: { duration: 0.7, ease },
        }}
        style={{
          ...commonStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button variant="primary" size="lg" fullWidth>
          {layoutKey === 'kit' ? 'Button' : 'Submit'}
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        opacity: { duration: 0.55, delay: entryDelay, ease },
        scale: { duration: 0.55, delay: entryDelay, ease },
        layout: { duration: 0.7, ease },
      }}
      style={commonStyle}
    >
      {renderVisual(comp.id, layoutKey)}
    </motion.div>
  );
}

// ---------- Device frame ----------

function DeviceFrame({ layoutKey }: { layoutKey: LayoutKey }) {
  const isMobile = layoutKey === 'mobile';
  const isWeb = layoutKey === 'web';
  const visible = isMobile || isWeb;

  return (
    <motion.div
      animate={{
        opacity: visible ? 0.85 : 0,
        width: isWeb ? '94%' : '24%',
        height: isWeb ? '74%' : '72%',
        borderRadius: isWeb ? 14 : 28,
      }}
      transition={{ duration: 0.7, ease }}
      style={{
        position: 'absolute',
        top: '48%',
        left: '50%',
        x: '-50%',
        y: '-50%',
        border: '1.5px dashed rgba(88,0,146,0.50)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Browser chrome dots — only on web */}
      <motion.div
        animate={{ opacity: isWeb ? 1 : 0 }}
        transition={{ duration: 0.3, ease }}
        style={{
          position: 'absolute',
          top: 14,
          left: 18,
          display: 'flex',
          gap: 7,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'rgba(88,0,146,0.40)',
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

// ---------- Chat input (controlled by parent orchestrator) ----------

function ChatInput({
  typed,
  isTyping,
  sendPulse,
  isEmpty,
}: {
  typed: string;
  isTyping: boolean;
  sendPulse: boolean;
  isEmpty: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.5, ease }}
      style={{
        position: 'absolute',
        bottom: '4%',
        left: '50%',
        x: '-50%',
        width: 'min(560px, 60%)',
        zIndex: 10,
      }}
    >
      <motion.div
        animate={{
          borderColor: sendPulse
            ? 'rgba(88,0,146,0.55)'
            : 'rgba(88,0,146,0.18)',
          boxShadow: sendPulse
            ? '0 8px 28px rgba(88,0,146,0.25), 0 2px 6px rgba(88,0,146,0.10), 0 0 0 4px rgba(173,86,255,0.10)'
            : '0 8px 28px rgba(88,0,146,0.10), 0 2px 6px rgba(88,0,146,0.06)',
        }}
        transition={{ duration: 0.35, ease }}
        style={{
          background: 'rgba(255,255,255,0.85)',
          border: '1px solid rgba(88,0,146,0.18)',
          borderRadius: 99,
          padding: '8px 8px 8px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          minHeight: 56,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <span
          style={{
            flex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: '-0.1px',
            color: isEmpty ? '#9f7bc7' : '#2d1f44',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {isEmpty ? 'Type a prompt…' : typed}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              style={{
                display: 'inline-block',
                width: 2,
                height: 18,
                background: '#580092',
                marginLeft: 3,
                verticalAlign: 'middle',
              }}
            />
          )}
        </span>

        {/* Send button with pulse + expanding ring */}
        <motion.div
          animate={sendPulse ? { scale: [1, 1.18, 1] } : { scale: 1 }}
          transition={{ duration: 0.45, ease }}
          style={{
            position: 'relative',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#580092',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(88,0,146,0.30)',
          }}
        >
          <AnimatePresence>
            {sendPulse && (
              <motion.div
                key="ring"
                initial={{ scale: 1, opacity: 0.55 }}
                animate={{ scale: 1.9, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease }}
                style={{
                  position: 'absolute',
                  inset: -2,
                  borderRadius: '50%',
                  border: '2px solid #580092',
                  pointerEvents: 'none',
                }}
              />
            )}
          </AnimatePresence>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ---------- Slide ----------

const SlideDesignSystem: SlideComponent = ({ step = 0 }) => {
  // committedLayout drives the components — it lags behind `step` while the
  // chat sequence (appear → type → send pulse) runs.
  const [committedLayout, setCommittedLayout] = useState<LayoutKey>('kit');
  const [chatVisible, setChatVisible] = useState(false);
  const [typed, setTyped] = useState('');
  const [sendPulse, setSendPulse] = useState(false);
  const stepRef = useRef(0);

  useEffect(() => {
    const prevStep = stepRef.current;
    stepRef.current = step;

    // Backward navigation or initial mount at step 0 → snap to target state
    if (step <= prevStep || step === 0) {
      setCommittedLayout(getLayoutKey(step));
      setChatVisible(step >= 1);
      setTyped(step >= 1 ? CHAT_MESSAGES[step - 1] ?? '' : '');
      setSendPulse(false);
      return;
    }

    // Forward: orchestrated sequence (chat → type → send pulse → morph)
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    (async () => {
      const msg = CHAT_MESSAGES[step - 1] ?? '';

      // Phase 1: bring chat in (first time) or clear old text (subsequent)
      if (!chatVisible) {
        setChatVisible(true);
        await wait(550);
      } else {
        setTyped('');
        await wait(280);
      }
      if (cancelled) return;

      // Phase 2: typewriter
      for (let i = 1; i <= msg.length; i++) {
        setTyped(msg.slice(0, i));
        await wait(38);
        if (cancelled) return;
      }

      // Phase 3: pause then "sent" pulse
      await wait(380);
      if (cancelled) return;
      setSendPulse(true);
      await wait(450);
      setSendPulse(false);
      if (cancelled) return;

      // Phase 4: commit layout → components morph via layout-prop FLIP
      setCommittedLayout(getLayoutKey(step));
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const activeMsg = step >= 1 ? CHAT_MESSAGES[step - 1] ?? '' : '';
  const isTyping = typed.length > 0 && typed.length < activeMsg.length;
  const isEmpty = typed.length === 0;

  return (
    <motion.div
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Grid-paper background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(88,0,146,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(88,0,146,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          maskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 90%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.3, ease }}
        style={{ position: 'absolute', top: 32, right: 80, zIndex: 5 }}
      >
        <img src={LOGO_LIGHT} style={{ height: 20, opacity: 0.7 }} alt="ACKO" />
      </motion.div>

      {/* Eyebrow label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.3, ease }}
        style={{ position: 'absolute', top: 64, left: 80, zIndex: 5 }}
      >
        <div className="eyebrow" style={{ marginBottom: 0 }}>
          Design system
        </div>
      </motion.div>

      {/* Device frame — driven by committedLayout, not raw step */}
      <DeviceFrame layoutKey={committedLayout} />

      {/* Form title — only appears in claim-form layouts (mobile/web), not in kit */}
      <AnimatePresence>
        {committedLayout !== 'kit' && (
          <motion.div
            key="form-title"
            layout
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease, delay: 0.15 }}
            style={{
              position: 'absolute',
              left: committedLayout === 'mobile' ? 'calc(50% - 140px)' : '20%',
              top: committedLayout === 'mobile' ? '14%' : '15%',
              width: committedLayout === 'mobile' ? 280 : '60%',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: committedLayout === 'mobile' ? 22 : 28,
              fontWeight: 700,
              color: '#000000',
              letterSpacing: '-0.4px',
              lineHeight: 1.2,
              zIndex: 2,
            }}
          >
            Claim form
          </motion.div>
        )}
      </AnimatePresence>

      {/* Components — driven by committedLayout */}
      {COMPS.map((comp) => (
        <Comp key={comp.id} comp={comp} layoutKey={committedLayout} />
      ))}

      {/* Chat input — appears via orchestrator's chatVisible flag */}
      <AnimatePresence>
        {chatVisible && (
          <ChatInput
            key="chatinput"
            typed={typed}
            isTyping={isTyping}
            sendPulse={sendPulse}
            isEmpty={isEmpty}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

SlideDesignSystem.theme = 'light';
SlideDesignSystem.steps = 3;
export default SlideDesignSystem;
