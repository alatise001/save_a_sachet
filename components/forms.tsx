'use client';
import {
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type SelectHTMLAttributes,
} from 'react';
import {
  Check,
  ChevronDown,
  CircleAlert,
  Eye,
  EyeOff,
  Info,
  type LucideIcon,
} from 'lucide-react';

type Variant =
  | 'primary'
  | 'lime'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'outlineDark';
type Size = 'md' | 'lg' | 'sm';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-forest text-lime hover:bg-forest-700',
  lime: 'bg-lime text-forest hover:bg-lime-300',
  outline:
    'bg-white text-forest ring-1 ring-forest/15 hover:ring-forest/35 hover:bg-forest/[0.03]',
  outlineDark:
    'text-mint ring-1 ring-white/20 hover:bg-white/5 hover:ring-white/40',
  ghost: 'text-forest hover:bg-forest/5',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-13 px-7 text-lg',
};

export function buttonClass(
  variant: Variant = 'primary',
  size: Size = 'md',
  extra = ''
) {
  return `inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${extra}`;
}

export function inputClass(invalid?: boolean, extra = '') {
  return `h-12 w-full rounded-xl bg-white px-4 text-[0.98rem] text-ink placeholder:text-ink/35 ring-1 outline-none transition focus:ring-2 disabled:bg-forest/[0.03] disabled:text-ink/50 ${
    invalid
      ? 'ring-red-500/70 focus:ring-red-500'
      : 'ring-forest/15 hover:ring-forest/25 focus:ring-forest'
  } ${extra}`;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  action?: ReactNode;
  children: ReactNode;
}

export function Field({
  id,
  label,
  error,
  hint,
  optional,
  action,
  children,
}: FieldProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="font-display text-sm font-semibold text-forest"
        >
          {label}
          {optional && (
            <span className="ml-1.5 font-sans text-xs font-normal text-ink/45">
              Optional
            </span>
          )}
        </label>
        {action}
      </div>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-700"
        >
          <CircleAlert className="size-4 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink/50">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  icon?: LucideIcon;
  suffix?: ReactNode;
}

export function TextInput({
  invalid,
  icon: Icon,
  suffix,
  className = '',
  id,
  ...rest
}: TextInputProps) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="pointer-events-none absolute left-4 top-1/2 size-[1.1rem] -translate-y-1/2 text-ink/40" />
      )}
      <input
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : undefined}
        className={inputClass(
          invalid,
          `${Icon ? 'pl-11' : ''} ${suffix ? 'pr-24' : ''} ${className}`
        )}
        {...rest}
      />
      {suffix && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {suffix}
        </div>
      )}
    </div>
  );
}

export function passwordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 12) score++;
  const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];
  return {
    score: pw.length < 8 ? Math.min(score, 1) : score,
    label: pw ? labels[pw.length < 8 ? 0 : score] : '',
  };
}

interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  invalid?: boolean;
  showStrength?: boolean;
}

export function PasswordInput({
  invalid,
  showStrength,
  value,
  id,
  ...rest
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const strength = passwordStrength(String(value ?? ''));
  const colors = [
    'bg-red-500',
    'bg-red-500',
    'bg-amber-500',
    'bg-lime-600',
    'bg-forest-500',
  ];
  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? `${id}-error` : undefined}
          className={inputClass(invalid, 'pr-12')}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-ink/45 transition hover:bg-forest/5 hover:text-forest"
        >
          {visible ? (
            <EyeOff className="size-[1.1rem]" />
          ) : (
            <Eye className="size-[1.1rem]" />
          )}
        </button>
      </div>
      {showStrength && String(value ?? '').length > 0 && (
        <div className="mt-2 flex items-center gap-3" aria-live="polite">
          <div className="grid flex-1 grid-cols-4 gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-colors ${
                  i <= strength.score ? colors[strength.score] : 'bg-forest/10'
                }`}
              />
            ))}
          </div>
          <span className="w-16 text-right text-xs font-semibold text-ink/55">
            {strength.label}
          </span>
        </div>
      )}
    </div>
  );
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  placeholder: string;
  invalid?: boolean;
}

export function SelectInput({
  options,
  placeholder,
  invalid,
  value,
  className = '',
  ...rest
}: SelectInputProps) {
  return (
    <div className="relative">
      <select
        value={value}
        aria-invalid={invalid || undefined}
        className={inputClass(
          invalid,
          `appearance-none pr-11 ${value ? '' : 'text-ink/40'} ${className}`
        )}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink/50" />
    </div>
  );
}

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  invalid?: boolean;
  id?: string;
}

export function Checkbox({
  checked,
  onChange,
  children,
  invalid,
  id,
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <label
      htmlFor={inputId}
      className="group flex cursor-pointer items-start gap-3 text-[0.95rem] leading-snug text-ink/75"
    >
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-invalid={invalid || undefined}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md ring-1 transition peer-focus-visible:ring-2 peer-focus-visible:ring-forest ${
          checked
            ? 'bg-forest text-lime ring-forest'
            : invalid
              ? 'bg-white ring-red-500'
              : 'bg-white ring-forest/25 group-hover:ring-forest/50'
        }`}
      >
        {checked && <Check className="size-3.5" strokeWidth={3} />}
      </span>
      <span>{children}</span>
    </label>
  );
}

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export function Switch({ checked, onChange, label, description }: SwitchProps) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <label
          htmlFor={id}
          className="cursor-pointer font-display font-semibold text-forest"
        >
          {label}
        </label>
        {description && (
          <p className="mt-0.5 text-sm leading-relaxed text-ink/55">
            {description}
          </p>
        )}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
          checked ? 'bg-forest' : 'bg-forest/15'
        }`}
      >
        <span
          className={`absolute left-1 top-1 size-5 rounded-full shadow-sm transition-transform ${
            checked ? 'translate-x-5 bg-lime' : 'bg-white'
          }`}
        />
      </button>
    </div>
  );
}

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  invalid?: boolean;
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  invalid,
}: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? '');

  const setAt = (i: number, ch: string) => {
    const next = chars.slice();
    next[i] = ch;
    onChange(next.join('').slice(0, length));
  };

  const onKeyDown = (i: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !chars[i] && i > 0) {
      refs.current[i - 1]?.focus();
      setAt(i - 1, '');
    }
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < length - 1) refs.current[i + 1]?.focus();
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, length);
    if (!digits) return;
    e.preventDefault();
    onChange(digits);
    refs.current[Math.min(digits.length, length - 1)]?.focus();
  };

  return (
    <div
      className="flex gap-2 sm:gap-3"
      role="group"
      aria-label="Verification code"
    >
      {chars.map((ch, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={ch}
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          onPaste={onPaste}
          onKeyDown={onKeyDown(i)}
          onChange={(e) => {
            const d = e.target.value.replace(/\D/g, '').slice(-1);
            setAt(i, d);
            if (d && i < length - 1) refs.current[i + 1]?.focus();
          }}
          className={`h-14 w-full min-w-0 rounded-xl bg-white text-center font-display text-2xl font-semibold text-forest ring-1 outline-none transition focus:ring-2 sm:h-16 ${
            invalid
              ? 'ring-red-500/70 focus:ring-red-500'
              : ch
                ? 'ring-forest/40 focus:ring-forest'
                : 'ring-forest/15 focus:ring-forest'
          }`}
        />
      ))}
    </div>
  );
}

interface NoticeProps {
  children: ReactNode;
  tone?: 'info' | 'success' | 'error';
}

export function Notice({ children, tone = 'info' }: NoticeProps) {
  const styles = {
    info: 'bg-lime-100 text-forest',
    success: 'bg-lime text-forest',
    error: 'bg-red-50 text-red-800 ring-1 ring-red-200',
  };
  const Icon =
    tone === 'error' ? CircleAlert : tone === 'success' ? Check : Info;
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`flex items-start gap-3 rounded-2xl px-4 py-3.5 text-sm leading-relaxed ${styles[tone]}`}
    >
      <Icon className="mt-0.5 size-4 shrink-0" strokeWidth={2.25} />
      <div>{children}</div>
    </div>
  );
}
