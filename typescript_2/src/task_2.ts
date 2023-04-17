interface ITotalPriceArgs {
  price: number;
  discount: number;
  isInstallment: boolean;
  months: number;
}
const totalPrice = ({
  price,
  discount,
  isInstallment,
  months,
}: ITotalPriceArgs): number => {
  const discountedPrice: typeof price = price - (price * discount * 0.01);
  let resultPrice: typeof price
  if (isInstallment) {
    resultPrice = discountedPrice / months;
  } else {
    resultPrice = discountedPrice
  }

  return resultPrice
};

const priceParams: ITotalPriceArgs = {
  price: 100000,
  discount: 25,
  isInstallment: true,
  months: 12,
}

export const taskResult1 = ():void => {
  console.log(`task2: ${totalPrice(priceParams)}`);
}
