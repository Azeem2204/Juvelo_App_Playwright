import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  readonly emailInput = 'input[name="email"]';
  readonly passwordInput = 'input[name="password"]';
  readonly loginButton = 'button[type="submit"]';
  readonly errorMessage = '.error-message';
  readonly rememberMeCheckbox = 'input[name="rememberMe"]';
  readonly forgotPasswordLink = 'a:has-text("Forgot Password")';

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await super.goto('/login');
  }

  async login(email: string, password: string) {
    await this.fillText(this.emailInput, email);
    await this.fillText(this.passwordInput, password);
    await this.clickElement(this.loginButton);
    await this.waitForPageLoad();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.getText(this.errorMessage);
  }

  async isErrorVisible(): Promise<boolean> {
    return this.isVisible(this.errorMessage);
  }

  async toggleRememberMe() {
    await this.clickElement(this.rememberMeCheckbox);
  }

  async clickForgotPassword() {
    await this.clickElement(this.forgotPasswordLink);
  }

  async isLoginFormVisible(): Promise<boolean> {
    return this.isVisible(this.emailInput);
  }
}
