import nodemailer from 'nodemailer';
import { EmailService } from '@/application/services/EmailService';

export class NodeMailerEmailService implements EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendRegistrationConfirmation(email: string, names: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@yourdomain.com',
      to: email,
      subject: 'Registro exitoso',
      text: `¡Hola ${names}! Tu registro fue exitoso. Bienvenido a la plataforma.`,
      html: `<h1>Hola ${names}!</h1><p>Tu registro fue exitoso. Bienvenido a la plataforma.</p>`
    });
  }
}
