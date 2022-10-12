import React, { useEffect } from 'react'
import AdminBlogs from '../AdminBlogs'
import AdminPopularProducts from '../AdminPopularProducts'
import AdminProducts from '../AdminProducts'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.email !== 'saro@admin.com') {
      navigate('/')
    }
  }, [navigate])

  if (localStorage.email !== 'saro@admin.com') {
    return
  }

  return (
    <div className="admin">
      <div className="content">
        <h3>Products</h3>
        <AdminProducts />
        <br />
        <br />
        <h3>Blogs</h3>
        <AdminBlogs />
        <br />
        <br />
        <h3>Popular of this Year</h3>
        <AdminPopularProducts />
      </div>
    </div>
  )
}
