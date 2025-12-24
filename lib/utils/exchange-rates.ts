/**
 * Exchange Rate API Utility
 * Fetches real-time exchange rates from exchangerate.host
 * Completely free, no API key required, unlimited requests
 */

export interface ExchangeRatesResponse {
  success?: boolean;
  rates: Record<string, number>;
  base?: string;
  date?: string;
}

export interface CurrencyInfo {
  code: string;
  name: string;
  flag: string;
  rate?: number;
}

// Popular currencies with their details
export const CURRENCIES: CurrencyInfo[] = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "KRW", name: "South Korean Won", flag: "🇰🇷" },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷" },
  { code: "RUB", name: "Russian Ruble", flag: "🇷🇺" },
  { code: "MXN", name: "Mexican Peso", flag: "🇲🇽" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰" },
  { code: "NOK", name: "Norwegian Krone", flag: "🇳🇴" },
  { code: "SEK", name: "Swedish Krona", flag: "🇸🇪" },
  { code: "DKK", name: "Danish Krone", flag: "🇩🇰" },
  { code: "PLN", name: "Polish Zloty", flag: "🇵🇱" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦" },
  { code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿" },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
];

// Cache for exchange rates (5 minutes TTL)
let ratesCache: {
  data: Record<string, number>;
  timestamp: number;
} | null = null;

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches exchange rates from the API
 * Uses USD as base currency
 */
export async function fetchExchangeRates(): Promise<Record<string, number>> {
  // Check cache first
  if (ratesCache && Date.now() - ratesCache.timestamp < CACHE_TTL) {
    return ratesCache.data;
  }

  try {
    // Using exchangerate.host - completely free, no API key required
    // Alternative: exchangerate-api.com (requires free API key)
    const response = await fetch(
      "https://api.exchangerate.host/latest?base=USD",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store", // Always fetch fresh data on client side
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success && !data.rates) {
      throw new Error("Failed to fetch exchange rates");
    }

    // exchangerate.host returns rates directly
    const rates = data.rates || {};

    // Cache the rates
    ratesCache = {
      data: rates,
      timestamp: Date.now(),
    };

    return rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    
    // Return fallback rates if API fails
    if (ratesCache?.data) {
      console.warn("Using cached rates due to API error");
      return ratesCache.data;
    }

    // Ultimate fallback - return approximate rates
    console.warn("Using fallback rates");
    return getFallbackRates();
  }
}

/**
 * Fallback rates in case API fails
 * These are approximate and should be replaced with real data
 */
function getFallbackRates(): Record<string, number> {
  return {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.5,
    CAD: 1.36,
    AUD: 1.52,
    CHF: 0.88,
    CNY: 7.24,
    INR: 83.1,
    KRW: 1320.0,
    BRL: 4.95,
    RUB: 91.5,
    MXN: 17.1,
    SGD: 1.34,
    HKD: 7.82,
    NOK: 10.6,
    SEK: 10.8,
    DKK: 6.88,
    PLN: 4.02,
    TRY: 30.2,
    ZAR: 18.7,
    NZD: 1.65,
    THB: 35.8,
    AED: 3.67,
    SAR: 3.75,
  };
}

/**
 * Get exchange rate between two currencies
 */
export async function getExchangeRate(
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  if (fromCurrency === toCurrency) {
    return 1;
  }

  const rates = await fetchExchangeRates();

  // If base is USD, directly use the rate
  if (fromCurrency === "USD") {
    return rates[toCurrency] || 1;
  }

  // If target is USD, use inverse
  if (toCurrency === "USD") {
    return 1 / (rates[fromCurrency] || 1);
  }

  // Convert from -> USD -> to
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  return toRate / fromRate;
}

/**
 * Convert amount from one currency to another
 */
export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  const rate = await getExchangeRate(fromCurrency, toCurrency);
  return amount * rate;
}

