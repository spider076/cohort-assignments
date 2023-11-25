import { NextRequest } from 'next/server';
import React from 'react'
import { getDataFromToken } from 'ui';
import Courses from 'ui/components/Courses'

const page = () => {
    return (
        <main>
            <Courses isAdmin={false} />
      </main>
  )
}

export default page