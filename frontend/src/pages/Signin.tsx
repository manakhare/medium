import Quote from '../components/Quote'
import SignInForm from '../components/SignInForm'


const Signup = () => {

  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div className='w-full'>
          <SignInForm />
        </div>
        <div className='hidden lg:block'>
          <Quote />
        </div>
      </div>
    </div>
  )
}

export default Signup