from scraping.check_search import SearchProducts, Products
import asyncio
from playwright.async_api import async_playwright, Playwright
from dotenv import load_dotenv
import os
load_dotenv()

async def check(playwright: Playwright, product):
    
    proxies ={
        "server": os.getenv("SERVER"),
        "username": os.getenv("USERNAME"),
        "password": os.getenv("PASS")
    }
    chrome = await playwright.chromium.launch(
    headless= False,
    slow_mo=5000,
    proxy=proxies
    )
    # chrome = await playwright.chromium.launch(headless=False,slow_mo=5000)

    # browser = await playwright.chromium.connect_over_cdp(SBR_WS_CDP)

    

    context = await chrome.new_context(
    ignore_https_errors=True,
    user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36',
    locale='en-US',
    timezone_id='America/New_York',
    viewport={'width': 1280, 'height': 800}
    )

    page = await context.new_page()

    # await page.goto("https://ipinfo.io/json", wait_until="domcontentloaded")
    # content = await page.locator("body").inner_text() get IP address
    # print(content)
    # await page.wait_for_timeout(10000)  # gives you time to observe 

    search_page = SearchProducts(page)


    
    await search_page.navigate()
  # 10 seconds

    # await context.storage_state(path="auth.json")
    # product = input("Enter product ")
    
    await search_page.search(product)
    products_url = Products(search_page.page)
    return await products_url.get_products()
# async def get_products(playwright: Playwright):


async def main(product):
    async with async_playwright() as playwright:
        return await check(playwright, product)
      
    #    print()
