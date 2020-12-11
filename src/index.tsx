import * as React from 'react'
interface VInput {
  name: string,
  type: "button" | "checkbox" | "date" | "email" | "text" | "number" | "password" | "search",
  style?: React.CSSProperties,
  id?: string,
  isValid?: React.Dispatch<React.SetStateAction<{}>>,
  placeholder?: string,
  validation?: Validation
}
export interface Validation {
  minCharacters?: number,
  maxCharacters?: number,
  specialCharacters?: boolean,
  isEmail?: boolean,
  required?: boolean,
  specialCharacterRequired?: boolean,
  numberRequired?: boolean,
  capitalRequired?: boolean
}
const validateMinCharacters = (given: number, requested: number) => {
  if (given < requested) {
    return false
  } else {
    return true
  }
}
const validateMaxCharacters = (given: number, requested: number) => {
  if (given > requested) {
    return false
  } else {
    return true
  }
}
const validateEmail = (given: string) => {
  var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
  if (given.match(regex)) {
    return true
  } else {
    return false
  }
}
const validateRequiredNumber = (given: string) => {
  if (given.match(/\d/)) {
    return true
  } else {
    return false
  }
}
const validateRequiredCapitalCharacter = (given: string) => {
  var regex = /^[A-Za-z0-9 ]+$/
  var hasUpperCase: boolean = false
  for (var i: number = 0; i < given.length; i++) {
    if (!given.charAt(i).match(/\d/) && given.charAt(i).match(regex)) {
      if (given.charAt(i) === given.charAt(i).toUpperCase()) {
        hasUpperCase = true
      }
    }
  }
  if (hasUpperCase) {
    return true
  } else {
    return false
  }
}
const validateRequiredSpecialCharacter = (given:string) => { 
  if(given.match(/^[A-Za-z0-9 ]+$/)){
    return false
  }else{
    return true
  }
}
export const VInput: React.FC<VInput> = ({ name, type, placeholder, validation, style }) => {
  var validationValues: Array<boolean> = []
  const validateField = (e: any) => {
    const { target } = e
    if (validation != undefined) {
      //CheckMinCharacters
      if (validation.minCharacters != undefined) {
        var requested = validation.minCharacters
        const val = validateMinCharacters(target.value.length, requested)
        validationValues.push(val)
      }
      //CheckMaxCharacters
      if (validation.maxCharacters != undefined) {
        var requested = validation.maxCharacters
        const val = validateMaxCharacters(target.value.length, requested)
        validationValues.push(val)
      }
      //CheckEmail
      if (validation.isEmail != undefined && validation.isEmail == true) {
        var given = e.target.value
        const val = validateEmail(given)
        validationValues.push(val)
      }
      //CheckNumberRequired
      if (validation.numberRequired != undefined && validation.numberRequired == true) {
        var given = e.target.value
        const val = validateRequiredNumber(given)
        validationValues.push(val)
      }
      //CheckCapitalLetterRequired
      if (validation.capitalRequired != undefined && validation.capitalRequired == true) {
        var given = e.target.value
        const val = validateRequiredCapitalCharacter(given)
        validationValues.push(val)
      }
      //CheckSpecialCharacterRequired
      if (validation.specialCharacterRequired != undefined && validation.specialCharacterRequired == true) {
        var given = e.target.value
        const val = validateRequiredSpecialCharacter(given)
        validationValues.push(val)
      }
      if (validationValues.some(item => item == false)) {
        target.style.borderColor = "red"
      } else {
        console.log("Valido")
        target.style.borderColor = "green"
      }
      validationValues = []
    }
  }
  return (
    <React.Fragment>
      <input name={name} style={style} placeholder={placeholder} type={type} onChange={(e: any) => validateField(e)} />
    </React.Fragment>
  )
}
