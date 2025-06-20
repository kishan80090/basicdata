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
    let xyz =`<table border='1'><tr><td>Rollno</td><td>Name</td><td>Maths</td><td>Physics</td></tr>`;
    xyz+=`<tr><td>${rollno}</td><td>${name}</td><td>Maths</td><td>Physics</td></tr></table>`;
    document.getElementById("d").innerHTML=xyz;
    setData(xyz);
    // console.table(result);
  };
  return (
    <div>
      <div id="d"></div>
      <h1>{data}</h1>
    <form onSubmit={handleSubmit}><center>
      <h2 className='col'><b>||✍🏻------------Result------------✍🏻||</b></h2>
      <label>
        <h3>Fill The Roll Number</h3>
        <input type="number" name="rollno" className="input" placeholder="Roll No..." value={formData.rollno} onChange={handleChange} required/>
      </label>
      <br/><br/>
      <button  type="submit" className='col1'><b>Click</b></button>
      <br/>
      <h1></h1>
      </center>
    </form>
    </div>
  );
};
export default Basic;