from selenium import webdriver
from selenium.webdriver.edge.service import Service as EdgeService

def mk_driver():
    options = webdriver.EdgeOptions()
    options.add_experimental_option("detach", True)
    options.add_argument("--start-maximized")
    return webdriver.Edge(options=options, service=EdgeService())

def wd_page(driver, path="/"):
    driver.get(f"http://localhost:5173{path}")
    print(f"🌐 Página abierta: {path}")
