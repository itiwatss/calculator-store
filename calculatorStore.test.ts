import { CalculatorStore, Cart } from "./calculatorStore";

describe("CalculatorStore", () => {
  let calculatorStore: CalculatorStore;

  beforeEach(() => {
    calculatorStore = new CalculatorStore();
  });

  test("calculates order price without discounts", () => {
    const selectedMenu: Cart[] = [
      { name: "Red", quantity: 1 },
      { name: "Blue", quantity: 2 },
    ];
    expect(calculatorStore.orderPrice(selectedMenu)).toBe(110); // (50*1) + (30*2) = 110
  });

  test("applies member card discount", () => {
    calculatorStore.hasMemberCard = true;
    const selectedMenu: Cart[] = [
      { name: "Red", quantity: 1 },
      { name: "Blue", quantity: 2 },
    ];
    expect(calculatorStore.orderPrice(selectedMenu)).toBe(99); // (50*1) + (30*2) = 110 with 10% discount applied
  });

  test("applies double discount", () => {
    calculatorStore.hasMemberCard = true;
    const selectedMenu: Cart[] = [
      { name: "Red", quantity: 1 },
      { name: "Blue", quantity: 2 },
      { name: "Green", quantity: 2 },
    ];
    expect(calculatorStore.orderPrice(selectedMenu)).toBe(161.5); // (50*1) + (30*2) + (40*2) = 190 with 15% discount applied
  });

  test("applies double discount without member card discount", () => {
    calculatorStore.hasMemberCard = false;
    const selectedMenu: Cart[] = [
      { name: "Red", quantity: 1 },
      { name: "Blue", quantity: 2 },
      { name: "Green", quantity: 2 },
    ];
    expect(calculatorStore.orderPrice(selectedMenu)).toBe(180.5); // (50*1) + (30*2) + (40*2) = 190 with 5% discount applied
  });
});
