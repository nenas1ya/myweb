let loginForm = document.forms["log_form"].elements;
function login() {
  const params = {
    'email': loginForm.email.value,
    'pass': loginForm.pass.value
  }
  validate(params)
  //console.log(params);
}

function validate( params){
    if(params.email !== undefined){
      let em = params.email
      if(em.indexOf('@') == em.lastIndexOf('@') && em.indexOf('@') != -1){
        let count = 0
        let em_domen = em.slice(em.indexOf('@'))
        for(let i = 0; i < em_domen.length; i++){
            if(em_domen[i] == '.'){
               count++
            }
           }
        if(count > 1 ){
          console.log('too many dot');
          return false
        }
        if(count < 1 ){
          console.log('too less dot');
          return false
        }
        if(em.match("^[a-zA-Z0-9]") === null){
          console.log('unsupported symbol');
        }

        //console.log(em.slice(em.indexOf('@')));
      } else console.log('bad');

    }
}
