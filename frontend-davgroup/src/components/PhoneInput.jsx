import { useState, useRef, useEffect } from "react";

const COUNTRIES = [
  { code: "CI", name: "Côte d'Ivoire",      dial: "+225", max: 10, flag: "🇨🇮" },
  { code: "SN", name: "Sénégal",            dial: "+221", max: 9,  flag: "🇸🇳" },
  { code: "ML", name: "Mali",               dial: "+223", max: 8,  flag: "🇲🇱" },
  { code: "BF", name: "Burkina Faso",       dial: "+226", max: 8,  flag: "🇧🇫" },
  { code: "GN", name: "Guinée",             dial: "+224", max: 9,  flag: "🇬🇳" },
  { code: "TG", name: "Togo",              dial: "+228", max: 8,  flag: "🇹🇬" },
  { code: "BJ", name: "Bénin",             dial: "+229", max: 8,  flag: "🇧🇯" },
  { code: "CM", name: "Cameroun",          dial: "+237", max: 9,  flag: "🇨🇲" },
  { code: "GH", name: "Ghana",             dial: "+233", max: 9,  flag: "🇬🇭" },
  { code: "NG", name: "Nigeria",           dial: "+234", max: 10, flag: "🇳🇬" },
  { code: "CD", name: "Congo (RDC)",       dial: "+243", max: 9,  flag: "🇨🇩" },
  { code: "CG", name: "Congo-Brazzaville", dial: "+242", max: 9,  flag: "🇨🇬" },
  { code: "GA", name: "Gabon",             dial: "+241", max: 7,  flag: "🇬🇦" },
  { code: "NE", name: "Niger",             dial: "+227", max: 8,  flag: "🇳🇪" },
  { code: "MR", name: "Mauritanie",        dial: "+222", max: 8,  flag: "🇲🇷" },
  { code: "FR", name: "France",            dial: "+33",  max: 10, flag: "🇫🇷" },
  { code: "BE", name: "Belgique",          dial: "+32",  max: 10, flag: "🇧🇪" },
  { code: "CH", name: "Suisse",            dial: "+41",  max: 10, flag: "🇨🇭" },
  { code: "CA", name: "Canada",            dial: "+1",   max: 10, flag: "🇨🇦" },
  { code: "US", name: "États-Unis",        dial: "+1",   max: 10, flag: "🇺🇸" },
];

export default function PhoneInput({ onChange }) {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [digits,  setDigits]  = useState("");
  const [open,    setOpen]    = useState(false);
  const [search,  setSearch]  = useState("");
  const wrapRef = useRef(null);

  useEffect(() => {
    function close(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search)
  );

  function handleDigits(e) {
    const val = e.target.value.replace(/\D/g, "").slice(0, country.max);
    setDigits(val);
    onChange?.(country.dial + val);
  }

  function selectCountry(c) {
    const trimmed = digits.slice(0, c.max);
    setCountry(c);
    setDigits(trimmed);
    setOpen(false);
    setSearch("");
    onChange?.(c.dial + trimmed);
  }

  const remaining = country.max - digits.length;

  return (
    <div className="phone-wrap" ref={wrapRef}>
      <div className="phone-row">
        <button
          type="button"
          className={`phone-country-btn${open ? " open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Sélectionner le pays"
        >
          <span className="phone-flag">{country.flag}</span>
          <span className="phone-dial">{country.dial}</span>
          <svg className="phone-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="cf-input phone-digits"
          value={digits}
          onChange={handleDigits}
          placeholder={"0".repeat(country.max)}
          maxLength={country.max}
        />
      </div>

      <div className="phone-hint">
        {digits.length > 0
          ? remaining === 0
            ? <span className="phone-hint--ok">✓ Numéro complet</span>
            : <span className="phone-hint--count">{remaining} chiffre{remaining > 1 ? "s" : ""} restant{remaining > 1 ? "s" : ""}</span>
          : <span className="phone-hint--idle">{country.max} chiffres pour {country.name}</span>
        }
      </div>

      {open && (
        <div className="phone-dropdown">
          <div className="phone-search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className="phone-search"
              placeholder="Rechercher un pays..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
          <ul className="phone-country-list">
            {filtered.length === 0 && (
              <li className="phone-country-empty">Aucun résultat</li>
            )}
            {filtered.map((c) => (
              <li
                key={c.code}
                className={`phone-country-item${c.code === country.code ? " selected" : ""}`}
                onClick={() => selectCountry(c)}
              >
                <span className="phone-flag">{c.flag}</span>
                <span className="phone-country-name">{c.name}</span>
                <span className="phone-country-dial">{c.dial}</span>
                <span className="phone-country-max">{c.max} ch.</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
