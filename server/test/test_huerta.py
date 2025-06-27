# test_huerta.py
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium_utils import mk_driver, wd_page
from test_login import login

def crear_huerta(driver):
    print("🌱 Creando huerta...")

    btn_crear_huerta = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CLASS_NAME, "create-huerta-btn"))
    )
    btn_crear_huerta.click()

    campos = {
        "input.modal-input[placeholder*='Huerta Orgánica']": "Huerta de prueba",
        "textarea.modal-input": "Esta es una huerta automatizada con Selenium.",
        "input.modal-input[placeholder*='Calle 123']": "Carrera 45 #10-25, Bogotá"
    }

    for selector, valor in campos.items():
        campo = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, selector))
        )
        campo.clear()
        campo.send_keys(valor)

    boton_crear = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CLASS_NAME, "modal-save-btn"))
    )
    boton_crear.click()

    print("✅ Huerta creada correctamente.")

# 🚀 FLUJO COMPLETO
driver = mk_driver()

# 🔹 Paso 1: Ir directamente al login
wd_page(driver, "/auth")

# 🔹 Paso 2: Login (asegúrate que el usuario ya exista)
login(driver)

# 🔹 Paso 3: Crear huerta
crear_huerta(driver)

