import "../data.css";
import React, { useState } from 'react';
function Basic() {
  const [ data,setData ]= useState('result');
  const [formData, setFormData] = useState({
    rollno:''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("1");
    const response = await fetch('http://localhost:5000/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    // console.log("2");  
    const result = await response.json();
    let x= JSON.parse(result.message);
    let name=x[0]["name"];
    let rollno=x[0]["roll"];
    let maths=x[0]["maths"];
    let physics=x[0]["physics"];
    let english=x[0]["english"];
    let total=(maths)+(physics)+(english);
    let Prasentese=(total)/3;
    let xyz =`<table border='1' class="table" ><tr><th>Rollno</th><th>Name</th><th>Maths</th><th>Physics</th><th>English</th><th>Total marks</th><th>Prasentese</tr>`;
      xyz +=`<h3>Check is successully</h3><tr><td>${rollno}</td><td>${name}</td><td>${maths}</td><td>${physics}</td><td>${english}</td><td>${total}</td><td>${Prasentese}%</td></tr></table>`;
    document.getElementById("d").innerHTML=xyz;
    setData(xyz);
  };
  return (
    <div className="mar" >
      <h1>{setData}</h1>
    <form onSubmit={handleSubmit} ><center>
      <h2 className='col'><b>||✍🏻------------Result------------✍🏻||</b></h2>
      <label>
        <h3 className="fill" >Fill The Roll Number</h3>
        <input type="number" name="rollno" className="input" placeholder="Roll No..." value={formData.rollno} onChange={handleChange} required/>
      </label>
      <br/><br/>
      <button  type="submit" className='col1'><b>Click</b></button>
      <br/>
      </center>
      <center>
        <div id="d" className="data"></div>
      </center>
    </form>
    </div>
  );
}
export default Basic;