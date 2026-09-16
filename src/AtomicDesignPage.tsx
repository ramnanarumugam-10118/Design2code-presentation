import { PlanScreen, TIER_COLOR, type Tier } from './PlanScreen';

interface PhoneMockupProps {
  children?: React.ReactNode;
}

function PhoneMockup({ children }: PhoneMockupProps) {
  const bezel = 'rgba(88,0,146,0.22)';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 300,
        aspectRatio: '9 / 18.5',
        background: 'rgba(255,255,255,0.60)',
        border: `1.5px solid ${bezel}`,
        borderRadius: 38,
        padding: 8,
        boxShadow: '0 18px 48px rgba(88,0,146,0.10), 0 4px 14px rgba(88,0,146,0.06)',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: '#ffffff',
          borderRadius: 30,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '36%',
            height: 18,
            background: '#1a1a1a',
            borderRadius: 12,
            zIndex: 3,
          }}
        />
        {children}
      </div>
    </div>
  );
}

const COLUMNS: { tier: Tier; label: string; caption: string }[] = [
  {
    tier: 'atoms',
    label: 'Atoms',
    caption: 'The smallest pieces — Typography, Button, a single radio, a single icon.',
  },
  {
    tier: 'molecules',
    label: 'Molecules',
    caption: 'Atoms grouped with purpose — a header row, a feature row, a price block.',
  },
  {
    tier: 'organisms',
    label: 'Organisms',
    caption: 'Molecules composed into the finished unit — the whole plan card.',
  },
];

export default function AtomicDesignPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'radial-gradient(circle at 50% -10%, rgba(173,86,255,0.12) 0%, transparent 55%), #fbfaff',
        padding: '72px 48px 96px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 640, marginBottom: 56 }}>
        <div className="eyebrow" style={{ marginBottom: 18 }}>
          Design system
        </div>
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-1px',
            color: '#000000',
            marginBottom: 16,
          }}
        >
          Same screen,{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #580092 0%, #ad56ff 60%, #d1aef9 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            three layers.
          </span>
        </h1>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 15,
            color: '#585858',
            lineHeight: 1.55,
          }}
        >
          One insurance plans screen, built from the same ACKO components. Read it as atoms, then
          molecules, then the finished card.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 40,
          width: '100%',
          maxWidth: 1080,
        }}
      >
        {COLUMNS.map((col) => (
          <div key={col.tier} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                background: `${TIER_COLOR[col.tier]}14`,
                border: `1px solid ${TIER_COLOR[col.tier]}40`,
                borderRadius: 99,
                padding: '6px 14px',
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: TIER_COLOR[col.tier] }} />
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: TIER_COLOR[col.tier],
                }}
              >
                {col.label}
              </span>
            </div>

            <PhoneMockup>
              <PlanScreen tier={col.tier} />
            </PhoneMockup>

            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13,
                color: '#585858',
                lineHeight: 1.5,
                textAlign: 'center',
                maxWidth: 260,
              }}
            >
              {col.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
