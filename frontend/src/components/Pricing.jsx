import { useLanguage } from '../language.jsx'

export default function Pricing() {
  const { t } = useLanguage()

  return (
    <section className="pricing-card" aria-labelledby="pricing-heading">
      <h2 id="pricing-heading">{t('pricing')}</h2>
      <p>
        {t('pricingBefore')}{' '}
        <span className="pricing-amount">{t('pricingAmount')}</span>
        {t('pricingAfter')}
      </p>
    </section>
  )
}
