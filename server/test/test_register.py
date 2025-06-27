from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium_utils import mk_driver, wd_page
import time



def click_conectate(driver):
    try:
        # Espera al botón con clase específica del <a>
        boton = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "_signupBtn_1u4aa_205"))
        )
        boton.click()
        print("Clic en Conéctate exitoso.")
    except Exception as e:
        print(f"Error al hacer clic en el botón de registro: {e}")


def click_registrate(driver):
    try:
        # Espera al botón con clase específica del <a>
        boton = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "auth-link"))
        )
        boton.click()
        print("Clic en Regístrate exitoso.")
    except Exception as e:
        print(f"Error al hacer clic en el botón de registro: {e}")
        
        
        
def fill_register_form(driver):
    campos = {
        "nombre": "Juan",
        "apellido": "Pérez",
        "correo": "juanperez@ejemplo.com",
        "contrasena": "Test1234",
        "confirmarContrasena": "Test1234"
    }

    for name, valor in campos.items():
        input_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, name))
        )
        input_box.clear()
        input_box.send_keys(valor)

    # Hacer clic en el checkbox (usamos el label asociado)
    checkbox = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "label.auth-checkbox-label"))
    )
    checkbox.click()

    # Finalmente, enviar el formulario
    boton_crear = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "button.auth-btn"))
    )
    boton_crear.click()
    print("Formulario enviado")
# 🚀 Flujo principal
driver = mk_driver()
wd_page(driver)
click_conectate(driver)
click_registrate(driver)
fill_register_form(driver)