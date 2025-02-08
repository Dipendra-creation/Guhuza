

const login = () => {
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <form action="">
                <div className='mb-3'>
                <label htmlFor='email'>Email</label>
                <input type="email" name="email" id="email" placeholder='Enter you Email' className='form-control' />
                </div>

                <div className='mb-3'>
                <label htmlFor='password'>Password</label>
                <input type="password" name="password" id="password" placeholder='Enter you password' className='form-control' />
                </div>

                <button className='btn btn-success' >Login</button> 
               
            </form>
        </div>
    </div>
  )
}

export default login