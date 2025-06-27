from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def login(driver, email="juanperez@ejemplo.com", password="Test1234"):
    print("🔐 Iniciando sesión...")

    correo_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.NAME, "correo"))
    )
    correo_input.clear()
    correo_input.send_keys(email)

    password_input = driver.find_element(By.NAME, "contrasena")
    password_input.clear()
    password_input.send_keys(password)

    boton_entrar = driver.find_element(By.CLASS_NAME, "auth-btn")
    boton_entrar.click()

    print("✅ Login completado.")
