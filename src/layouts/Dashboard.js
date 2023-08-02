import React from 'react'
import Card from '../components/Card'


const Dashboard = () => {
  return (
    <div className='p-10'>
      <div className='w-full'>
        <Card title={"TOTAL RUAS JALAN"} description={"Total ruas jalan di Kota Boyolali adalah"} count={200}/>
      </div>
    </div>
  )
}

export default Dashboard
