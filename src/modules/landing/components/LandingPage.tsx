import { useLingui } from '@lingui/react';
import { Link } from '@tanstack/react-router';
import {
  ArrowRightIcon,
  AwardIcon,
  BookOpenCheckIcon,
  CheckIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  Clock3Icon,
  FileCheck2Icon,
  HeadphonesIcon,
  MapPinIcon,
  MapPinnedIcon,
  MessageCircleMoreIcon,
  PlayIcon,
  ShieldCheckIcon,
  SproutIcon,
  UsersRoundIcon,
  WavesIcon
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/shared/ui/accordion';
import { Button } from '@/shared/ui/button';

import { getPublicLocale, landingCopy } from '../copy';
import { PublicFooter } from './PublicFooter';
import { PublicHeader } from './PublicHeader';

const featureIcons = [
  BookOpenCheckIcon,
  PlayIcon,
  MapPinnedIcon,
  FileCheck2Icon,
  AwardIcon,
  HeadphonesIcon
];

const courseToneClass = {
  water: 'from-[#0f766e] via-[#168c96] to-[#65b9ce]',
  field: 'from-[#315426] via-[#4f7c3a] to-[#a4bf55]',
  earth: 'from-[#7c4f2d] via-[#ad7040] to-[#d4a86f]'
} as const;

export const LandingPage = () => {
  const { i18n } = useLingui();
  const locale = getPublicLocale(i18n.locale);
  const copy = landingCopy[locale];

  return (
    <div className='public-shell min-h-svh overflow-hidden bg-[#f6faf7] text-[#17211b]'>
      <PublicHeader />
      <main>
        <section className='relative isolate border-b border-[#d9e4dd]'>
          <div className='public-grid absolute inset-0 -z-20 opacity-55' />
          <div className='absolute -top-72 left-[48%] -z-10 size-184 rounded-full bg-[#dceee7]/80 blur-3xl' />
          <div className='absolute -right-32 bottom-0 -z-10 h-72 w-96 rotate-[-8deg] rounded-[50%] bg-[#dff1f6]/80 blur-2xl' />

          <div className='mx-auto grid min-h-[calc(100svh-4.75rem)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:py-20'>
            <div className='public-reveal'>
              <div className='inline-flex items-center gap-2 rounded-full border border-[#cfe0d7] bg-white/80 px-3 py-2 text-xs font-bold tracking-[0.12em] text-[#4f7c3a] uppercase shadow-[0_10px_30px_rgba(23,33,27,0.05)]'>
                <SproutIcon className='size-4' />
                {copy.heroEyebrow}
              </div>
              <h1 className='mt-7 max-w-3xl font-[Georgia,serif] text-[clamp(3.2rem,7vw,6.6rem)] leading-[0.92] font-semibold tracking-[-0.06em] text-[#153f38]'>
                {copy.heroTitle}
              </h1>
              <p className='mt-7 max-w-2xl text-base leading-7 text-[#58665f] sm:text-lg sm:leading-8'>
                {copy.heroDescription}
              </p>
              <div className='mt-9 flex flex-col gap-3 sm:flex-row'>
                <Button
                  asChild
                  className='rounded-full bg-[#153f38] px-7 shadow-[0_16px_36px_rgba(21,63,56,0.2)] hover:bg-[#0f766e]'
                  size='lg'
                >
                  <a href='#courses'>
                    {copy.heroPrimary}
                    <ArrowRightIcon />
                  </a>
                </Button>
                <Button
                  asChild
                  className='rounded-full border-[#bfcfc6] bg-white/70 px-7'
                  size='lg'
                  variant='outline'
                >
                  <a href='#features'>{copy.heroSecondary}</a>
                </Button>
              </div>
              <div className='mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#58665f]'>
                {[copy.verified, copy.onlineOffline, copy.certificate].map((item) => (
                  <span key={item} className='flex items-center gap-2'>
                    <CircleCheckIcon className='size-4 text-[#4f7c3a]' />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className='public-reveal public-reveal-delay relative mx-auto w-full max-w-[35rem] lg:mr-0'>
              <div className='absolute -top-8 -right-9 size-32 rounded-full border border-[#65b9ce]/35' />
              <div className='absolute -top-3 -right-4 size-20 rounded-full border border-[#65b9ce]/50' />
              <div className='absolute -bottom-7 -left-8 size-24 rotate-12 rounded-[2rem] bg-[#c9e16f]/35 blur-sm' />

              <div className='relative overflow-hidden rounded-[2.25rem] border border-white/80 bg-white p-3 shadow-[0_36px_90px_rgba(21,63,56,0.17)]'>
                <div className='relative overflow-hidden rounded-[1.7rem] bg-[#153f38] px-6 pt-7 pb-24 text-white sm:px-8 sm:pt-9'>
                  <div className='public-water-lines absolute inset-0 opacity-45' />
                  <div className='absolute -right-24 -bottom-36 size-80 rounded-full bg-[#65b9ce]/35 blur-2xl' />
                  <div className='relative'>
                    <p className='text-xs font-bold tracking-[0.16em] text-[#c9e16f] uppercase'>
                      {copy.visualLabel}
                    </p>
                    <h2 className='mt-3 max-w-sm font-[Georgia,serif] text-3xl leading-tight font-semibold sm:text-4xl'>
                      {copy.visualCourse}
                    </h2>
                    <div className='mt-8 flex items-end justify-between gap-4'>
                      <div>
                        <p className='text-sm text-white/60'>{copy.visualProgress}</p>
                        <p className='mt-1 text-4xl font-semibold tracking-tight'>
                          {copy.visualProgressValue}
                        </p>
                      </div>
                      <div className='grid size-20 place-items-center rounded-full border-[7px] border-white/15 border-t-[#c9e16f] border-r-[#c9e16f] text-sm font-semibold'>
                        08/12
                      </div>
                    </div>
                  </div>
                </div>

                <div className='relative mx-3 -mt-16 rounded-[1.6rem] border border-[#d9e4dd] bg-[#fbfdfb] p-5 shadow-[0_18px_50px_rgba(23,33,27,0.12)] sm:mx-5 sm:p-6'>
                  <div className='flex items-start gap-4'>
                    <span className='grid size-11 shrink-0 place-items-center rounded-2xl bg-[#dff1f6] text-[#0284c7]'>
                      <Clock3Icon className='size-5' />
                    </span>
                    <div>
                      <p className='text-xs font-bold tracking-[0.12em] text-[#66736c] uppercase'>
                        {copy.visualNext}
                      </p>
                      <p className='mt-1 font-semibold text-[#17211b]'>{copy.visualNextValue}</p>
                      <p className='mt-1 flex items-center gap-1.5 text-sm text-[#66736c]'>
                        <MapPinIcon className='size-3.5' />
                        {copy.visualLocation}
                      </p>
                    </div>
                  </div>
                  <Button asChild className='mt-5 w-full rounded-full bg-[#0f766e]'>
                    <Link to='/login'>
                      {copy.visualAction}
                      <ChevronRightIcon />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='border-b border-[#d9e4dd] bg-white'>
          <div className='mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-10'>
            {copy.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`py-8 sm:py-10 ${index % 2 === 0 ? 'border-r border-[#d9e4dd]' : ''} ${index > 1 ? 'border-t border-[#d9e4dd] lg:border-t-0' : ''} ${index === 1 ? 'lg:border-r' : ''}`}
              >
                <p className='text-center font-[Georgia,serif] text-3xl font-semibold text-[#153f38] sm:text-4xl'>
                  {stat.value}
                </p>
                <p className='mt-1 text-center text-xs font-medium text-[#66736c] sm:text-sm'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className='mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10' id='features'>
          <div className='grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20'>
            <div>
              <p className='public-eyebrow'>{copy.featureEyebrow}</p>
              <h2 className='public-section-title mt-5'>{copy.featureTitle}</h2>
              <p className='mt-6 max-w-md text-base leading-7 text-[#66736c]'>
                {copy.featureDescription}
              </p>
            </div>
            <div className='grid gap-px overflow-hidden rounded-[2rem] border border-[#d9e4dd] bg-[#d9e4dd] sm:grid-cols-2'>
              {copy.features.map((feature, index) => {
                const Icon = featureIcons[index];
                return (
                  <article
                    key={feature.title}
                    className='group bg-white p-6 transition-colors hover:bg-[#f2f8f4] sm:p-7'
                  >
                    <div className='flex items-start justify-between gap-4'>
                      <span className='grid size-11 place-items-center rounded-2xl bg-[#e8f3ed] text-[#0f766e] transition-transform group-hover:scale-105 group-hover:-rotate-3'>
                        <Icon className='size-5' />
                      </span>
                      <span className='font-[Georgia,serif] text-sm text-[#9caaa2]'>
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className='mt-7 font-[Georgia,serif] text-xl font-semibold text-[#173f37]'>
                      {feature.title}
                    </h3>
                    <p className='mt-3 text-sm leading-6 text-[#66736c]'>{feature.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className='relative bg-[#eaf3ec] py-20 sm:py-28' id='courses'>
          <div className='public-field-lines absolute inset-0 opacity-40' />
          <div className='relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10'>
            <div className='flex flex-col gap-7 md:flex-row md:items-end md:justify-between'>
              <div className='max-w-2xl'>
                <p className='public-eyebrow'>{copy.coursesEyebrow}</p>
                <h2 className='public-section-title mt-5'>{copy.coursesTitle}</h2>
                <p className='mt-5 max-w-xl leading-7 text-[#66736c]'>{copy.coursesDescription}</p>
              </div>
              <Button
                asChild
                className='w-fit rounded-full border-[#b7cabe] bg-white'
                variant='outline'
              >
                <a href='#courses'>
                  {copy.allCourses}
                  <ArrowRightIcon />
                </a>
              </Button>
            </div>

            <div className='mt-12 grid gap-5 lg:grid-cols-3'>
              {copy.courses.map((course) => (
                <article
                  key={course.title}
                  className='group overflow-hidden rounded-[1.8rem] border border-white/80 bg-white shadow-[0_20px_55px_rgba(23,33,27,0.08)]'
                >
                  <div
                    className={`relative h-48 overflow-hidden bg-linear-to-br ${courseToneClass[course.tone]}`}
                  >
                    <div className='public-water-lines absolute inset-0 opacity-35 transition-transform duration-700 group-hover:scale-110' />
                    <div className='absolute top-5 left-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#173f37] backdrop-blur'>
                      {course.category}
                    </div>
                    <div className='absolute right-5 bottom-5 flex size-12 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur transition-transform group-hover:scale-105 group-hover:rotate-6'>
                      <PlayIcon className='size-5 fill-current' />
                    </div>
                  </div>
                  <div className='p-6'>
                    <div className='flex flex-wrap gap-2 text-xs font-semibold text-[#4f7c3a]'>
                      <span className='rounded-full bg-[#edf4ec] px-2.5 py-1'>
                        {copy.courseLabels.free}
                      </span>
                      <span className='rounded-full bg-[#e5f3f8] px-2.5 py-1 text-[#075985]'>
                        {copy.courseLabels.certificate}
                      </span>
                    </div>
                    <h3 className='mt-5 font-[Georgia,serif] text-2xl leading-tight font-semibold text-[#173f37]'>
                      {course.title}
                    </h3>
                    <p className='mt-3 text-sm leading-6 text-[#66736c]'>{course.description}</p>
                    <div className='mt-6 flex items-center justify-between border-t border-[#e4ece7] pt-5 text-sm text-[#58665f]'>
                      <span className='flex items-center gap-2'>
                        <BookOpenCheckIcon className='size-4 text-[#0f766e]' />
                        {course.lessons} {copy.courseLabels.lessons}
                      </span>
                      <span className='flex items-center gap-2'>
                        <Clock3Icon className='size-4 text-[#0f766e]' />
                        {course.weeks} {copy.courseLabels.weeks}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className='mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10' id='process'>
          <div className='max-w-2xl'>
            <p className='public-eyebrow'>{copy.processEyebrow}</p>
            <h2 className='public-section-title mt-5'>{copy.processTitle}</h2>
          </div>
          <div className='relative mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <div className='absolute top-9 right-[12%] left-[12%] hidden border-t border-dashed border-[#9eb8a8] lg:block' />
            {copy.process.map((step) => (
              <article
                key={step.number}
                className='relative rounded-[1.6rem] border border-[#d9e4dd] bg-white p-6'
              >
                <span className='relative z-10 inline-flex h-[4.5rem] min-w-[4.5rem] items-center justify-center rounded-full border-[6px] border-[#f6faf7] bg-[#153f38] font-[Georgia,serif] text-xl font-semibold text-white shadow-[0_10px_24px_rgba(21,63,56,0.18)]'>
                  {step.number}
                </span>
                <h3 className='mt-7 font-[Georgia,serif] text-xl font-semibold text-[#173f37]'>
                  {step.title}
                </h3>
                <p className='mt-3 text-sm leading-6 text-[#66736c]'>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className='mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10'>
          <div className='relative overflow-hidden rounded-[2.4rem] bg-[#153f38] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16'>
            <div className='public-water-lines absolute inset-0 opacity-30' />
            <div className='absolute -right-20 -bottom-48 size-[30rem] rounded-full bg-[#65b9ce]/25 blur-3xl' />
            <div className='relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center'>
              <div>
                <p className='text-xs font-bold tracking-[0.18em] text-[#c9e16f] uppercase'>
                  {copy.expertEyebrow}
                </p>
                <h2 className='mt-5 max-w-2xl font-[Georgia,serif] text-4xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl'>
                  {copy.expertTitle}
                </h2>
                <p className='mt-6 max-w-2xl leading-7 text-white/68'>{copy.expertDescription}</p>
                <div className='mt-7 flex flex-wrap gap-3'>
                  {copy.expertPoints.map((point) => (
                    <span
                      key={point}
                      className='inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-2 text-sm text-white/85'
                    >
                      <CheckIcon className='size-4 text-[#c9e16f]' />
                      {point}
                    </span>
                  ))}
                </div>
                <Button
                  asChild
                  className='mt-8 rounded-full bg-[#c9e16f] px-6 text-[#173f37] hover:bg-[#d8eb8e]'
                  size='lg'
                >
                  <Link to='/login'>
                    {copy.expertAction}
                    <MessageCircleMoreIcon />
                  </Link>
                </Button>
              </div>

              <div className='relative min-h-80'>
                <div className='absolute top-1 left-0 w-[88%] rounded-[1.6rem] bg-white p-5 text-[#17211b] shadow-2xl sm:left-4'>
                  <div className='flex items-center gap-3'>
                    <span className='grid size-10 place-items-center rounded-full bg-[#e8f3ed] text-[#0f766e]'>
                      <UsersRoundIcon className='size-5' />
                    </span>
                    <div>
                      <p className='font-semibold'>{copy.expertName}</p>
                      <p className='text-xs text-[#66736c]'>{copy.expertRole}</p>
                    </div>
                  </div>
                  <p className='mt-4 rounded-2xl bg-[#f2f6f3] p-4 text-sm leading-6 text-[#58665f]'>
                    {copy.expertResponse}
                  </p>
                </div>
                <div className='absolute right-0 bottom-0 w-[82%] rounded-[1.6rem] border border-white/20 bg-white/10 p-5 backdrop-blur'>
                  <div className='flex items-center gap-3'>
                    <span className='grid size-9 place-items-center rounded-full bg-[#65b9ce]/25'>
                      <ShieldCheckIcon className='size-4 text-[#9cdeef]' />
                    </span>
                    <p className='text-sm font-medium'>{copy.expertVerified}</p>
                  </div>
                  <div className='mt-4 h-2 rounded-full bg-white/10'>
                    <div className='h-full w-4/5 rounded-full bg-[#c9e16f]' />
                  </div>
                  <p className='mt-3 text-xs text-white/55'>{copy.expertResponseTime}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='border-y border-[#d9e4dd] bg-white'>
          <div className='mx-auto grid max-w-7xl lg:grid-cols-[0.7fr_1.3fr]'>
            <div className='relative min-h-72 overflow-hidden bg-[#dfeedd] p-8 sm:p-12 lg:min-h-[28rem]'>
              <div className='public-field-lines absolute inset-0 opacity-60' />
              <WavesIcon
                className='absolute -right-14 -bottom-12 size-64 text-[#65b9ce]/35'
                strokeWidth={0.8}
              />
              <SproutIcon className='relative size-16 text-[#4f7c3a]' strokeWidth={1.4} />
            </div>
            <div className='flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-16'>
              <blockquote className='max-w-3xl font-[Georgia,serif] text-3xl leading-[1.25] font-medium tracking-[-0.025em] text-[#173f37] sm:text-4xl'>
                “{copy.quote}”
              </blockquote>
              <p className='mt-7 text-sm font-bold tracking-[0.14em] text-[#4f7c3a] uppercase'>
                {copy.quoteAttribution}
              </p>
            </div>
          </div>
        </section>

        <section className='mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10' id='faq'>
          <div className='grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24'>
            <div>
              <p className='public-eyebrow'>{copy.faqEyebrow}</p>
              <h2 className='public-section-title mt-5'>{copy.faqTitle}</h2>
            </div>
            <Accordion className='border-t border-[#cddbd3]' type='single' collapsible>
              {copy.faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger className='py-6 text-base font-semibold text-[#173f37] hover:no-underline'>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className='max-w-2xl pb-6 text-sm leading-7 text-[#66736c]'>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className='px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10'>
          <div className='relative mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] bg-[#c9e16f] px-6 py-12 sm:px-12 sm:py-16 lg:px-16'>
            <div className='absolute -top-24 -right-20 size-72 rounded-full border-[42px] border-[#153f38]/8' />
            <div className='relative max-w-4xl'>
              <p className='text-xs font-bold tracking-[0.18em] text-[#315426] uppercase'>
                {copy.ctaEyebrow}
              </p>
              <h2 className='mt-5 font-[Georgia,serif] text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-[#153f38] sm:text-5xl lg:text-6xl'>
                {copy.ctaTitle}
              </h2>
              <p className='mt-6 max-w-2xl text-base leading-7 text-[#315426]'>
                {copy.ctaDescription}
              </p>
              <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
                <Button
                  asChild
                  className='rounded-full bg-[#153f38] px-7 hover:bg-[#0f766e]'
                  size='lg'
                >
                  <a href='#courses'>
                    {copy.ctaPrimary}
                    <ArrowRightIcon />
                  </a>
                </Button>
                <Button
                  asChild
                  className='rounded-full border-[#6f8f3f] bg-transparent px-7 text-[#153f38] hover:bg-white/35 hover:text-[#153f38]'
                  size='lg'
                  variant='outline'
                >
                  <Link to='/login'>{copy.ctaSecondary}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
};
