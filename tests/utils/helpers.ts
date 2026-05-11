import { Page } from '@playwright/test';

export async function waitForNavigation(page: Page, action: () => Promise<void>) {
  await Promise.all([
    page.waitForNavigation(),
    action(),
  ]);
}

export async function fillFormField(
  page: Page,
  selector: string,
  value: string
) {
  const field = page.locator(selector);
  await field.fill(value);
}

export async function selectDropdownOption(
  page: Page,
  selector: string,
  option: string
) {
  await page.selectOption(selector, option);
}

export async function clickAndWait(
  page: Page,
  selector: string,
  navigationUrl?: string
) {
  if (navigationUrl) {
    await Promise.all([
      page.waitForNavigation(),
      page.click(selector),
    ]);
  } else {
    await page.click(selector);
  }
}

export async function isElementVisible(
  page: Page,
  selector: string
): Promise<boolean> {
  try {
    return await page.isVisible(selector);
  } catch {
    return false;
  }
}

export async function getElementText(
  page: Page,
  selector: string
): Promise<string | null> {
  try {
    return await page.textContent(selector);
  } catch {
    return null;
  }
}
