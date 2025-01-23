let users = JSON.parse(localStorage.getItem('users')) || [];
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

document.getElementById('showSignup').addEventListener('click', () => {
  document.getElementById('auth').style.display = 'none';
  document.getElementById('signup').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', () => {
  document.getElementById('signup').style.display = 'none';
  document.getElementById('auth').style.display = 'block';
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('recipes').style.display = 'block';
    loadRecipes();
  } else {
    alert('Invalid credentials!');
  }
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('newUsername').value;
  const password = document.getElementById('newPassword').value;
  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Signup successful! Please login.');
  document.getElementById('signup').style.display = 'none';
  document.getElementById('auth').style.display = 'block';
});

document.getElementById('logout').addEventListener('click', () => {
  document.getElementById('recipes').style.display = 'none';
  document.getElementById('auth').style.display = 'block';
});

document.getElementById('recipeForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('recipeTitle').value;
  const ingredients = document.getElementById('recipeIngredients').value;
  const instructions = document.getElementById('recipeInstructions').value;
  recipes.push({ title, ingredients, instructions });
  localStorage.setItem('recipes', JSON.stringify(recipes));
  loadRecipes();
});

function loadRecipes() {
  const recipesList = document.getElementById('recipesList');
  recipesList.innerHTML = '';
  recipes.forEach(recipe => {
    const li = document.createElement('li');
    li.innerHTML = `<h3>${recipe.title}</h3><p>${recipe.ingredients}</p><p>${recipe.instructions}</p>`;
    recipesList.appendChild(li);
  });
}
