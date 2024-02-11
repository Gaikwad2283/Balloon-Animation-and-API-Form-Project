document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
  
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, email: email })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('response').textContent = data.message;
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('response').textContent = 'An error occurred, please try again later.';
    });
  });
  