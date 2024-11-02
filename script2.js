// Inicializando o Firebase
firebase.initializeApp(firebaseConfig);

// Gerenciar o formulário de login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('username').value; // Captura o e-mail
    const password = document.getElementById('password').value; // Captura a senha

    // Fazer login com Firebase
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login bem-sucedido
            console.log("Usuário logado:", userCredential.user);
            // Redirecionar para gestão.html após login
            window.location.href = "gestão.html"; // Redireciona para gestão.html
        })
        .catch((error) => {
            const errorCode = error.code; // Captura o código do erro
            const errorMessage = error.message; // Captura a mensagem do erro
            console.error("Erro ao fazer login:", errorCode, errorMessage);
            alert("Erro: " + errorMessage); // Exibe a mensagem de erro
        });
});