import Header from "@/components/Header"
import Hero from "@/components/Hero"
import AboutUs from "@/components/AboutUs"
import Approach from "@/components/Approach"
import OurWork from "@/components/OurWork"
import Products from "@/components/Products"
import Commitments from "@/components/Commitments"
import Specialties from "@/components/Specialties"
import OpportunityResponsibility from "@/components/OpportunityResponsibility"
import CodeOfConduct from "@/components/CodeOfConduct"
import InvestorPage from "@/components/InvestorPage"
import Contributing from "@/components/Contributing"
import ContactUs from "@/components/ContactUs"
import Privacy from "@/components/Privacy"
import Terms from "@/components/Terms"
import CookiePolicy from "@/components/CookiePolicy"
import Features from "@/components/Features"
import Testimonials from "@/components/Testimonials"
import Pricing from "@/components/Pricing"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <Approach />
        <OurWork />
        <Products />
        <Commitments />
        <Specialties />
        <OpportunityResponsibility />
        <CodeOfConduct />
        <InvestorPage />
        <Contributing />
        <ContactUs />
        <Privacy />
        <Terms />
        <CookiePolicy />
        <Features />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

