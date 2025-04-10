import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { kv } from '@vercel/kv';
import { siteConfig } from '@/config/site';

// Define contact form schema with Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  phone: z.string().min(10, { message: 'El teléfono es requerido' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres' }),
  eventType: z.string().optional(),
  eventDate: z.string().optional(),
  honeypot: z.string().optional(),
});

// Type definition based on schema
type ContactFormData = z.infer<typeof contactFormSchema>;

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
    
    // Check honeypot field for spam detection
    if (formData.honeypot) {
      // Return success response but don't process (spam bot detected)
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