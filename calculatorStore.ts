type Menu = {
  name: string;
  price: number;
};

export type Cart = {
  name: string;
  quantity: number;
};

export class CalculatorStore {
  menus: Menu[] = [];
  hasMemberCard: boolean = false;

  constructor() {
    this.menus = [
      { name: "Red", price: 50 },
      { name: "Green", price: 40 },
      { name: "Blue", price: 30 },
      { name: "Yellow", price: 50 },
      { name: "Pink", price: 80 },
      { name: "Purple", price: 90 },
      { name: "Orange", price: 120 },
    ];
  }

  private discountCheck(carts: Cart[]) {
    const discountList = ["Orange", "Pink", "Green"];
    return discountList.some((e) => {
      const test = carts.find((cartItem) => cartItem.name === e);
      if (test) {
        return test.quantity >= 2;
      }
      return false;
    });
  }

  orderPrice(selectedMenu: Cart[]) {
    let discountTotal = 1
    let totalPrice = selectedMenu.reduce((acc, menuName) => {
      let menu = this.menus.find(({ name }) => name === menuName.name);
      if (menu) {
        return acc + (menu.price * menuName.quantity);
      }
      return acc;
    }, 0);

    if (this.hasMemberCard) {
        discountTotal -= 0.1; // 10% discount
    }

    const isDoubleDiscount = this.discountCheck(selectedMenu);

    if(isDoubleDiscount) {
        discountTotal -= 0.05 // 5% discount
    }

    return totalPrice * discountTotal;
  }
}

const store = new CalculatorStore();
store.hasMemberCard = true;
console.log("Price : ", store.orderPrice([{ name: "Red", quantity: 2 }, { name: "Green", quantity: 2 }]));
