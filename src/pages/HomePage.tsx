import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { TariffsSection } from '@/components/tariffs/TariffsSection'
import { SupportCtaSection } from '@/components/landing/SupportCtaSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TariffsSection />
      <SupportCtaSection />
    </>
  )
}
