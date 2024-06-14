import React from 'react'
import AppLayout from '../components/layout/AppLayout'

function Home() {
  return (
    <div className='text-center text-2xl p-8'>Select a friend to chat</div>
  )
}

export default AppLayout()(Home)