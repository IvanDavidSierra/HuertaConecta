# main_test.py

from selenium_utils import mk_driver, wd_page
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# 🔹 Paso 1: Función para hacer clic en "Conéctate"
def click_conectate(driver):
    boton = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CLASS_NAME, "_signupBtn_1u4aa_205"))
    )
    boton.click()
    print("✅ Clic en 'Conéctate'")

# 🔹 Paso 2: Clic en "Regístrate"
def click_registrate(driver):
    boton = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CLASS_NAME, "auth-link"))
    )
    boton.click()
    print("✅ Clic en 'Regístrate'")

# 🔹 Paso 3: Llenar el formulario de registro
def fill_register_form(driver):
    campos = {
        "nombre": "Juana",
        "apellido": "Péreza",
        "correo": "juanapereza@ejempla.com",
        "contrasena": "Testa12345",
        "confirmarContrasena": "Testa12345"
    }

    for name, valor in campos.items():
        input_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, name))
        )
        input_box.clear()
        input_box.send_keys(valor)

    # Checkbox
    checkbox = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "label.auth-checkbox-label"))
    )
    checkbox.click()

    # Botón crear cuenta
    boton_crear = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "button.auth-btn"))
    )
    boton_crear.click()
    print("✅ Usuario registrado")

# 🔹 Paso 4: Login
def login(driver, email="juanapereza@ejempla.com", password="Testa12345"):
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
    print("✅ Login completado")

# 🔹 Paso 5: Crear huerta
def crear_huerta(driver):
    btn_crear_huerta = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CLASS_NAME, "create-huerta-btn"))
    )
    btn_crear_huerta.click()

    campos = {
        "input.modal-input[placeholder*='Huerta Orgánica']": "Huerta Selenium Completa",
        "textarea.modal-input": "Automatizada desde main_test.py",
        "input.modal-input[placeholder*='Calle 123']": "Cra 10 #20-30, Bogotá"
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
    print("✅ Huerta creada desde flujo completo")

driver = mk_driver()
wd_page(driver, "/")             # Ir al home
click_conectate(driver)          # Ir a login
click_registrate(driver)         # Ir a registro
fill_register_form(driver)       # Crear usuario

# Esperar redirección al login (opcional)
WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.NAME, "correo"))
)

login(driver)                    # Login con usuario creado
crear_huerta(driver)             # Crear huerta
