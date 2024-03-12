import React from 'react'
import CustomHeader from './CustomHeader'


const Dashboard = ({children}) => {

  
  
  
  return (
    <div>
        <CustomHeader/>
        {children}
        
    </div>
  )
}

export default Dashboard
