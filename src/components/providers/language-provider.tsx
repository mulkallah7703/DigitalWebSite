'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Language = 'en' | 'ar'

// Context only contains serializable data (no functions)
interface LanguageContextType {
  language: Language
}

// Default context value for SSR/build-time safety
const defaultContextValue: LanguageContextType = {
  language: 'en',
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

// Language state management - separate from context to avoid function serialization
let languageState: Language = 'en'
const languageListeners = new Set<(lang: Language) => void>()

function setLanguageState(newLang: Language) {
  languageState = newLang
  languageListeners.forEach(listener => listener(newLang))
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('language', newLang)
    }
  } catch {
    // Silently fail
  }
}

function getLanguageState(): Language {
  return languageState
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.products': 'Products',
    'nav.categories': 'Categories',
    'nav.deals': 'Deals',
    'nav.admin': 'Admin Dashboard',
    'nav.account': 'My Account',
    'nav.orders': 'My Orders',
    'nav.wishlist': 'Wishlist',
    'nav.settings': 'Settings',
    'nav.signOut': 'Sign Out',
    'nav.signIn': 'Sign In',
    // Common
    'common.search': 'Search products...',
    'common.cart': 'Shopping Cart',
    'common.items': 'items',
    'common.subtotal': 'Subtotal',
    'common.total': 'Total',
    'common.tax': 'Tax',
    'common.reviews': 'reviews',
    'common.sales': 'sales',
    'common.products': 'products',
    // Language
    'lang.english': 'English',
    'lang.arabic': 'Arabic',
    // Cart
    'cart.empty': 'Your cart is empty',
    'cart.emptyDesc': 'Looks like you haven\'t added anything yet',
    'cart.clear': 'Clear Cart',
    'cart.proceed': 'Proceed to Checkout',
    'cart.browse': 'Browse Products',
    'cart.add': 'Add to Cart',
    // Product
    'product.featured': 'Featured',
    'product.addToCart': 'Add to Cart',
    'product.instantDownload': 'Instant Download',
    'product.securePayment': 'Secure Payment',
    'product.lifetimeAccess': 'Lifetime Access',
    'product.freeUpdates': 'Free Updates',
    'product.description': 'Description',
    'product.files': 'Files',
    'product.reviews': 'Reviews',
    'product.noReviews': 'No reviews yet',
    'product.verified': 'Verified',
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.desc': 'Review your order and complete payment',
    'checkout.empty': 'Your cart is empty',
    'checkout.emptyDesc': 'Looks like you haven\'t added anything to your cart yet.',
    'checkout.payStripe': 'Pay with Stripe',
    'checkout.secure': 'Secure checkout powered by Stripe',
    'checkout.remove': 'Remove',
    'checkout.failed': 'Checkout failed',
    'checkout.cartEmpty': 'Cart is empty',
    'checkout.addProducts': 'Add some products to your cart first',
    // Admin
    'admin.dashboard': 'Dashboard',
    'admin.products': 'Products',
    'admin.categories': 'Categories',
    'admin.orders': 'Orders',
    'admin.users': 'Users',
    'admin.coupons': 'Coupons',
    'admin.analytics': 'Analytics',
    'admin.spreadsheet': 'Spreadsheet Sync',
    'admin.settings': 'Settings',
    'admin.viewStore': 'View Store',
    'admin.profileSettings': 'Profile Settings',
    // Success
    'success.payment': 'Payment Successful!',
    'success.thankYou': 'Thank you for your purchase. Your order has been confirmed and your downloads are ready.',
    'success.downloads': 'View My Downloads',
    'success.continue': 'Continue Shopping',
    // Home
    'home.browseCategory': 'Browse by Category',
    'home.categoryDesc': 'Find exactly what you need from our diverse collection of digital products',
    'home.viewAllCategories': 'View All Categories',
    'home.aiMarketplace': 'AI-Powered Digital Marketplace',
    'home.discoverPremium': 'Discover Premium',
    'home.digitalProducts': 'Digital Products',
    'home.heroDesc': 'Explore our curated collection of software, templates, courses, and digital assets. Powered by AI for personalized recommendations.',
    'home.browseProducts': 'Browse Products',
    'home.exploreCategories': 'Explore Categories',
    'home.instantDelivery': 'Instant Delivery',
    'home.secureDownloads': 'Secure Downloads',
    'home.lifetimeAccess': 'Lifetime Access',
    'home.fastDelivery': 'Fast Delivery',
    'home.instantAccess': 'Instant access to your purchases',
    'home.securePayment': 'Secure Payment',
    'home.protectedByStripe': 'Protected by Stripe',
    'home.whyChoose': 'Why Choose Nexus?',
    'home.commitment': 'We\'re committed to providing the best digital shopping experience',
    'home.aiRecommendations': 'AI-Powered Recommendations',
    'home.aiRecommendationsDesc': 'Get personalized product suggestions based on your preferences and browsing history.',
    'home.instantDeliveryDesc': 'Access your digital products immediately after purchase. No waiting required.',
    'home.secureTransactions': 'Secure Transactions',
    'home.secureTransactionsDesc': 'Your payments are protected with industry-leading encryption and security.',
    'home.lifetimeAccessDesc': 'Once purchased, your digital products are yours forever with unlimited downloads.',
    'home.freeUpdatesDesc': 'Receive all future updates and improvements at no additional cost.',
    'home.support247': '24/7 Support',
    'home.support247Desc': 'Our dedicated support team is always ready to help you with any questions.',
    'home.aiRecommended': 'AI Recommended',
    'home.featuredProducts': 'Featured Products',
    'home.handpicked': 'Handpicked digital products curated just for you',
    'home.viewAll': 'View All',
    'home.startJourney': 'Start Your Journey',
    'home.readyExplore': 'Ready to Explore?',
    'home.joinThousands': 'Join thousands of creators and developers who trust Nexus for their digital product needs. Start browsing our collection today.',
    'home.createAccount': 'Create Account',
    // Footer
    'footer.allProducts': 'All Products',
    'footer.newArrivals': 'New Arrivals',
    'footer.bestSellers': 'Best Sellers',
    'footer.aboutUs': 'About Us',
    'footer.contact': 'Contact',
    'footer.careers': 'Careers',
    'footer.blog': 'Blog',
    'footer.helpCenter': 'Help Center',
    'footer.faqs': 'FAQs',
    'footer.refundPolicy': 'Refund Policy',
    'footer.license': 'License',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.cookiePolicy': 'Cookie Policy',
    'footer.products': 'Products',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.legal': 'Legal',
    'footer.description': 'Your premium destination for digital products. Powered by AI for a smarter shopping experience.',
    'footer.copyright': 'All rights reserved.',
    'footer.poweredBy': 'Powered by AI • Built with Next.js',
    // Product
    'product.off': 'OFF',
    // Admin Pages
    'admin.welcome': 'Welcome back! Here\'s your store overview.',
    'admin.manageProducts': 'Manage your digital products',
    'admin.addProduct': 'Add Product',
    'admin.searchProducts': 'Search products...',
    'admin.noProducts': 'No products found',
    'admin.view': 'View',
    'admin.edit': 'Edit',
    'admin.delete': 'Delete',
    'admin.product': 'Product',
    'admin.category': 'Category',
    'admin.price': 'Price',
    'admin.status': 'Status',
    'admin.created': 'Created',
    // Error Pages
    'error.notFound': 'Page Not Found',
    'error.notFoundDesc': 'Sorry, we couldn\'t find the page you\'re looking for. It might have been moved or doesn\'t exist.',
    'error.goBack': 'Go Back',
    'error.home': 'Home',
    'error.somethingWrong': 'Something went wrong',
    'error.unexpected': 'We encountered an unexpected error. Please try again or return to the home page.',
    'error.tryAgain': 'Try Again',
    // Common UI
    'ui.switchLanguage': 'Switch language',
    // Admin Stats
    'admin.stats.totalRevenue': 'Total Revenue',
    'admin.stats.orders': 'Orders',
    'admin.stats.products': 'Products',
    'admin.stats.users': 'Users',
    'admin.vsLastMonth': 'vs last month',
    'admin.recentOrders': 'Recent Orders',
    'admin.viewAll': 'View All',
    'admin.noOrders': 'No orders yet',
    'admin.topProducts': 'Top Products',
    'admin.noProductsYet': 'No products yet',
    'admin.revenueOverview': 'Revenue Overview',
    'admin.revenue': 'Revenue',
    // Pages
    'pages.allProducts': 'All Products',
    'pages.productsDesc': 'Discover our collection of premium digital products',
    'pages.categories': 'Categories',
    'pages.categoriesDesc': 'Browse our collection of digital products by category',
    // Filter
    'filter.sortBy': 'Sort By',
    'filter.newest': 'Newest',
    'filter.mostPopular': 'Most Popular',
    'filter.highestRated': 'Highest Rated',
    'filter.priceLowHigh': 'Price: Low to High',
    'filter.priceHighLow': 'Price: High to Low',
    'filter.categories': 'Categories',
    'filter.allCategories': 'All Categories',
    'filter.priceRange': 'Price Range',
    'filter.min': 'Min',
    'filter.max': 'Max',
    'filter.apply': 'Apply',
    'filter.clearFilters': 'Clear Filters',
    // Products Grid
    'products.noProductsFound': 'No products found',
    'products.tryAdjusting': 'Try adjusting your filters or search terms',
    'products.showing': 'Showing',
    'products.of': 'of',
    // Pagination
    'pagination.previous': 'Previous page',
    'pagination.next': 'Next page',
    // Auth
    'auth.welcomeBack': 'Welcome back',
    'auth.signInContinue': 'Sign in to your account to continue',
    'auth.orContinueEmail': 'or continue with email',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot password?',
    'auth.signIn': 'Sign In',
    'auth.dontHaveAccount': 'Don\'t have an account?',
    'auth.signUp': 'Sign up',
    'auth.startJourney': 'Start your journey',
    'auth.accessThousands': 'Access thousands of premium digital products. Software, templates, courses, and more.',
    'auth.createAccount': 'Create an account',
    'auth.getStarted': 'Get started with your free account',
    'auth.fullName': 'Full Name',
    'auth.confirmPassword': 'Confirm Password',
    'auth.joinCommunity': 'Join our community',
    'auth.createAccountDesc': 'Create an account to access exclusive digital products and personalized recommendations.',
    'auth.agreeTerms': 'By creating an account, you agree to our',
    'auth.and': 'and',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.invalidEmail': 'Invalid email or password',
    'auth.somethingWrong': 'Something went wrong',
    'auth.success': 'Success',
    'auth.accountCreated': 'Account created successfully. Please sign in.',
    'auth.error': 'Error',
    'auth.registrationFailed': 'Registration failed',
    // Spreadsheet
    'spreadsheet.title': 'Spreadsheet Sync',
    'spreadsheet.desc': 'Sync products from your Google Spreadsheet',
    'spreadsheet.googleSheets': 'Google Sheets Integration',
    'spreadsheet.autoSync': 'Automatically sync products from your spreadsheet',
    'spreadsheet.format': 'Spreadsheet Format',
    'spreadsheet.formatDesc': 'Your spreadsheet should have these columns:',
    'spreadsheet.columnA': 'Column A: slug',
    'spreadsheet.columnB': 'Column B: title_en',
    'spreadsheet.columnC': 'Column C: title_ar (optional)',
    'spreadsheet.columnD': 'Column D: description_en',
    'spreadsheet.columnE': 'Column E: description_ar (optional)',
    'spreadsheet.columnF': 'Column F: price',
    'spreadsheet.columnG': 'Column G: image_url',
    'spreadsheet.columnH': 'Column H: video_url (optional)',
    'spreadsheet.columnI': 'Column I: category',
    'spreadsheet.columnJ': 'Column J: status (DRAFT/PUBLISHED/ARCHIVED)',
    'spreadsheet.syncing': 'Syncing...',
    'spreadsheet.syncNow': 'Sync Now',
    'spreadsheet.syncStatus': 'Sync Status',
    'spreadsheet.lastSync': 'Last synchronization results',
    'spreadsheet.syncSuccessful': 'Sync Successful',
    'spreadsheet.syncFailed': 'Sync Failed',
    'spreadsheet.rowsProcessed': 'Rows Processed',
    'spreadsheet.created': 'Created',
    'spreadsheet.updated': 'Updated',
    'spreadsheet.deleted': 'Deleted',
    'spreadsheet.noSyncYet': 'No sync performed yet',
    'spreadsheet.clickSync': 'Click "Sync Now" to start',
    'spreadsheet.setupInstructions': 'Setup Instructions',
    'spreadsheet.instruction1': 'Create a Google Cloud project and enable the Google Sheets API',
    'spreadsheet.instruction2': 'Create a service account and download the credentials JSON',
    'spreadsheet.instruction3': 'Share your spreadsheet with the service account email',
    'spreadsheet.instruction4': 'Add the credentials to your environment variables',
    'spreadsheet.instruction5': 'Set the GOOGLE_SHEETS_SPREADSHEET_ID in your .env file',
    'spreadsheet.syncCompleted': 'Sync Completed',
    'spreadsheet.processedRows': 'Processed {count} rows',
    'spreadsheet.syncFailedTitle': 'Sync Failed',
  },
  ar: {
    // Navigation
    'nav.products': 'المنتجات',
    'nav.categories': 'الفئات',
    'nav.deals': 'العروض',
    'nav.admin': 'لوحة التحكم',
    'nav.account': 'حسابي',
    'nav.orders': 'طلباتي',
    'nav.wishlist': 'قائمة الأمنيات',
    'nav.settings': 'الإعدادات',
    'nav.signOut': 'تسجيل الخروج',
    'nav.signIn': 'تسجيل الدخول',
    // Common
    'common.search': 'البحث عن المنتجات...',
    'common.cart': 'سلة التسوق',
    'common.items': 'عناصر',
    'common.subtotal': 'المجموع الفرعي',
    'common.total': 'الإجمالي',
    'common.tax': 'الضريبة',
    'common.reviews': 'تقييمات',
    'common.sales': 'مبيعات',
    'common.products': 'منتجات',
    // Language
    'lang.english': 'English',
    'lang.arabic': 'العربية',
    // Cart
    'cart.empty': 'سلة التسوق فارغة',
    'cart.emptyDesc': 'يبدو أنك لم تضيف أي شيء بعد',
    'cart.clear': 'مسح السلة',
    'cart.proceed': 'المتابعة إلى الدفع',
    'cart.browse': 'تصفح المنتجات',
    'cart.add': 'أضف إلى السلة',
    // Product
    'product.featured': 'مميز',
    'product.addToCart': 'أضف إلى السلة',
    'product.instantDownload': 'تحميل فوري',
    'product.securePayment': 'دفع آمن',
    'product.lifetimeAccess': 'وصول مدى الحياة',
    'product.freeUpdates': 'تحديثات مجانية',
    'product.description': 'الوصف',
    'product.files': 'الملفات',
    'product.reviews': 'التقييمات',
    'product.noReviews': 'لا توجد تقييمات بعد',
    'product.verified': 'متحقق',
    // Checkout
    'checkout.title': 'الدفع',
    'checkout.desc': 'راجع طلبك وأكمل الدفع',
    'checkout.empty': 'سلة التسوق فارغة',
    'checkout.emptyDesc': 'يبدو أنك لم تضيف أي شيء إلى سلة التسوق بعد.',
    'checkout.payStripe': 'الدفع عبر Stripe',
    'checkout.secure': 'دفع آمن مدعوم من Stripe',
    'checkout.remove': 'إزالة',
    'checkout.failed': 'فشل الدفع',
    'checkout.cartEmpty': 'السلة فارغة',
    'checkout.addProducts': 'أضف بعض المنتجات إلى سلة التسوق أولاً',
    // Admin
    'admin.dashboard': 'لوحة التحكم',
    'admin.products': 'المنتجات',
    'admin.categories': 'الفئات',
    'admin.orders': 'الطلبات',
    'admin.users': 'المستخدمون',
    'admin.coupons': 'الكوبونات',
    'admin.analytics': 'التحليلات',
    'admin.spreadsheet': 'مزامنة الجداول',
    'admin.settings': 'الإعدادات',
    'admin.viewStore': 'عرض المتجر',
    'admin.profileSettings': 'إعدادات الملف الشخصي',
    // Success
    'success.payment': 'تم الدفع بنجاح!',
    'success.thankYou': 'شكراً لك على الشراء. تم تأكيد طلبك وتحميلاتك جاهزة.',
    'success.downloads': 'عرض التحميلات',
    'success.continue': 'متابعة التسوق',
    // Home
    'home.browseCategory': 'تصفح حسب الفئة',
    'home.categoryDesc': 'ابحث عن ما تحتاجه بالضبط من مجموعتنا المتنوعة من المنتجات الرقمية',
    'home.viewAllCategories': 'عرض جميع الفئات',
    'home.aiMarketplace': 'سوق رقمي مدعوم بالذكاء الاصطناعي',
    'home.discoverPremium': 'اكتشف',
    'home.digitalProducts': 'المنتجات الرقمية المميزة',
    'home.heroDesc': 'استكشف مجموعتنا المختارة من البرمجيات والقوالب والدورات والأصول الرقمية. مدعوم بالذكاء الاصطناعي للتوصيات الشخصية.',
    'home.browseProducts': 'تصفح المنتجات',
    'home.exploreCategories': 'استكشف الفئات',
    'home.instantDelivery': 'تسليم فوري',
    'home.secureDownloads': 'تحميلات آمنة',
    'home.lifetimeAccess': 'وصول مدى الحياة',
    'home.fastDelivery': 'تسليم سريع',
    'home.instantAccess': 'وصول فوري لمشترياتك',
    'home.securePayment': 'دفع آمن',
    'home.protectedByStripe': 'محمي بواسطة Stripe',
    'home.whyChoose': 'لماذا تختار Nexus؟',
    'home.commitment': 'نحن ملتزمون بتقديم أفضل تجربة تسوق رقمية',
    'home.aiRecommendations': 'توصيات مدعومة بالذكاء الاصطناعي',
    'home.aiRecommendationsDesc': 'احصل على اقتراحات منتجات مخصصة بناءً على تفضيلاتك وسجل التصفح.',
    'home.instantDeliveryDesc': 'الوصول إلى منتجاتك الرقمية فوراً بعد الشراء. لا حاجة للانتظار.',
    'home.secureTransactions': 'معاملات آمنة',
    'home.secureTransactionsDesc': 'مدفوعاتك محمية بتشفير وأمان رائد في الصناعة.',
    'home.lifetimeAccessDesc': 'بمجرد الشراء، منتجاتك الرقمية ملكك إلى الأبد مع تحميلات غير محدودة.',
    'home.freeUpdatesDesc': 'احصل على جميع التحديثات والتحسينات المستقبلية دون تكلفة إضافية.',
    'home.support247': 'دعم على مدار الساعة',
    'home.support247Desc': 'فريق الدعم المخصص لدينا جاهز دائماً لمساعدتك في أي أسئلة.',
    'home.aiRecommended': 'موصى به بالذكاء الاصطناعي',
    'home.featuredProducts': 'المنتجات المميزة',
    'home.handpicked': 'منتجات رقمية مختارة بعناية فقط لك',
    'home.viewAll': 'عرض الكل',
    'home.startJourney': 'ابدأ رحلتك',
    'home.readyExplore': 'هل أنت مستعد للاستكشاف؟',
    'home.joinThousands': 'انضم إلى آلاف المبدعين والمطورين الذين يثقون بـ Nexus لاحتياجات منتجاتهم الرقمية. ابدأ في تصفح مجموعتنا اليوم.',
    'home.createAccount': 'إنشاء حساب',
    // Footer
    'footer.allProducts': 'جميع المنتجات',
    'footer.newArrivals': 'الوافدات الجديدة',
    'footer.bestSellers': 'الأكثر مبيعاً',
    'footer.aboutUs': 'من نحن',
    'footer.contact': 'اتصل بنا',
    'footer.careers': 'الوظائف',
    'footer.blog': 'المدونة',
    'footer.helpCenter': 'مركز المساعدة',
    'footer.faqs': 'الأسئلة الشائعة',
    'footer.refundPolicy': 'سياسة الاسترداد',
    'footer.license': 'الترخيص',
    'footer.privacyPolicy': 'سياسة الخصوصية',
    'footer.termsOfService': 'شروط الخدمة',
    'footer.cookiePolicy': 'سياسة ملفات تعريف الارتباط',
    'footer.products': 'المنتجات',
    'footer.company': 'الشركة',
    'footer.support': 'الدعم',
    'footer.legal': 'قانوني',
    'footer.description': 'وجهتك المميزة للمنتجات الرقمية. مدعوم بالذكاء الاصطناعي لتجربة تسوق أذكى.',
    'footer.copyright': 'جميع الحقوق محفوظة.',
    'footer.poweredBy': 'مدعوم بالذكاء الاصطناعي • مبني بـ Next.js',
    // Product
    'product.off': 'خصم',
    // Admin Pages
    'admin.welcome': 'مرحباً بعودتك! إليك نظرة عامة على متجرك.',
    'admin.manageProducts': 'إدارة منتجاتك الرقمية',
    'admin.addProduct': 'إضافة منتج',
    'admin.searchProducts': 'البحث عن المنتجات...',
    'admin.noProducts': 'لم يتم العثور على منتجات',
    'admin.view': 'عرض',
    'admin.edit': 'تعديل',
    'admin.delete': 'حذف',
    'admin.product': 'المنتج',
    'admin.category': 'الفئة',
    'admin.price': 'السعر',
    'admin.status': 'الحالة',
    'admin.created': 'تم الإنشاء',
    // Error Pages
    'error.notFound': 'الصفحة غير موجودة',
    'error.notFoundDesc': 'عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. قد تكون تم نقلها أو لا وجود لها.',
    'error.goBack': 'العودة',
    'error.home': 'الرئيسية',
    'error.somethingWrong': 'حدث خطأ ما',
    'error.unexpected': 'واجهنا خطأ غير متوقع. يرجى المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.',
    'error.tryAgain': 'حاول مرة أخرى',
    // Common UI
    'ui.switchLanguage': 'تبديل اللغة',
    // Admin Stats
    'admin.stats.totalRevenue': 'إجمالي الإيرادات',
    'admin.stats.orders': 'الطلبات',
    'admin.stats.products': 'المنتجات',
    'admin.stats.users': 'المستخدمون',
    'admin.vsLastMonth': 'مقارنة بالشهر الماضي',
    'admin.recentOrders': 'الطلبات الأخيرة',
    'admin.viewAll': 'عرض الكل',
    'admin.noOrders': 'لا توجد طلبات بعد',
    'admin.topProducts': 'أفضل المنتجات',
    'admin.noProductsYet': 'لا توجد منتجات بعد',
    'admin.revenueOverview': 'نظرة عامة على الإيرادات',
    'admin.revenue': 'الإيرادات',
    // Pages
    'pages.allProducts': 'جميع المنتجات',
    'pages.productsDesc': 'اكتشف مجموعتنا من المنتجات الرقمية المميزة',
    'pages.categories': 'الفئات',
    'pages.categoriesDesc': 'تصفح مجموعتنا من المنتجات الرقمية حسب الفئة',
    // Filter
    'filter.sortBy': 'ترتيب حسب',
    'filter.newest': 'الأحدث',
    'filter.mostPopular': 'الأكثر شعبية',
    'filter.highestRated': 'الأعلى تقييماً',
    'filter.priceLowHigh': 'السعر: من الأقل إلى الأعلى',
    'filter.priceHighLow': 'السعر: من الأعلى إلى الأقل',
    'filter.categories': 'الفئات',
    'filter.allCategories': 'جميع الفئات',
    'filter.priceRange': 'نطاق السعر',
    'filter.min': 'الحد الأدنى',
    'filter.max': 'الحد الأقصى',
    'filter.apply': 'تطبيق',
    'filter.clearFilters': 'مسح الفلاتر',
    // Products Grid
    'products.noProductsFound': 'لم يتم العثور على منتجات',
    'products.tryAdjusting': 'حاول تعديل الفلاتر أو مصطلحات البحث',
    'products.showing': 'عرض',
    'products.of': 'من',
    // Pagination
    'pagination.previous': 'الصفحة السابقة',
    'pagination.next': 'الصفحة التالية',
    // Auth
    'auth.welcomeBack': 'مرحباً بعودتك',
    'auth.signInContinue': 'قم بتسجيل الدخول إلى حسابك للمتابعة',
    'auth.orContinueEmail': 'أو المتابعة بالبريد الإلكتروني',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.signIn': 'تسجيل الدخول',
    'auth.dontHaveAccount': 'ليس لديك حساب؟',
    'auth.signUp': 'سجل الآن',
    'auth.startJourney': 'ابدأ رحلتك',
    'auth.accessThousands': 'الوصول إلى آلاف المنتجات الرقمية المميزة. البرمجيات والقوالب والدورات والمزيد.',
    'auth.createAccount': 'إنشاء حساب',
    'auth.getStarted': 'ابدأ بحسابك المجاني',
    'auth.fullName': 'الاسم الكامل',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.joinCommunity': 'انضم إلى مجتمعنا',
    'auth.createAccountDesc': 'أنشئ حساباً للوصول إلى المنتجات الرقمية الحصرية والتوصيات الشخصية.',
    'auth.agreeTerms': 'بإنشاء حساب، أنت توافق على',
    'auth.and': 'و',
    'auth.alreadyHaveAccount': 'لديك حساب بالفعل؟',
    'auth.invalidEmail': 'بريد إلكتروني أو كلمة مرور غير صحيحة',
    'auth.somethingWrong': 'حدث خطأ ما',
    'auth.success': 'نجح',
    'auth.accountCreated': 'تم إنشاء الحساب بنجاح. يرجى تسجيل الدخول.',
    'auth.error': 'خطأ',
    'auth.registrationFailed': 'فشل التسجيل',
    // Spreadsheet
    'spreadsheet.title': 'مزامنة الجداول',
    'spreadsheet.desc': 'مزامنة المنتجات من جدول Google الخاص بك',
    'spreadsheet.googleSheets': 'تكامل Google Sheets',
    'spreadsheet.autoSync': 'مزامنة المنتجات تلقائياً من جدولك',
    'spreadsheet.format': 'تنسيق الجدول',
    'spreadsheet.formatDesc': 'يجب أن يحتوي جدولك على هذه الأعمدة:',
    'spreadsheet.columnA': 'العمود A: slug',
    'spreadsheet.columnB': 'العمود B: title_en',
    'spreadsheet.columnC': 'العمود C: title_ar (اختياري)',
    'spreadsheet.columnD': 'العمود D: description_en',
    'spreadsheet.columnE': 'العمود E: description_ar (اختياري)',
    'spreadsheet.columnF': 'العمود F: price',
    'spreadsheet.columnG': 'العمود G: image_url',
    'spreadsheet.columnH': 'العمود H: video_url (اختياري)',
    'spreadsheet.columnI': 'العمود I: category',
    'spreadsheet.columnJ': 'العمود J: status (DRAFT/PUBLISHED/ARCHIVED)',
    'spreadsheet.syncing': 'جاري المزامنة...',
    'spreadsheet.syncNow': 'مزامنة الآن',
    'spreadsheet.syncStatus': 'حالة المزامنة',
    'spreadsheet.lastSync': 'نتائج آخر مزامنة',
    'spreadsheet.syncSuccessful': 'نجحت المزامنة',
    'spreadsheet.syncFailed': 'فشلت المزامنة',
    'spreadsheet.rowsProcessed': 'الصفوف المعالجة',
    'spreadsheet.created': 'تم الإنشاء',
    'spreadsheet.updated': 'تم التحديث',
    'spreadsheet.deleted': 'تم الحذف',
    'spreadsheet.noSyncYet': 'لم يتم إجراء مزامنة بعد',
    'spreadsheet.clickSync': 'انقر على "مزامنة الآن" للبدء',
    'spreadsheet.setupInstructions': 'تعليمات الإعداد',
    'spreadsheet.instruction1': 'أنشئ مشروع Google Cloud وقم بتمكين Google Sheets API',
    'spreadsheet.instruction2': 'أنشئ حساب خدمة وقم بتنزيل ملف JSON الخاص بالاعتمادات',
    'spreadsheet.instruction3': 'شارك جدولك مع بريد حساب الخدمة',
    'spreadsheet.instruction4': 'أضف الاعتمادات إلى متغيرات البيئة الخاصة بك',
    'spreadsheet.instruction5': 'قم بتعيين GOOGLE_SHEETS_SPREADSHEET_ID في ملف .env الخاص بك',
    'spreadsheet.syncCompleted': 'اكتملت المزامنة',
    'spreadsheet.processedRows': 'تمت معالجة {count} صف',
    'spreadsheet.syncFailedTitle': 'فشلت المزامنة',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Initialize from global state or localStorage
    if (typeof window !== 'undefined') {
      try {
        const savedLang = localStorage.getItem('language') as Language
        if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
          languageState = savedLang
          return savedLang
        }
      } catch {
        // Silently fail
      }
    }
    return languageState
  })

  useEffect(() => {
    // Sync with global state
    languageState = language
    
    // Update DOM attributes
    try {
      if (typeof window !== 'undefined' && document?.documentElement) {
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
        document.documentElement.lang = language
      }
    } catch {
      // Silently fail
    }

    // Notify listeners
    languageListeners.forEach(listener => listener(language))
  }, [language])

  useEffect(() => {
    // Subscribe to global state changes
    const listener = (newLang: Language) => {
      if (newLang !== language) {
        setLanguage(newLang)
      }
    }
    languageListeners.add(listener)
    
    return () => {
      languageListeners.delete(listener)
    }
  }, [language])

  // Context only contains serializable data (no functions)
  const contextValue: LanguageContextType = {
    language,
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

// Translation function - exported for use in client components
export function getTranslation(language: Language, key: string): string {
  return translations[language][key] || key
}

// Hook to get language and create translation function locally
export function useLanguage() {
  const context = useContext(LanguageContext)
  // Context is always defined (has default value), so no error needed
  
  // Create translation function locally using the language from context
  const t = (key: string): string => {
    return getTranslation(context.language, key)
  }
  
  // Create setLanguage function locally (not from context)
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }
  
  return {
    language: context.language,
    setLanguage,
    t,
  }
}
