import { useLingui } from '@lingui/react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRightIcon, SproutIcon, WavesIcon } from 'lucide-react';

import { getPublicLocale, publicCopy } from '../copy';

export const PublicFooter = () => {
  const { i18n } = useLingui();
  const locale = getPublicLocale(i18n.locale);
  const copy = publicCopy[locale];

  return (
    <footer className='border-t border-white/10 bg-[#102f2a] text-white'>
      <div className='mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.5fr_0.75fr_0.75fr] lg:px-10'>
        <div className='max-w-md'>
          <Link className='flex w-fit items-center gap-3' to='/'>
            <span className='relative grid size-11 place-items-center overflow-hidden rounded-[1.15rem] bg-white text-[#153f38]'>
              <WavesIcon
                className='absolute -bottom-1 -left-1 size-8 text-[#65b9ce]'
                strokeWidth={1.6}
              />
              <SproutIcon
                className='relative size-5 translate-x-1 -translate-y-1 text-[#4f7c3a]'
                strokeWidth={2.1}
              />
            </span>
            <span>
              <span className='block font-[Georgia,serif] text-lg font-semibold'>{copy.brand}</span>
              <span className='text-xs tracking-[0.12em] text-white/55 uppercase'>
                {copy.brandCaption}
              </span>
            </span>
          </Link>
          <p className='mt-5 text-sm leading-6 text-white/65'>{copy.footerDescription}</p>
        </div>

        <div>
          <p className='text-xs font-bold tracking-[0.18em] text-[#c9e16f] uppercase'>
            {copy.footerPlatform}
          </p>
          <div className='mt-4 flex flex-col items-start gap-3 text-sm text-white/70'>
            <a href='/#features' className='hover:text-white'>
              {copy.navigation.features}
            </a>
            <a href='/#courses' className='hover:text-white'>
              {copy.navigation.courses}
            </a>
            <a href='/#process' className='hover:text-white'>
              {copy.navigation.process}
            </a>
          </div>
        </div>

        <div>
          <p className='text-xs font-bold tracking-[0.18em] text-[#c9e16f] uppercase'>
            {copy.footerSupport}
          </p>
          <div className='mt-4 flex flex-col items-start gap-3 text-sm text-white/70'>
            <Link className='hover:text-white' to='/terms'>
              {copy.terms}
            </Link>
            <Link className='hover:text-white' to='/privacy'>
              {copy.privacy}
            </Link>
            <Link className='inline-flex items-center gap-1.5 hover:text-white' to='/login'>
              {copy.support}
              <ArrowUpRightIcon className='size-3.5' />
            </Link>
          </div>
        </div>
      </div>
      <div className='border-t border-white/10'>
        <div className='mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10'>
          <p>
            © 2026 {copy.brand}. {copy.footerRights}
          </p>
          <p>Agro LMS · Uzbekistan</p>
        </div>
      </div>
    </footer>
  );
};
