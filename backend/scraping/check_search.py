

class SearchProducts:
    def __init__(self, page):
        self.page = page
        self.search_term_input = page.locator('[aria-label="Search for anything"]')

    async def navigate(self):
        await self.page.goto("https://www.ebay.com/", wait_until="domcontentloaded",timeout=30000)
        

    async def search(self, text):
        
        await self.search_term_input.fill(text)
        await self.page.locator('#gh-search-btn').click()
        await self.page.wait_for_timeout(60000) 

        return self.page.url

# id = "gh-search-btn" Button 
class Products:
    def __init__(self, page):
         self.page = page
         self.price = page.locator('[class*="s-item__price"]')
         self.product =  page.locator('[aria-level="3"]')
         self.image = page.locator('div[class*="s-item__image-wrapper"] img')
         
        #  self.to_product = 
         self.products = []

    async def get_products(self):

        rows = self.page.get_by_role("listitem")
        count = await rows.count()
        for i in range(2,min(count, 12)):
         
            try:
                product = await self.product.nth(i).inner_text()
                price = await self.price.nth(i).inner_text()
                image = await self.image.nth(i).get_attribute("src")
                await self.products.append({"product" : product, "price": price, "image": image})
                print(f"{product}, {price}, {image}")
            except Exception as e:
                print(f"Skipped index {i} due to error: {e}")
        return self.products

            
        #     products.append({"product": product, "price": price})
        # return products
        # count = await rows.count()
        # num = rows.nth(10)
        # for i in range(2,num):
        #     # row = rows.nth(i)
            
                
        #     product = await self.product.nth(i).inner_text()
        #     price = await self.price.nth(i).inner_text()
        #         # product = await row.self.product.inner_text()
        #         # price = await row.self.price.inner_text()

        #     print(product + ": " + price)
           
        #     await self.page.wait_for_timeout(2000) 
            



        
         