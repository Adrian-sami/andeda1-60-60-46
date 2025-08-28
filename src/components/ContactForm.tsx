import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, CheckCircle, AlertCircle, ChevronDown, RotateCcw, Calendar as CalendarIcon, Clock } from 'lucide-react';
import AnimatedIcon from '@/components/AnimatedIcon';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { googleForms, extractFirstName, normalizeLanguage, sendZapierWebhook } from '@/config/forms';

interface ContactFormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  company: string;
  country: string;
  service: string[];
  preferredDate: string;
  preferredTime: string;
  description: string;
}

const ContactForm = () => {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    mode: 'onChange'
  });

  const selectedServices = watch('service') || [];
  const selectedCountryCode = watch('countryCode');
  const preferredTimeVal = watch('preferredTime');

  // Normalize times like 9:5 or 12:1 into 09:05 and 12:01, clamp to valid ranges
  const normalizeTime = (value: string) => {
    if (!value) return '';
    const m = value.match(/^(\d{1,2}):(\d{1,2})(?::\d{1,2})?$/);
    if (!m) return value;
    let h = Math.max(0, Math.min(23, parseInt(m[1], 10)));
    let mm = Math.max(0, Math.min(59, parseInt(m[2], 10)));
    const hhStr = String(h).padStart(2, '0');
    const mmStr = String(mm).padStart(2, '0');
    return `${hhStr}:${mmStr}`;
  };

  // After successful submit, keep the success message in view and focus it
  useEffect(() => {
    if (isSubmitted && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const focusable = containerRef.current.querySelector<HTMLElement>('[data-success-focus]');
      (focusable || containerRef.current).focus();
    }
  }, [isSubmitted]);

  // Phone number format examples for different countries
  const phoneFormatExamples: { [key: string]: string } = {
    '+240': '555 123 456', // Equatorial Guinea (different from user's number)
    '+1': '555 123 4567', // US/Canada
    '+44': '7911 123456', // UK
    '+33': '06 12 34 56 78', // France
    '+49': '151 12345678', // Germany
    '+39': '312 345 6789', // Italy
    '+34': '612 345 678', // Spain
    '+31': '06 12345678', // Netherlands
    '+32': '0485 12 34 56', // Belgium
    '+41': '079 123 45 67', // Switzerland
    '+43': '0664 123456', // Austria
    '+45': '20 12 34 56', // Denmark
    '+46': '070 123 45 67', // Sweden
    '+47': '412 34 567', // Norway
    '+358': '050 123 4567', // Finland
    '+351': '912 345 678', // Portugal
    '+30': '6912345678', // Greece
    '+353': '085 123 4567', // Ireland
    '+48': '512 345 678', // Poland
    '+420': '603 123 456', // Czech Republic
    '+421': '0905 123 456', // Slovakia
    '+36': '06 20 123 4567', // Hungary
    '+385': '091 234 5678', // Croatia
    '+386': '031 234 567', // Slovenia
    '+40': '0722 123 456', // Romania
    '+359': '087 123 4567', // Bulgaria
    '+370': '8612 34567', // Lithuania
    '+371': '2123 4567', // Latvia
    '+372': '512 3456', // Estonia
    '+7': '9123456789', // Russia/Kazakhstan
    '+380': '050 123 4567', // Ukraine
    '+375': '29 123 45 67', // Belarus
    '+373': '69 123 456', // Moldova
    '+995': '591 123 456', // Georgia
    '+374': '77 123 456', // Armenia
    '+994': '50 123 45 67', // Azerbaijan
    '+998': '90 123 45 67', // Uzbekistan
    '+996': '550 123 456', // Kyrgyzstan
    '+992': '93 123 4567', // Tajikistan
    '+993': '65 123456', // Turkmenistan
    '+976': '8812 3456', // Mongolia
    '+86': '138 0013 8000', // China
    '+81': '90 1234 5678', // Japan
    '+82': '010 1234 5678', // South Korea
    '+91': '98765 43210', // India
    '+92': '0300 1234567', // Pakistan
    '+880': '01712 345678', // Bangladesh
    '+94': '071 234 5678', // Sri Lanka
    '+95': '09 123 456 789', // Myanmar
    '+66': '081 234 5678', // Thailand
    '+84': '0912 345 678', // Vietnam
    '+856': '020 123 4567', // Laos
    '+855': '012 345 678', // Cambodia
    '+60': '012 345 6789', // Malaysia
    '+65': '8123 4567', // Singapore
    '+62': '0812 3456 7890', // Indonesia
    '+63': '0917 123 4567', // Philippines
    '+61': '0412 345 678', // Australia
    '+64': '021 123 4567', // New Zealand
    '+27': '082 123 4567', // South Africa
    '+234': '0803 123 4567', // Nigeria
    '+233': '024 123 4567', // Ghana
    '+254': '0712 345678', // Kenya
    '+255': '0754 123 456', // Tanzania
    '+256': '0712 345678', // Uganda
    '+20': '010 1234 5678', // Egypt
    '+212': '0612 345678', // Morocco
    '+213': '0551 234 567', // Algeria
    '+216': '20 123 456', // Tunisia
    '+218': '091 234 5678', // Libya
    '+249': '0912 345678', // Sudan
    '+251': '0911 123456', // Ethiopia
    '+52': '55 1234 5678', // Mexico
    '+55': '11 91234 5678', // Brazil
    '+54': '11 1234 5678', // Argentina
    '+56': '9 1234 5678', // Chile
    '+57': '300 123 4567', // Colombia
    '+51': '987 654 321', // Peru
    '+58': '0412 123 4567', // Venezuela
    '+593': '09 1234 5678', // Ecuador
    '+591': '7123 4567', // Bolivia
    '+595': '0981 123456', // Paraguay
    '+598': '099 123 456', // Uruguay
    '+506': '8712 3456', // Costa Rica
    '+507': '6123 4567', // Panama
    '+504': '9812 3456', // Honduras
    '+503': '7123 4567', // El Salvador
    '+502': '5123 4567', // Guatemala
    '+505': '8123 4567', // Nicaragua
    '+509': '3412 3456', // Haiti
    '+1-876': '876 123 4567', // Jamaica
    '+971': '050 123 4567', // UAE
    '+966': '050 123 4567', // Saudi Arabia
    '+965': '9123 4567', // Kuwait
    '+974': '3312 3456', // Qatar
    '+973': '3312 3456', // Bahrain
    '+968': '9123 4567', // Oman
    '+967': '77 123 4567', // Yemen
    '+964': '0790 123 4567', // Iraq
    '+98': '0912 123 4567', // Iran
    '+90': '0532 123 45 67', // Turkey
    '+961': '03 123 456', // Lebanon
    '+972': '050 123 4567', // Israel
    '+963': '0944 123 456', // Syria
    '+962': '079 123 4567', // Jordan
    '+970': '059 123 4567', // Palestine
    '+355': '069 123 4567', // Albania
    '+389': '070 123 456', // North Macedonia
    '+381': '064 123 4567', // Serbia
    '+382': '067 123 456', // Montenegro
    '+387': '061 123 456', // Bosnia and Herzegovina
    '+383': '044 123 456', // Kosovo
  };

  const getPhoneFormatExample = (countryCode: string) => {
    return phoneFormatExamples[countryCode] || '123 456 789';
  };

  // Phone number length validation for different countries
  const phoneNumberLengths: { [key: string]: { min: number; max: number } } = {
    '+240': { min: 9, max: 9 }, // Equatorial Guinea
    '+1': { min: 10, max: 10 }, // US/Canada
    '+44': { min: 10, max: 11 }, // UK
    '+33': { min: 10, max: 10 }, // France
    '+49': { min: 10, max: 12 }, // Germany
    '+39': { min: 9, max: 11 }, // Italy
    '+34': { min: 9, max: 9 }, // Spain
    '+31': { min: 9, max: 9 }, // Netherlands
    '+32': { min: 9, max: 10 }, // Belgium
    '+41': { min: 9, max: 9 }, // Switzerland
    '+43': { min: 10, max: 13 }, // Austria
    '+45': { min: 8, max: 8 }, // Denmark
    '+46': { min: 9, max: 10 }, // Sweden
    '+47': { min: 8, max: 8 }, // Norway
    '+358': { min: 7, max: 12 }, // Finland
    '+351': { min: 9, max: 9 }, // Portugal
    '+30': { min: 10, max: 10 }, // Greece
    '+353': { min: 9, max: 10 }, // Ireland
    '+48': { min: 9, max: 9 }, // Poland
    '+420': { min: 9, max: 9 }, // Czech Republic
    '+421': { min: 9, max: 9 }, // Slovakia
    '+36': { min: 8, max: 9 }, // Hungary
    '+385': { min: 8, max: 9 }, // Croatia
    '+386': { min: 8, max: 8 }, // Slovenia
    '+40': { min: 10, max: 10 }, // Romania
    '+359': { min: 8, max: 9 }, // Bulgaria
    '+370': { min: 8, max: 8 }, // Lithuania
    '+371': { min: 8, max: 8 }, // Latvia
    '+372': { min: 7, max: 8 }, // Estonia
    '+7': { min: 10, max: 10 }, // Russia/Kazakhstan
    '+380': { min: 9, max: 9 }, // Ukraine
    '+375': { min: 9, max: 9 }, // Belarus
    '+373': { min: 8, max: 8 }, // Moldova
    '+995': { min: 9, max: 9 }, // Georgia
    '+374': { min: 8, max: 8 }, // Armenia
    '+994': { min: 9, max: 9 }, // Azerbaijan
    '+998': { min: 9, max: 9 }, // Uzbekistan
    '+996': { min: 9, max: 9 }, // Kyrgyzstan
    '+992': { min: 9, max: 9 }, // Tajikistan
    '+993': { min: 8, max: 8 }, // Turkmenistan
    '+976': { min: 8, max: 8 }, // Mongolia
    '+86': { min: 11, max: 11 }, // China
    '+81': { min: 10, max: 11 }, // Japan
    '+82': { min: 10, max: 11 }, // South Korea
    '+91': { min: 10, max: 10 }, // India
    '+92': { min: 10, max: 10 }, // Pakistan
    '+880': { min: 10, max: 11 }, // Bangladesh
    '+94': { min: 9, max: 10 }, // Sri Lanka
    '+95': { min: 8, max: 10 }, // Myanmar
    '+66': { min: 9, max: 10 }, // Thailand
    '+84': { min: 9, max: 10 }, // Vietnam
    '+856': { min: 8, max: 10 }, // Laos
    '+855': { min: 8, max: 9 }, // Cambodia
    '+60': { min: 9, max: 11 }, // Malaysia
    '+65': { min: 8, max: 8 }, // Singapore
    '+62': { min: 8, max: 13 }, // Indonesia
    '+63': { min: 10, max: 10 }, // Philippines
    '+61': { min: 9, max: 9 }, // Australia
    '+64': { min: 8, max: 10 }, // New Zealand
    '+27': { min: 9, max: 9 }, // South Africa
    '+234': { min: 10, max: 11 }, // Nigeria
    '+233': { min: 9, max: 10 }, // Ghana
    '+254': { min: 9, max: 9 }, // Kenya
    '+255': { min: 9, max: 9 }, // Tanzania
    '+256': { min: 9, max: 9 }, // Uganda
    '+20': { min: 10, max: 11 }, // Egypt
    '+212': { min: 9, max: 9 }, // Morocco
    '+213': { min: 9, max: 9 }, // Algeria
    '+216': { min: 8, max: 8 }, // Tunisia
    '+218': { min: 9, max: 10 }, // Libya
    '+249': { min: 9, max: 9 }, // Sudan
    '+251': { min: 9, max: 9 }, // Ethiopia
    '+52': { min: 10, max: 10 }, // Mexico
    '+55': { min: 10, max: 11 }, // Brazil
    '+54': { min: 10, max: 10 }, // Argentina
    '+56': { min: 8, max: 9 }, // Chile
    '+57': { min: 10, max: 10 }, // Colombia
    '+51': { min: 9, max: 9 }, // Peru
    '+58': { min: 10, max: 11 }, // Venezuela
    '+593': { min: 8, max: 9 }, // Ecuador
    '+591': { min: 8, max: 8 }, // Bolivia
    '+595': { min: 9, max: 9 }, // Paraguay
    '+598': { min: 8, max: 9 }, // Uruguay
    '+506': { min: 8, max: 8 }, // Costa Rica
    '+507': { min: 8, max: 8 }, // Panama
    '+504': { min: 8, max: 8 }, // Honduras
    '+503': { min: 8, max: 8 }, // El Salvador
    '+502': { min: 8, max: 8 }, // Guatemala
    '+505': { min: 8, max: 8 }, // Nicaragua
    '+509': { min: 8, max: 8 }, // Haiti
    '+1-876': { min: 7, max: 7 }, // Jamaica
    '+971': { min: 9, max: 9 }, // UAE
    '+966': { min: 9, max: 9 }, // Saudi Arabia
    '+965': { min: 8, max: 8 }, // Kuwait
    '+974': { min: 8, max: 8 }, // Qatar
    '+973': { min: 8, max: 8 }, // Bahrain
    '+968': { min: 8, max: 8 }, // Oman
    '+967': { min: 9, max: 9 }, // Yemen
    '+964': { min: 10, max: 10 }, // Iraq
    '+98': { min: 10, max: 10 }, // Iran
    '+90': { min: 10, max: 10 }, // Turkey
    '+961': { min: 7, max: 8 }, // Lebanon
    '+972': { min: 9, max: 9 }, // Israel
    '+963': { min: 9, max: 9 }, // Syria
    '+962': { min: 9, max: 9 }, // Jordan
    '+970': { min: 9, max: 9 }, // Palestine
    '+355': { min: 9, max: 9 }, // Albania
    '+389': { min: 8, max: 8 }, // North Macedonia
    '+381': { min: 8, max: 9 }, // Serbia
    '+382': { min: 8, max: 8 }, // Montenegro
    '+387': { min: 8, max: 9 }, // Bosnia and Herzegovina
    '+383': { min: 8, max: 9 }, // Kosovo
  };

  const validatePhoneLength = (phone: string, countryCode: string) => {
    if (!phone || !countryCode) return { isValid: true, message: '' };
    
    const cleanPhone = phone.replace(/\D/g, ''); // Remove all non-digits
    const lengthConfig = phoneNumberLengths[countryCode];
    
    if (!lengthConfig) return { isValid: true, message: '' };
    
    if (cleanPhone.length < lengthConfig.min) {
      return { isValid: false, message: `Phone number too short (minimum ${lengthConfig.min} digits)` };
    }
    
    if (cleanPhone.length > lengthConfig.max) {
      return { isValid: false, message: `Phone number too long (maximum ${lengthConfig.max} digits)` };
    }
    
    return { isValid: true, message: '' };
  };

  const currentPhone = watch('phone') || '';
  const phoneValidation = validatePhoneLength(currentPhone, selectedCountryCode);

  // Handle clicking outside service dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
        setIsServiceDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Reverted: allow dropdown scrolling on mobile; do not auto-close on scroll/touch

  // Reverted: do not auto-close country selects on mobile scroll/touch; rely on default Radix behavior

  const services = [
    { value: 'data-analytics', label: t('contact.form.services.dataAnalytics') },
    { value: 'consulting', label: t('contact.form.services.consulting') },
    { value: 'financial-intelligence', label: t('contact.form.services.financialIntelligence') },
    { value: 'market-research', label: t('contact.form.services.marketResearch') },
    { value: 'performance-analysis', label: t('contact.form.services.performanceAnalysis') },
    { value: 'forecasting', label: t('contact.form.services.forecasting') },
    { value: 'visual-reporting', label: t('contact.form.services.visualReporting') },
    { value: 'custom-reporting', label: t('contact.form.services.customReporting') },
    { value: 'other', label: t('contact.form.services.other') }
  ];

  const countryCodes = [
    { country: 'Afghanistan', code: '+93', initial: 'AF' },
    { country: 'Albania', code: '+355', initial: 'AL' },
    { country: 'Algeria', code: '+213', initial: 'DZ' },
    { country: 'Andorra', code: '+376', initial: 'AD' },
    { country: 'Angola', code: '+244', initial: 'AO' },
    { country: 'Argentina', code: '+54', initial: 'AR' },
    { country: 'Armenia', code: '+374', initial: 'AM' },
    { country: 'Australia', code: '+61', initial: 'AU' },
    { country: 'Austria', code: '+43', initial: 'AT' },
    { country: 'Azerbaijan', code: '+994', initial: 'AZ' },
    { country: 'Bahamas', code: '+1-242', initial: 'BS' },
    { country: 'Bahrain', code: '+973', initial: 'BH' },
    { country: 'Bangladesh', code: '+880', initial: 'BD' },
    { country: 'Barbados', code: '+1-246', initial: 'BB' },
    { country: 'Belarus', code: '+375', initial: 'BY' },
    { country: 'Belgium', code: '+32', initial: 'BE' },
    { country: 'Belize', code: '+501', initial: 'BZ' },
    { country: 'Benin', code: '+229', initial: 'BJ' },
    { country: 'Bhutan', code: '+975', initial: 'BT' },
    { country: 'Bolivia', code: '+591', initial: 'BO' },
    { country: 'Bosnia and Herzegovina', code: '+387', initial: 'BA' },
    { country: 'Botswana', code: '+267', initial: 'BW' },
    { country: 'Brazil', code: '+55', initial: 'BR' },
    { country: 'Brunei', code: '+673', initial: 'BN' },
    { country: 'Bulgaria', code: '+359', initial: 'BG' },
    { country: 'Burkina Faso', code: '+226', initial: 'BF' },
    { country: 'Burundi', code: '+257', initial: 'BI' },
    { country: 'Cambodia', code: '+855', initial: 'KH' },
    { country: 'Cameroon', code: '+237', initial: 'CM' },
    { country: 'Canada', code: '+1', initial: 'CA' },
    { country: 'Cape Verde', code: '+238', initial: 'CV' },
    { country: 'Central African Republic', code: '+236', initial: 'CF' },
    { country: 'Chad', code: '+235', initial: 'TD' },
    { country: 'Chile', code: '+56', initial: 'CL' },
    { country: 'China', code: '+86', initial: 'CN' },
    { country: 'Colombia', code: '+57', initial: 'CO' },
    { country: 'Comoros', code: '+269', initial: 'KM' },
    { country: 'Congo', code: '+242', initial: 'CG' },
    { country: 'Costa Rica', code: '+506', initial: 'CR' },
    { country: 'Croatia', code: '+385', initial: 'HR' },
    { country: 'Cuba', code: '+53', initial: 'CU' },
    { country: 'Cyprus', code: '+357', initial: 'CY' },
    { country: 'Czech Republic', code: '+420', initial: 'CZ' },
    { country: 'Democratic Republic of the Congo', code: '+243', initial: 'CD' },
    { country: 'Denmark', code: '+45', initial: 'DK' },
    { country: 'Djibouti', code: '+253', initial: 'DJ' },
    { country: 'Dominica', code: '+1-767', initial: 'DM' },
    { country: 'Dominican Republic', code: '+1-809', initial: 'DO' },
    { country: 'East Timor', code: '+670', initial: 'TL' },
    { country: 'Ecuador', code: '+593', initial: 'EC' },
    { country: 'Egypt', code: '+20', initial: 'EG' },
    { country: 'El Salvador', code: '+503', initial: 'SV' },
    { country: 'Equatorial Guinea', code: '+240', initial: 'GQ' },
    { country: 'Eritrea', code: '+291', initial: 'ER' },
    { country: 'Estonia', code: '+372', initial: 'EE' },
    { country: 'Ethiopia', code: '+251', initial: 'ET' },
    { country: 'Fiji', code: '+679', initial: 'FJ' },
    { country: 'Finland', code: '+358', initial: 'FI' },
    { country: 'France', code: '+33', initial: 'FR' },
    { country: 'Gabon', code: '+241', initial: 'GA' },
    { country: 'Gambia', code: '+220', initial: 'GM' },
    { country: 'Georgia', code: '+995', initial: 'GE' },
    { country: 'Germany', code: '+49', initial: 'DE' },
    { country: 'Ghana', code: '+233', initial: 'GH' },
    { country: 'Greece', code: '+30', initial: 'GR' },
    { country: 'Grenada', code: '+1-473', initial: 'GD' },
    { country: 'Guatemala', code: '+502', initial: 'GT' },
    { country: 'Guinea', code: '+224', initial: 'GN' },
    { country: 'Guinea-Bissau', code: '+245', initial: 'GW' },
    { country: 'Guyana', code: '+592', initial: 'GY' },
    { country: 'Haiti', code: '+509', initial: 'HT' },
    { country: 'Honduras', code: '+504', initial: 'HN' },
    { country: 'Hungary', code: '+36', initial: 'HU' },
    { country: 'Iceland', code: '+354', initial: 'IS' },
    { country: 'India', code: '+91', initial: 'IN' },
    { country: 'Indonesia', code: '+62', initial: 'ID' },
    { country: 'Iran', code: '+98', initial: 'IR' },
    { country: 'Iraq', code: '+964', initial: 'IQ' },
    { country: 'Ireland', code: '+353', initial: 'IE' },
    { country: 'Israel', code: '+972', initial: 'IL' },
    { country: 'Italy', code: '+39', initial: 'IT' },
    { country: 'Ivory Coast', code: '+225', initial: 'CI' },
    { country: 'Jamaica', code: '+1-876', initial: 'JM' },
    { country: 'Japan', code: '+81', initial: 'JP' },
    { country: 'Jordan', code: '+962', initial: 'JO' },
    { country: 'Kazakhstan', code: '+7', initial: 'KZ' },
    { country: 'Kenya', code: '+254', initial: 'KE' },
    { country: 'Kiribati', code: '+686', initial: 'KI' },
    { country: 'Kuwait', code: '+965', initial: 'KW' },
    { country: 'Kyrgyzstan', code: '+996', initial: 'KG' },
    { country: 'Laos', code: '+856', initial: 'LA' },
    { country: 'Latvia', code: '+371', initial: 'LV' },
    { country: 'Lebanon', code: '+961', initial: 'LB' },
    { country: 'Lesotho', code: '+266', initial: 'LS' },
    { country: 'Liberia', code: '+231', initial: 'LR' },
    { country: 'Libya', code: '+218', initial: 'LY' },
    { country: 'Liechtenstein', code: '+423', initial: 'LI' },
    { country: 'Lithuania', code: '+370', initial: 'LT' },
    { country: 'Luxembourg', code: '+352', initial: 'LU' },
    { country: 'Madagascar', code: '+261', initial: 'MG' },
    { country: 'Malawi', code: '+265', initial: 'MW' },
    { country: 'Malaysia', code: '+60', initial: 'MY' },
    { country: 'Maldives', code: '+960', initial: 'MV' },
    { country: 'Mali', code: '+223', initial: 'ML' },
    { country: 'Malta', code: '+356', initial: 'MT' },
    { country: 'Marshall Islands', code: '+692', initial: 'MH' },
    { country: 'Mauritania', code: '+222', initial: 'MR' },
    { country: 'Mauritius', code: '+230', initial: 'MU' },
    { country: 'Mexico', code: '+52', initial: 'MX' },
    { country: 'Micronesia', code: '+691', initial: 'FM' },
    { country: 'Moldova', code: '+373', initial: 'MD' },
    { country: 'Monaco', code: '+377', initial: 'MC' },
    { country: 'Mongolia', code: '+976', initial: 'MN' },
    { country: 'Montenegro', code: '+382', initial: 'ME' },
    { country: 'Morocco', code: '+212', initial: 'MA' },
    { country: 'Mozambique', code: '+258', initial: 'MZ' },
    { country: 'Myanmar', code: '+95', initial: 'MM' },
    { country: 'Namibia', code: '+264', initial: 'NA' },
    { country: 'Nauru', code: '+674', initial: 'NR' },
    { country: 'Nepal', code: '+977', initial: 'NP' },
    { country: 'Netherlands', code: '+31', initial: 'NL' },
    { country: 'New Zealand', code: '+64', initial: 'NZ' },
    { country: 'Nicaragua', code: '+505', initial: 'NI' },
    { country: 'Niger', code: '+227', initial: 'NE' },
    { country: 'Nigeria', code: '+234', initial: 'NG' },
    { country: 'North Korea', code: '+850', initial: 'KP' },
    { country: 'North Macedonia', code: '+389', initial: 'MK' },
    { country: 'Norway', code: '+47', initial: 'NO' },
    { country: 'Oman', code: '+968', initial: 'OM' },
    { country: 'Pakistan', code: '+92', initial: 'PK' },
    { country: 'Palau', code: '+680', initial: 'PW' },
    { country: 'Palestine', code: '+970', initial: 'PS' },
    { country: 'Panama', code: '+507', initial: 'PA' },
    { country: 'Papua New Guinea', code: '+675', initial: 'PG' },
    { country: 'Paraguay', code: '+595', initial: 'PY' },
    { country: 'Peru', code: '+51', initial: 'PE' },
    { country: 'Philippines', code: '+63', initial: 'PH' },
    { country: 'Poland', code: '+48', initial: 'PL' },
    { country: 'Portugal', code: '+351', initial: 'PT' },
    { country: 'Qatar', code: '+974', initial: 'QA' },
    { country: 'Romania', code: '+40', initial: 'RO' },
    { country: 'Russia', code: '+7', initial: 'RU' },
    { country: 'Rwanda', code: '+250', initial: 'RW' },
    { country: 'Saint Kitts and Nevis', code: '+1-869', initial: 'KN' },
    { country: 'Saint Lucia', code: '+1-758', initial: 'LC' },
    { country: 'Saint Vincent and the Grenadines', code: '+1-784', initial: 'VC' },
    { country: 'Samoa', code: '+685', initial: 'WS' },
    { country: 'San Marino', code: '+378', initial: 'SM' },
    { country: 'Sao Tome and Principe', code: '+239', initial: 'ST' },
    { country: 'Saudi Arabia', code: '+966', initial: 'SA' },
    { country: 'Senegal', code: '+221', initial: 'SN' },
    { country: 'Serbia', code: '+381', initial: 'RS' },
    { country: 'Seychelles', code: '+248', initial: 'SC' },
    { country: 'Sierra Leone', code: '+232', initial: 'SL' },
    { country: 'Singapore', code: '+65', initial: 'SG' },
    { country: 'Slovakia', code: '+421', initial: 'SK' },
    { country: 'Slovenia', code: '+386', initial: 'SI' },
    { country: 'Solomon Islands', code: '+677', initial: 'SB' },
    { country: 'Somalia', code: '+252', initial: 'SO' },
    { country: 'South Africa', code: '+27', initial: 'ZA' },
    { country: 'South Korea', code: '+82', initial: 'KR' },
    { country: 'South Sudan', code: '+211', initial: 'SS' },
    { country: 'Spain', code: '+34', initial: 'ES' },
    { country: 'Sri Lanka', code: '+94', initial: 'LK' },
    { country: 'Sudan', code: '+249', initial: 'SD' },
    { country: 'Suriname', code: '+597', initial: 'SR' },
    { country: 'Sweden', code: '+46', initial: 'SE' },
    { country: 'Switzerland', code: '+41', initial: 'CH' },
    { country: 'Syria', code: '+963', initial: 'SY' },
    { country: 'Taiwan', code: '+886', initial: 'TW' },
    { country: 'Tajikistan', code: '+992', initial: 'TJ' },
    { country: 'Tanzania', code: '+255', initial: 'TZ' },
    { country: 'Thailand', code: '+66', initial: 'TH' },
    { country: 'Togo', code: '+228', initial: 'TG' },
    { country: 'Tonga', code: '+676', initial: 'TO' },
    { country: 'Trinidad and Tobago', code: '+1-868', initial: 'TT' },
    { country: 'Tunisia', code: '+216', initial: 'TN' },
    { country: 'Turkey', code: '+90', initial: 'TR' },
    { country: 'Turkmenistan', code: '+993', initial: 'TM' },
    { country: 'Tuvalu', code: '+688', initial: 'TV' },
    { country: 'Uganda', code: '+256', initial: 'UG' },
    { country: 'Ukraine', code: '+380', initial: 'UA' },
    { country: 'United Arab Emirates', code: '+971', initial: 'AE' },
    { country: 'United Kingdom', code: '+44', initial: 'GB' },
    { country: 'United States', code: '+1', initial: 'US' },
    { country: 'Uruguay', code: '+598', initial: 'UY' },
    { country: 'Uzbekistan', code: '+998', initial: 'UZ' },
    { country: 'Vanuatu', code: '+678', initial: 'VU' },
    { country: 'Vatican City', code: '+39', initial: 'VA' },
    { country: 'Venezuela', code: '+58', initial: 'VE' },
    { country: 'Vietnam', code: '+84', initial: 'VN' },
    { country: 'Yemen', code: '+967', initial: 'YE' },
    { country: 'Zambia', code: '+260', initial: 'ZM' },
    { country: 'Zimbabwe', code: '+263', initial: 'ZW' }
  ];

  const uniqueCountryCodes = useMemo(() => {
    const seen = new Set<string>();
    return countryCodes.filter((item) => {
      if (seen.has(item.code)) return false;
      seen.add(item.code);
      return true;
    });
  }, []);

  const uniqueCountries = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    countryCodes.forEach((item) => {
      if (!seen.has(item.country)) {
        seen.add(item.country);
        list.push(item.country);
      }
    });
    return list;
  }, []);


  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const CONTACT_FORM = googleForms.contact;
      const isConfigured =
        !!CONTACT_FORM.formUrl &&
        !CONTACT_FORM.formUrl.includes('YOUR_GOOGLE_FORM_URL_HERE') &&
        Object.values(CONTACT_FORM.fields).every((v) => v && !v.includes('XXXX'));

      if (isConfigured) {
        // Submit to Google Forms via a real HTML form + hidden iframe to avoid CORS and ensure delivery
        const formEl = document.createElement('form');
        formEl.action = CONTACT_FORM.formUrl;
        formEl.method = 'POST';
        formEl.target = 'gform_iframe';
        formEl.style.display = 'none';

        let iframe = document.querySelector<HTMLIFrameElement>('iframe[name="gform_iframe"]');
        if (!iframe) {
          iframe = document.createElement('iframe');
          iframe.name = 'gform_iframe';
          iframe.style.display = 'none';
          document.body.appendChild(iframe);
        }

        const addField = (name: string, value?: string) => {
          if (value == null) return;
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          formEl.appendChild(input);
        };

        // Ensure Google-acceptable formats
        const dateStr = data.preferredDate ? format(new Date(data.preferredDate), 'yyyy-MM-dd') : '';
        const timeStr = data.preferredTime ? (data.preferredTime.length > 5 ? data.preferredTime.slice(0, 5) : data.preferredTime) : '';

        addField(CONTACT_FORM.fields.name, data.name);
        addField(CONTACT_FORM.fields.email, data.email);
        addField(CONTACT_FORM.fields.countryCode, data.countryCode || '');
        addField(CONTACT_FORM.fields.phone, data.phone);
        addField(CONTACT_FORM.fields.company, data.company || '');
        addField(CONTACT_FORM.fields.country, data.country || '');
        addField(CONTACT_FORM.fields.preferredDate, dateStr);
        addField(CONTACT_FORM.fields.preferredTime, timeStr);

        const selectedLabels = (data.service || [])
          .map((v) => services.find((s) => s.value === v)?.label)
          .filter((v): v is string => Boolean(v));

        if (CONTACT_FORM.fields.service === CONTACT_FORM.fields.description) {
          const combined = [
            ...selectedLabels,
            data.description ? `Details: ${data.description}` : ''
          ].filter(Boolean).join(' — ');
          addField(CONTACT_FORM.fields.service, combined);
        } else {
          // Append each service as a separate value so Google selects the corresponding checkboxes
          selectedLabels.forEach((label) => addField(CONTACT_FORM.fields.service, label));
          addField(CONTACT_FORM.fields.description, data.description || '');
        }

        addField('language', i18n.language);
        addField('preferredLanguage', (() => {
          const lang = (i18n.language || '').toLowerCase();
          return lang.startsWith('es') ? 'Español' : lang.startsWith('fr') ? 'Français' : 'English';
        })());

        document.body.appendChild(formEl);
        await new Promise<void>((resolve) => {
          const onLoad = () => {
            iframe?.removeEventListener('load', onLoad);
            resolve();
            // Clean up the form element after submit completes
            setTimeout(() => {
              try { document.body.removeChild(formEl); } catch {}
            }, 0);
          };
          iframe?.addEventListener('load', onLoad, { once: true });
          formEl.submit();
        });

        // Send confirmation email via Zapier webhook
        await sendZapierWebhook({
          type: 'contact',
          email: data.email,
          firstName: extractFirstName(data.name),
          language: normalizeLanguage(i18n.language),
          formData: {
            name: data.name,
            company: data.company || '',
            phone: `${data.countryCode || ''} ${data.phone}`.trim(),
            country: data.country || '',
            services: (data.service || []).join(', '),
            preferredDate: data.preferredDate || '',
            preferredTime: data.preferredTime || '',
            description: data.description || '',
          }
        });
      } else {
        // Fallback: keep the current simulated submission
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      
      setIsSubmitted(true);
      toast.success(t('contact.form.messageSent'), { duration: 60000 });
      reset();
      
      // Keep success message visible for at least 60 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 60000);
      
    } catch (error) {
      toast.error(t('contact.form.failedToSend'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearForm = () => {
    reset({
      name: '',
      email: '',
      countryCode: '',
      phone: '',
      company: '',
      country: '',
      service: [],
      preferredDate: '',
      preferredTime: '',
      description: ''
    });
    setIsServiceDropdownOpen(false);
    setIsCountryCodeOpen(false);
    setIsCountryOpen(false);
    setIsDateOpen(false);
    toast.info(t('contact.form.formCleared'));
  };

  if (isSubmitted) {
    return (
      <Card ref={containerRef} className="glass-effect gradient-border max-w-2xl mx-auto" role="status" aria-live="polite" aria-atomic="true" tabIndex={-1}>
        <CardContent className="p-8 text-center">
          <div className="mb-6" data-success-focus>
            <CheckCircle className="w-16 h-16 text-andeda-green mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">
              <span className="gradient-text">{t('contact.form.thankYou')}</span>
            </h3>
            <p className="text-muted-foreground">
              {t('contact.form.messageSent')}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect gradient-border max-w-2xl mx-auto">
      <CardContent className="p-4 sm:p-8">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold mb-2">
            <span className="gradient-text">{t('contact.form.getInTouch')}</span>
          </h3>
          <p className="text-muted-foreground">
            {t('contact.form.tellUsAbout')}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 overflow-visible">
          {/* Personal Information Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                {t('contact.form.fullName')} *
              </Label>
              <Input
                id="name"
                {...register('name', { required: t('contact.form.validation.nameRequired') })}
                placeholder={t('contact.form.placeholders.fullName')}
                className="mt-1"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                {t('contact.form.emailAddress')} *
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email', { 
                  required: t('contact.form.validation.emailRequired'),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('contact.form.validation.emailInvalid')
                  }
                })}
                placeholder={t('contact.form.placeholders.email')}
                className="mt-1"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Contact Information Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                {t('contact.form.phoneNumber')} *
              </Label>
              <div className="flex gap-2 mt-1">
                <Select
                  value={watch('countryCode') || undefined}
                  open={isCountryCodeOpen}
                  onOpenChange={setIsCountryCodeOpen}
                  onValueChange={(value) => {
                    setValue('countryCode', value);
                    if (errors.countryCode) {
                      setValue('countryCode', value, { shouldValidate: true });
                    }
                  }}>

                  <SelectTrigger className="w-24 bg-background border-border text-xs">
                    <SelectValue placeholder={t('contact.form.placeholders.selectCode')} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border z-50">

                    {uniqueCountryCodes.map((item) => (
                      <SelectItem key={`${item.code}-${item.initial}`} value={item.code} className="cursor-pointer text-xs">
                        {item.initial} {item.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone', { required: t('contact.form.validation.phoneRequired') })}
                  placeholder={selectedCountryCode ? getPhoneFormatExample(selectedCountryCode) : t('contact.form.placeholders.selectCodeFirst')}
                  className="flex-1 bg-background"
                />
              </div>
              {selectedCountryCode && (
                <p className="text-muted-foreground text-xs mt-1 flex items-center">
                  <span className="mr-1">📞</span>
                  Example: {getPhoneFormatExample(selectedCountryCode)}{countryCodes.find(c => c.code === selectedCountryCode)?.country ? ` - ${countryCodes.find(c => c.code === selectedCountryCode)!.country}` : ''}
                </p>
              )}
              {!phoneValidation.isValid && currentPhone && (
                <p className="text-orange-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {phoneValidation.message}
                </p>
              )}
              {(errors.phone || !watch('countryCode')) && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.phone?.message || t('contact.form.validation.countryCodeRequired')}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="company" className="text-sm font-medium text-foreground">
                {t('contact.form.companyName')} *
              </Label>
              <Input
                id="company"
                {...register('company', { required: t('contact.form.validation.companyRequired') })}
                placeholder={t('contact.form.placeholders.company')}
                className="mt-1"
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.company.message}
                </p>
              )}
            </div>
          </div>

          {/* Location and Service Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="country" className="text-sm font-medium text-foreground">
                {t('contact.form.country')} - {t('contact.form.currentLocation', { defaultValue: 'Current Location' })} *
              </Label>
              <Select
                value={watch('country') || undefined}
                open={isCountryOpen}
                onOpenChange={setIsCountryOpen}
                onValueChange={(value) => {
                setValue('country', value);
                // Clear any validation errors
                if (errors.country) {
                  setValue('country', value, { shouldValidate: true });
                }
              }}>
                <SelectTrigger className="mt-1 bg-background border-border">
                  <SelectValue placeholder={t('contact.form.placeholders.selectCountry')} />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">

                  {uniqueCountries.map((country) => (
                    <SelectItem key={country} value={country} className="cursor-pointer">
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!watch('country') && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {t('contact.form.validation.countryRequired')}
                </p>
              )}
            </div>

            <div ref={serviceDropdownRef} className="relative">
              <Label htmlFor="service" className="text-sm font-medium text-foreground">
                {t('contact.form.servicesOfInterest')} * {t('contact.form.selectMultiple')}
              </Label>
              <div className="mt-1 relative">
                <button
                  type="button"
                  onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                  className="w-full min-h-[40px] px-3 py-2 text-left bg-background border border-border rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-between"
                >
                  <span className="text-sm text-foreground">
                    {selectedServices.length === 0 
                      ? t('contact.form.placeholders.selectServices')
                      : `${selectedServices.length} ${t('waitlist.servicesSelected', { s: selectedServices.length > 1 ? 's' : '' })}`
                    }
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServiceDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-48 md:max-h-60 overflow-y-auto">
                    <div className="p-2 space-y-2">
                      {services.map((service) => (
                        <label key={service.value} className="flex items-center space-x-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-2 rounded-sm">
                          <input
                            type="checkbox"
                            value={service.value}
                            checked={selectedServices.includes(service.value)}
                            onChange={(e) => {
                              const newServices = e.target.checked
                                ? [...selectedServices, service.value]
                                : selectedServices.filter(s => s !== service.value);
                              setValue('service', newServices);
                            }}
                            className="rounded border-border"
                          />
                          <span className="text-sm">{service.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {selectedServices.length === 0 && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {t('contact.form.validation.servicesRequired')}
                </p>
              )}
            </div>
          </div>

          {/* Preferred Contact Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preferredDate" className="text-sm font-medium text-foreground">
                {t('contact.form.preferredDate')} *
              </Label>
              <input type="hidden" {...register('preferredDate', { required: t('contact.form.validation.preferredDateRequired') })} value={watch('preferredDate') || ''} />
              <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`mt-1 w-full justify-start text-left font-normal ${!watch('preferredDate') ? 'text-muted-foreground' : ''}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watch('preferredDate') ? format(new Date(watch('preferredDate')), 'PPP') : t('contact.form.placeholders.preferredDate')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover border border-border z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={watch('preferredDate') ? new Date(watch('preferredDate')) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        setValue('preferredDate', date.toISOString(), { shouldValidate: true });
                        setIsDateOpen(false);
                      }
                    }}
                    disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.preferredDate && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.preferredDate.message as any}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="preferredTime" className="text-sm font-medium text-foreground">
                {t('contact.form.preferredTime')} *
              </Label>
              <Input
                id="preferredTime"
                type="time"
                placeholder={t('contact.form.placeholders.preferredTime')}
                className="mt-1 w-full"
                {...register('preferredTime', {
                  required: t('contact.form.validation.preferredTimeRequired'),
                  onBlur: (e) => {
                    const target = e.target as HTMLInputElement;
                    const normalized = normalizeTime(target.value);
                    setValue('preferredTime', normalized, { shouldValidate: true });
                  },
                })}
              />
              {errors.preferredTime && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.preferredTime.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              {t('contact.form.projectDescription')} *
            </Label>
            <Textarea
              id="description"
              {...register('description', { 
                required: t('contact.form.validation.descriptionRequired'),
                minLength: {
                  value: 20,
                  message: t('contact.form.validation.descriptionMinLength')
                }
              })}
              placeholder={t('contact.form.placeholders.projectDescription')}
              className="mt-1 min-h-[100px] sm:min-h-[120px] resize-none overflow-hidden"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Form Action Buttons */}
          <div className="flex gap-3">
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !watch('name') ||
                !watch('email') ||
                !watch('countryCode') ||
                !watch('phone') ||
                !watch('company') ||
                !watch('country') ||
                !selectedServices.length ||
                !watch('preferredDate') ||
                !watch('preferredTime') ||
                !watch('description')
              }
              className="flex-1 bg-andeda-gradient hover:bg-andeda-gradient-intense text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-glow hover:scale-105"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t('contact.form.sending')}
                </>
              ) : (
                <>
                  {t('contact.form.sendMessage')}
                  <AnimatedIcon icon={Send} className="ml-2 w-4 h-4" animation="pulse-scale" />
                </>
              )}
            </Button>

            {/* Clear Form Button */}
            <Button
              type="button"
              onClick={handleClearForm}
              variant="outline"
              className="px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">{t('contact.form.clear')}</span>
            </Button>
          </div>
          
          {/* Form submission notice */}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p className="mb-2">
              {t('contact.form.fillAllFields')}
            </p>
            <p>
              {t('contact.form.submissionNotice')}
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;