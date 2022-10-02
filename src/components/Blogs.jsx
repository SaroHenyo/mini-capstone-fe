import React from "react";
import { Link } from "react-router-dom";
import { blogs } from "../utilities/enums";

export default function Blogs() {
  const renderBlogs = () => {
    return blogs.map((blog) => (
      <div className="col-md-6 col-lg-4 card border-0 my-3" key={blog.id}>
        <img src={blog.image} alt="Blog 3" />
        <div className="card-body px-0">
          <h4 className="card-title">{blog.title}</h4>
          <p className="card-text mt-3 text-muted">{blog.body}</p>
          <p className="card-text">
            <small className="text-muted">Author: </small>
            {blog.author}
          </p>
          <Link to="/products" className="btn">
            Read More
          </Link>
        </div>
      </div>
    ));
  };

  return (
    <section id="blogs" className="py-5">
      <div className="container">
        <div className="title text-center py-5">
          <h2 className="position-relative d-inline-block">Our Latest Blog</h2>
        </div>
        <div className="row">{renderBlogs()}</div>
      </div>
    </section>
  );
}
