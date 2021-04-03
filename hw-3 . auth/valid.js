const logInput = document.querySelector('form[name=log_form]');
const regInput = document.querySelector('form[name=reg_form]');
logInput.addEventListener('input', updateValue)
regInput.addEventListener('input', updateValue)
let elements = document.getElementsByClassName('err')
let buttons = document.getElementsByClassName('border-button')
//console.log(elements);
for(el in buttons){
  try {
    buttons[el].disabled = true
  } catch{}

}

for(el in elements){
  try {
    elements[el].style.visibility = 'hidden'
  } catch{}

}

function pushE(element, err){
  element.nextElementSibling.style.visibility = 'visible'
  element.nextElementSibling.style.opacity = '1'
  element.nextElementSibling.textContent = err
  result = false
}

function unpush(element){
  //element.nextElementSibling.textContent = ''
  element.nextElementSibling.style.opacity = '0'
  //element.nextElementSibling.style.visibility = 'hidden'

}

function updateValue(element) {
  const t = element.target
  //console.log(t.value, t.name)
  validate(t)
  //pushE(t,t.value)
}

function validate(e){
  console.log('---');
  result = true
  //empty inputs
  const inputs = []
  for(let i = 0; i<(e.form.elements.length - 1); i++){
    inputs.push(e.form.elements[i]?.value)
  }
  const empty = []
  for(let i in inputs){
    if(inputs[i] === ''){
      console.log('empty');
    }
  }

  function tooShortLong(e,f,l){
    if(e.name == 'pass'){
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
  if(e.name == 'name' ){



  }
  if(e.name == 'email'){
    let reg = /.+@.+\..+/
    if(e.value.match(reg) === null){
        pushE(e,'invalid email')
      }
  }
  if(e.name == 'pass'){
    //console.log('pass');
  }
  if(e.name == 'passch'){
    //console.log('passch');
  }
  //console.log(element);
  if(result === true){
    unpush(e)
  }
  //console.log(result, e.value);
  return result
}
