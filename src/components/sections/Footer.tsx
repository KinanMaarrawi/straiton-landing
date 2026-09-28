import { FOOTER } from '@/content/copy';
import { Tag } from '@/components/ui/Tag';
import s from './Footer.module.css';

export function Footer() {
  return (
    <footer className={s.footer} data-surface="dark">
      <div className={s.inner}>
        <div className={s.top}>
          <div className={s.brand}>
            <p className={`wordmark ${s.wordmark}`}>STRAITON</p>
            <p className={s.descriptor}>{FOOTER.descriptor}</p>
          </div>
          <nav className={`${s.col} ${s.routeCol}`} aria-labelledby="footer-route">
            <h2 id="footer-route" className={s.colHeading}>
              {FOOTER.routeHeading}
            </h2>
            <ul>
              {FOOTER.routeLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav className={`${s.col} ${s.helpCol}`} aria-labelledby="footer-help">
            <h2 id="footer-help" className={s.colHeading}>
              {FOOTER.helpHeading}
            </h2>
            <ul>
              {FOOTER.helpLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={`${s.col} ${s.contact}`}>
            <h2 className={s.colHeading}>
              {FOOTER.contactHeading} <Tag variant="demo" size="sm" />
            </h2>
            <ul>
              {FOOTER.contact.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={s.regulatory}>
          <h2 className={s.regHeading}>{FOOTER.regulatoryHeading}</h2>
          <p className={s.regText}>{FOOTER.regulatory}</p>
        </div>
        <p className={s.bottom}>{FOOTER.bottom}</p>
      </div>
    </footer>
  );
}
