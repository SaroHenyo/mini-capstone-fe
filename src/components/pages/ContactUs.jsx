import React from "react";
import Footer from "../Footer";

export default function ContactUs() {
  return (
    <section id="contactUs">
      <div className="container p-5">
        <div className="row align-items-center">
          <div className="col-lg-4">
            <img src="/images/cntact.jpg" alt="contact" className="w-100" />
          </div>
          <div className="col-lg-6 offset-lg-1">
            <form>
              <div className="mb-3">
                <small>Name</small>
                <input type="text" className="form-control" id="inputName" />
              </div>
              <div className="mb-3">
                <small>Email</small>
                <input type="email" className="form-control" id="inputEmail" />
              </div>
              <div className="mb-3">
                <small>Message</small>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="4"
                  className="form-control"
                ></textarea>
                <button type="submit" className="btn btn-danger my-2">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <Footer />
    </section>
  );
}
