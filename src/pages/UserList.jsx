import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { useAppSelector } from '../app/hooks'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "../styles/UserList.css"

const UesrList = () => {

  const user = useAppSelector((state) => state.user)

  const [lists, setLists] = useState()
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)

  const [listHeading, setListHeading] = useState("")
  const [listDesc, setListDesc] = useState("")

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const navigate = useNavigate()

  const handleListCreate = async () => {
    setLoading(true)
    const newlist = await axios.post('http://localhost:3500/user/createlist', {
      listName: listHeading,
      description: listDesc
    })

    await newlist.data
    setLoading(false)

    handleClose()
    fetchData()
  }

  const deleteSubmitHandler = async (listname) => {
    setLoading(true)

    axios.delete(`http://localhost:3500/user/list/delete/${listname}/${user.data.username}`, {
      username: user?.data?.username,
      listName: listname
    })
      .then(async (res) => {
        console.log("hi in res then")
        console.log(res.data)
        let templists = lists
        templists = templists.filter((x) => {
          return x.listName !== listname
        })

        setLists(templists)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }



  const fetchData = async () => {
    setLoading(true)

    const list = await axios.post(`http://localhost:3500/user/list`, {
      username: user?.data?.username
    })
    await list.data
    console.log(list.data)

    setLists(list.data)

    setLoading(false)
  }


  useEffect(() => {
    fetchData()
    document.title = "My Lists"
  }, [, user])

  useEffect(() => {
    
  }, [lists])
  
  useEffect(() => {
    if (!user.isLoggedIn) navigate('/user/login')
  }, [])

  return (
    <>
      {
        loading ?
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Loader />
          </div>
          :
          <>
            <Navbar />
            <div class="userlist-main">
              <div class="userlist-content">
                <div class="userlist-adder-section">
                  <button type="button" class="btn btn-outline-warning button-adder" onClick={handleShow}>
                    <div class="button-desc">Create a New List</div>
                    <p> {/* error here */} </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                    </svg>
                  </button>
                </div>
                <div class="network-section-heading">My Lists</div>

                <div class="list-contents">
                  {lists.length === 0 ?
                    <p class="noLists">You have not created any lists yet!</p>
                    :
                    <>
                      {lists.map((item, index) => (
                        <div class="list-element-container">
                          <div class="list-image-container">
                            {item.items.length === 0 ?
                              <img class="list-image" src={"https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"} alt="image" />
                              :
                              <img class="list-image" src={"https://image.tmdb.org/t/p/original" + item.items[0].poster_path} alt="image" />
                            }
                            {console.log(item)}
                          </div>
                          <div class="list-content">
                            <div class="list-metadata">
                              <div class="list-header">
                                <a style={{ textDecoration: "none" }} onClick={() => navigate("/user/list/" + item.listName.split(" ").join("%20"))} > <div class="mylist-name"> {item.listName} </div> </a>
                              </div>
                              <>
                                <button type="button" class="delete-button" onClick={() => deleteSubmitHandler(item.listName)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="grey" class="bi bi-trash-fill" viewBox="0 0 16 16" opacity="0.8">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                  </svg>
                                </button>
                              </>
                            </div>
                            <div class="list-desc">
                              {item.description}
                            </div>
                            <div class="list-creation">
                              Created on
                              <div class="list-date"> {item.createdAt.toString().slice(0, 15)} </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  }
                </div>
              </div>
            </div>
            <Modal show={showModal} className='custom_modal' onHide={handleClose} backdrop="static">
              <Modal.Header>
                <Modal.Title>Create a New List</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Enter the list name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Example List"
                      autoFocus
                      onChange={(e) => setListHeading(e.target.value)}
                      className='content-modal-bgcolor'
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Enter the list description</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Example List Description"
                      rows={3} className='content-modal-bgcolor'
                      onChange={(e) => setListDesc(e.target.value)} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="warning" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="info" onClick={handleListCreate}>
                  Create List
                </Button>
              </Modal.Footer>
            </Modal>
            <Footer />
          </>}
    </>

  )
}

export default UesrList