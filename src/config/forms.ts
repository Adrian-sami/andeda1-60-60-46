// Centralized Google Forms configuration for external submissions
// How to use:
// 1) In Google Forms: Send -> Link -> copy the link
// 2) Convert the link by replacing `/viewform?...` with `/formResponse`
// 3) Open the live form, inspect an input, and find its name attribute like name="entry.123456789"
// 4) Paste the formResponse URL below and map each field to its entry.* id
// 5) After you update these values, both Waitlist and Contact forms will POST to Google Forms and responses will appear in your linked Google Sheet

export type GoogleFormConfig = {
  formUrl: string; // Must be the /formResponse URL
  fields: Record<string, string>; // Map of our field keys -> entry.* ids
};

// Zapier webhook URL for sending confirmation emails (optional)
// Set this to your Zapier webhook URL to enable automated email confirmations
export const zapierWebhookUrl: string = ''; // Example: 'https://hooks.zapier.com/hooks/catch/123456/abcdef'

export const googleForms = {
  waitlist: {
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScXemM6lDSodj9jUVp-F-x74iXYqED1gK93k8QKUtxx5i9jDw/formResponse',
    fields: {
      // Field mappings extracted from updated prefilled form link
      name: 'entry.1233648924',        // Full Name → James Brown
      email: 'entry.1846958938',       // Email → jamesbrown21@gmail.com  
      company: 'entry.1419615290',     // Company → Brown bakery pvt
      phone: 'entry.1004786704',       // Phone → 7717542255
      role: 'entry.1931166534',        // Role → ceo
      interest: 'entry.1514629068',    // Interest → financial intelligence, data analysis
      comments: 'entry.2132942123',    // Comments → we need clearity on our data
    },
  } as GoogleFormConfig,

  contact: {
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSchKMFMTAinpqi4a7lmIJzRUA5SrjFumPUppYXTGxtAU07DXw/formResponse',
    fields: {
      name: 'entry.755376398',
      email: 'entry.2139011688',
      countryCode: 'entry.288899737',
      phone: 'entry.485484671',
      company: 'entry.1484272532',
      country: 'entry.1350509574',
      service: 'entry.1549433105',
      preferredDate: 'entry.1376517419',
      preferredTime: 'entry.1929425547',
      description: 'entry.1231078577',
    },
  } as GoogleFormConfig,
};

// Helper functions for webhook integration
export const extractFirstName = (fullName: string): string => {
  return fullName.trim().split(' ')[0] || 'there';
};

export const normalizeLanguage = (lang: string): string => {
  const l = (lang || 'en').toLowerCase();
  if (l.startsWith('es')) return 'es';
  if (l.startsWith('fr')) return 'fr';
  return 'en';
};

export const sendZapierWebhook = async (data: any): Promise<void> => {
  if (!zapierWebhookUrl || zapierWebhookUrl.trim() === '' || zapierWebhookUrl.includes('YOUR_ZAPIER_WEBHOOK_URL')) {
    // Zapier webhook not configured - skipping email confirmation
    return;
  }

  try {
    await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: window.location.origin,
      }),
    });
    
  } catch (error) {
    console.error('Failed to trigger confirmation email:', error);
    // Fail silently - don't disrupt the main form submission
  }
};
