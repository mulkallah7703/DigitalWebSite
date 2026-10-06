import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Minimal product data needed for cart operations
export interface CartProduct {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number | null
  discountPercent?: number
  comparePrice?: number | null
  externalPurchaseLink?: string | null
  images: { id: string; url: string; alt?: string | null }[]
  category: { id: string; name: string; slug: string }
}

export interface CartItem {
  id: string
  productId: string
  quantity: number
  product: CartProduct
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: CartProduct) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotal: () => number
  getOriginalTotal: () => number
  getItemCount: () => number
  syncPrices: () => Promise<void>
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => {
        const items = get().items
        const existingItem = items.find((item) => item.productId === product.id)

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({
            items: [
              ...items,
              {
                id: crypto.randomUUID(),
                productId: product.id,
                quantity: 1,
                product,
              },
            ],
          })
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotal: () => {
        const items = get().items
        if (!Array.isArray(items)) return 0
        return items.reduce((total, item) => {
          const price = Number(item?.product?.price)
          const quantity = Number(item?.quantity)
          if (!Number.isFinite(price) || !Number.isFinite(quantity)) return total
          return total + price * quantity
        }, 0)
      },

      getOriginalTotal: () => {
        const items = get().items
        if (!Array.isArray(items)) return 0
        return items.reduce((total, item) => {
          const original = Number(item?.product?.originalPrice)
          const price = Number.isFinite(original) && original > 0 ? original : Number(item?.product?.price)
          const quantity = Number(item?.quantity)
          if (!Number.isFinite(price) || !Number.isFinite(quantity)) return total
          return total + price * quantity
        }, 0)
      },

      syncPrices: async () => {
        const items = get().items
        if (!Array.isArray(items) || items.length === 0) return
        try {
          const ids = items.map((item) => item.productId).join(',')
          const response = await fetch(`/api/store/prices?ids=${encodeURIComponent(ids)}`)
          if (!response.ok) return
          const data = await response.json() as {
            prices?: { id: string; price: number; salePrice: number | null; discountPercent: number }[]
          }
          const quotes = new Map((data.prices || []).map((quote) => [quote.id, quote]))
          set({
            items: get().items.map((item) => {
              const quote = quotes.get(item.productId)
              if (!quote) return item
              const sale = quote.salePrice != null && quote.salePrice < quote.price
              return {
                ...item,
                product: {
                  ...item.product,
                  price: sale ? quote.salePrice! : quote.price,
                  originalPrice: sale ? quote.price : null,
                  discountPercent: sale ? quote.discountPercent : 0,
                },
              }
            }),
          })
        } catch {
          // Keep the prices captured when the item was added.
        }
      },

      getItemCount: () => {
        const items = get().items
        if (!Array.isArray(items)) return 0
        return items.reduce((count, item) => count + (Number(item?.quantity) || 0), 0)
      },
    }),
    {
      name: 'nexus-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
