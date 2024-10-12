const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
registerForm.style.display = 'none';
document.getElementById('switch-regis').addEventListener("click",function(){
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
})
document.getElementById('switch-log').addEventListener("click",function(){
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
})
// import swal from 'sweetalert';
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();// Ngăn không cho form gửi request mặc định

    document.getElementById('message').textContent = '';
    // Lấy dữ liệu từ form
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
    console.log(data);
    document.getElementById('message').textContent = data.message;
    if(data.error){
      document.getElementById('message').textContent = data.message;
      swal("ERROR", data.message, "error");
    }
    else{
      swal("SUCCESS", data.message, "success");
    }
    if (response.ok) {
      localStorage.setItem('token', data.token); // Lưu token vào localStorage
      // Chuyển hướng đến trang profile hoặc một trang khác
      window.location.href = '/user/courses';
    }
  });
  
  document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const name = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    document.getElementById('message').textContent = '';
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
  
    const data = await response.json();
    console.log(data);
    if(data.errors){
       document.getElementById('message').textContent = data.message;
       swal("ERROR", data.message, "error");
    }
    else{
      swal("SUCCESS", data.message, "success");
    }
    if(data.user){
      swal("SUCCESS", data.message + '! Hãy Đăng Nhập', "success")
      .then((value) => {
        location.assign('/api/');
      });
      document.getElementById('message').textContent = 'Đăng ký thành công';
    }
  });