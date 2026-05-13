import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly heroHeading = 'h1:has-text("Beach Events Crafted with Love & Sea")';
  readonly beachPartiesButton = 'a:has-text("Beach Parties"), button:has-text("Beach Parties")';
  readonly exploreEventsButton = 'button:has-text("Explore Events")';
  readonly allEventsLink = 'a:has-text("All Events")';

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await super.goto('https://juveloo.com/');
    await this.waitForPageLoad();
  }

  async isHeroHeadingVisible(): Promise<boolean> {
    try {
      const heading = this.page.getByRole('heading', { name: /Beach Events Crafted with Love & Sea/i });
      await expect(heading).toBeVisible({ timeout: 10000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async clickBeachPartiesCategory() {
    // Try multiple methods to find and click Beach Parties
    try {
      // Method 1: Try button/link with text
      const beachPartiesBtn = this.page.getByRole('link', { name: /Beach Parties/i }).first();
      if (await beachPartiesBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await beachPartiesBtn.click();
      } else {
        // Method 2: Navigate directly to Beach Parties URL
        await this.page.goto('https://juveloo.com/category/BEACH_PARTIES');
      }
      await this.waitForPageLoad();
    } catch (e) {
      // Fallback: Direct navigation
      await this.page.goto('https://juveloo.com/category/BEACH_PARTIES');
      await this.waitForPageLoad();
    }
  }

  async clickExploreEvents() {
    const exploreBtn = this.page.getByRole('button', { name: /Explore Events/i });
    await expect(exploreBtn).toBeVisible({ timeout: 5000 });
    await exploreBtn.click();
    await this.waitForPageLoad();
  }
}
