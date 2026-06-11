import CatalogHero from '../components/catalog/CatalogHero'
import CatalogContent from '../components/catalog/CatalogContent'
import ContactForm from '../components/ContactForm'
import { useCatalog } from '../lib/catalog'

/** "קטלוג מוצרים" — the live product catalog, fed from the Shopify Catalog Collection. */
export default function CatalogPage() {
  const state = useCatalog()

  return (
    <main>
      <CatalogHero />
      <CatalogContent state={state} />
      <ContactForm />
    </main>
  )
}
