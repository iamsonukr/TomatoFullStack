import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {
  const [list, setList] = useState([])

  // fetching the fooditems
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/listfood`)
      setList(response.data.data)
    } catch (error) {
      toast.error("error")
    }
  }
  useEffect(() => {
    fetchList()
  },[])

  // Removing the food
  const removeFood=async(foodId)=>{
    try {
      const response=await axios.post(`${url}/api/food/remove`,{
        "id":foodId
      })
      console.log("Item deleted successfully")
      toast.success(response.data.message)
    } catch (error) {
      toast.success(response.data.message)
      toast.error(error)
    }
  }

  return (
    <div >
      <div className="flex-col list add listMain" >
        <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {
            list.map((item,index)=>{
              console.log(item.image)
              return(
                <div key={index} className='list-table-format'>
                  <img src={`${url}/images/`+item.image} alt="" />
                  {/* <img src={`http://localhost:5001/images/`+item.image} alt="" /> */}
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.price}</p>
                  <p className='cursor' onClick={()=>removeFood(item._id)} >X</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default List