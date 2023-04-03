import React, { useEffect,useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./employeeStyle.css"


const Dependents = () => {
  const [tableData, setTableData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [fullname, setFullname] = useState("");
  const [rel, setRel] = useState("");
  const [date, setDate] = useState("");
  const [occ, setOcc] = useState("");
  const [editId, setEditId] = useState(null); 

  let navigate = useNavigate();

  //add new entry
  const handleAdd = () => {
    setFullname("");
    setRel("");
    setDate("");
    setOcc("");
    setShowAdd(true);
  };

  const handleAddSave = async ()=>{
    const response = await fetch('http://localhost:4000/api/dependent/',{
      method: "POST", 
      body: JSON.stringify({fullname,rel,date,occ}),
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
    const response = await fetch('http://localhost:4000/api/dependent/' +id,{
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
    setFullname(tableData[index].fullname)
    setRel(tableData[index].rel)
    setDate(tableData[index].date)
    setOcc(tableData[index].occ)
    setEditId(id)
    setShowEdit(true)
  }

  const handleEditSave = async ()=>{
    const response = await fetch('http://localhost:4000/api/dependent/'+editId,{
      method: "PATCH",
      body: JSON.stringify({fullname,rel,date,occ}),
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
        const response = await fetch('http://localhost:4000/api/dependent/')
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
        <h3 className="text">Dependents</h3>
        <Button className="add-button btn-dark" onClick={handleAdd}>
        <i className="bi bi-plus-lg"></i>NEW 
        </Button>
      </div>
      <Table bordered hover size="sm">
        <thead className="thead-light thead">
          <tr className="role-table-heading">
          <th scope="col">Full Name</th>
          <th scope="col">Relationship</th>
          <th scope="col">DOB</th>
          <th scope="col">Occupation</th>
          <th scope="col">Update</th>
          <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={data._id}>
              <td>{data.fullname}</td>
              <td>{data.rel}</td>
              <td>{data.date}</td>
              <td>{data.occ}</td>
             
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
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Relationship</Form.Label>
              <Form.Control
                type="text"
                value={rel}
                onChange={(e) => setRel(e.target.value)}
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
              <Form.Label>Occupation</Form.Label>
              <Form.Control
                type="text"
                value={occ}
                onChange={(e) => setOcc(e.target.value)}
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
            <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Relationship</Form.Label>
              <Form.Control
                type="text"
                value={rel}
                onChange={(e) => setRel(e.target.value)}
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
              <Form.Label>Occupation</Form.Label>
              <Form.Control
                type="text"
                value={occ}
                onChange={(e) => setOcc(e.target.value)}
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

export default Dependents