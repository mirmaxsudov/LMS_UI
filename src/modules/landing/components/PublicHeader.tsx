import { useLingui } from '@lingui/react';
import { Link } from '@tanstack/react-router';
import { MenuIcon, SproutIcon, WavesIcon } from 'lucide-react';

import type { Locale } from '@/shared/i18n/config';

import { dynamicActivate } from '@/shared/i18n/dynamicActivate';
import { Button } from '@/shared/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/shared/ui/sheet';

import { getPublicLocale, publicCopy } from '../copy';

interface PublicHeaderProps {
  isCompact?: boolean;
}

const LanguageSwitch = ({ compact = false }: { compact?: boolean }) => {
  const { i18n } = useLingui();
  const locale = getPublicLocale(i18n.locale);

  const changeLocale = (nextLocale: Extract<Locale, 'ru' | 'uz'>) => {
    if (nextLocale !== locale) void dynamicActivate(nextLocale);
  };

  return (
    <div
      aria-label={publicCopy[locale].language}
      className='flex items-center rounded-full border border-[#cddbd3] bg-white/80 p-1 shadow-[0_8px_28px_rgba(23,33,27,0.06)]'
      role='group'
    >
      {(['uz', 'ru'] as const).map((item) => (
        <button
          key={item}
          className={`rounded-full font-semibold transition-colors ${
            compact ? 'px-3 py-2 text-sm' : 'px-3 py-1.5 text-xs'
          } ${locale === item ? 'bg-[#153f38] text-white' : 'text-[#66736c] hover:text-[#153f38]'}`}
          aria-pressed={locale === item}
          type='button'
          onClick={() => changeLocale(item)}
        >
          {item === 'uz' ? 'UZ' : 'RU'}
        </button>
      ))}
    </div>
  );
};

export const PublicHeader = ({ isCompact = false }: PublicHeaderProps) => {
  const { i18n } = useLingui();
  const locale = getPublicLocale(i18n.locale);
  const copy = publicCopy[locale];

  return (
    <header className='sticky top-0 z-40 border-b border-[#d9e4dd]/80 bg-[#f6faf7]/90 backdrop-blur-xl'>
      <div className='mx-auto flex h-[4.75rem] max-w-7xl items-center gap-6 px-5 sm:px-8 lg:px-10'>
        <Link className='group flex items-center gap-3' to='/'>
          <span className='relative grid size-11 place-items-center overflow-hidden rounded-[1.15rem] bg-[#153f38] text-white shadow-[0_12px_32px_rgba(21,63,56,0.18)]'>
            <WavesIcon
              className='absolute -bottom-1 -left-1 size-8 text-[#65b9ce]/75'
              strokeWidth={1.6}
            />
            <SproutIcon
              className='relative size-5 translate-x-1 -translate-y-1 text-[#c9e16f]'
              strokeWidth={2.1}
            />
          </span>
          <span className='min-w-0'>
            <span className='block truncate font-[Georgia,serif] text-[1.05rem] leading-none font-semibold text-[#17211b]'>
              {copy.brand}
            </span>
            <span className='mt-1 block text-[0.65rem] font-semibold tracking-[0.15em] text-[#66736c] uppercase'>
              {copy.brandCaption}
            </span>
          </span>
        </Link>

        {!isCompact && (
          <nav
            aria-label='Primary navigation'
            className='ml-auto hidden items-center gap-7 lg:flex'
          >
            <a href='#features' className='public-nav-link'>
              {copy.navigation.features}
            </a>
            <a href='#courses' className='public-nav-link'>
              {copy.navigation.courses}
            </a>
            <a href='#process' className='public-nav-link'>
              {copy.navigation.process}
            </a>
            <a href='#faq' className='public-nav-link'>
              {copy.navigation.faq}
            </a>
          </nav>
        )}

        <div className='ml-auto hidden items-center gap-3 sm:flex lg:ml-0'>
          <LanguageSwitch />
          <Button
            asChild
            className='rounded-full bg-[#153f38] px-5 hover:bg-[#0f766e]'
            size='default'
          >
            <Link to='/login'>{copy.login}</Link>
          </Button>
        </div>

        <div className='ml-auto sm:hidden'>
          <Sheet>
            <SheetTrigger asChild>
              <Button aria-label={copy.menu} className='rounded-full' size='icon' variant='outline'>
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent
              className='public-shell w-[88%] border-[#d9e4dd] bg-[#f6faf7] p-0'
              side='right'
            >
              <SheetHeader className='border-b border-[#d9e4dd] px-6 py-6 text-left'>
                <SheetTitle className='font-[Georgia,serif] text-xl text-[#17211b]'>
                  {copy.brand}
                </SheetTitle>
                <SheetDescription>{copy.brandCaption}</SheetDescription>
              </SheetHeader>
              <nav className='flex flex-col gap-1 px-4 py-5'>
                {!isCompact && (
                  <>
                    <SheetClose asChild>
                      <a href='#features' className='public-mobile-link'>
                        {copy.navigation.features}
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a href='#courses' className='public-mobile-link'>
                        {copy.navigation.courses}
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a href='#process' className='public-mobile-link'>
                        {copy.navigation.process}
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a href='#faq' className='public-mobile-link'>
                        {copy.navigation.faq}
                      </a>
                    </SheetClose>
                  </>
                )}
                {isCompact && (
                  <SheetClose asChild>
                    <Link className='public-mobile-link' to='/'>
                      {copy.home}
                    </Link>
                  </SheetClose>
                )}
                <SheetClose asChild>
                  <Link className='public-mobile-link' to='/terms'>
                    {copy.terms}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link className='public-mobile-link' to='/privacy'>
                    {copy.privacy}
                  </Link>
                </SheetClose>
              </nav>
              <div className='mt-auto space-y-4 border-t border-[#d9e4dd] p-6'>
                <LanguageSwitch compact />
                <Button asChild className='w-full rounded-full bg-[#153f38]' size='lg'>
                  <Link to='/login'>{copy.login}</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
