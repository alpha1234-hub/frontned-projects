let users = JSON.parse(localStorage.getItem('users')) || [];
let candidates = JSON.parse(localStorage.getItem('candidates')) || [
  { name: 'Candidate A', votes: 0 },
  { name: 'Candidate B', votes: 0 },
];

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
    document.getElementById('voting').style.display = 'block';
    loadCandidates();
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
  document.getElementById('voting').style.display = 'none';
  document.getElementById('auth').style.display = 'block';
});

function loadCandidates() {
  const candidatesList = document.getElementById('candidatesList');
  candidatesList.innerHTML = '';
  candidates.forEach((candidate, index) => {
    const li = document.createElement('li');
    li.textContent = candidate.name;
    li.addEventListener('click', () => {
      candidates[index].votes++;
      localStorage.setItem('candidates', JSON.stringify(candidates));
      alert(`You voted for ${candidate.name}`);
      loadCandidates();
    });
    candidatesList.appendChild(li);
  });
}
