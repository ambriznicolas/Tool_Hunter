import { useState } from "react";
import product from "./ProductListEx";
import LowHigh from "./hooks/Sort";
import "./App.css";

function App() {
  const [productList, setProductList] = useState(product);
  const URL = import.meta.env.VITE_SOME_KEY;
  return (
    <>
      <div id="title-section" class="flex justify-center w-screen h-80">
        <div id="Title" class="flex items-center">
          <h1 class="animate-bounce mx-auto">Tool hunter</h1>
        </div>
      </div>
      <Search setProductList={setProductList} URL={URL} />
      {/* <ProductResults productList={productList} /> */}
      <ProductResultsEx
        productList={productList}
        low_high={LowHigh}
        setProductList={setProductList}
      />
    </>
  );
}

export default App;

function Search({ setProductList, URL }) {
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedStore, setSelectedStore] = useState("ebay");
  console.log(selectedStore);

  function handleSubmit(e) {
    e.preventDefault();
    const data = { product: searchProduct };

    fetch(`${URL}/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setProductList(data));
    if (data.ok) {
      console.log("Data is good");
      // Re-fetch data after successful post
    } else {
      console.error("Error posting data:");
    }
  }
  // useEffect(() => {
  //   getProductList();
  // }, []);
  return (
    <>
      <div id="search-section" class="">
        <form
          class="max-w-md mx-auto"
          onSubmit={(e) => handleSubmit(e)}
          id="search"
        >
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Tool..."
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Search
              </button>
            </div>
          </div>
          <div>
            <select
              onChange={(e) => setSelectedStore(e.target.value)}
              id="default store-selection"
              class=" w-full mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500` self-center text-center"
            >
              <option selected>Choose store</option>
              <option id="ebay" value="ebay">
                Ebay
              </option>
              <option id="amazon" value="amazon">
                Amazon
              </option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
}

function ProductResultsEx({ productList, low_high, setProductList }) {
  const ChangeOrder = (e) => {
    setProductList(low_high(productList, e.target.value));

    console.log(productList);
  };
  return (
    <>
      <div id="results" class="flex flex-col">
        {productList ? (
          <div class="mt-10 flex-row">
            <form class="max-w-sm mx-auto">
              <div>
                <select
                  onChange={ChangeOrder}
                  id="underline_select large"
                  class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-600 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer text-center rounded-lg"
                >
                  <option selected>Sort by</option>
                  <option value="Low to High">Low to High</option>
                  <option value="High to Low">High to Low</option>
                </select>
              </div>
            </form>
          </div>
        ) : (
          <div></div>
        )}
        {productList.length > 0 ? (
          productList.map((product) => (
            <div
              id="detail-each-product"
              class="flex flex-row tracking-tight justify-around  mt-25 ml-20"
            >
              <div class="self-center basis-99 " id="description-section">
                <a src="" class="">
                  <h3
                    class="tracking-tight text-center"
                    id="product-description"
                  >
                    {product.product}
                  </h3>
                </a>
              </div>
              <div class="self-center basis-90 text-center">
                <h3>{product.price}</h3>
                <p class="text-center tracking-tight mt-3" id="delivery">
                  {product.delivery}
                </p>
              </div>
              <div class="flex basis-90" id="product-img">
                <div class="self-center" id="img-section">
                  <a
                    href="https://www.ebay.com/itm/167340334750?_skw=twins+boxing+gloves&itmmeta=01JRKRFA4SDTY5XQ6GEBPWWH2Y&hash=item26f642de9e:g:pPIAAOSwo2xnviPs&itmprp=enc%3AAQAKAAAA8FkggFvd1GGDu0w3yXCmi1fpCh%2BV51INqJP9%2B42RZUXRjGvn6OrKU7aOvm1uiaAYXcGx4RGEX2y0gs%2BwK7%2FgjapuSsvI5d8A3LK5HM550Zfeiz0%2F82JMFXoDdZSseF3Ps%2BC%2FdshmjVTOYSGjTZJ3Dzz9CDpg7o3rIfjzd5fpE9iHMm5fqw%2FG3L0RHK8bQu2jQ5SkNF15lrMdqj9OGwzeu3w1i8jp4%2BIQ2N%2FL6xRmZ%2B8cRGxKKLKaQRvicl%2BMtXPezv6xhaowMXr9wJhoCW8f0iY0Lf8nb8%2Bd6TdJMfXZzs9U51NfRgOSkkoBu0S4vqBW%2Fg%3D%3D%7Ctkp%3ABFBMxqK9-MRl"
                    class="self-center"
                  >
                    <img
                      src={product.image}
                      width="200px"
                      height="200px"
                      alt="Product image"
                    />
                  </a>
                </div>
              </div>
              <div class="self-center basis-90 text-center  pl-5" id="store">
                <img
                  src="/src/assets/ebay.png"
                  alt="store-logo"
                  width="200px"
                  height="200px"
                />
              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}

// function ProductResults({ productList }) {
//   return (
//     <>
//       {/* <div id="results" class="flex justify-center flex flex-row ..."> */}
//       {/* {
//         productList.length > 0 ? (
//           productList.map((product) => (
//             <div
//               id="results"
//               class="flex justify-evenly  flex-row mt-30"
//               key={product.product}
//             >
//               <div>
//                 <h1>{product.product}</h1>
//               </div>
//               <div>
//                 <h1>{product.price}</h1>
//               </div>
//               <div>
//                 <img src={product.image} />
//               </div>
//             </div>
//           ))
//         ) : (
//           <p></p>
//         ) */}

//       {/* </div> */}
//     </>
//   );
// }

// src="	https://i.ebayimg.com/images/g/2SsAAeSwcqxn7Kws/s-l500.webp"

// href="https://www.ebay.com/itm/396391700601?_skw=twins+boxing+gloves&itmmeta=01JRKRFA4SW7A9GXW229F7PKNT&hash=item5c4ac95879:g:2SsAAeSwcqxn7Kws&itmprp=enc%3AAQAKAAAA8FkggFvd1GGDu0w3yXCmi1cFYKH21%2FYCRtZZ3xTM1XY3HZGlazPzsrOpB9RX%2BdnMZrgtgLyHDpY5jJ3j01PQQDZWJ3uw%2B7lAM8slVqWx2Wp7n%2FKusOaPEXVhEw3IHY5DQsG1dWmKCiCPNWTsr6XJZQTinjo1f7KsO3PmB7IKjtG1aby3dyLPzgo4iu6ADCcaxCa6XXKGqw%2Bv%2BD3UnohP%2FBcUAnkRTZf6YS3V8rdgP4UfV4wzBED43Lx9ylSjEtfxV93156WFahYErWrZkzp%2BTZpj43l%2BOtMfBDgLDaF%2B9ow7%2BXV5f2Pggsdg3MQg93s7AQ%3D%3D%7Ctkp%3ABFBMxqK9-MRl"
