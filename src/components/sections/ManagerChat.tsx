'use client';

import { SUPPORT } from '@/content/copy';
import { Tag } from '@/components/ui/Tag';
import { usePageState } from '@/components/state/PageState';
import { Reveal } from './Reveal';
import s from './ManagerChat.module.css';

const C = SUPPORT.chat;

/**
 * An illustrative exchange with the India payments manager. It makes the
 * human tangible without inventing anything: every reply restates a fact
 * the page already makes. If the reader entered an amount in the hero, the
 * first message uses it. Messages cascade in once, on first view.
 */
export function ManagerChat() {
  const { amountLabel } = usePageState();
  const amount = amountLabel ?? C.sampleAmount;

  return (
    <figure className={s.chat}>
      <figcaption className={s.head}>
        <span className={s.who}>
          <span className={s.avatar} aria-hidden="true">
            {SUPPORT.monogram}
          </span>
          <span className={s.title}>{C.title}</span>
        </span>
        <Tag variant="illustrative" />
        <span className="visually-hidden">{C.caption}</span>
      </figcaption>
      <Reveal as="ol" stagger className={s.thread}>
        {C.messages.map((m, i) => {
          const [before, after] = m.text.split('{amount}');
          return (
            <li key={i} className={s.msg} data-from={m.from}>
              <span className="visually-hidden">{m.from === 'you' ? C.youLabel : C.managerLabel}: </span>
              <p className={s.bubble}>
                {before}
                {after !== undefined && (
                  <>
                    <span className={s.money}>{amount}</span>
                    {after}
                  </>
                )}
              </p>
            </li>
          );
        })}
      </Reveal>
    </figure>
  );
}
