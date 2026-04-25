from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import time
import os

# TELA DE CADASTRO DE USUÁRIO

# variável da url
caminho_html_usuario = 'C:/Users/Aluno/Downloads/Sistema_de_Biblioteca-main/Sistema_de_Biblioteca-main/frontend/cadastroUsuarios.html'
caminho_html_editora = 'C:/Users/Aluno/Downloads/Sistema_de_Biblioteca-main/Sistema_de_Biblioteca-main/frontend/cadastroEditoras.html'
caminho_html_index = 'C:/Users/Aluno/Downloads/Sistema_de_Biblioteca-main/Sistema_de_Biblioteca-main/frontend/index.html'
caminho_html_emprestimo = 'C:/Users/Aluno/Downloads/Sistema_de_Biblioteca-main/Sistema_de_Biblioteca-main/frontend/emprestimoLivros.html'


#injeta o drive do selenium no chrome
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

#pega a url sugerida
driver.get(caminho_html_usuario)
print("Tela de registro de usuarios aberta.")

#aumenta a tela no navegador
driver.maximize_window()

#tempo de espera
time.sleep(2)

#clica no botao de registrar usuario
abrirModal = driver.find_element(By.ID, "abrirModal").click()
print("Botão registrar usuário clicado.")

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
print("Usuário registrado.")

#tempo de espera
time.sleep(5)



# TELA DE CADASTRO DE EDITORAS

driver.get(caminho_html_editora)
print("Tela de registro de editoras aberta.")
time.sleep(5)
#clica no botao de registrar usuario
abrirModalEditora = driver.find_element(By.ID, "abrirModal").click()
print("Botão registrar editora clicado.")

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
      "isbnEditora": "978-85-01",
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
print("Editora registrada.")
time.sleep(5) 

# TELA DE REGISTRO DE LIVROS
driver.get(caminho_html_index) # Abre a tela do index
time.sleep(5) 

# clica no botao para abrir o modal de registro de livro
abrirModalIndex = driver.find_element(By.ID, "botao-registrar-livro").click()
print("Botão registrar livro clicado.")
time.sleep(5)

# Variáveis do modal (Mapeando os IDs do seu HTML)
isbnIndex = driver.find_element(By.ID, "isbnLivro")
anoPublicacaoIndex = driver.find_element(By.ID, "anoLivro")
tituloLivroIndex = driver.find_element(By.ID, "tituloLivro")
paginaLivroIndex = driver.find_element(By.ID, "paginasLivro")
autorLivroIndex = driver.find_element(By.ID, "autorLivro")
numeroExemplareIndex = driver.find_element(By.ID, "exemplaresLivro")
sinopseLivroIndex = driver.find_element(By.ID, "sinopseLivro")


registroLivro = [
    { 
      "isbnIndex": "978-85-01-11553-9",
      "anoPublicacaoIndex": "01012005", 
      "tituloLivroIndex": "Socorro",
      "editora": "Outra", 
      "paginaLivroIndex": "300",
      "autorLivroIndex": "Estudante",
      "numeroExemplareIndex": "12",
      "sinopseLivroIndex": "Alunos desesperados e sofrendo pela vida acadêmica"
    }
]

# adicioando valores aos inputs do modal seguindo o SEU padrão FOR
for livro in registroLivro:

    isbnIndex.send_keys(livro["isbnIndex"])
    time.sleep(5)
    
    anoPublicacaoIndex.send_keys(livro["anoPublicacaoIndex"])
    time.sleep(5)
    
    tituloLivroIndex.send_keys(livro["tituloLivroIndex"])
    time.sleep(5)

    select_editora = Select(driver.find_element(By.ID, "editoraLivro"))
    try:
        select_editora.select_by_visible_text(livro["editora"])
    except:
        select_editora.select_by_index(1)
    
    paginaLivroIndex.send_keys(livro["paginaLivroIndex"])
    time.sleep(5)
    autorLivroIndex.send_keys(livro["autorLivroIndex"])
    time.sleep(5)
    numeroExemplareIndex.send_keys(livro["numeroExemplareIndex"])
    time.sleep(5)
    sinopseLivroIndex.send_keys(livro["sinopseLivroIndex"])
    time.sleep(5)

    
    driver.find_element(By.ID, "botao-registrar-livro2").click()
    print("Livro registrado.")
    time.sleep(2)

     #TELA DE EMPRESTIMO

driver.get(caminho_html_emprestimo)
print("Tela de registro de empréstimos aberta.")
time.sleep(2)

#clica no botao de registrar emprestimo
abrirModalEmprestimo = driver.find_element(By.ID, "abrir-modal-emprestimo").click()
print("Botão registrar novo empréstimo clicado.")

#Variáveis do modal:

quantidadeLivros = driver.find_element(By.ID, "quantidade")
tituloLivro = driver.find_element(By.ID, "inputLivro")
usuarioCadastrado = driver.find_element(By.ID, "inputUsuario")



registroEmprestimo = [
    { 
      "quantidadeLivros": 2

    }
]

for emprestimo in registroEmprestimo:

    # XPath descreve o caminho ou os atributos de um elemento para encontrá-lo, mesmo que ele não tenha um nome próprio.
    opcaoTitulo = driver.find_element(By.XPATH, "//datalist[@id='listaLivros']/option[last()]")
    # procura o datalist, pelo id listaUaUsuarios, pega option e o last() pega o ultimo valor
    valorLivro = opcaoTitulo.get_attribute("value") # pega o valor da opcao e salva nessa var

    driver.find_element(By.ID, "inputLivro").send_keys(valorLivro)

    time.sleep(2)

    opcaoUsuario = driver.find_element(By.XPATH, "//datalist[@id='listaUsuarios']/option[last()]")
    valorUsuario = opcaoUsuario.get_attribute("value")

    driver.find_element(By.ID, "inputUsuario").send_keys(valorUsuario)

    time.sleep(2)

    quantidadeLivros.send_keys(emprestimo["quantidadeLivros"])
    time.sleep(5)

    driver.find_element(By.ID, "botao-registrar-emprestimo").click()
    print("Empréstimo registrado.")
    time.sleep(3)


    print("O teste terminou sem problemas!")
    driver.quit()
    # driver.quit() -> para a tela não fechar rápido