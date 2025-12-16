import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { kv } from '@vercel/kv';
import { siteConfig } from '@/config/site';
import {
  PATTERNS,
  VALIDATION_MESSAGES,
  normalizePhone,
  containsUrl,
  countUrls,
} from '@/lib/validation/contact-form';

// Minimum time (ms) expected to fill the form - faster submissions are likely bots
const MIN_FILL_TIME_MS = 3000;

// Define contact form schema with enhanced validation
const contactFormSchema = z.object({
  name: z.string()
    .min(2, { message: VALIDATION_MESSAGES.name.min })
    .max(100, { message: VALIDATION_MESSAGES.name.max })
    .regex(PATTERNS.name, { message: VALIDATION_MESSAGES.name.format })
    .refine(val => !containsUrl(val), { message: VALIDATION_MESSAGES.name.noUrl })
    .refine(val => val.trim().includes(' '), { message: VALIDATION_MESSAGES.name.fullName }),
  email: z.string()
    .email({ message: VALIDATION_MESSAGES.email.invalid })
    .max(254, { message: 'Correo electrónico demasiado largo' }),
  phone: z.string()
    .transform(val => normalizePhone(val))
    .refine(
      val => val.length === 10 || (val.length === 12 && val.startsWith('52')),
      { message: VALIDATION_MESSAGES.phone.invalid }
    ),
  message: z.string()
    .min(10, { message: VALIDATION_MESSAGES.message.min })
    .max(2000, { message: VALIDATION_MESSAGES.message.max })
    .refine(val => countUrls(val) <= 2, { message: VALIDATION_MESSAGES.message.tooManyUrls }),
  eventType: z.string().optional(),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  productInterest: z.string().optional(),
  weddingPackage: z.string().optional(),
  estimatedBudget: z.string().optional(),
  addons: z.string().optional(),
  // Honeypot fields (should remain empty)
  honeypot: z.string().optional(),
  website: z.string().optional(),
  company: z.string().optional(),
  faxNumber: z.string().optional(),
  // Timing data
  _timing: z.number().optional(),
});

// Type definition based on schema
type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Detect spam submissions based on honeypot fields and timing
 * Returns true if the submission appears to be spam
 */
function detectSpam(data: Record<string, unknown>): boolean {
  // Check honeypot fields - any filled field indicates a bot
  if (data.honeypot || data.website || data.company || data.faxNumber) {
    console.log('Spam detected: honeypot field filled');
    return true;
  }

  // Check timing - forms filled too quickly are likely bots
  const timing = data._timing as number | undefined;
  if (timing !== undefined && timing < MIN_FILL_TIME_MS) {
    console.log(`Spam detected: form filled too quickly (${timing}ms)`);
    return true;
  }

  return false;
}

// Email configuration
const createTransporter = () => {
  // In production, use environment variables for credentials
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export async function POST(request: Request) {
  try {
    // Get form data from request
    const formData = await request.json();

    // Check for spam (honeypot fields, timing-based detection)
    // Return fake success to not alert the bot
    if (detectSpam(formData)) {
      return NextResponse.json({ success: true, message: 'Formulario enviado exitosamente' });
    }

    // Validate form data
    const validatedData = contactFormSchema.safeParse(formData);
    
    if (!validatedData.success) {
      // Return validation errors
      return NextResponse.json(
        { 
          success: false, 
          message: 'Error de validación', 
          errors: validatedData.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }
    
    let contactId = '';
    
    try {
      // Store data in KV store with timestamp
      const timestamp = new Date().toISOString();
      contactId = `contact:${timestamp}:${Math.random().toString(36).substring(2, 9)}`;
      const dataToStore = {
        ...validatedData.data,
        timestamp,
        status: 'new',
      };
      
      await kv.set(contactId, dataToStore);
    } catch (kvError) {
      console.error('KV storage error (continuing with email):', kvError);
      // Continue with email sending even if KV fails
    }
    
    // Send email notification
    const transporter = createTransporter();
    
    await transporter.sendMail({
      from: `"Contacto ${siteConfig.name}" <${siteConfig.email.formSubmission.from}>`,
      to: siteConfig.email.formSubmission.to,
      cc: siteConfig.email.formSubmission.cc,
      replyTo: validatedData.data.email,
      subject: `Nueva Solicitud de Contacto - ${siteConfig.name}`,
      html: createEmailTemplate(validatedData.data),
    });
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Formulario enviado exitosamente',
      id: contactId || undefined
    });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Contact form submission error:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error al procesar el formulario', 
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}

// Create HTML email template
function createEmailTemplate(data: ContactFormData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #123332; border-bottom: 2px solid #EF9C82; padding-bottom: 10px;">
        Nueva Solicitud de Contacto
      </h2>
      
      <div style="background-color: #F9EEE7; padding: 20px; border-radius: 5px; margin-top: 20px;">
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Correo:</strong> ${data.email}</p>
        <p><strong>Teléfono:</strong> ${data.phone}</p>
        ${data.eventType ? `<p><strong>Tipo de evento:</strong> ${data.eventType}</p>` : ''}
        ${data.eventDate ? `<p><strong>Fecha del evento:</strong> ${data.eventDate}</p>` : ''}
        
        <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px;">
          <h3 style="color: #123332;">Mensaje:</h3>
          <p style="white-space: pre-line;">${data.message}</p>
        </div>
      </div>
      
      <div style="margin-top: 30px; font-size: 12px; color: #666; text-align: center;">
        <p>Esta es una notificación automática del sitio web de ${siteConfig.name}.</p>
      </div>
    </div>
  `;
}