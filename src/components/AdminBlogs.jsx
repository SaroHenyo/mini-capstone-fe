import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionBlog from "../redux/actions/actionBlog";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function AdminBlogs() {
  const [blogName, setBlogName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const blogList = useSelector((state) => state.blogList);
  const { getAllBlogs, addBlog, deleteBlog } = bindActionCreators(
    actionBlog,
    useDispatch()
  );

  // Validation
  const [invalidBlogName, setInvalidBlogName] = useState(false);
  const [invalidAuthor, setInvalidAuthor] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);

  useEffect(() => {
    getAllBlogs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkIfValid()) {
      const body = {
        blogName: blogName,
        blogAuthor: author,
        description: description,
      };

      addBlog(body);
    }
  };

  const checkIfValid = () => {
    let isValid = true;

    // Check if blogName is valid
    if (blogName.match("^$|^.*@.*..*$")) {
      setInvalidBlogName(true);
      isValid = false;
    } else {
      setInvalidBlogName(false);
    }

    // Check if author is valid
    if (author.match("^$|^.*@.*..*$")) {
      setInvalidAuthor(true);
      isValid = false;
    } else {
      setInvalidAuthor(false);
    }

    // Check if description is valid
    if (description.match("^$|^.*@.*..*$")) {
      setInvalidDescription(true);
      isValid = false;
    } else {
      setInvalidDescription(false);
    }

    return isValid;
  };

  function MyDropzone(blog) {
    // Callback function
    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append("file", file);

      // Upload to s3
      axios
        .put(`http://localhost:8080/blog/${blog.blogId}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          console.log("file uploaded successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    // React Dropzone
    const { getRootProps } = useDropzone({ onDrop });

    // Return statement
    return (
      <div className="card h-100 text-center p-4">
        <img
          src={
            blog.imageLink
              ? `http://localhost:8080/blog/${blog.blogId}/download`
              : "/images/empty-image.jpeg"
          }
          alt={blog.blogName}
          {...getRootProps()}
        />
        <div className="card-body">
          <h5 className="card-title mb-0">
            {blog?.blogName.substring(0, 12)}...
          </h5>
          <p className="card-text lead fw-bold">{blog.blogAuthor}</p>
          <button onClick={() => deleteBlog(blog.blogId)}>DELETE</button>
        </div>
      </div>
    );
  }

  const renderBlogs = () => {
    return (
      <>
        {blogList.map((blog) => (
          <React.Fragment key={blog.blogId}>
            <div
              className="col-md-3 mb-4"
              style={{ height: "300px", width: "250px" }}
            >
              <MyDropzone {...blog} />
            </div>
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <>
      <hr />
      <Form onSubmit={handleSubmit} className="row">
        {/* BLOG NAME */}
        <Form.Group controlId="formBlogName" className="w-50">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Blog Name"
            value={blogName}
            onChange={(e) => setBlogName(e.target.value)}
            isInvalid={invalidBlogName}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please input a valid blog name
          </Form.Control.Feedback>
        </Form.Group>

        {/* BLOG AUTHOR */}
        <Form.Group controlId="formAuthor" className="w-50">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            isInvalid={invalidAuthor}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please input a valid author name
          </Form.Control.Feedback>
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
            Please input a blog description
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
      <hr />
      <div className="row justify-content-center">{renderBlogs()}</div>
    </>
  );
}
