class FormValidate {
  constructor() {
    this.form = document.querySelector('.form'); //Pegando o formulario do html
    this.init();
  }

  init() {
    this.form.addEventListener('submit', e => { 
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    
    e.preventDefault();
    const validFields = this.validateFields();
    const validPasswords = this.validatePasswords();

    if(validFields && validPasswords) {
      alert('Submited Form.');
      this.form.submit(); //Só irá ser efetuado o envio caso os campos e as senhas sejam válidas
    }
  }

  validatePasswords() {
    let flag = true; 

    const senha = this.form.querySelector('.password'); //Pegando a senha referente ao formulario
    const repetirSenha = this.form.querySelector('.password-confirm'); //Pegando o campo repetir senha referente ao formulário

    if(senha.value !== repetirSenha.value) { //Se o campo da senha e o campo de repetir não forem iguais....
      flag = false;
      this.errorMsg(senha, 'Campos senha e repetir senha precisar ser iguais.');
      this.errorMsg(repetirSenha, 'Campos senha e repetir senha precisar ser iguais.');
    }
    if(senha.value.length < 6 || senha.value.length > 12) { //Validação de senha entre 6 e 12 caracteres
      flag = false;
      this.errorMsg(senha, 'Senha precisa estar entre 6 e 12 caracteres.');
    }

    if(flag){
        this.successCss(senha);
        this.successCss(repetirSenha);
    }

    return flag; //Retorna a variavel valid, podendo ser true ou false
  }

  validateFields() {
    let flag = true;

    for(let errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for(let field of this.form.querySelectorAll('.validate')) {
      const label = field.previousElementSibling.innerText;

      if(!field.value) {
        this.errorMsg(field, `Campo "${label}" não pode estar em branco.`);
        flag = false;
      }

      if(field.classList.contains('cpf')) {
        if(!this.validateCPF(field)) flag = false;
        else this.successCss(this.form.querySelector('.cpf'));
      }

      if(field.classList.contains('user')) {
        if(!this.validateUser(field)) flag = false;
        else this.successCss(this.form.querySelector('.user'));
      }

      if(field.classList.contains('name')){
        if(field.value.length < 2) {
          flag =false;
          this.errorMsg(field, 'Nome precisa ter mais de 2 caracteres')
        }
        else this.successCss(this.form.querySelector('.name'));
      }

      if(field.classList.contains('last-name')){
        if(field.value.length < 2){ 
          flag =false;
          this.errorMsg(field, 'Sobrenome precisa ter mais de 2 caracteres');
        } else this.successCss(this.form.querySelector('.last-name'));
      }

    }

    return flag;
  }

  validateUser(field) {
    const user = field.value;
    let flag = true;

    if(user.length < 3 || user.length > 12) {
      this.errorMsg(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
      flag = false;
    }

    if(!user.match(/^[a-zA-Z0-9]+$/g)) { //Expressão regular para validar que precisa ter apenas letras ou números
      this.errorMsg(field, 'Nome de usuário precisar conter apenas letras e/ou números.');
      flag = false;
    }

    return flag;
  }

  validateCPF(field) {
    const cpf = new ValidaCPF(field.value); //Instanciando um cpf a partir da classe criada no outro arquivo

    if(!cpf.valida()) {
      this.errorMsg(field, 'CPF inválido.');
      return false;
    }

    return true;
  }

  errorMsg(campo, msg) { //Essa função irá adicionar uma div com o erro referente
    const section = campo.parentElement;
    section.className = 'section error';
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend', div); 
  }

  successCss(campo) {
    const section = campo.parentElement;
    section.className = 'section success';
  }

}

const valida = new FormValidate();
