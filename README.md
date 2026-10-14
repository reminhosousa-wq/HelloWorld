# ☕ Café & Prosa — Cafeteria Artesanal

Seja bem-vindo ao projeto **Café & Prosa**! Este é um site institucional completo (landing page) desenvolvido especialmente para uma cafeteria artesanal fictícia focada em grãos nobres, confeitaria afetuosa de fermentação natural e momentos agradáveis de conversa.

O projeto foi construído pensando na **clareza do código**, para que qualquer pessoa (mesmo iniciante em programação web) consiga entender, modificar textos, alterar preços e customizar as cores com facilidade.

---

## 📋 Resumo dos Critérios de Aceite Atendidos

| Critério de Aceite | Status | Onde Encontrar no Código |
| :--- | :---: | :--- |
| **Layout Responsivo** | ✅ Concluído | `styles.css` (Media Queries para desktops, tablets e smartphones) |
| **Menu Funcional** | ✅ Concluído | Links com âncoras (`#sobre`, `#cardapio`, `#horarios`, `#contato`) e menu hambúrguer interativo no celular (`script.js`) |
| **Hero com CTA** | ✅ Concluído | Título de impacto, fotos aconchegantes e botão "Ver Cardápio" com rolagem suave |
| **Sobre Nós** | ✅ Concluído | 2 parágrafos contando a história e imagens em alta resolução do barista e do ambiente |
| **Cardápio Completo** | ✅ Concluído | 9 itens divididos em 3 categorias, com Nome, Descrição e Preço em R$, com destaques de "Mais Pedido" e "Recomendação do Barista/Chef" |
| **Horários & Mapa** | ✅ Concluído | Terça a Domingo (08h às 20h), endereço completo e Google Maps incorporado com iframe |
| **Formulário de Contato** | ✅ Concluído | Campos obrigatórios (Nome, E-mail/Telefone, Mensagem), validação que bloqueia campos vazios e alerta de envio |
| **Rodapé** | ✅ Concluído | Redes sociais (Instagram, WhatsApp, Facebook) e copyright `© 2026 Café & Prosa` |
| **Identidade Visual** | ✅ Concluído | Paleta com tons de marrom café, caramelo, creme e verde-oliva elegante |

---

## 📁 Estrutura de Arquivos do Projeto

```text
slakrai/
│
├── index.html           # Estrutura e conteúdo semântico do site (HTML5)
├── styles.css           # Estilos visuais, cores, tipografia e responsividade (CSS3)
├── script.js            # Interatividades: menu mobile, filtro do cardápio e validação (JavaScript)
├── README.md            # Documentação e guia didático do projeto
└── assets/
    └── images/          # Imagens em alta resolução da cafeteria
        ├── hero.jpg     # Foto principal da xícara com grãos
        ├── barista.jpg  # Barista preparando café filtrado no V60
        ├── pastries.jpg # Croissants e doces artesanais da vitrine
        └── interior.jpg # Vista aconchegante do espaço interno com livros
```

---

## 🚀 Como Executar o Projeto Localmente

Você tem duas opções simples para ver o site funcionando no seu computador:

### Opção 1: Abrir diretamente no Navegador
Basta dar um duplo clique no arquivo `index.html` ou arrastá-lo para dentro do Google Chrome, Firefox ou Edge.

### Opção 2: Usar um Servidor Local (Recomendado)
Se tiver o Python instalado:
```bash
python3 -m http.server 8080
```
Depois, abra o seu navegador e acesse: **`http://localhost:8080`**.

---

## 🛠️ Guia Rápido para Iniciantes: Como Editar o Site

### 1. Como alterar as cores do site
Abra o arquivo `styles.css`. Logo nas primeiras linhas você encontrará o bloco `:root`:
```css
:root {
  --color-roast-dark: #1b120c;   /* Cor marrom escura */
  --color-caramel: #c68a4c;      /* Cor caramelo dos botões e destaques */
  --color-cream-bg: #faf6f0;     /* Cor creme de fundo */
}
```
Basta trocar esses códigos de cor e todo o site mudará automaticamente!

### 2. Como adicionar ou editar um item no Cardápio
No arquivo `index.html`, procure pela seção `<!-- 4. SEÇÃO "CARDÁPIO" -->`. Cada item é um bloco `<article class="menu-card">`:
```html
<article class="menu-card" data-category="quentes">
  <div class="menu-card-header">
    <h3 class="menu-item-title">Nome do Café</h3>
    <span class="menu-item-price">R$ 15,00</span>
  </div>
  <p class="menu-item-desc">Descrição curta dos ingredientes ou modo de preparo.</p>
  ...
</article>
```
Para adicionar um novo item, copie um desses blocos, altere os textos e cole na grade do cardápio!

### 3. Como alterar o horário ou telefone
No `index.html`, procure por `id="horarios"` para mudar os dias da semana, horários ou o endereço. Em `id="contato"`, você pode atualizar o número do WhatsApp e o e-mail de contato.

---

## 🌐 Tecnologias Utilizadas
* **HTML5:** Estruturação semântica e acessível (com atributos ARIA).
* **CSS3:** Flexbox, CSS Grid, Variáveis CSS nativas e Media Queries para responsividade total.
* **JavaScript Puro (Vanilla JS):** Sem dependências pesadas, garantindo carregamento ultrarrápido.
* **Google Fonts:** Fontes *Playfair Display* e *Plus Jakarta Sans*.

---

*Desenvolvido com carinho para o projeto Café & Prosa — 2026.*
