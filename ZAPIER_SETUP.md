# Zapier Email Confirmation Setup

Your app is now ready to send localized confirmation emails via Zapier! Here's how to set it up:

## Step 1: Create Your Zapier Webhook

1. Go to [Zapier](https://zapier.com) and create a new Zap
2. Choose **"Webhooks by Zapier"** as the trigger
3. Select **"Catch Hook"** and copy your webhook URL
4. Update `src/config/forms.ts` - replace the empty string with your webhook URL:
   ```typescript
   export const zapierWebhookUrl: string = 'https://hooks.zapier.com/hooks/catch/YOUR_ID/YOUR_KEY';
   ```

## Step 2: Configure Your Email Action

Add **"Outlook Send Email"** as your action step and use these variables:

### Email Configuration:
- **To:** `{{email}}`
- **From:** Your email address
- **Subject:** Use these localized subjects:
  - English: `Thank you {{firstName}} - We've received your {{type}} submission!`
  - Spanish: `Gracias {{firstName}} - ¡Hemos recibido tu envío de {{type}}!`
  - French: `Merci {{firstName}} - Nous avons reçu votre soumission {{type}}!`

### Email Body Templates:

**English (when language = "en"):**
```
Hi {{firstName}},

Thank you for your interest in our analytics services! We've successfully received your {{type}} submission.

{{#if type == "contact"}}
We'll review your consultation request and get back to you within 24 hours to schedule your personalized analytics consultation.
{{else}}
Welcome to our waitlist! We'll notify you as soon as we launch new features and analytics solutions.
{{/if}}

Best regards,
The Analytics Team
```

**Spanish (when language = "es"):**
```
Hola {{firstName}},

¡Gracias por tu interés en nuestros servicios de análisis! Hemos recibido exitosamente tu envío de {{type}}.

{{#if type == "contact"}}
Revisaremos tu solicitud de consulta y te contactaremos dentro de 24 horas para programar tu consulta personalizada de análisis.
{{else}}
¡Bienvenido a nuestra lista de espera! Te notificaremos tan pronto como lancemos nuevas funciones y soluciones de análisis.
{{/if}}

Saludos cordiales,
El Equipo de Análisis
```

**French (when language = "fr"):**
```
Bonjour {{firstName}},

Merci pour votre intérêt dans nos services d'analyse ! Nous avons reçu avec succès votre soumission {{type}}.

{{#if type == "contact"}}
Nous examinerons votre demande de consultation et vous recontacterons dans les 24 heures pour programmer votre consultation d'analyse personnalisée.
{{else}}
Bienvenue sur notre liste d'attente ! Nous vous notifierons dès que nous lancerons de nouvelles fonctionnalités et solutions d'analyse.
{{/if}}

Cordialement,
L'Équipe d'Analyse
```

## Step 3: Add Language Detection (Optional Advanced Setup)

For automatic language detection, add a **"Paths by Zapier"** step before the email action:

**Path A - English:** `language` equals `en`
**Path B - Spanish:** `language` equals `es`  
**Path C - French:** `language` equals `fr`

Then create separate email actions for each language path.

## Webhook Payload Structure

Your Zapier webhook will receive this JSON payload:

```json
{
  "type": "contact" | "waitlist",
  "email": "user@example.com",
  "firstName": "John",
  "language": "en" | "es" | "fr",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "https://yourdomain.com",
  "formData": {
    // Contact form specific fields
    "name": "John Doe",
    "company": "Acme Corp",
    "phone": "+1 555-123-4567",
    "country": "United States",
    "services": "Data Analytics, Consulting",
    "preferredDate": "2024-01-20",
    "preferredTime": "14:00",
    "description": "Need help with sales data analysis"
    
    // OR Waitlist form specific fields
    "name": "John Doe", 
    "company": "Acme Corp",
    "phone": "+1 555-123-4567",
    "role": "Data Analyst",
    "interests": "Financial Intelligence, Market Research",
    "comments": "Looking forward to new features"
  }
}
```

## Testing

1. Save your Zap and turn it on
2. Submit a test form on your website
3. Check your Zapier dashboard to see if the webhook was triggered
4. Verify the email was sent to the test address

## Troubleshooting

- Make sure your webhook URL is correct in `src/config/forms.ts`
- Check the Zapier task history for any errors
- Verify your Outlook email settings in Zapier
- Test with a simple email first, then add language logic

That's it! Your users will now receive personalized confirmation emails in their browsing language after submitting either form.