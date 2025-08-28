import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Globe, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  country: string;
  flag: string;
}

const currencies: Currency[] = [
  // Major Global Currencies
  { code: 'USD', symbol: '$', name: 'US Dollar', country: 'United States', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', country: 'European Union', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', country: 'Japan', flag: '🇯🇵' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', country: 'China', flag: '🇨🇳' },
  
  // North America
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', country: 'Canada', flag: '🇨🇦' },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso', country: 'Mexico', flag: '🇲🇽' },
  
  // Europe
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', country: 'Switzerland', flag: '🇨🇭' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', country: 'Norway', flag: '🇳🇴' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', country: 'Sweden', flag: '🇸🇪' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', country: 'Denmark', flag: '🇩🇰' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', country: 'Poland', flag: '🇵🇱' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', country: 'Czech Republic', flag: '🇨🇿' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', country: 'Hungary', flag: '🇭🇺' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', country: 'Turkey', flag: '🇹🇷' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', country: 'Russia', flag: '🇷🇺' },
  
  // Asia Pacific
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', country: 'India', flag: '🇮🇳' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', country: 'South Korea', flag: '🇰🇷' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', country: 'Singapore', flag: '🇸🇬' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', country: 'Hong Kong', flag: '🇭🇰' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', country: 'Australia', flag: '🇦🇺' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', country: 'New Zealand', flag: '🇳🇿' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', country: 'Thailand', flag: '🇹🇭' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', country: 'Malaysia', flag: '🇲🇾' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', country: 'Indonesia', flag: '🇮🇩' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', country: 'Philippines', flag: '🇵🇭' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', country: 'Vietnam', flag: '🇻🇳' },
  { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee', country: 'Pakistan', flag: '🇵🇰' },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', country: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', country: 'Bangladesh', flag: '🇧🇩' },
  
  // Middle East
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SAR', symbol: 'SR', name: 'Saudi Riyal', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'QAR', symbol: 'QR', name: 'Qatari Riyal', country: 'Qatar', flag: '🇶🇦' },
  { code: 'KWD', symbol: 'KD', name: 'Kuwaiti Dinar', country: 'Kuwait', flag: '🇰🇼' },
  { code: 'BHD', symbol: 'BD', name: 'Bahraini Dinar', country: 'Bahrain', flag: '🇧🇭' },
  { code: 'OMR', symbol: 'OMR', name: 'Omani Rial', country: 'Oman', flag: '🇴🇲' },
  { code: 'JOD', symbol: 'JD', name: 'Jordanian Dinar', country: 'Jordan', flag: '🇯🇴' },
  { code: 'LBP', symbol: 'L£', name: 'Lebanese Pound', country: 'Lebanon', flag: '🇱🇧' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel', country: 'Israel', flag: '🇮🇱' },
  
  // Africa
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', country: 'South Africa', flag: '🇿🇦' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', country: 'Nigeria', flag: '🇳🇬' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', country: 'Kenya', flag: '🇰🇪' },
  { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', country: 'Ghana', flag: '🇬🇭' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', country: 'Egypt', flag: '🇪🇬' },
  { code: 'MAD', symbol: 'MAD', name: 'Moroccan Dirham', country: 'Morocco', flag: '🇲🇦' },
  { code: 'TND', symbol: 'DT', name: 'Tunisian Dinar', country: 'Tunisia', flag: '🇹🇳' },
  { code: 'DZD', symbol: 'DA', name: 'Algerian Dinar', country: 'Algeria', flag: '🇩🇿' },
  { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr', country: 'Ethiopia', flag: '🇪🇹' },
  { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling', country: 'Uganda', flag: '🇺🇬' },
  { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling', country: 'Tanzania', flag: '🇹🇿' },
  { code: 'RWF', symbol: 'RF', name: 'Rwandan Franc', country: 'Rwanda', flag: '🇷🇼' },
  { code: 'ZMW', symbol: 'ZK', name: 'Zambian Kwacha', country: 'Zambia', flag: '🇿🇲' },
  { code: 'BWP', symbol: 'P', name: 'Botswana Pula', country: 'Botswana', flag: '🇧🇼' },
  { code: 'NAD', symbol: 'N$', name: 'Namibian Dollar', country: 'Namibia', flag: '🇳🇦' },
  { code: 'SZL', symbol: 'L', name: 'Swazi Lilangeni', country: 'Eswatini', flag: '🇸🇿' },
  { code: 'LSL', symbol: 'L', name: 'Lesotho Loti', country: 'Lesotho', flag: '🇱🇸' },
  { code: 'MWK', symbol: 'MK', name: 'Malawian Kwacha', country: 'Malawi', flag: '🇲🇼' },
  { code: 'MZN', symbol: 'MT', name: 'Mozambican Metical', country: 'Mozambique', flag: '🇲🇿' },
  { code: 'AOA', symbol: 'Kz', name: 'Angolan Kwanza', country: 'Angola', flag: '🇦🇴' },
  { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', country: 'West Africa', flag: '🌍' },
  { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', country: 'Central Africa', flag: '🌍' },
  
  // South America
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', country: 'Brazil', flag: '🇧🇷' },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso', country: 'Argentina', flag: '🇦🇷' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso', country: 'Chile', flag: '🇨🇱' },
  { code: 'COP', symbol: '$', name: 'Colombian Peso', country: 'Colombia', flag: '🇨🇴' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', country: 'Peru', flag: '🇵🇪' },
  { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso', country: 'Uruguay', flag: '🇺🇾' },
  { code: 'BOB', symbol: 'Bs', name: 'Bolivian Boliviano', country: 'Bolivia', flag: '🇧🇴' },
  { code: 'PYG', symbol: '₲', name: 'Paraguayan Guarani', country: 'Paraguay', flag: '🇵🇾' }
];

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  className?: string;
}

export const CurrencySelector = ({ selectedCurrency, onCurrencyChange, className }: CurrencySelectorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="min-w-[200px] justify-between"
          >
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-lg">{selectedCurrency.flag}</span>
              <span className="font-medium">{selectedCurrency.code}</span>
              <span className="text-muted-foreground">({selectedCurrency.symbol})</span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search currencies or countries..." className="h-9" />
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandList className="max-h-[300px]">
              <CommandGroup>
                {currencies.map((currency) => (
                  <CommandItem
                    key={currency.code}
                    value={`${currency.code} ${currency.name} ${currency.country}`}
                    onSelect={() => {
                      onCurrencyChange(currency);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <span className="text-lg">{currency.flag}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{currency.code}</span>
                          <span className="text-muted-foreground">({currency.symbol})</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {currency.name} - {currency.country}
                        </div>
                      </div>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedCurrency.code === currency.code ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { currencies };