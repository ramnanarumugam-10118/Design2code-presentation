import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';

interface PhoneMockupProps {
  label: string;
  status?: string;
  children?: React.ReactNode;
}

/**
 * iPhone-style device mockup. Children fill the inner screen.
 *
 *   To plug in real media later, pass an <img> or <video> as children:
 *     <PhoneMockup label="Bike journey">
 *       <video src="/bike.mp4" autoPlay loop muted playsInline
 *              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
 *     </PhoneMockup>
 */
function PhoneMockup({ label, status, children }: PhoneMockupProps) {
  // Soft, light bezel color — picks up the brand purple at low opacity rather
  // than the heavy dark frame we had before.
  const bezel = 'rgba(88,0,146,0.22)';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        gap: 18,
      }}
    >
      {/* Title + "In progress" pill — pinned to the top of the column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 22,
            color: '#000000',
            letterSpacing: '-0.4px',
            lineHeight: 1.15,
            textAlign: 'center',
          }}
        >
          {label}
        </p>
        {status && (
          <div className="pill" style={{ fontSize: 12 }}>
            <div className="pill-dot amber" />
            {status}
          </div>
        )}
      </div>

      {/* Phone — fills the remaining column height, vertically + horizontally centered */}
      <div
        style={{
          flex: 1,
          width: '100%',
          minHeight: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            height: '100%',
            aspectRatio: '9 / 18.5',
            background: 'rgba(255,255,255,0.60)',
            border: `1.5px solid ${bezel}`,
            borderRadius: 38,
            padding: 8,
            boxShadow:
              '0 18px 48px rgba(88,0,146,0.10), 0 4px 14px rgba(88,0,146,0.06)',
          }}
        >
          {/* Side buttons — soft purple instead of black */}
          <div
            style={{
              position: 'absolute',
              left: -2,
              top: '12%',
              width: 3,
              height: 18,
              background: bezel,
              borderRadius: '1.5px 0 0 1.5px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: -2,
              top: '20%',
              width: 3,
              height: 36,
              background: bezel,
              borderRadius: '1.5px 0 0 1.5px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: -2,
              top: '30%',
              width: 3,
              height: 36,
              background: bezel,
              borderRadius: '1.5px 0 0 1.5px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: -2,
              top: '22%',
              width: 3,
              height: 52,
              background: bezel,
              borderRadius: '0 1.5px 1.5px 0',
            }}
          />

          {/* Screen */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              background: '#ffffff',
              borderRadius: 30,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Dynamic-island-style notch — kept dark so it still reads as a notch */}
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

            {/* Screen content — image / video / placeholder */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {children || (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 12,
                    color: '#9f7bc7',
                    padding: 24,
                    textAlign: 'center',
                  }}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.02em' }}>
                    {label}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Slide06: SlideComponent = () => (
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

    <div
      className="content"
      style={{
        flexDirection: 'row',
        gap: 48,
        alignItems: 'stretch',
        padding: '64px 80px 48px',
      }}
    >
      <motion.div
        variants={fadeUp}
        style={{
          flex: '0 0 360px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div className="eyebrow">Pilots</div>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: '#000000',
            marginBottom: 24,
            fontSize: 'clamp(52px, 6.8vw, 88px)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-1.8px',
          }}
        >
          We already<br />started.
        </h2>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 17,
            color: '#585858',
            lineHeight: 1.5,
            fontWeight: 400,
            maxWidth: 320,
          }}
        >
          Three live experiments running across the product.
        </p>
      </motion.div>

      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 18,
          minHeight: 0,
        }}
      >
        <motion.div variants={fadeUp}>
          <PhoneMockup label="Bike journey" status="In UAT">
            <img
              src="/Bike-plan.png"
              alt="Bike journey"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </PhoneMockup>
        </motion.div>
        <motion.div variants={fadeUp}>
          <PhoneMockup label="Landing page" status="In UAT">
            <img
              src="/Bike-mobile.png"
              alt="Landing page"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </PhoneMockup>
        </motion.div>
        <motion.div variants={fadeUp}>
          <PhoneMockup label="App polish" status="In UAT">
            <img
              src="/App-polish.jpg"
              alt="App polish"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </PhoneMockup>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

Slide06.theme = 'light';
export default Slide06;
