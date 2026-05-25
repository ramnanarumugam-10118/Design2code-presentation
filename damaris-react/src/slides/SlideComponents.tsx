import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';
import { Button } from '@acko/button';
import { TextInput } from '@acko/text-input';
import { Checkbox } from '@acko/checkbox';
import { RadioGroup } from '@acko/radio';

const TOKENS = [
  { color: '#580092', label: 'primary' },
  { color: '#ad56ff', label: 'primary-200' },
  { color: '#d1aef9', label: 'primary-100' },
  { color: '#000000', label: 'text' },
  { color: '#585858', label: 'text-muted' },
  { color: '#ffffff', label: 'surface', border: true },
];

function CategoryHeader({ level, name }: { level: string; name: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 10,
          fontWeight: 700,
          color: '#9f7bc7',
          letterSpacing: '0.18em',
        }}
      >
        {level}
      </span>
      <span style={{ width: 12, height: 1, background: 'rgba(88,0,146,0.20)' }} />
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: '#000',
          letterSpacing: '-0.2px',
          textTransform: 'uppercase',
        }}
      >
        {name}
      </span>
    </div>
  );
}

const SlideComponents: SlideComponent = () => (
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
      <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
        <div className="eyebrow">The kit</div>
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
          Built-in{' '}
          <span
            style={{
              background:
                'linear-gradient(135deg, #580092 0%, #ad56ff 60%, #d1aef9 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            components.
          </span>
        </h2>
      </motion.div>

      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 18,
          minHeight: 0,
        }}
      >
        {/* L0 — Tokens */}
        <motion.div variants={fadeUp} className="card-light" style={{ padding: 24 }}>
          <CategoryHeader level="L0" name="Tokens" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 10,
            }}
          >
            {TOKENS.map((t) => (
              <div
                key={t.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    borderRadius: 8,
                    background: t.color,
                    border: t.border ? '1px solid rgba(0,0,0,0.10)' : 'none',
                    boxShadow:
                      t.color === '#580092'
                        ? '0 2px 6px rgba(88,0,146,0.20)'
                        : 'none',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 9,
                    color: '#7a7a7a',
                    fontWeight: 500,
                  }}
                >
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* L1 — Atoms (Buttons) */}
        <motion.div variants={fadeUp} className="card-light" style={{ padding: 24 }}>
          <CategoryHeader level="L1" name="Atoms — Buttons" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            <Button variant="primary" size="sm">Primary</Button>
            <Button variant="secondary" size="sm">Secondary</Button>
            <Button variant="ghost" size="sm">Ghost</Button>
            <Button variant="link" size="sm">Link</Button>
          </div>
        </motion.div>

        {/* L2 — Molecules (Form controls) */}
        <motion.div variants={fadeUp} className="card-light" style={{ padding: 24 }}>
          <CategoryHeader level="L2" name="Molecules — Inputs" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <TextInput
              label="Mobile number"
              value="+91 98765 43210"
              onChange={() => {}}
              size="sm"
            />
            <Checkbox
              label="I agree to terms"
              checked={true}
              onChange={() => {}}
              size="sm"
            />
          </div>
        </motion.div>

        {/* L3 — Organisms (Composite) */}
        <motion.div variants={fadeUp} className="card-light" style={{ padding: 24 }}>
          <CategoryHeader level="L3" name="Organisms — Form section" />
          <RadioGroup
            label="Who was driving the car?"
            options={[
              { value: 'me', label: 'Myself' },
              { value: 'other', label: 'Others' },
            ]}
            value="me"
            onChange={() => {}}
            orientation="horizontal"
            size="sm"
          />
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" size="sm">
              Submit
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

SlideComponents.theme = 'light';
export default SlideComponents;
