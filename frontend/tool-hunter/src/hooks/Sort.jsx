function LowHigh(productList) {
  const copyList = productList.map((p) => ({
    ...p,
    price: parseFloat(p.price.replace(/[^-.\d]/g, "")),
    //     }
  }));
  const sortedList = copyList.sort((a, b) => a.price - b.price);
  const updatedList = sortedList.map((p) => ({
    ...p,
    price: "$" + p.price.toString(),
  }));

  // another way
  //   const copyList = productList
  //     .map((p) => ({
  //       ...p,
  //       price: parseFloat(p.price.replace(/[^-.\d]/g, "")),
  //     }))
  //     .sort((a, b) => a.price - b.price)
  //     .map((p) => ({
  //       ...p,
  //       price: "$" + p.price.toString(),
  //     }));
  //   console.log(copyList);

  return updatedList;
}
export default LowHigh;
