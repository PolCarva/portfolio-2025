import React from 'react'

export default function Content() {
  return (
    <div className='bg-[#00000080] py-8 px-8 h-full w-full flex flex-col justify-between'>
        <Section1 />
        <Section2 />
    </div>
  )
}

const Section1 = () => {
    return (
        <div>
            <Nav />
        </div>
    )
}

const Section2 = () => {
    return (
        <div className='flex justify-between flex-col md:flex-row items-start md:items-end gap-4'>
            <h1 className='text-4xl md:text-[10vw] leading-[0.8] mt-10'>pablo carvalho</h1>
            <p>©copyright {new Date().getFullYear()}</p>
        </div>
    )
}

const Nav = () => {
    return (
        <div className='flex shrink-0 gap-20'>
            <div className='flex flex-col gap-2'>
                <h3 className='mb-2 text-gray font-bold'>menu</h3>
                <p>home</p>
                <p>projects</p>
                <p>about</p>
                <p>contact</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='mb-2 text-gray font-bold'>social</h3>
                <p>instagram</p>
                <p>linkedin</p>
                <p>github</p>
            </div>


        </div>
    )
}