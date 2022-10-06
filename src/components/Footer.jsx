import { Icon } from '@iconify/react'
import React from 'react'

export default function Footer() {
  return (
    // Main Container
    <div className="bg-primary w-full h-2/4">
      {/* Footer Container */}
      <div className="container-fluid sm:flex-col">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center pl-10">
          <img className="h-12" src={'/'} alt="logo" />
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-semibold text-xl text-white">
              E-Commerce Website
            </h1>
            <h3 className="font-extralight text-white text-center text-sm">
              Community Building, Enriching through Technology
            </h3>
          </div>
        </div>
        <div className="flex text-white">
          <div className="flex flex-col justify-between md:flex-row relative w-full h-full sm:flex-col p-3">
            {/* Contact Us */}
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-semibold text-xl">Contact Us</h1>
              <h3 className="font-extralight text-center text-sm">
                (044) 7521-7000
              </h3>
              <h3 className="font-extralight text-center text-sm">
                helpdesk@salesteam.com
              </h3>
            </div>
            {/* Operating Hours */}
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-semibold text-xl">Operating Hours</h1>
              <h3 className="font-extralight text-center text-sm">
                Monday - Friday 9:00 AM - 5:00 PM
              </h3>
              <h3 className="font-extralight text-center text-sm">
                Saturday 10:00 AM - 4:00 PM
              </h3>
            </div>
            {/* Address */}
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-semibold text-xl">Address</h1>
              <h3 className="font-extralight text-center text-sm">
                San Rafael Bulacan, <br />
                <span>Bulacan, Philippines</span>
              </h3>
            </div>
          </div>
        </div>
        <ul className="alpha flex flex-row justify-center pl-10">
          <a
            className="beta"
            href="https://www.facebook.com/digital7money"
            target="_blank"
            rel="noreferrer"
          >
            {' '}
            <li className="charlie">
              <Icon
                className="alpha beta delta"
                icon="akar-icons:facebook-fill"
              />
            </li>
          </a>
          <a
            className="beta"
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <li className="charlie">
              <Icon
                className="alpha beta delta"
                icon="ant-design:instagram-filled"
              />
            </li>
          </a>
          <a
            className="beta"
            href="https://www.twitter.com/CryptoHenyo"
            target="_blank"
            rel="noreferrer"
          >
            <li className="charlie">
              <Icon
                className="alpha beta delta"
                icon="ant-design:twitter-circle-filled"
              />
            </li>
          </a>
          <a
            className="beta"
            href="https://www.telegra.org"
            target="_blank"
            rel="noreferrer"
          >
            <li className="charlie">
              <Icon
                className="alpha beta delta"
                icon="akar-icons:telegram-fill"
              />
            </li>
          </a>
          <a
            className="beta"
            href="https://www.youtube.com"
            target="_blank"
            rel="noreferrer"
          >
            <li className="charlie">
              <Icon className="alpha beta delta" icon="fa:youtube" />
            </li>
          </a>
        </ul>
      </div>
    </div>
  )
}
