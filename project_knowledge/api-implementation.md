# API Implementation for Altivento Website

## Overview

The Altivento website implements several API routes using Next.js API Routes to handle form submissions and dynamic data requests. These routes are implemented in the `src/app/api/` directory using the App Router pattern.

## Contact Form API

### Endpoint: `/api/contact`

This API endpoint handles contact form submissions with the following features:

1. **Validation**
   - Uses Zod schema validation for form inputs
   - Returns detailed validation errors for invalid submissions
   - Implements progressive form validation with clear feedback

2. **Data Storage**
   - Stores form submissions in Vercel KV Store
   - Uses a unique ID format: `contact:{timestamp}:{random-id}`
   - Maintains submission status for potential future CRM integration

3. **Email Notifications**
   - Sends formatted HTML emails to staff
   - Uses nodemailer with Google Workspace SMTP
   - Configurable notification recipients

4. **Spam Protection**
   - Implements honeypot fields to detect bot submissions
   - (Future enhancement: Add rate limiting)

### Environment Configuration

The contact form API requires the following environment variables:

```
EMAIL_USER=your-google-workspace-email
EMAIL_PASSWORD=your-app-password
NOTIFICATION_EMAIL=recipient-email
```

### Example Request

```typescript
// POST /api/contact
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "I'm interested in your products",
  "eventType": "Boda",
  "eventDate": "2023-12-15",
  "productInterest": "Carpas, Pistas de baile",
  "honeypot": "" // Should remain empty
}
```

### Example Response

```json
{
  "success": true,
  "message": "Form submitted successfully",
  "id": "contact:2023-05-20T15:30:45.123Z:a1b2c3d4"
}
```

## Future API Extensions

### Wedding Calculator API

Planned endpoint: `/api/wedding-calculator`

This API will:
- Calculate precise wedding venue setups
- Generate PDF quotes
- Save calculation results

### Quote Management API

Planned endpoint: `/api/quotes`

This API will:
- Create and manage customer quotes
- Track quote status
- Generate quote PDFs
- Integrate with CRM systems

## Implementation Notes

1. **Serverless Considerations**
   - All APIs are implemented as serverless functions
   - Response times are optimized for serverless execution
   - Error handling includes proper status codes and detailed messages

2. **Data Flow**
   - Form data → Validation → Storage → Email Notification
   - Error handling at each step with appropriate feedback

3. **Security**
   - Input validation to prevent injection attacks
   - Rate limiting to prevent abuse (future enhancement)
   - No sensitive data in responses

4. **Performance**
   - Optimized for cold starts
   - Minimal dependencies
   - Efficient error handling