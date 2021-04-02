class User{
  constructor() {
    this.name = string;
    this.email = string;
    this.password = string;
  }



}


let loginForm = document.forms["log_form"].elements;
function login() {
  const params = {
    'email': loginForm.email.value,
    'pass': loginForm.pass.value
  }
  console.log(validate(params))
}

let regForm = document.forms["reg_form"].elements;
function registry() {
  const params = {
    'name': regForm.name.value,
    'email': regForm.email.value,
    'pass': regForm.pass.value,
    'passch': regForm.passch.value
  }
  console.log(validate(params))
}



function validate(params){
    if(params.name !== undefined){
      const n = params.name
      if(n.length < 8){
        console.log('n too short');
        return false
      }

      if(n.match("[^!@#$%^&*()_+]" &&
         n.match("[a-zA-Z0-9]+"))[0].length !== n.length){
           console.log('unsupported symbols in n');
           return false
         }
    }

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
          return false
        }
        if(em.length < 8){
          console.log('too short');
          return false
        }
        if(em.length > 255){
          console.log('too long');
          return false
        }

      } else console.log('bad email');;

    }
    if(params.pass !== undefined){
      const p = params.pass
      if(p.length < 8){
        console.log('p too short');
        return false
      }
      if(p.length > 255){
        console.log('p too long');
        return false
      }
      let reg = /[a-zA-Z\d!@#$%&*()_+]/g
      if(p.match(reg)?.length !== p.length){
        console.log('unsupported symbols in p');
        return false
      }

    }

    if(params.passch !== undefined){
      if(params.pass !== params.passch){
        console.log('different passwords');
        return false
      }
    }
    return params
}
