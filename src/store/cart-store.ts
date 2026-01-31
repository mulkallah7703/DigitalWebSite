import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Minimal product data needed for cart operations
export interface CartProduct {
  id: string
  name: string
  slug: string
  price: number
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
  getItemCount: () => number
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
        return get().items.reduce((total, item) => {
          return total + Number(item.product.price) * item.quantity
        }, 0)
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'nexus-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
