import React, { useEffect,useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./employeeStyle.css"


const PersonalInfo = () => {
  const [tableData, setTableData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [address, setAddress] = useState(null); 
  const [editId, setEditId] = useState(null); 
  let navigate = useNavigate();

  //add new entry
  const handleAdd = () => {
    setFname("");
    setMname("");
    setLname("");
    setGender("");
    setContact("")
    setDate("");
    setHobbies("");
    setAddress("");
    setShowAdd(true);
  };

  const handleAddSave = async ()=>{
    const response = await fetch('http://localhost:4000/api/personalinfo/',{
      method: "POST", 
      body: JSON.stringify({fname, mname, lname, gender, contact, date, hobbies, address}),
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await response.json()

    if(response.ok){
      console.log("New entry added")
    }else{
      console.log(response.error)
    }
  }

  //delete an entry
  const handleDelete = async (id) =>{
    const response = await fetch('http://localhost:4000/api/personalinfo/' +id,{
      method:"DELETE"
    })
    
    if(response.ok){
      console.log("Entry deleted successfully")
    }else{
        console.log(response.error)
    }
  }
  
  //edit an entry
  const handleEdit = (id,index) =>{
    setFname(tableData[index].fname)
    setMname(tableData[index].mname)
    setLname(tableData[index].lname)
    setGender(tableData[index].gender)
    setContact(tableData[index].contact)
    setDate(tableData[index].date)
    setHobbies(tableData[index].hobbies)
    setAddress(tableData[index].address)
    setEditId(id)
    setShowEdit(true)
  }

  const handleEditSave = async ()=>{
    const response = await fetch('http://localhost:4000/api/personalinfo/'+editId,{
      method: "PATCH",
      body: JSON.stringify({fname, mname, lname, gender, contact, date, hobbies, address}),
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await response.json()

    if(response.ok){  
      console.log("Entry edited")
    }else{
      console.log(response.error)
    }
  }


  //initial data loading from the databse
  useEffect(()=>{
      const fetchData = async () =>{
        const response = await fetch('http://localhost:4000/api/personalinfo/')
        const data = await response.json()

        if(response.ok){
          setTableData(data)
        }
      }
      fetchData()
  },[tableData])


  return (
    
    <div className="table-container">
      <div className="header">
      <Button onClick={() => navigate(-1)} className="back-button1" >Back</Button> 
        <h3 className="text">Employee Personal Information</h3>
        <Button className="add-button btn-dark" onClick={handleAdd}>
        <i className="bi bi-plus-lg"></i>NEW 
        </Button>
      </div>
      <Table bordered hover size="sm">
        <thead className="thead-light thead">
        <tr>
                <th scope="col">Fisrt Name</th>
                <th scope="col">Middle Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Contact</th>
                <th scope="col">DOB</th>
                <th scope="col">Hobbies</th>
                <th scope="col">Present Address</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
         </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={data._id}>
              <td>{data.fname}</td>
              <td>{data.mname}</td>
              <td>{data.lname}</td>
              <td>{data.gender}</td>
              <td>{data.contact}</td>
              <td>{data.date}</td>
              <td>{data.hobbies}</td>
              <td>{data.address}</td>
              <td><button class="btn btn-dark"data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={() => handleEdit(data._id,index)}>Update</button></td>
              <td><button onClick={() => handleDelete(data._id)} class="btn btn-dark">Delete</button></td>
            
            </tr>
          ))}
        </tbody>
      </Table>


      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Fisrt Name</Form.Label>
              <Form.Control
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type="text"
                value={mname}
                onChange={(e) => setMname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Hobbies</Form.Label>
              <Form.Control
                type="text"
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Present Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-dark" className="btn" onClick={() => setShowAdd(false)}>
            Close
          </Button>
          <Button variant="btn btn-dark" className="btn" onClick={handleAddSave}>
            Save Changes
          </Button>
          
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text">Edit Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
            <Form.Label>Fisrt Name</Form.Label>
              <Form.Control
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type="text"
                value={mname}
                onChange={(e) => setMname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Hobbies</Form.Label>
              <Form.Control
                type="text"
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Present Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-dark" className="btn" onClick={() => setShowEdit(false)}>
            Close
          </Button>
          <Button variant="btn btn-dark" className="btn" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default PersonalInfo