import React from 'react'
import Courses from 'ui/components/Courses'

const page = () => {
    return (
        <main>
            <Courses isAdmin={true} />
        </main>
    )
}

export default page