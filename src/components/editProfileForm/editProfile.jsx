import './styles.css';

export default function EditProfile(){
  return(
    <div className='edit-profile'>

     <div className='header'> 
      <span className="material-symbols-outlined back">arrow_back</span>
      <h2>About</h2>
     </div>
{/* form start */}
     <div className='work'>
        <h3>work</h3>
        <div>
          <span className="material-symbols-outlined">business_center</span>
          <form>
            <input type='text' placeholder='Add Work Experience' aria-label='Add Work Experience'/>
          </form>
        </div>  
        <li>
          <span className="material-symbols-outlined">business_center</span>
          Web developer
          <span className="material-symbols-outlined delete">delete</span>
        </li>
     </div>

     <div className='education'>
     <h3>Education</h3>
      <div>
        <span className="material-symbols-outlined">school</span>
        <form>
          <input type='text' placeholder='Add College/University' aria-label='Add College/University'/>
        </form>
      </div>

      <div>
        <span className="material-symbols-outlined">apartment</span>
        <form>
          <input type='text' placeholder='Add Secondary School' aria-label='Add Secondary School'/>
        </form>
      </div>
 {/* map data into list items */}
      <li>
        <span className="material-symbols-outlined">school</span>
        went at Lord Mahavira Acadmey
        <span className="material-symbols-outlined delete">delete</span></li>
      <li>
        <span className="material-symbols-outlined">apartment</span>
        studied at Boston University
        <span className="material-symbols-outlined delete">delete</span>
      </li>

     </div>

     <div className='places-lived'>
        <h3>Places Lived</h3>
        <div>
          <span className="material-symbols-outlined">home_work</span>
          <form>
            <input type='text' placeholder='Add Current Town/City' aria-label='Add Current Town/City'/>
          </form>
        </div>

        <div>
          <span className="material-symbols-outlined">location_on</span>
          <form>
            <input type='text' placeholder='Add Home Town' aria-label='Add Home Town'/>
          </form>
        </div>

     </div>
     <div className='contact-info'>
        <h3>Contact info</h3>
        <div>
          <span className="material-symbols-outlined">call</span>
          <form>
            <input type='text' placeholder='Add contact number' aria-label='Add contact number'/>
          </form>
        </div>

        <div>
          <span className="material-symbols-outlined">mail</span>
          <form>
            <input type='text' placeholder='Add email' aria-label='Add email'/>
          </form>
        </div>
     </div>

     <div className='basic-info'>
        <h3>Basic info</h3>
        <div>
          <span className="material-symbols-outlined">man</span> {/*woman*/}
          <form>
            <input type='text' placeholder='Add Gender' aria-label='Add Gender'/>
          </form>
        </div>

        <div>
          <span className="material-symbols-outlined">cake</span>
          <form>
            <input type='date' placeholder='Add Date of Birth' aria-label='Add Date of Birth'/>
          </form>
        </div>
     </div>

     <div className='relationship'>
     <h3>Relationship</h3>
        <div>
          <span className="material-symbols-outlined">favorite</span>
          <form>
            <input type='text' placeholder='Add Relationship Status' aria-label='Add Relationship Status'/>
          </form>
        </div>
     </div>

    </div>
  )
}