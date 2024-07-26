import React from 'react'
import {menu_list} from '../../assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Exlpore our menu </h1>
        <p className="explore-menu-text">Indulge in a dining experience like no other with our meticulously curated menu, featuring a deliberate array of dishes designed to tantalize your taste buds. </p>
        <div className="explore-menu-list">
            {
                menu_list.map((item,index)=>{
                    return(
                        // if the value selected by the user is = to the value already selected then Category ALL
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })
            }
        </div>
        <hr />

    </div>
  )
}

export default ExploreMenu