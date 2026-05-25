import { LOGO_DARK } from './assets';

interface NavProps {
  cur: number;
  total: number;
  onGo: (n: number) => void;
}

export function Nav({ cur, total, onGo }: NavProps) {
  return (
    <div className="nav">
      <img src={LOGO_DARK} style={{ height: 22, opacity: 0.5 }} alt="ACKO" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="dots">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={'dot' + (i === cur ? ' active' : '')}
              onClick={() => onGo(i)}
            />
          ))}
        </div>
        <div className="slide-num">{cur + 1} / {total}</div>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button
          className="nav-btn"
          onClick={() => onGo(cur - 1)}
          disabled={cur === 0}
        >
          ← Prev
        </button>
        <button
          className="nav-btn"
          onClick={() => onGo(cur + 1)}
          disabled={cur === total - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
