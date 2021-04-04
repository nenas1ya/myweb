const logInput = document.querySelector('form[name=log_form]');
const regInput = document.querySelector('form[name=reg_form]');
logInput.addEventListener('input', updateValue)
regInput.addEventListener('input', updateValue)
let elements = document.getElementsByClassName('err')
let buttons = document.getElementsByClassName('border-button')

class InputInfo{
  constructor(){
    this.mod = '',
    this.name = '',
    this.email = '',
    this.password = '',
    this.password_check = ''
  }
  get_full(){
    console.log(`mode: "${this.mod}"\nname: "${this.name}"\nemail: "${this.email}"
    password: "${this.pass}"\npassword check: "${this.passch}"\n`);
  }
}


function updateValue(element) {
  const t = element.target
  validate(t)
}

for(el in buttons){ // изначально выключаем кнопки
  try {
    buttons[el].disabled = true
  } catch{}
}

for(el in elements){ // изначально прячем ошибки
  try {
    elements[el].style.visibility = 'hidden'
  } catch{}

}

function pushE(element, err){ //показываем ошибки
  if(element.value != ''){
    element.nextElementSibling.style.visibility = 'visible'
    element.nextElementSibling.style.opacity = '1'
    element.nextElementSibling.textContent = err
    result = false
  }
}

function unpush(element){ // убираем ошибки
  element.nextElementSibling.style.opacity = '0'
}

let pass = ''
function validate(e){
  result = true

  function tooShortLong(e,f,l){
    if(e.name == 'pass' || e.name == 'passch' ){
      if(f === '>') return (e.value.length > 8)
      if(f === '<') return (e.value.length < 64)
    }
    if(f === '>') return (e.value.length > l)
    if(f === '<') return (e.value.length < l)
  }

  function acceptChar(line, pass=false){
    if(line !== undefined){
      let accept = ['q','w','e','r','t','y','u','i','o','p','a','s','d',
      'f','g','h','j','k','l','z','x','c','v','b','n','m',
      '@','_','-','.',
      '1','2','3','4','5','6','7','8','9','0']
      if(pass){
        accept = ['q','w','e','r','t','y','u','i','o','p','a','s','d',
        'f','g','h','j','k','l','z','x','c','v','b','n','m',
        '@','^','.','&','_','/','~','-','#','$',';','%',':','?','=','+','|','\\',
        '1','2','3','4','5','6','7','8','9','0']
      }
      for(let i=0; i < line.value.length; i++){
        const acc = []
        for(let c in accept){
          if(line.value.toLowerCase()[i] === accept[c]){
            acc.push(true)
          }
        }
        if (acc.length === 0){
          return line.value[i]
        }
      }
    }
  }

  if(!tooShortLong(e,'<',24)){
    pushE(e,'too long')
  }
  if(!tooShortLong(e,'>',3)){
    pushE(e,'too short')
  }
  if(typeof acceptChar(e,(e.name =='pass')) === 'string' ){
    pushE(e,`unaccepteble symbol: "${acceptChar(e, (e.name =='pass'))}"`);
  }


  if(e.name == 'email'){
    let reg = /.+@.+\..+/
    if(e.value.match(reg) === null){
        pushE(e,'invalid email')
      }
  }

  if(e.name == 'pass'){
    pass = e.value
  }
  if(e.name == 'passch'){
    if(e.value !== pass){
      pushE(e, 'check passwors')
    }
  }

  const inputs = [] // проверка на пустые поля
  let empty = false
  for(let i = 0; i<(e.form.elements.length - 1); i++){
    inputs.push(e.form.elements[i]?.value)
  }
  for(let i in inputs){
    if(inputs[i] === ''){
      empty = true
    }
  }

  if(result === true){
    unpush(e)
  }
  if (result === true && !empty){
    e.form[e.form.length - 1].disabled = false
  } else {
    result = false
    e.form[e.form.length - 1].disabled = true
  }

  if(result === true){
    let info = new InputInfo
    info.mod = e.form.name
    if(e.name == 'nick'){info.name = e.value}
    if(e.name == 'email'){info.email = e.value}
    if(e.name == 'pass'){info.password = e.value}
    if(e.name == 'passch'){info.password_check = e.value == info.password}
    console.log(info);
  }
  console.log(result);
  return result
}
