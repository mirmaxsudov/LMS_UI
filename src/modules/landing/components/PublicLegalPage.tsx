import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon, FileTextIcon, PrinterIcon, ShieldCheckIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';

import type { LegalDocumentCopy } from '../copy';

import { PublicFooter } from './PublicFooter';
import { PublicHeader } from './PublicHeader';

interface PublicLegalPageProps {
  document: LegalDocumentCopy;
  kind: 'privacy' | 'terms';
}

export const PublicLegalPage = ({ document, kind }: PublicLegalPageProps) => {
  const DocumentIcon = kind === 'privacy' ? ShieldCheckIcon : FileTextIcon;

  return (
    <div className='public-shell min-h-svh bg-[#f6faf7] text-[#17211b]'>
      <PublicHeader isCompact />
      <main>
        <section className='relative overflow-hidden border-b border-[#d9e4dd]'>
          <div className='public-grid absolute inset-0 opacity-50' />
          <div className='absolute top-0 right-0 h-full w-2/5 bg-[radial-gradient(circle_at_center,rgba(101,185,206,0.18),transparent_68%)]' />
          <div className='relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10'>
            <Link
              className='inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] hover:text-[#153f38]'
              to='/'
            >
              <ArrowLeftIcon className='size-4' />
              {document.backLabel}
            </Link>
            <div className='mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end'>
              <div className='max-w-3xl'>
                <div className='mb-5 flex items-center gap-3'>
                  <span className='grid size-11 place-items-center rounded-2xl bg-[#dceee7] text-[#0f766e]'>
                    <DocumentIcon className='size-5' />
                  </span>
                  <p className='text-xs font-bold tracking-[0.18em] text-[#4f7c3a] uppercase'>
                    {document.eyebrow}
                  </p>
                </div>
                <h1 className='font-[Georgia,serif] text-4xl leading-[1.04] font-semibold tracking-[-0.035em] sm:text-5xl lg:text-6xl'>
                  {document.title}
                </h1>
                <p className='mt-6 max-w-2xl text-base leading-7 text-[#58665f] sm:text-lg'>
                  {document.summary}
                </p>
              </div>
              <div className='flex flex-wrap items-center gap-3'>
                <div className='rounded-full border border-[#cddbd3] bg-white px-4 py-2 text-sm text-[#58665f]'>
                  <span className='font-semibold text-[#17211b]'>{document.updatedLabel}:</span>{' '}
                  {document.updatedAt}
                </div>
                <Button
                  className='rounded-full print:hidden'
                  variant='outline'
                  onClick={() => window.print()}
                >
                  <PrinterIcon />
                  {document.printLabel}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className='mx-auto grid max-w-7xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:px-10 lg:py-16'>
          <aside className='hidden lg:block'>
            <div className='sticky top-28 rounded-[1.75rem] border border-[#d9e4dd] bg-white p-5 shadow-[0_18px_55px_rgba(23,33,27,0.06)]'>
              <p className='text-xs font-bold tracking-[0.16em] text-[#4f7c3a] uppercase'>
                {document.contentsLabel}
              </p>
              <nav aria-label={document.contentsLabel} className='mt-4 flex flex-col gap-1'>
                {document.sections.map((section) => (
                  <a
                    href={`#${section.id}`}
                    key={section.id}
                    className='rounded-xl px-3 py-2 text-sm leading-5 text-[#66736c] transition-colors hover:bg-[#edf4ec] hover:text-[#153f38]'
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className='min-w-0'>
            <div className='mb-12 rounded-[1.75rem] border border-[#b9d9d1] bg-[#e9f4f1] p-6 text-[#24463e] sm:p-7'>
              <p className='leading-7'>{document.notice}</p>
            </div>
            <div className='space-y-12'>
              {document.sections.map((section) => (
                <section key={section.id} className='scroll-mt-28' id={section.id}>
                  <h2 className='font-[Georgia,serif] text-2xl leading-tight font-semibold tracking-[-0.02em] text-[#173f37] sm:text-3xl'>
                    {section.title}
                  </h2>
                  <div className='mt-5 space-y-4 text-[0.98rem] leading-7 text-[#58665f]'>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.items && (
                      <ul className='grid gap-3 pl-1'>
                        {section.items.map((item) => (
                          <li key={item} className='flex gap-3'>
                            <span className='mt-[0.7rem] size-1.5 shrink-0 rounded-full bg-[#65a30d]' />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
};
