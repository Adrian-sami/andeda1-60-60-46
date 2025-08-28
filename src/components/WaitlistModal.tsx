import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle, ChevronDown, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { googleForms, extractFirstName, normalizeLanguage, sendZapierWebhook } from '@/config/forms';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    countryCode: '+1',
    phone: '',
    role: '',
    interest: [] as string[], // Changed to array for multi-select
    comments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInterestDropdownOpen, setIsInterestDropdownOpen] = useState(false);
  const interestDropdownRef = useRef<HTMLDivElement>(null);

  // Phone number format examples for different countries
  const phoneFormatExamples: { [key: string]: string } = {
    '+93': '70 123 4567', // Afghanistan
    '+355': '69 123 4567', // Albania
    '+213': '551 23 45 67', // Algeria
    '+376': '312 345', // Andorra
    '+244': '923 123 456', // Angola
    '+54': '11 1234-5678', // Argentina
    '+374': '77 123456', // Armenia
    '+61': '412 345 678', // Australia
    '+43': '664 123 4567', // Austria
    '+994': '50 123 45 67', // Azerbaijan
    '+1-242': '242 359 1234', // Bahamas
    '+973': '3600 1234', // Bahrain
    '+880': '1712 345678', // Bangladesh
    '+1-246': '246 250 1234', // Barbados
    '+375': '29 123 45 67', // Belarus
    '+32': '470 12 34 56', // Belgium
    '+501': '610 1234', // Belize
    '+229': '90 01 12 34', // Benin
    '+975': '17 12 34 56', // Bhutan
    '+591': '712 34567', // Bolivia
    '+387': '61 123 456', // Bosnia and Herzegovina
    '+267': '71 123 456', // Botswana
    '+55': '11 91234-5678', // Brazil
    '+673': '712 3456', // Brunei
    '+359': '87 123 4567', // Bulgaria
    '+226': '70 12 34 56', // Burkina Faso
    '+257': '79 56 12 34', // Burundi
    '+855': '12 345 678', // Cambodia
    '+237': '6 71 23 45 67', // Cameroon
    '+1': '(555) 123-4567', // US/Canada
    '+238': '991 12 34', // Cape Verde
    '+236': '70 01 23 45', // Central African Republic
    '+235': '66 12 34 56', // Chad
    '+56': '9 1234 5678', // Chile
    '+86': '138 0013 8000', // China
    '+57': '300 1234567', // Colombia
    '+269': '321 23 45', // Comoros
    '+242': '06 123 4567', // Congo
    '+506': '8312 3456', // Costa Rica
    '+385': '91 234 5678', // Croatia
    '+53': '5 1234567', // Cuba
    '+357': '96 123456', // Cyprus
    '+420': '601 123 456', // Czech Republic
    '+243': '991 234 567', // Democratic Republic of the Congo
    '+45': '20 12 34 56', // Denmark
    '+253': '77 83 10 01', // Djibouti
    '+1-767': '767 225 1234', // Dominica
    '+1-809': '809 234 5678', // Dominican Republic
    '+670': '7721 2345', // East Timor
    '+593': '99 123 4567', // Ecuador
    '+20': '100 123 4567', // Egypt
    '+503': '7012 3456', // El Salvador
    '+240': '222 123 456', // Equatorial Guinea
    '+291': '7 123 456', // Eritrea
    '+372': '5123 4567', // Estonia
    '+251': '91 123 4567', // Ethiopia
    '+679': '999 1234', // Fiji
    '+358': '50 123 4567', // Finland
    '+33': '06 12 34 56 78', // France
    '+241': '06 03 12 34', // Gabon
    '+220': '301 2345', // Gambia
    '+995': '555 12 34 56', // Georgia
    '+49': '0151 12345678', // Germany
    '+233': '24 123 4567', // Ghana
    '+30': '694 123 4567', // Greece
    '+1-473': '473 403 1234', // Grenada
    '+502': '5123 4567', // Guatemala
    '+224': '601 12 34 56', // Guinea
    '+245': '955 012 345', // Guinea-Bissau
    '+592': '609 1234', // Guyana
    '+509': '34 12 3456', // Haiti
    '+504': '9123 4567', // Honduras
    '+36': '20 123 4567', // Hungary
    '+354': '611 1234', // Iceland
    '+91': '98765 43210', // India
    '+62': '812 3456 7890', // Indonesia
    '+98': '912 123 4567', // Iran
    '+964': '791 234 5678', // Iraq
    '+353': '85 123 4567', // Ireland
    '+972': '50 123 4567', // Israel
    '+39': '333 123 4567', // Italy
    '+225': '05 12 34 56 78', // Ivory Coast
    '+1-876': '876 210 1234', // Jamaica
    '+81': '90 1234 5678', // Japan
    '+962': '79 123 4567', // Jordan
    '+7-KZ': '701 123 4567', // Kazakhstan
    '+254': '712 123456', // Kenya
    '+686': '72012345', // Kiribati
    '+965': '5012 3456', // Kuwait
    '+996': '555 123 456', // Kyrgyzstan
    '+856': '20 23 123 456', // Laos
    '+371': '21 234 567', // Latvia
    '+961': '71 123 456', // Lebanon
    '+266': '5012 3456', // Lesotho
    '+231': '77 012 345', // Liberia
    '+218': '91 2345678', // Libya
    '+423': '660 123 456', // Liechtenstein
    '+370': '612 34567', // Lithuania
    '+352': '621 123 456', // Luxembourg
    '+261': '32 12 345 67', // Madagascar
    '+265': '991 23 45 67', // Malawi
    '+60': '12-345 6789', // Malaysia
    '+960': '790 1234', // Maldives
    '+223': '65 01 23 45', // Mali
    '+356': '9696 1234', // Malta
    '+692': '235 1234', // Marshall Islands
    '+222': '22 12 34 56', // Mauritania
    '+230': '5251 2345', // Mauritius
    '+52': '55 1234 5678', // Mexico
    '+691': '350 1234', // Micronesia
    '+373': '621 12 345', // Moldova
    '+377': '6 12 34 56 78', // Monaco
    '+976': '8812 3456', // Mongolia
    '+382': '67 123 456', // Montenegro
    '+212': '6 12 34 56 78', // Morocco
    '+258': '82 123 4567', // Mozambique
    '+95': '9 123 456 789', // Myanmar
    '+264': '81 123 4567', // Namibia
    '+674': '555 1234', // Nauru
    '+977': '984 123 4567', // Nepal
    '+31': '06 12345678', // Netherlands
    '+64': '21 123 4567', // New Zealand
    '+505': '8712 3456', // Nicaragua
    '+227': '93 12 34 56', // Niger
    '+234': '802 123 4567', // Nigeria
    '+850': '191 123 4567', // North Korea
    '+389': '70 123 456', // North Macedonia
    '+47': '412 34 567', // Norway
    '+968': '9212 3456', // Oman
    '+92': '300 1234567', // Pakistan
    '+680': '620 1234', // Palau
    '+970': '599 123 456', // Palestine
    '+507': '6123 4567', // Panama
    '+675': '7012 3456', // Papua New Guinea
    '+595': '961 123456', // Paraguay
    '+51': '987 654 321', // Peru
    '+63': '917 123 4567', // Philippines
    '+48': '512 123 456', // Poland
    '+351': '912 345 678', // Portugal
    '+974': '3312 3456', // Qatar
    '+40': '721 234 567', // Romania
    '+7-RU': '903 123 4567', // Russia
    '+250': '788 123 456', // Rwanda
    '+1-869': '869 765 1234', // Saint Kitts and Nevis
    '+1-758': '758 284 1234', // Saint Lucia
    '+1-784': '784 430 1234', // Saint Vincent and the Grenadines
    '+685': '72 12345', // Samoa
    '+378': '66 66 12 12', // San Marino
    '+239': '981 2345', // Sao Tome and Principe
    '+966': '50 123 4567', // Saudi Arabia
    '+221': '77 123 45 67', // Senegal
    '+381': '60 1234567', // Serbia
    '+248': '2 510 123', // Seychelles
    '+232': '25 123456', // Sierra Leone
    '+65': '8123 4567', // Singapore
    '+421': '907 123 456', // Slovakia
    '+386': '31 123 456', // Slovenia
    '+677': '74 21234', // Solomon Islands
    '+252': '61 2345678', // Somalia
    '+27': '82 123 4567', // South Africa
    '+82': '10 1234 5678', // South Korea
    '+211': '977 123 456', // South Sudan
    '+34': '612 34 56 78', // Spain
    '+94': '71 234 5678', // Sri Lanka
    '+249': '91 123 4567', // Sudan
    '+597': '8612345', // Suriname
    '+46': '70 123 45 67', // Sweden
    '+41': '079 123 45 67', // Switzerland
    '+963': '944 567 890', // Syria
    '+886': '912 345 678', // Taiwan
    '+992': '93 123 4567', // Tajikistan
    '+255': '754 123 456', // Tanzania
    '+66': '81 234 5678', // Thailand
    '+228': '90 11 23 45', // Togo
    '+676': '771 5123', // Tonga
    '+1-868': '868 291 1234', // Trinidad and Tobago
    '+216': '20 123 456', // Tunisia
    '+90': '532 123 4567', // Turkey
    '+993': '65 123456', // Turkmenistan
    '+688': '901234', // Tuvalu
    '+256': '712 345678', // Uganda
    '+380': '50 123 4567', // Ukraine
    '+971': '50 123 4567', // UAE
    '+44': '7911 123456', // UK
    '+598': '94 123 456', // Uruguay
    '+998': '90 123 45 67', // Uzbekistan
    '+678': '591 2345', // Vanuatu
    '+39-VA': '6 698 12345', // Vatican City
    '+58': '412 1234567', // Venezuela
    '+84': '90 123 45 67', // Vietnam
    '+967': '73 123 4567', // Yemen
    '+260': '97 1234567', // Zambia
    '+263': '77 123 4567', // Zimbabwe
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
    return countryCodes
      .filter((item) => {
        if (seen.has(item.code)) return false;
        seen.add(item.code);
        return true;
      })
      .sort((a, b) => a.country.localeCompare(b.country)); // Sort alphabetically by country name
  }, []);

  const getPhoneFormatExample = (countryCode: string) => {
    return phoneFormatExamples[countryCode] || '123 456 789';
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

  const phoneValidation = validatePhoneLength(formData.phone, formData.countryCode);

  // Handle clicking outside interest dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (interestDropdownRef.current && !interestDropdownRef.current.contains(event.target as Node)) {
        setIsInterestDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Interest options with exact values that match Google Form expectations
  const interestOptions = [
    { value: 'Data Analytics', label: t('contact.form.services.dataAnalytics') },
    { value: 'Consulting', label: t('contact.form.services.consulting') },
    { value: 'Financial Intelligence', label: t('contact.form.services.financialIntelligence') },
    { value: 'Market Research', label: t('contact.form.services.marketResearch') },
    { value: 'Performance Analysis', label: t('contact.form.services.performanceAnalysis') },
    { value: 'Forecasting', label: t('contact.form.services.forecasting') },
    { value: 'Visual Reporting', label: t('contact.form.services.visualReporting') },
    { value: 'Custom Reporting', label: t('contact.form.services.customReporting') },
    { value: 'Other', label: t('contact.form.services.other') }
  ];

// Google Forms configuration (configured in src/config/forms.ts)
const WAITLIST_FORM = googleForms.waitlist;
const isWaitlistConfigured =
  !!WAITLIST_FORM.formUrl &&
  !WAITLIST_FORM.formUrl.includes('YOUR_GOOGLE_FORM_URL_HERE') &&
  Object.values(WAITLIST_FORM.fields).every((v) => v && !v.includes('XXXX'));

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      
      if (!isWaitlistConfigured) {
        toast("Google Form not configured", {
          description: "Please add the formResponse URL and entry IDs in src/config/forms.ts",
          duration: 5000,
        });
        return;
      }

      // Create form data for Google Form submission
      const googleFormData = new FormData();
      googleFormData.append(WAITLIST_FORM.fields.name, formData.name);
      googleFormData.append(WAITLIST_FORM.fields.email, formData.email);
      googleFormData.append(WAITLIST_FORM.fields.company, formData.company);
      googleFormData.append(WAITLIST_FORM.fields.phone, `${formData.countryCode} ${formData.phone}`);
      googleFormData.append(WAITLIST_FORM.fields.role, formData.role);
      
      // Handle multiple interests - Google Forms expects multiple entries with same name
      formData.interest.forEach(interest => {
        googleFormData.append(WAITLIST_FORM.fields.interest, interest);
      });
      
      googleFormData.append(WAITLIST_FORM.fields.comments, formData.comments);

      // Add language context to form data
      googleFormData.append('language', i18n.language);

      // Submit to Google Form
      const response = await fetch(WAITLIST_FORM.formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: googleFormData
      });

      

      // Send confirmation email via Zapier webhook
      await sendZapierWebhook({
        type: 'waitlist',
        email: formData.email,
        firstName: extractFirstName(formData.name),
        language: normalizeLanguage(i18n.language),
        formData: {
          name: formData.name,
          company: formData.company,
          phone: `${formData.countryCode} ${formData.phone}`.trim(),
          role: formData.role,
          interests: formData.interest.join(', '),
          comments: formData.comments,
        }
      });

      setIsSubmitted(true);
      toast("🎉 Welcome to the Waitlist!", {
        description: "Thank you for your interest! We'll be in touch soon.",
        duration: 5000,
      });

      // Auto-close after 5 minutes (300 seconds)
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          countryCode: '+1',
          phone: '',
          role: '',
          interest: [], // Reset to empty array
          comments: ''
        });
        // Set a longer delay before showing modal again (30 minutes)
        localStorage.setItem('waitlist-modal-dismissed', Date.now().toString());
      }, 300000); // 5 minutes = 300,000 milliseconds

    } catch (error) {
      console.error('Error submitting form:', error);
      toast("❌ Submission Error", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[95vw] max-w-md mx-auto p-4 sm:p-6">
          <div className="text-center py-4 sm:py-8">
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
              {t('waitlist.success.title')} 🎉
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t('waitlist.success.message')}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-2xl mx-auto max-h-[95vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold gradient-text">
            {t('waitlist.title')}
          </DialogTitle>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t('waitlist.subtitle')}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                {t('contact.form.fullName')} *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={t('contact.form.placeholders.fullName')}
                required
                className="mt-1"
              />
              <p className="text-xs text-red-500 mt-1">Required</p>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                {t('contact.form.emailAddress')} *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={t('contact.form.placeholders.email')}
                required
                className="mt-1"
              />
              <p className="text-xs text-red-500 mt-1">Required</p>
            </div>
          </div>

          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company" className="text-sm font-medium">
                {t('contact.form.companyName')} *
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder={t('contact.form.placeholders.company')}
                required
                className="mt-1"
              />
              <p className="text-xs text-red-500 mt-1">Required</p>
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium">
                {t('contact.form.phoneNumber')} *
              </Label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <Select 
                  value={formData.countryCode} 
                  onValueChange={(value) => handleInputChange('countryCode', value)}
                >
                  <SelectTrigger className="col-span-1">
                    <SelectValue placeholder="+1">
                      {formData.countryCode}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border z-50 max-h-60 overflow-y-auto">
                    {uniqueCountryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.code} {country.initial}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder={getPhoneFormatExample(formData.countryCode)}
                  className={`col-span-2 ${!phoneValidation.isValid ? 'border-red-500' : ''}`}
                  required
                />
              </div>
              {!phoneValidation.isValid && (
                <div className="flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 text-red-500" />
                  <p className="text-xs text-red-500">{phoneValidation.message}</p>
                </div>
              )}
              <p className="text-xs text-red-500 mt-1">Required</p>
            </div>
          </div>

          {/* Role and Interest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="role" className="text-sm font-medium">
                {t('waitlist.yourRole')} *
              </Label>
              <Select onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder={t('waitlist.selectRole')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ceo">{t('waitlist.roles.ceo')}</SelectItem>
                  <SelectItem value="cto">{t('waitlist.roles.cto')}</SelectItem>
                  <SelectItem value="data-analyst">{t('waitlist.roles.dataAnalyst')}</SelectItem>
                  <SelectItem value="business-analyst">{t('waitlist.roles.businessAnalyst')}</SelectItem>
                  <SelectItem value="marketing-manager">{t('waitlist.roles.marketingManager')}</SelectItem>
                  <SelectItem value="product-manager">{t('waitlist.roles.productManager')}</SelectItem>
                  <SelectItem value="consultant">{t('waitlist.roles.consultant')}</SelectItem>
                  <SelectItem value="other">{t('waitlist.roles.other')}</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-red-500 mt-1">Required</p>
            </div>

            <div ref={interestDropdownRef} className="relative">
              <Label htmlFor="interest" className="text-sm font-medium">
                {t('waitlist.primaryInterest')} * ({t('waitlist.selectMultiple')})
              </Label>
              <div className="mt-1 relative">
                <button
                  type="button"
                  onClick={() => setIsInterestDropdownOpen(!isInterestDropdownOpen)}
                  className="w-full min-h-[40px] px-3 py-2 text-left bg-background border border-border rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-between"
                >
                  <span className="text-sm text-foreground">
                    {formData.interest.length === 0 
                      ? t('contact.form.placeholders.selectServices')
                      : `${formData.interest.length} ${t('waitlist.servicesSelected', { count: formData.interest.length })}`
                    }
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isInterestDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isInterestDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                    <div className="p-2 space-y-2">
                      {interestOptions.map((option) => (
                        <label key={option.value} className="flex items-center space-x-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-2 rounded-sm">
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={formData.interest.includes(option.value)}
                            onChange={(e) => {
                              const newInterests = e.target.checked
                                ? [...formData.interest, option.value]
                                : formData.interest.filter(i => i !== option.value);
                              handleInputChange('interest', newInterests);
                            }}
                            className="rounded border-border"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-red-500 mt-1">Required</p>
            </div>
          </div>

          {/* Comments */}
          <div>
            <Label htmlFor="comments" className="text-sm font-medium">
              {t('waitlist.additionalComments')}
            </Label>
            <Textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => handleInputChange('comments', e.target.value)}
              placeholder={t('waitlist.commentsPlaceholder')}
              className="mt-1 min-h-[80px]"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">Optional</p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.email || !formData.company || !formData.phone || !phoneValidation.isValid || !formData.role || formData.interest.length === 0}
            className="w-full bg-andeda-gradient hover:bg-andeda-gradient-intense text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-glow hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t('waitlist.joiningWaitlist')}
              </>
            ) : (
              <>
                {t('waitlist.joinWaitlist')}
                <Send className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>

          {(isSubmitting || !formData.name || !formData.email || !formData.company || !formData.phone || !phoneValidation.isValid || !formData.role || formData.interest.length === 0) && (
            <p className="text-xs text-muted-foreground text-center">
              Please fill all required fields above to enable submission
            </p>
          )}

          <p className="text-xs text-muted-foreground text-center mt-2">
            By joining, you agree to receive updates about our analytics platform launch.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};