import React, { useEffect ,useState} from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import TopChefs from '../../components/TopChefs/TopChefs'
import Testimonials from '../../components/Testimonials/Testimonial'

const Home = () => {
  const[category,setCategory]=useState("All")
  useEffect(()=>{
    console.log(category)
  },[category])
  return (
    <div>
        <Header/>
        <TopChefs/>
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category}/>
        <Testimonials/>
        <AppDownload/>
    </div>
  )
}

export default Home