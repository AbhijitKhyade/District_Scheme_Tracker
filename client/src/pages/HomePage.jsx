import React from 'react'
import NavbarList from '../components/NavbarList'

export default function HomePage() {
  return (
    <div className="overflow-y-hidden">
      <NavbarList />
      <div className="w-full h-full">
        <div className="flex justify-center items-center h-full">
          <h1 className="text-4xl font-bold">Welcome to District Scheme Tracker</h1>
        </div>
      </div>
    </div>
  )
}
