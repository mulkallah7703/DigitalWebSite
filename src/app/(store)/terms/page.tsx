import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Alsadi Digital Store',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl lg:text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using Alsadi Digital Store, you accept and agree to be bound by 
            these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Digital Products</h2>
          <p className="text-muted-foreground mb-4">
            All products sold on our platform are digital goods. Upon successful payment:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>You receive a license to use the product according to its specific license terms</li>
            <li>Downloads are available immediately in your account</li>
            <li>You have lifetime access to your purchased products</li>
            <li>Free updates are included for the product version you purchased</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. License Terms</h2>
          <p className="text-muted-foreground mb-4">
            Unless otherwise specified, digital products are licensed for:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Personal and commercial use</li>
            <li>Use in unlimited projects</li>
            <li>Modification and customization</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            You may NOT:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Redistribute or resell the original product files</li>
            <li>Share your account or downloads with others</li>
            <li>Use products in illegal or harmful applications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Refund Policy</h2>
          <p className="text-muted-foreground">
            Due to the nature of digital products, all sales are final. However, we may offer 
            refunds on a case-by-case basis if the product is significantly different from its 
            description or has major defects. Refund requests must be made within 14 days of purchase.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. User Accounts</h2>
          <p className="text-muted-foreground">
            You are responsible for maintaining the confidentiality of your account credentials 
            and for all activities that occur under your account. You must notify us immediately 
            of any unauthorized use of your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
          <p className="text-muted-foreground">
            All content on this platform, including but not limited to text, graphics, logos, 
            and software, is the property of Alsadi Digital Store or its content suppliers and 
            is protected by intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="text-muted-foreground">
            Alsadi Digital Store shall not be liable for any indirect, incidental, special, 
            consequential, or punitive damages resulting from your use of or inability to use 
            our services or products.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p className="text-muted-foreground">
            We reserve the right to modify these terms at any time. Changes will be effective 
            immediately upon posting. Your continued use of our services constitutes acceptance 
            of the modified terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
          <p className="text-muted-foreground">
            For questions about these Terms of Service, please contact us at legal@nexus.store.
          </p>
        </section>
      </div>
    </div>
  )
}
