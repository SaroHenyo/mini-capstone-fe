import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

export default function AdminProducts() {
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [ratings, setRatings] = useState('1')
  const [type, setType] = useState('regular')
  const [description, setDescription] = useState('')

  // Validation
  const [invalidProductName, setInvalidProductName] = useState(false)
  const [invalidPrice, setInvalidPrice] = useState(false)
  const [invalidDescription, setInvalidDescription] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <hr />
      <Form onSubmit={handleSubmit} className="row">
        {/* PRODUCT NAME */}
        <Form.Group controlId="formProductName" className="w-50">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            isInvalid={invalidProductName}
          ></Form.Control>
        </Form.Group>

        {/* PRODUCT PRICE */}
        <Form.Group controlId="formPrice" className="w-50">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            isInvalid={invalidPrice}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Price must be a number
          </Form.Control.Feedback>
        </Form.Group>

        {/* RATINGS */}
        <Form.Group controlId="formRatings" className="w-50">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setRatings(e.target.value)}
          >
            <option value="1">1 star</option>
            <option value="2">2 star</option>
            <option value="3">3 star</option>
            <option value="4">4 star</option>
            <option value="5">5 star</option>
          </Form.Select>
        </Form.Group>

        {/* TYPE */}
        <Form.Group controlId="formType" className="w-50">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="regular">Regular</option>
            <option value="special">Special</option>
          </Form.Select>
        </Form.Group>

        {/* DESCRIPTION */}
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Control
            as="textarea"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            isInvalid={invalidDescription}
          />
          <Form.Control.Feedback type="invalid">
            Please input a product description
          </Form.Control.Feedback>
        </Form.Group>

        <div className="col-12 d-flex flex-wrap justify-content-center">
          <button
            className="bg-primary text-center text-white w-50"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </div>
      </Form>
    </>
  )
}
