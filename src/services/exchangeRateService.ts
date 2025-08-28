// Currency exchange rate service with fallback to cached rates
export interface ExchangeRate {
  [key: string]: number;
}

// Cached exchange rates as fallback (updated regularly)
const cachedRates: ExchangeRate = {
  'USD': 1.0,
  'EUR': 0.85,
  'GBP': 0.73,
  'JPY': 110.0,
  'CNY': 6.45,
  'CAD': 1.25,
  'AUD': 1.35,
  'CHF': 0.92,
  'INR': 74.5,
  'ZAR': 14.8,
  'NGN': 411.0,
  'KES': 108.5,
  'GHS': 6.1,
  'EGP': 15.7,
  'MAD': 9.0,
  'TND': 2.8,
  'DZD': 135.0,
  'ETB': 43.5,
  'UGX': 3580.0,
  'TZS': 2320.0,
  'RWF': 1030.0,
  'ZMW': 16.8,
  'BWP': 11.2,
  'NAD': 14.8,
  'XOF': 557.0,
  'XAF': 557.0,
  'BRL': 5.2,
  'MXN': 20.1,
  'ARS': 98.5,
  'CLP': 780.0,
  'COP': 3850.0,
  'PEN': 4.0,
  'IDR': 14250.0,
  'THB': 33.2,
  'MYR': 4.15,
  'PHP': 50.8,
  'VND': 23100.0,
  'PKR': 169.0,
  'AED': 3.67,
  'SAR': 3.75,
  'QAR': 3.64,
  'KWD': 0.30,
  'OMR': 0.38,
  'JOD': 0.71,
  'ILS': 3.25
};

// Currency scaling factors for proper display (some currencies use large numbers)
const currencyScalingFactors: { [key: string]: number } = {
  'USD': 1,
  'EUR': 1,
  'GBP': 1,
  'JPY': 100,    // Japanese Yen is typically in hundreds
  'KRW': 1000,   // Korean Won is typically in thousands
  'IDR': 10000,  // Indonesian Rupiah uses large numbers
  'VND': 10000,  // Vietnamese Dong uses large numbers
  'UGX': 1000,   // Ugandan Shilling uses large numbers
  'TZS': 1000,   // Tanzanian Shilling uses large numbers
  'XOF': 100,    // West African CFA Franc
  'XAF': 100,    // Central African CFA Franc
  'CLP': 100,    // Chilean Peso
  'COP': 1000,   // Colombian Peso
  'PYG': 1000,   // Paraguayan Guarani
  'LBP': 1000,   // Lebanese Pound
};

export class ExchangeRateService {
  private static instance: ExchangeRateService;
  private rates: ExchangeRate = cachedRates;
  private lastUpdated: Date = new Date();

  static getInstance(): ExchangeRateService {
    if (!ExchangeRateService.instance) {
      ExchangeRateService.instance = new ExchangeRateService();
    }
    return ExchangeRateService.instance;
  }

  async updateRates(): Promise<void> {
    try {
      // Try to fetch live rates from a free API
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (response.ok) {
        const data = await response.json();
        this.rates = { USD: 1, ...data.rates };
        this.lastUpdated = new Date();
      }
    } catch (error) {
      console.warn('Failed to fetch live exchange rates, using cached rates:', error);
      // Continue using cached rates
    }
  }

  convertCurrency(amount: number, fromCurrency: string, toCurrency: string = 'USD'): number {
    if (fromCurrency === toCurrency) return amount;
    
    const fromRate = this.rates[fromCurrency] || 1;
    const toRate = this.rates[toCurrency] || 1;
    
    // Convert to USD first, then to target currency
    const usdAmount = amount / fromRate;
    return usdAmount * toRate;
  }

  formatCurrency(amount: number, currency: string, symbol: string): string {
    // Convert from USD to target currency
    const convertedAmount = this.convertCurrency(amount, 'USD', currency);
    
    // Format based on currency characteristics and amount size
    if (['JPY', 'KRW', 'IDR', 'VND', 'UGX', 'TZS', 'CLP', 'COP', 'PYG'].includes(currency)) {
      // Currencies without decimal places
      if (convertedAmount >= 1000000000) {
        return `${symbol}${(convertedAmount / 1000000000).toFixed(1)}B`;
      } else if (convertedAmount >= 1000000) {
        return `${symbol}${(convertedAmount / 1000000).toFixed(0)}M`;
      } else if (convertedAmount >= 1000) {
        return `${symbol}${(convertedAmount / 1000).toFixed(0)}K`;
      } else {
        return `${symbol}${Math.round(convertedAmount).toLocaleString('en-US')}`;
      }
    } else {
      // Standard currencies with decimal places
      if (convertedAmount >= 1000000000) {
        return `${symbol}${(convertedAmount / 1000000000).toFixed(1)}B`;
      } else if (convertedAmount >= 1000000) {
        return `${symbol}${(convertedAmount / 1000000).toFixed(1)}M`;
      } else if (convertedAmount >= 1000) {
        return `${symbol}${(convertedAmount / 1000).toFixed(0)}K`;
      } else {
        return `${symbol}${convertedAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
      }
    }
  }

  getExchangeRate(fromCurrency: string, toCurrency: string = 'USD'): number {
    if (fromCurrency === toCurrency) return 1;
    
    const fromRate = this.rates[fromCurrency] || 1;
    const toRate = this.rates[toCurrency] || 1;
    
    return toRate / fromRate;
  }

  isStale(): boolean {
    const oneHour = 60 * 60 * 1000;
    return (Date.now() - this.lastUpdated.getTime()) > oneHour;
  }
}

export const exchangeRateService = ExchangeRateService.getInstance();