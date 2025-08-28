import { isDueWithin24h } from "./time";

describe("isDueWithin24h", () => {
  it("should return true for a date due within the next 24 hours", () => {
    const in23h = new Date(Date.now() + 23 * 3600 * 1000).toISOString();
    expect(isDueWithin24h(in23h)).toBe(true);
  });

  it("should return false for a date due in more than 24 hours", () => {
    const in26h = new Date(Date.now() + 26 * 3600 * 1000).toISOString();
    expect(isDueWithin24h(in26h)).toBe(false);
  });

  it("should return false for a past date", () => {
    const past = new Date(Date.now() - 3600 * 1000).toISOString();
    expect(isDueWithin24h(past)).toBe(false);
  });

  it("should return false for an undefined date", () => {
    expect(isDueWithin24h(undefined)).toBe(false);
  });
});