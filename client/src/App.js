import Axios from 'axios'
import { useState } from 'react'
import Style from './App.css'

function App() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [phonno, setPhonno] = useState("");
  const [fevfood, setFevfood] = useState("");
  const [newPhonno, setNewPhonno] = useState("");

  const [employeeList, setEmployeeList] = useState([]);
  
  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data); 
    });
  }

  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      email: email,
      name: name,
      age: age,
      country: country,
      fevfood: fevfood,
      phonno: phonno
    }).then(() => {
      setEmployeeList([
        ...employeeList,
      {
        email: email,
        name: name,
        age: age,
        country: country,
        fevfood: fevfood,
        phonno: phonno
      }
      ])
    })
  }

  const updateEmployeePhonno =(id) => {
    Axios.put("http://localhost:3001/update", { phonno: newPhonno, id: id }).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id == id ? {
            id: val.id,
            email: val.email,
            name: val.name,
            country: val.country,
            age: val.age,
            fevfood: val.fevfood,
            phonno: newPhonno
          } : val;
        })
      )
    })
  }

  return (
    <div className="App container">
      <h1>Information</h1>
      <div className="Information">
        <form action="">
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input 
              type="email"
              className="from-control"
              placeholder="Enter email"
              onChange={(event) => {
                setEmail(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input 
              type="text"
              className="from-control"
              placeholder="Enter name"
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age:</label>
            <input 
              type="number"
              className="from-control"
              placeholder="Enter age"
              onChange={(event) => {
                setAge(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country:</label>
            <input 
              type="text"
              className="from-control"
              placeholder="Enter country"
              onChange={(event) => {
                setCountry(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fevfood" className="form-label">Fevorite Food:</label>
            <input 
              type="text"
              className="from-control"
              placeholder="Enter fevfood"
              onChange={(event) => {
                setFevfood(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phonno" className="form-label">Phonno:</label>
            <input 
              type="text"
              className="from-control"
              placeholder="Enter phonno"
              onChange={(event) => {
                setPhonno(event.target.value)
              }}
            />
          </div>

          <button onClick={addEmployee}>Add Employee</button>

        </form>
      </div>
      <hr/>
      <div className="employees">
        <button className="btn btn-primary" onClick={getEmployees}>Show employees</button>
        <br/><br/>
        {employeeList.map((val, key) => {
          return (
            <div style={{width: "350px"}} className='employee card'>
              <div className='card-body text-left'>
                <p className='card-text'>Email: {val.email}</p>
                <p className='card-text'>Name: {val.name}</p>
                <p className='card-text'>Age: {val.age}</p>
                <p className='card-text'>Country: {val.country}</p>
                <p className='card-text'>Fevorit Food: {val.fevfood}</p>
                <p className='card-text'>Phonno: {val.phonno}</p>
                <div className='d-flex'>
                  <input 
                    type="text"
                    placeholder='New Phonno' 
                    className='form-control' 
                    onChange={(event) => {
                      setNewPhonno(event.target.value)
                    }}   
                />
                <button className='btn btn-warning' onClick={() => { updateEmployeePhonno(val.id)}}>Update</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
    </div>
  );
}

export default App;
