let users = JSON.parse(localStorage.getItem('users')) || [];
let events = JSON.parse(localStorage.getItem('events')) || [];

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
    document.getElementById('events').style.display = 'block';
    loadEvents();
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
  document.getElementById('events').style.display = 'none';
  document.getElementById('auth').style.display = 'block';
});

document.getElementById('eventForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('eventTitle').value;
  const date = document.getElementById('eventDate').value;
  const location = document.getElementById('eventLocation').value;
  const description = document.getElementById('eventDescription').value;
  events.push({ title, date, location, description });
  localStorage.setItem('events', JSON.stringify(events));
  loadEvents();
});

function loadEvents() {
  const eventsList = document.getElementById('eventsList');
  eventsList.innerHTML = '';
  events.forEach(event => {
    const li = document.createElement('li');
    li.innerHTML = `<h3>${event.title}</h3><p>${event.date} | ${event.location}</p><p>${event.description}</p>`;
    eventsList.appendChild(li);
  });
}
