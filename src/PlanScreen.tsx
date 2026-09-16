import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@acko/card';
import { Typography } from '@acko/typography';
import { Button } from '@acko/button';

export type Tier = 'atoms' | 'molecules' | 'organisms';

export const TIER_COLOR: Record<Tier, string> = {
  atoms: '#d97706',
  molecules: '#0891b2',
  organisms: '#580092',
};

interface TagProps {
  active: boolean;
  color: string;
  label: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function Tag({ active, color, label, children, style }: TagProps) {
  if (!active) {
    return <div style={style}>{children}</div>;
  }
  return (
    <div style={{ position: 'relative', ...style }}>
      <div
        style={{
          position: 'absolute',
          inset: -6,
          border: `1.5px dashed ${color}`,
          borderRadius: 10,
          pointerEvents: 'none',
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: -21,
          left: -2,
          background: color,
          color: '#ffffff',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 8.5,
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          padding: '3px 7px',
          borderRadius: 99,
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function Radio({ selected }: { selected: boolean }) {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        flexShrink: 0,
        border: `2px solid ${selected ? 'var(--colorPrimary)' : 'var(--colorControlBorderSelector)'}`,
        background: selected ? 'var(--colorPrimary)' : 'var(--colorCardBg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {selected && (
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--colorOnPrimary)' }} />
      )}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--colorSuccess)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

interface PlanData {
  id: string;
  name: string;
  price: string;
  featured?: boolean;
  features: string[];
  cta: string;
}

const PLANS: PlanData[] = [
  {
    id: 'comprehensive',
    name: 'Comprehensive',
    price: '₹4,999',
    featured: true,
    features: ['Own damage + third-party cover', 'Zero depreciation', 'Roadside assistance'],
    cta: 'Choose plan',
  },
  {
    id: 'third-party',
    name: 'Third-party',
    price: '₹1,499',
    features: ['Third-party liability cover'],
    cta: 'Choose plan',
  },
];

export function PlanScreen({ tier }: { tier: Tier }) {
  const [selected, setSelected] = useState('comprehensive');
  const color = TIER_COLOR[tier];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '20px 14px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        background: '#ffffff',
      }}
    >
      <div style={{ marginBottom: 26 }}>
        <Typography variant="overline" color="secondary">
          Motor insurance
        </Typography>
        <Typography variant="heading-sm" weight="bold">
          Choose your plan
        </Typography>
      </div>

      {PLANS.map((plan) => {
        const isSelected = selected === plan.id;
        const isFirst = plan.id === PLANS[0].id;

        return (
          <div key={plan.id} style={{ position: 'relative' }}>
            {plan.featured && (
              <span
                style={{
                  position: 'absolute',
                  top: -9,
                  right: 16,
                  zIndex: 2,
                  background: 'var(--colorPrimary)',
                  color: 'var(--colorOnPrimary)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  padding: '3px 10px',
                  borderRadius: 99,
                }}
              >
                Most popular
              </span>
            )}

            <Tag active={tier === 'organisms'} color={color} label="Plan card">
              <label
                onClick={() => setSelected(plan.id)}
                style={{
                  display: 'block',
                  cursor: 'pointer',
                  borderRadius: 16,
                  boxShadow: isSelected ? `inset 0 0 0 1.5px var(--colorPrimary)` : undefined,
                }}
              >
                <Card variant={isSelected ? 'elevated' : 'outline'} padding="none">
                  <CardHeader>
                    <div style={{ padding: '10px 14px 0' }}>
                      <Tag
                        active={isFirst && tier === 'molecules'}
                        color={color}
                        label="Header row"
                        style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                      >
                        <Tag active={isFirst && tier === 'atoms'} color={color} label="Radio">
                          <Radio selected={isSelected} />
                        </Tag>
                        <Typography variant="heading-sm" weight="semibold">
                          {plan.name}
                        </Typography>
                      </Tag>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div style={{ padding: '6px 14px 0', display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {plan.features.map((feature, i) => (
                        <Tag
                          key={feature}
                          active={isFirst && i === 0 && tier === 'molecules'}
                          color={color}
                          label="Feature row"
                          style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}
                        >
                          <Tag active={isFirst && i === 0 && tier === 'atoms'} color={color} label="Icon">
                            <div style={{ paddingTop: 1 }}>
                              <CheckIcon />
                            </div>
                          </Tag>
                          <Typography variant="body-sm" color="secondary">
                            {feature}
                          </Typography>
                        </Tag>
                      ))}
                    </div>

                    <div
                      style={{
                        margin: '8px 14px 0',
                        borderTop: '1px solid var(--colorCardOutlineBorder)',
                      }}
                    />

                    <div style={{ padding: '6px 14px 0' }}>
                      <Tag
                        active={isFirst && tier === 'molecules'}
                        color={color}
                        label="Price block"
                        style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}
                      >
                        <Tag active={isFirst && tier === 'atoms'} color={color} label="Typography">
                          <Typography variant="heading-md" weight="bold">
                            {plan.price}
                          </Typography>
                        </Tag>
                        <Typography variant="caption" color="secondary">
                          /year
                        </Typography>
                      </Tag>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <div style={{ padding: '8px 14px 10px' }}>
                      <Tag active={isFirst && tier === 'atoms'} color={color} label="Button">
                        <Button
                          variant={plan.featured ? 'primary' : 'secondary'}
                          size="sm"
                          fullWidth
                          onClick={(e) => {
                            e.preventDefault();
                            setSelected(plan.id);
                          }}
                        >
                          {plan.cta}
                        </Button>
                      </Tag>
                    </div>
                  </CardFooter>
                </Card>
              </label>
            </Tag>
          </div>
        );
      })}
    </div>
  );
}
