import type { ReactNode } from 'react'
import { ArrowRight, Check, Cpu, MonitorSmartphone, Shield, ShieldCheck, Sparkles, AlertTriangle, X, Zap } from 'lucide-react'
import { getT } from '@/lib/i18n/messages'

/**
 * New homepage blocks under the existing "Why choose us" section.
 * Copy is in homeLanding.* so it follows the URL locale.
 */
export function HomePrivacySections({ locale }: { locale: string }) {
  const t = getT(locale)

  const cloudPoints = [
    ['homeLanding.cloud1Title', 'homeLanding.cloud1Body'],
    ['homeLanding.cloud2Title', 'homeLanding.cloud2Body'],
    ['homeLanding.cloud3Title', 'homeLanding.cloud3Body'],
    ['homeLanding.cloud4Title', 'homeLanding.cloud4Body'],
  ] as const

  const localPoints = [
    ['homeLanding.local1Title', 'homeLanding.local1Body'],
    ['homeLanding.local2Title', 'homeLanding.local2Body'],
    ['homeLanding.local3Title', 'homeLanding.local3Body'],
    ['homeLanding.local4Title', 'homeLanding.local4Body'],
  ] as const

  const notes: Array<{ icon: ReactNode; title: string; body: string }> = [
    {
      icon: <Shield className="h-5 w-5" aria-hidden />,
      title: t('homeLanding.privacy1Title'),
      body: t('homeLanding.privacy1Body'),
    },
    {
      icon: <Zap className="h-5 w-5" aria-hidden />,
      title: t('homeLanding.privacy2Title'),
      body: t('homeLanding.privacy2Body'),
    },
    {
      icon: <Sparkles className="h-5 w-5" aria-hidden />,
      title: t('homeLanding.privacy3Title'),
      body: t('homeLanding.privacy3Body'),
    },
  ]

  return (
    <div className="mx-auto w-full max-w-7xl space-y-16 px-4 py-8">
      <section aria-labelledby="home-comparison-title">
        <div className="mb-10 text-center">
          {/* <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-300">
            {t('homeLanding.comparisonEyebrow')}
          </p> */}
          <h2 id="home-comparison-title" className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            {t('homeLanding.comparisonTitle')}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-slate-500 dark:text-slate-400">
            {t('homeLanding.comparisonLead')}
          </p>
        </div>
        <div className="grid items-stretch gap-5 lg:grid-cols-2">
          <article className="flex flex-col rounded-[1.75rem] bg-[#fff4f6] p-6 sm:p-8 dark:bg-rose-950/35">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">{t('homeLanding.cloudTitle')}</h3>
              <span className="rounded-md bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-600 dark:bg-rose-900/50 dark:text-rose-200">
                {t('homeLanding.cloudBadge')}
              </span>
            </div>
            <ul className="flex-1 space-y-4">
              {cloudPoints.map(([title, body]) => (
                <li key={title} className="flex gap-3 text-sm leading-relaxed">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" aria-hidden />
                  <p className="text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{t(title)}: </span>
                    {t(body)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-white p-4 text-sm text-slate-600 dark:bg-slate-950/60 dark:text-slate-300">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden />
              <p>{t('homeLanding.cloudFoot')}</p>
            </div>
          </article>

          <article className="flex flex-col rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] sm:p-8 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">{t('homeLanding.localTitle')}</h3>
              <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                {t('homeLanding.localBadge')}
              </span>
            </div>
            <ul className="flex-1 space-y-4">
              {localPoints.map(([title, body]) => (
                <li key={title} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
                  <p className="text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{t(title)}: </span>
                    {t(body)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-300" aria-hidden />
              <p>{t('homeLanding.localFoot')}</p>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="home-flow-title">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
            {t('homeLanding.flowEyebrow')}
          </p>
          <h2 id="home-flow-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('homeLanding.flowTitle')}
          </h2>
        </div>
        <ol className="flex flex-col items-stretch gap-6 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 md:flex-row md:items-start md:justify-between md:gap-4 md:p-10">
          <FlowStep
            icon={<MonitorSmartphone className="h-7 w-7" aria-hidden />}
            iconClass="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            title={t('homeLanding.step1Title')}
            body={t('homeLanding.step1Body')}
          />
          <FlowArrow label={t('homeLanding.step1Arrow')} className="text-violet-600" />
          <FlowStep
            icon={<Cpu className="h-7 w-7" aria-hidden />}
            iconClass="bg-violet-600 text-white"
            title={t('homeLanding.step2Title')}
            body={t('homeLanding.step2Body')}
          />
          <FlowArrow label={t('homeLanding.step2Arrow')} className="text-emerald-600" />
          <FlowStep
            icon={<Check className="h-7 w-7" aria-hidden />}
            iconClass="bg-emerald-500 text-white"
            title={t('homeLanding.step3Title')}
            body={t('homeLanding.step3Body')}
          />
        </ol>
      </section>

      <section aria-labelledby="home-privacy-title">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
            {t('homeLanding.privacyEyebrow')}
          </p>
          <h2 id="home-privacy-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('homeLanding.privacyTitle')}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{t('homeLanding.privacyLead')}</p>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {notes.map((note) => (
            <li
              key={note.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                {note.icon}
              </div>
              <h3 className="font-semibold">{note.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{note.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function FlowStep({
  icon,
  iconClass,
  title,
  body,
}: {
  icon: ReactNode
  iconClass: string
  title: string
  body: string
}) {
  return (
    <li className="flex flex-1 flex-col items-center text-center">
      <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${iconClass}`}>
        {icon}
      </div>
      <h3 className="text-base font-bold">{title}</h3>
      <p className="mt-2 max-w-xs text-sm text-slate-600 dark:text-slate-300">{body}</p>
    </li>
  )
}

function FlowArrow({ label, className }: { label: string; className: string }) {
  return (
    <li className={`flex items-center justify-center gap-1 self-center text-xs font-semibold uppercase tracking-wide ${className}`} aria-hidden>
      <span>{label}</span>
      <ArrowRight className="h-4 w-4" />
    </li>
  )
}
