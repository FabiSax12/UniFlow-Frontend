const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className='text-xl md:text-2xl lg:text-3xl font-bold'>
      {children}
    </h2>
  )
}

export default SectionTitle