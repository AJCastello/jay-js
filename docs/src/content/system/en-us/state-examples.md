---
category: State
categoryId: 2
articleId: 8
slug: state-examples
title: Exemplos Práticos
description: Exemplos de uso real do sistema de gerenciamento de estado para ajudar você a entender como aplicar esses conceitos em seus projetos.
---

# Exemplos Práticos

Esta seção apresenta exemplos de uso real do sistema de gerenciamento de estado do `@jay-js/system`. Estes exemplos demonstram como combinar as diferentes funcionalidades para criar aplicações reativas poderosas.

## Exemplo 1: Todo List

Este exemplo mostra uma implementação completa de uma aplicação de lista de tarefas:

```typescript
import { State, Derived, Effect, Values } from '@jay-js/system';

// ==================== DEFINIÇÃO DOS TIPOS ====================
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// ==================== ESTADOS ====================
// Estado persistente para salvar todos no localStorage
const todos = PersistentState<Todo[]>('todo-app-todos', []);

// Estado para o filtro atual
const filter = State<'all' | 'active' | 'completed'>('all');

// Estado para o novo texto da tarefa
const newTodoText = State('');

// ==================== ESTADOS DERIVADOS ====================
// Tarefas filtradas com base no filtro selecionado
const filteredTodos = Derived(() => {
  const currentFilter = filter.value;
  const allTodos = todos.value;
  
  if (currentFilter === 'all') {
    return allTodos;
  }
  
  return allTodos.filter(todo => 
    currentFilter === 'completed' ? todo.completed : !todo.completed
  );
});

// Estatísticas das tarefas
const stats = Derived(() => {
  const allTodos = todos.value;
  const total = allTodos.length;
  const completed = allTodos.filter(t => t.completed).length;
  const active = total - completed;
  
  return { total, completed, active };
});

// ==================== FUNÇÕES PARA MANIPULAÇÃO DE TODOS ====================
// Adicionar uma nova tarefa
function addTodo() {
  const text = newTodoText.value.trim();
  if (!text) return;
  
  todos.set(current => [
    ...current,
    {
      id: Date.now(),
      text,
      completed: false
    }
  ]);
  
  // Limpa o input
  newTodoText.set('');
}

// Toggle do estado de completude
function toggleTodo(id: number) {
  todos.set(current =>
    current.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
}

// Remover uma tarefa
function removeTodo(id: number) {
  todos.set(current => current.filter(todo => todo.id !== id));
}

// Marcar todas como completas/incompletas
function toggleAll() {
  const allCompleted = todos.value.every(todo => todo.completed);
  
  todos.set(current =>
    current.map(todo => ({ ...todo, completed: !allCompleted }))
  );
}

// Limpar tarefas completas
function clearCompleted() {
  todos.set(current => current.filter(todo => !todo.completed));
}

// ==================== RENDERIZAÇÃO DA UI ====================
// Estas funções seriam substituídas pela sua biblioteca/framework de UI
function renderApp() {
  renderNewTodoInput();
  renderTodoList();
  renderFooter();
}

// Efeito para atualizar o input quando o texto muda
Effect(() => {
  const inputEl = document.getElementById('new-todo') as HTMLInputElement;
  if (inputEl) {
    inputEl.value = newTodoText.value;
  }
});

// Efeito para renderizar a lista de tarefas quando filteredTodos muda
Effect(() => {
  const todoList = document.getElementById('todo-list');
  if (!todoList) return;
  
  const currentTodos = filteredTodos.value;
  
  // Limpa a lista atual
  todoList.innerHTML = '';
  
  // Adiciona cada item
  currentTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));
    
    const label = document.createElement('label');
    label.textContent = todo.text;
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'destroy';
    deleteButton.addEventListener('click', () => removeTodo(todo.id));
    
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
});

// Efeito para atualizar o footer com estatísticas
Effect(() => {
  const footer = document.getElementById('footer');
  if (!footer) return;
  
  const currentStats = stats.value;
  const currentFilter = filter.value;
  
  // Atualiza contador de itens
  const count = document.getElementById('todo-count');
  if (count) {
    count.textContent = `${currentStats.active} item${currentStats.active !== 1 ? 's' : ''} left`;
  }
  
  // Atualiza filtros
  const filters = footer.querySelectorAll('.filters a');
  filters.forEach(filterEl => {
    const el = filterEl as HTMLElement;
    const filterType = el.dataset.filter as 'all' | 'active' | 'completed';
    
    el.classList.toggle('selected', filterType === currentFilter);
    el.addEventListener('click', (e) => {
      e.preventDefault();
      filter.set(filterType);
    });
  });
  
  // Mostra/esconde botão "Clear completed"
  const clearButton = document.getElementById('clear-completed');
  if (clearButton) {
    clearButton.style.display = currentStats.completed > 0 ? 'block' : 'none';
    clearButton.addEventListener('click', clearCompleted);
  }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Adiciona event listeners
  const newTodoInput = document.getElementById('new-todo');
  if (newTodoInput) {
    newTodoInput.addEventListener('input', (e) => {
      newTodoText.set((e.target as HTMLInputElement).value);
    });
    
    newTodoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addTodo();
      }
    });
  }
  
  // Renderiza a aplicação inicial
  renderApp();
});
```

## Exemplo 2: Aplicação de E-commerce

Este exemplo demonstra como usar o sistema de estado em uma aplicação de e-commerce:

```typescript
import { State, PersistentState, Derived, Effect, Values } from '@jay-js/system';

// ==================== DEFINIÇÃO DOS TIPOS ====================
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

interface CartItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
}

// ==================== ESTADOS ====================
// Catálogo de produtos (normalmente viria de uma API)
const products = State<Product[]>([
  { id: 1, name: 'Smartphone', price: 699, category: 'electronics', imageUrl: '/images/phone.jpg' },
  { id: 2, name: 'Laptop', price: 1299, category: 'electronics', imageUrl: '/images/laptop.jpg' },
  { id: 3, name: 'Headphones', price: 99, category: 'accessories', imageUrl: '/images/headphones.jpg' },
  { id: 4, name: 'T-shirt', price: 19.99, category: 'clothing', imageUrl: '/images/tshirt.jpg' },
  { id: 5, name: 'Jeans', price: 49.99, category: 'clothing', imageUrl: '/images/jeans.jpg' },
]);

// Estado persistente do carrinho de compras
const cart = PersistentState<CartItem[]>('shopping-cart', []);

// Filtro de categoria atual
const categoryFilter = State<string>('all');

// Estado da interface
const isCartOpen = State<boolean>(false);
const searchQuery = State<string>('');
const isLoading = State<boolean>(false);

// ==================== ESTADOS DERIVADOS ====================
// Produtos filtrados
const filteredProducts = Derived(() => {
  let result = [...products.value];
  
  // Filtra por categoria
  if (categoryFilter.value !== 'all') {
    result = result.filter(product => product.category === categoryFilter.value);
  }
  
  // Filtra por busca
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }
  
  return result;
});

// Estatísticas do carrinho
const cartStats = Derived(() => {
  const items = cart.value;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% de imposto
  const shipping = subtotal > 100 ? 0 : 10; // Frete grátis acima de $100
  const total = subtotal + tax + shipping;
  
  return {
    totalItems,
    subtotal,
    tax,
    shipping,
    total
  };
});

// ==================== FUNÇÕES DO CARRINHO ====================
// Adicionar produto ao carrinho
function addToCart(product: Product, quantity: number = 1) {
  cart.set(current => {
    // Verifica se o produto já está no carrinho
    const existingItem = current.find(item => item.productId === product.id);
    
    if (existingItem) {
      // Atualiza a quantidade
      return current.map(item => 
        item.productId === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Adiciona novo item
      return [...current, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity
      }];
    }
  });
  
  // Mostra o carrinho
  isCartOpen.set(true);
}

// Remover item do carrinho
function removeFromCart(productId: number) {
  cart.set(current => current.filter(item => item.productId !== productId));
}

// Atualizar quantidade
function updateQuantity(productId: number, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  cart.set(current => 
    current.map(item => 
      item.productId === productId
        ? { ...item, quantity }
        : item
    )
  );
}

// Limpar carrinho
function clearCart() {
  cart.set([]);
}

// ==================== EFEITOS DE UI ====================
// Atualiza o contador do carrinho
Effect(() => {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  
  const count = cartStats.value.totalItems;
  
  badge.textContent = count > 0 ? count.toString() : '';
  badge.style.display = count > 0 ? 'block' : 'none';
});

// Atualiza a visibilidade do painel do carrinho
Effect(() => {
  const cartPanel = document.getElementById('cart-panel');
  if (!cartPanel) return;
  
  cartPanel.classList.toggle('open', isCartOpen.value);
});

// Renderiza lista de produtos
Effect(() => {
  const productsContainer = document.getElementById('products-list');
  if (!productsContainer) return;
  
  // Mostra indicador de carregamento
  if (isLoading.value) {
    productsContainer.innerHTML = '<div class="loading">Loading products...</div>';
    return;
  }
  
  const currentProducts = filteredProducts.value;
  
  if (currentProducts.length === 0) {
    productsContainer.innerHTML = '<div class="no-results">No products found</div>';
    return;
  }
  
  // Renderiza produtos
  productsContainer.innerHTML = currentProducts.map(product => `
    <div class="product-card" data-id="${product.id}">
      <img src="${product.imageUrl}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">$${product.price.toFixed(2)}</p>
      <button class="add-to-cart">Add to Cart</button>
    </div>
  `).join('');
  
  // Adiciona event listeners
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const card = (e.target as HTMLElement).closest('.product-card');
      const productId = parseInt(card.dataset.id);
      const product = products.value.find(p => p.id === productId);
      
      if (product) {
        addToCart(product);
      }
    });
  });
});

// Renderiza itens do carrinho
Effect(() => {
  const cartItems = document.getElementById('cart-items');
  if (!cartItems) return;
  
  const items = cart.value;
  
  if (items.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    return;
  }
  
  cartItems.innerHTML = items.map(item => `
    <div class="cart-item">
      <div class="item-name">${item.name}</div>
      <div class="item-price">$${item.price.toFixed(2)}</div>
      <div class="item-quantity">
        <button class="decrement" data-id="${item.productId}">-</button>
        <span>${item.quantity}</span>
        <button class="increment" data-id="${item.productId}">+</button>
      </div>
      <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
      <button class="remove-item" data-id="${item.productId}">×</button>
    </div>
  `).join('');
  
  // Adiciona event listeners
  document.querySelectorAll('.decrement').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = parseInt((e.target as HTMLElement).dataset.id);
      const item = cart.value.find(i => i.productId === productId);
      if (item) {
        updateQuantity(productId, item.quantity - 1);
      }
    });
  });
  
  document.querySelectorAll('.increment').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = parseInt((e.target as HTMLElement).dataset.id);
      const item = cart.value.find(i => i.productId === productId);
      if (item) {
        updateQuantity(productId, item.quantity + 1);
      }
    });
  });
  
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = parseInt((e.target as HTMLElement).dataset.id);
      removeFromCart(productId);
    });
  });
});

// Renderiza resumo do carrinho
Effect(() => {
  const cartSummary = document.getElementById('cart-summary');
  if (!cartSummary) return;
  
  const stats = cartStats.value;
  
  cartSummary.innerHTML = `
    <div class="summary-line">
      <span>Subtotal:</span>
      <span>$${stats.subtotal.toFixed(2)}</span>
    </div>
    <div class="summary-line">
      <span>Tax:</span>
      <span>$${stats.tax.toFixed(2)}</span>
    </div>
    <div class="summary-line">
      <span>Shipping:</span>
      <span>${stats.shipping === 0 ? 'Free' : '$' + stats.shipping.toFixed(2)}</span>
    </div>
    <div class="summary-line total">
      <span>Total:</span>
      <span>$${stats.total.toFixed(2)}</span>
    </div>
    <button id="checkout-button" ${stats.totalItems === 0 ? 'disabled' : ''}>
      Checkout
    </button>
    <button id="clear-cart" ${stats.totalItems === 0 ? 'disabled' : ''}>
      Clear Cart
    </button>
  `;
  
  // Adiciona event listeners
  const checkoutButton = document.getElementById('checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      // Normalmente iria para uma página de checkout
      alert(`Proceeding to checkout. Total: $${stats.total.toFixed(2)}`);
    });
  }
  
  const clearButton = document.getElementById('clear-cart');
  if (clearButton) {
    clearButton.addEventListener('click', clearCart);
  }
});

// Inicialização
function initShop() {
  // Inicializa os event listeners
  const searchInput = document.getElementById('search') as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery.set((e.target as HTMLInputElement).value);
    });
  }
  
  const categorySelect = document.getElementById('category') as HTMLSelectElement;
  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      categoryFilter.set((e.target as HTMLSelectElement).value);
    });
  }
  
  const cartToggle = document.getElementById('cart-toggle');
  if (cartToggle) {
    cartToggle.addEventListener('click', () => {
      isCartOpen.set(!isCartOpen.value);
    });
  }
  
  // Simula carregamento de produtos
  isLoading.set(true);
  setTimeout(() => {
    isLoading.set(false);
  }, 1000);
}

// Carrega a loja quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initShop);
```

## Exemplo 3: Formulário com Validação

Este exemplo mostra como criar um formulário com validação em tempo real:

```typescript
import { State, Derived, Effect, Values } from '@jay-js/system';

// ==================== DEFINIÇÃO DOS TIPOS ====================
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

// ==================== ESTADOS ====================
// Estados individuais para cada campo
const username = State('');
const email = State('');
const password = State('');
const confirmPassword = State('');
const agreeToTerms = State(false);

// Estado combinado do formulário
const formData = Derived<FormData>(() => ({
  username: username.value,
  email: email.value,
  password: password.value,
  confirmPassword: confirmPassword.value,
  agreeToTerms: agreeToTerms.value
}));

// Estados para rastrear interação do usuário
const touchedFields = State<Record<string, boolean>>({
  username: false,
  email: false,
  password: false,
  confirmPassword: false,
  agreeToTerms: false
});

const isSubmitting = State(false);
const isSubmitted = State(false);

// ==================== VALIDAÇÃO ====================
// Função para validar o formulário
function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  
  // Valida username
  if (!data.username.trim()) {
    errors.username = 'Username is required';
  } else if (data.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }
  
  // Valida email
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Valida password
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/[A-Z]/.test(data.password)) {
    errors.password = 'Password must contain at least one uppercase letter';
  } else if (!/[0-9]/.test(data.password)) {
    errors.password = 'Password must contain at least one number';
  }
  
  // Valida confirmação de senha
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  // Valida concordância com os termos
  if (!data.agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the terms and conditions';
  }
  
  return errors;
}

// Estado derivado para os erros do formulário
const formErrors = Derived<FormErrors>(() => {
  return validateForm(formData.value);
});

// Estado derivado para verificar se o formulário é válido
const isFormValid = Derived<boolean>(() => {
  return Object.keys(formErrors.value).length === 0;
});

// ==================== FUNÇÕES DE FORMULÁRIO ====================
// Marca um campo como "tocado" quando o usuário interage com ele
function setFieldTouched(fieldName: keyof FormData) {
  touchedFields.set(current => ({
    ...current,
    [fieldName]: true
  }));
}

// Marca todos os campos como tocados (útil ao tentar enviar)
function setAllFieldsTouched() {
  touchedFields.set({
    username: true,
    email: true,
    password: true,
    confirmPassword: true,
    agreeToTerms: true
  });
}

// Função para enviar o formulário
async function submitForm() {
  // Marca todos os campos como tocados para mostrar todos os erros
  setAllFieldsTouched();
  
  // Verifica se o formulário é válido
  if (!isFormValid.value) {
    alert('Please fix the errors in the form');
    return;
  }
  
  // Inicia o envio
  isSubmitting.set(true);
  
  try {
    // Simula uma chamada de API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulação bem-sucedida
    isSubmitted.set(true);
    alert('Form submitted successfully!');
    
    // Reseta o formulário
    username.set('');
    email.set('');
    password.set('');
    confirmPassword.set('');
    agreeToTerms.set(false);
    touchedFields.set({
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
      agreeToTerms: false
    });
  } catch (error) {
    alert(`Error submitting form: ${error.message}`);
  } finally {
    isSubmitting.set(false);
  }
}

// ==================== EFEITOS DE UI ====================
// Determina se deve mostrar erro para um campo específico
function shouldShowError(fieldName: keyof FormData): boolean {
  return touchedFields.value[fieldName] || isSubmitted.value;
}

// Efeito para atualizar as mensagens de erro na UI
Effect(() => {
  const errors = formErrors.value;
  const touched = touchedFields.value;
  
  // Atualiza os elementos de erro para cada campo
  for (const field of ['username', 'email', 'password', 'confirmPassword', 'agreeToTerms'] as const) {
    const errorElement = document.getElementById(`${field}-error`);
    if (!errorElement) continue;
    
    if (shouldShowError(field) && errors[field]) {
      errorElement.textContent = errors[field];
      errorElement.style.display = 'block';
      document.getElementById(field)?.classList.add('error-input');
    } else {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
      document.getElementById(field)?.classList.remove('error-input');
    }
  }
});

// Efeito para atualizar o estado do botão de envio
Effect(() => {
  const submitButton = document.getElementById('submit-button') as HTMLButtonElement;
  if (!submitButton) return;
  
  submitButton.disabled = isSubmitting.value;
  submitButton.textContent = isSubmitting.value ? 'Submitting...' : 'Submit';
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Adiciona event listeners para inputs
  document.getElementById('username')?.addEventListener('input', (e) => {
    username.set((e.target as HTMLInputElement).value);
    setFieldTouched('username');
  });
  
  document.getElementById('email')?.addEventListener('input', (e) => {
    email.set((e.target as HTMLInputElement).value);
    setFieldTouched('email');
  });
  
  document.getElementById('password')?.addEventListener('input', (e) => {
    password.set((e.target as HTMLInputElement).value);
    setFieldTouched('password');
  });
  
  document.getElementById('confirmPassword')?.addEventListener('input', (e) => {
    confirmPassword.set((e.target as HTMLInputElement).value);
    setFieldTouched('confirmPassword');
  });
  
  document.getElementById('agreeToTerms')?.addEventListener('change', (e) => {
    agreeToTerms.set((e.target as HTMLInputElement).checked);
    setFieldTouched('agreeToTerms');
  });
  
  // Event listener para o formulário
  document.getElementById('registration-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
  });
});
```

Os exemplos acima demonstram como combinar diferentes aspectos do sistema de estado para criar aplicações reativas completas e funcionais. Você pode adaptar esses padrões e técnicas para suas próprias necessidades.