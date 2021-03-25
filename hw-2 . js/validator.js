class Validator {
  constructor() {
    this._errors = [];
  }

  get Errors() {
    return this._errors;
  }

  /**
   *
   * @param schema
   * @param dataToValidate
   * @returns {boolean}
   */
  isValid(schema = {}, dataToValidate) {
    console.log(schema, dataToValidate);
    /*shema:
          type: int, ste, bool, obj, arr
          nullable: bool
          anyOf: dataToValidate in [shema, shema..]
          oneOf: dataToValidate *ones* in [shema, shema..]*/
    let result = Boolean

    //Main
    if(schema.type == 'number'||
    schema.type == 'string' ||
    schema.type == 'boolean'||
    schema.type == 'array'  ||
    schema.type == 'object'
    && dataToValidate != null){
      result = true
    } else {
      this._errors.unshift('Unknown type')
      result = false
    }

    if(dataToValidate == null){
      if(schema.nullable == false){
        this._errors.unshift('Value is null, but nullable false')
        result = false
      } else result = true
    }

    if(schema.anyOf != undefined){
      let any = []
      for(let i = 0; i < schema.anyOf.length; i++){
        any.push(typeof dataToValidate == schema.anyOf[i].type)
      }
      if(any.includes(true)){result = true}
      else {
        this._errors.unshift('None schemas are valid')
        result = false
      }
    }

    if(schema.oneOf != undefined){
      let one = []
      for(let i = 0; i < schema.oneOf.length; i++){
        let el = typeof dataToValidate == schema.oneOf[i].type
                  && !Array.isArray(dataToValidate)
        //^ typeof array -> object
        one.push(el)
      }
      let counter = 0
      for(let i = 0; i < one.length; i++){
        if (one[i] == true) counter++
      }
      if(counter == 0){
        this._errors.unshift('None schemas are valid')
        result = false
      }
      else if(counter == 1){
        result = true
      }
      else{
        this._errors.unshift('More than one shema valid for this data')
        result = false
      }
    }

    //Int
    if(schema.type == 'number' && dataToValidate != null){
      if(typeof dataToValidate != 'number') {
        this._errors.unshift('Type is incorrect')
        result = false
      }

      if(schema.minimum != undefined || schema.maximum != undefined) {
        if(dataToValidate < schema.minimum){
          this._errors.unshift('Value is less than it can be')
          result = false
        }
        if(dataToValidate > schema.maximum){
          this._errors.unshift('Value is greater than it can be')
          result = false
        }
      }

      if(schema.enum != undefined) {
        if(schema.enum.includes(dataToValidate) == false){
          this._errors.unshift('The enum does not support value')
          result = false
        }
      }
    }

    //String
    if(schema.type == 'string' && dataToValidate != null){
      if(typeof dataToValidate != 'string'){
        this._errors.unshift('Type is incorrect')
        result = false
      }

      if(schema.maxLength != undefined || schema.minLength != undefined){
        if(dataToValidate.length > schema.maxLength){
          this._errors.unshift('Too long string')
          result = false
        }
        if(dataToValidate.length < schema.minLength){
          this._errors.unshift('Too short string')
          result = false
        }
      }

      if(schema.pattern != undefined){
        let reg = schema.pattern
        if(dataToValidate.match(reg) == null){
          this._errors.unshift('String does not match pattern')
          result = false
        }
      }
      if(schema.enum != undefined) {
        if(schema.enum.includes(dataToValidate) == false){
          this._errors.unshift('The enum does not support value')
          result = false
        }
      }
      if(schema.format != undefined){
        if(schema.format == 'email'){
          let reg = /.+@.+\..+/
          if(dataToValidate.match(reg) != null){
            console.log('valid email:', dataToValidate)
          } else {
            this._errors.unshift('Invalid mail')
            result = false
          }
        }
        if(schema.format == 'date'){
          if(isNaN(Date.parse(dataToValidate))){
            this._errors.unshift('Format of string is not valid')
            result = false
          }
        } else {console.log('valid date:', Date.parse(dataToValidate))}
      }
    }

    //Bool
    if(schema.type == 'boolean' && dataToValidate != null){
      if(typeof dataToValidate != 'boolean'){
        this._errors.unshift('Type is incorrect')
        result = false
      }
    }

    //Arr
    if(schema.type == 'array' && dataToValidate != null){
      if(Array.isArray(dataToValidate)){
        if(schema.items != undefined){
          for(let i = 0; i < dataToValidate.length; i++){
            if(schema.items.length > 1){
              console.log(schema.items[i].type)
            } else if(typeof dataToValidate[i] != schema.items.type){
                this._errors.unshift('Type is incorrect')
                result = false
              }
          }
        }
        if(schema.maxItems != undefined){
          if(dataToValidate.length > schema.maxItems){
            this._errors.unshift('Items count more than can be')
            result = false
          }
        }
        if(schema.minItems != undefined){
          if(dataToValidate.length < schema.minItems){
            this._errors.unshift('Items count less than can be')
            result = false
          }

        }
        if(schema.contains != undefined){
          if(!dataToValidate.includes(schema.contains)){
            this._errors.unshift('Must contain a value, but does not')
            result = false
          }
        }
        if(schema.uniqueItems != undefined && schema.uniqueItems == true){
          console.log(dataToValidate)
          let ones = []
          for(let i = 0; i < dataToValidate.length; i++){
            if(ones.includes(dataToValidate[i])){
              this._errors.unshift('Elements of array not unique')
              result = false
            }else if(typeof dataToValidate[i] == 'object'){
              for(let j = 0; j < ones.length; j++){
                if(JSON.stringify(dataToValidate[i]) == JSON.stringify(ones[j])){
                  this._errors.unshift('Elements of array not unique')
                  result = false
                }
              }
            }
            ones.push(dataToValidate[i])
          }
        }


        if(schema.enum != undefined && Array.isArray(dataToValidate)){
          let f = false
          for(let i = 0; i < schema.enum.length; i++){
            if(dataToValidate == schema.enum[i]){
              f = true
            }
            if(typeof dataToValidate[i] == 'object'){
              for(let j = 0; j < schema.enum.length; j++){
                for(let k = 0; k < schema.enum[j].length; k++){
                  if(JSON.stringify(dataToValidate[i]) == JSON.stringify(schema.enum[j][k])){
                    f = true
                  }
                }
              }
            }
          }// ужас
          if (f != true){
            this._errors.unshift('The enum does not support one of array elements')
            result = false
          }
        }
        } else {
          this._errors.unshift('Type is incorrect')
          result = false}
    }

    //Objects
    if( (schema.type == 'object' && dataToValidate != null) &&
      (typeof dataToValidate != 'object' || Array.isArray(dataToValidate)) ){
        this._errors.unshift('Type is incorrect')
        result = false
    } else {
        if(schema.maxProperties != undefined || schema.minProperties != undefined){
          let count = 0
          for(let key in dataToValidate){
            count++
          }
          if(schema.maxProperties < count){
            this._errors.unshift('Too many properties in object')
            result = false
          }
          if(schema.minProperties > count){
            this._errors.unshift('Too few properties in object')
            result = false
          }
        }
        if(schema.required != undefined){
          let dtvArgs = []
          for(let key in dataToValidate){
            dtvArgs.push(key)
          }
          for(let i = 0; i < schema.required.length; i++){
            if(dtvArgs.includes(schema.required[i]) === false){
              this._errors.unshift('Property required, but value is undefined')
              result = false
            }
          }

        }
        if(schema.properties != undefined){
            //нужно было делать проверки через функции.

        }
      }



    console.log('return:', result, '/', 'errors:',this._errors)
  return result
  }
}
