export interface EmailService {
  sendRegistrationConfirmation(email: string, names: string): Promise<void>;
}
