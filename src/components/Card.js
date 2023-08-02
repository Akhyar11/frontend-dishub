import React from 'react'
import { MdAssistantDirection } from 'react-icons/md'

const Card = ({title, description, count}) => {
  return (
    <div className='flex'>
      <div className='w-1/2 bg-white h-52 rounded-md shadow-md mr-2 text-center pt-2'>
          <h1 className='font-semibold'>{title}</h1>
          <span>{description}</span>
          <br />
          <div className='flex max-w-fit mx-auto items-center mt-2 p-1 px-4 rounded-full bg-gray-300 text-sky-800 font-semibold transition-all hover:bg-sky-500'>
            <MdAssistantDirection className='mr-1'/>
            <p>{count} Ruas</p>
          </div>
      </div>
    </div>
  )
}

export default Card
