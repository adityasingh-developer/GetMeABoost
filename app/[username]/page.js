import React from 'react'

const Username = async ({ params }) => {
    const { username } = await params;
  return (
    <div className=''>
      <h1>Welcome to {username}'s profile!</h1>
    </div>
  )
}

export default Username