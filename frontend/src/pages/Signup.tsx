import SignUpForm from '../components/SignUpForm'
import Quote from '../components/Quote'

const Signup = () => {
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div className='w-full'>
          <SignUpForm />
        </div>
        <div className='hidden lg:block'>
          <Quote />
        </div>
      </div>
    </div>
  )
}

export default Signup