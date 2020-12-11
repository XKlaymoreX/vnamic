import React, { CSSProperties } from 'react'

import { VInput } from 'tvnamic'
import 'tvnamic/dist/index.css'

const App = () => {
  const [isFormValid, setFormValid] = React.useState({})
  React.useEffect(() => console.log(isFormValid), [isFormValid])
  const inputFieldsStyle: CSSProperties = {
    padding: "15px 10px 15px 10px",
    outline: "none",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "2px solid",
    cursor: "pointer",
    fontSize: "20px"
  }
  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="form" style={{ backgroundColor: "#ccc", width: "50%", height: "50%", display: "flex", alignItems: "center", justifyContent: "space-around", flexFlow: "column" }}>
        <div style={{ display: "flex", flexFlow: "column" }}>
          <label style={{ color: 'white', fontWeight: "bold", fontSize: "20px" }}>Nome</label>
          <VInput style={inputFieldsStyle} name="myText" type="text" placeholder="Inserisci un nome..." isValid={setFormValid} validation={{ maxCharacters: 10, minCharacters: 2 }} />
        </div>
        <div style={{ display: "flex", flexFlow: "column" }}>
          <label style={{ color: 'white', fontWeight: "bold", fontSize: "20px" }}>Password</label>
          <VInput style={inputFieldsStyle} name="myPass" type="password" placeholder="Inserisci una password..." validation={{ maxCharacters:18,minCharacters: 8,numberRequired:true,specialCharacterRequired:true,capitalRequired:true }} isValid={setFormValid} />
        </div>
        <div style={{ display: "flex", flexFlow: "column" }}>
          <label style={{ color: 'white', fontWeight: "bold", fontSize: "20px" }}>E-Mail</label>
          <VInput style={inputFieldsStyle} name="myEmail" type="email" placeholder="Inserisci una mail..." validation={{ maxCharacters: 40, isEmail: true, minCharacters: 2 }} isValid={setFormValid} />
        </div>
      </div>
    </div>
  )
}
export default App
