from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time
import os

# TELA DE CADASTRO DE USUÁRIO

# variável da url
caminho_html_usuario = 'C:/Users/Aluno/Downloads/Sistema_de_Biblioteca-main/Sistema_de_Biblioteca-main/frontend/cadastroUsuarios.html'
caminho_html_editora = 'C:/Users/Aluno/Downloads/Sistema_de_Biblioteca-main/Sistema_de_Biblioteca-main/frontend/cadastroEditoras.html'

#injeta o drive do selenium no chrome
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

#pega a url sugerida
driver.get(caminho_html_usuario)

#aumenta a tela no navegador
driver.maximize_window()

#tempo de espera
time.sleep(2)

#clica no botao de registrar usuario
abrirModal = driver.find_element(By.ID, "abrirModal").click()

#tempo de espera
time.sleep(3)

#Variáveis do modal:
nomeUsuario = driver.find_element(By.ID, "nomeUsuario")

matricula = driver.find_element(By.ID, "matriculaUsuario")

curso = driver.find_element(By.ID, "cursoUsuario")

telefone = driver.find_element(By.ID, "telefoneUsuario")

#exemplo de teste de usuário
usuarios = [
    { 
      "nomeUsuario": "sfdstf",
      "matricula": "123456", 
      "curso": "ADS",
      "telefone": 995047174
    },
    {
      "nomeUsuario": "Maria",
      "matricula": "12354456", 
      "curso": "ADS",
      "telefone": 995047236
    }  
]

contador = 0

# adicioando valores aos inputs do modal
for usuario in usuarios:

    nomeUsuario.send_keys(usuario["nomeUsuario"])
    time.sleep(2)
    
    matricula.send_keys(usuario["matricula"])
    time.sleep(2)
    
    curso.send_keys(usuario["curso"])
    time.sleep(2)
    
    telefone.send_keys(usuario["telefone"])
    time.sleep(5)


    if contador == 0:
        nomeUsuario.clear()
        matricula.clear()
        curso.clear()
        telefone.clear()
        contador = contador + 1

# click do registrar usuário
registrarUsuario = driver.find_element(By.ID, "botao-registrar").click()

#tempo de espera
time.sleep(5)



# TELA DE CADASTRO DE EDITORAS

driver.get(caminho_html_editora)
time.sleep(5)
#clica no botao de registrar usuario
abrirModalEditora = driver.find_element(By.ID, "abrirModal").click()

#Variáveis do modal:
nomeEditora = driver.find_element(By.ID, "nomeEditora")

cnpjEditora = driver.find_element(By.ID, "CNPJEditora")

isbnEditora = driver.find_element(By.ID, "ISBNEditora")

telefoneEditora = driver.find_element(By.ID, "telefoneEditora")

emailEditora = driver.find_element(By.ID, "EmailEditora")

#exemplo de teste de editor
editoras = [
    { 
      "nomeEditora": "Galera",
      "cnpjEditora": "156988745", 
      "isbnEditora": "ksgvbuj024562",
      "telefoneEditora": 995047174,
      "emailEditora": "editora.oficial@gmail.com"
    }
]

# adicioando valores aos inputs do modal
for editora in editoras:

    nomeEditora.send_keys(editora["nomeEditora"])
    time.sleep(2)
    
    cnpjEditora.send_keys(editora["cnpjEditora"])
    time.sleep(2)
    
    isbnEditora.send_keys(editora["isbnEditora"])
    time.sleep(2)
    
    telefoneEditora.send_keys(editora["telefoneEditora"])
    time.sleep(5)
    
    emailEditora.send_keys(editora["emailEditora"])
    time.sleep(5)

registrarEditora = driver.find_element(By.ID, "botao-registrar").click()

time.sleep(5)
#fechar a tela
driver.quit()