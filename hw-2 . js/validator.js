
class Validator {
  constructor() {
    this._result = true;
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



  typeCheck(sch, dtv){
    let type = sch.type
    /*if(type === 'array' && Array.isArray(dtv)
     && sch.oneOf === undefined && sch.anyOf === undefined){
      return 'array'
    }*/
    if(type === typeof dtv){
      return type
    } else if (dtv === null) {
      if (sch.nullable === false) {
        return 'no null'
      } else if (sch.nullable === true) {
        return 'null'
      }
    } else if (type !== 'number' &&
              type !== 'string'  &&
              type !== 'array'   &&
              type !== 'boolean' &&
              type !== 'object') {
      return 'unknow'
    } else if (type !== typeof dtv) {
      return 'incorrect'
    }

  }

  bad(err) {
     this._errors.push(err)
     this._result = false
  }

  inEnum(sch, dtv){
      if(sch.enum.includes(dtv)){
        console.log('this');
      } else {
        return false
      }
    return true
  }

  anyOf(sch, dtv){
    let any = []
    for(let i = 0; i < sch.anyOf.length; i++){
      any.push(this.typeCheck(sch.anyOf[i], dtv) == typeof dtv)
    }
    if(any.includes(true)){
      return true
    }
    else {
      return false
    }
  }

  oneOf(sch, dtv){
    let one = []
    for(let i = 0; i < sch.oneOf.length; i++){
      one.push(this.typeCheck(sch.oneOf[i], dtv) == typeof dtv)
    }
    let counter = 0
    for(let i = 0; i < one.length; i++){
      if (one[i] == true) counter++
    }
    return counter
  }


  isValid(schema = {}, dataToValidate) {
    console.log(schema, dataToValidate)
    /*shema:
          type: int, ste, bool, obj, arr
          nullable: bool
          anyOf: dataToValidate in [shema, shema..]
          oneOf: dataToValidate *ones* in [shema, shema..]*/




    if(this.typeCheck(schema, dataToValidate) === 'null'){

    }
    if(this.typeCheck(schema, dataToValidate) === 'no null'){
      this.bad('Value is null, but nullable false')

    }
    if(this.typeCheck(schema, dataToValidate) === 'unknow'
     && schema.anyOf === undefined && schema.oneOf === undefined){
      this.bad('Unknown type')

    }
    if(this.typeCheck(schema, dataToValidate) === 'incorrect'
     && schema.anyOf === undefined && schema.oneOf === undefined){
      this.bad('Type is incorrect')
    }


    if(this.typeCheck(schema, dataToValidate) === 'number'){
      if(schema.minimum != undefined || schema.maximum != undefined) {
        if(dataToValidate < schema.minimum) this.bad("Value is less than it can be")
        if(dataToValidate > schema.maximum) this.bad("Value is greater than it can be")
      }
      if(schema.enum != undefined){
        if(this.inEnum(schema, dataToValidate) === false){
          this.bad("The enum does not support value")
        }
      }
    }
    if(this.typeCheck(schema, dataToValidate) === 'string'){
      if(schema.maxLength != undefined || schema.minLength != undefined){
        if(dataToValidate.length > schema.maxLength){
          this.bad('Too long string')
        }
        if(dataToValidate.length < schema.minLength){
          this.bad('Too short string')
        }
      }

      if(schema.pattern != undefined){
        let reg = schema.pattern
        if(dataToValidate.match(reg) == null){
          this.bad('String does not match pattern')
        }
      }
      if(schema.enum != undefined) {
        if(this.inEnum(schema, dataToValidate) == false){
          this.bad('The enum does not support value')
        }
      }
      if(schema.format != undefined){
        if(schema.format == 'email'){
          let reg = /.+@.+\..+/
          if(dataToValidate.match(reg) != null){
            console.log('valid email:', dataToValidate)
          } else {
            this.bad('Invalid mail')

          }
        }
        if(schema.format == 'date'){
          if(isNaN(Date.parse(dataToValidate))){
            this.bad('Format of string is not valid')

          }
        } else {console.log('valid date:', Date.parse(dataToValidate))}
      }
    }
    if(this.typeCheck(schema, dataToValidate) === 'boolean'){

      }

    if(schema.anyOf != undefined){
      if(this.anyOf(schema, dataToValidate) == true){
        this._result = true
      } else {
        this.bad('None schemas are valid')
      }
    }

    if(schema.oneOf != undefined){
      let res = this.oneOf(schema, dataToValidate)

      if(res === 0) {this.bad('None schemas are valid')}
      else if(res === 1) {}
      else(this.bad('More than one shema valid for this data'))
    }


    //String


    //Bool



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



    console.log('return:', this._result, '/', 'errors:',this._errors)
  return this._result
  }
}
