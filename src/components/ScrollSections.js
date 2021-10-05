import { useContext, useEffect } from "react"
import NormalizedScrollSection from "./scroll/NormalizedScrollSection"
import ScrollContext from "../context/ScrollContext"


const ScrollSections = () => {
  
  const { scrollProgress } = useContext(ScrollContext)
  
  useEffect(() => {
    console.log('s',scrollProgress)
  })

  return (
    <>
      <NormalizedScrollSection scroll={scrollProgress} start={0} end={0.1}/>
    </>
  )
}

export default ScrollSections