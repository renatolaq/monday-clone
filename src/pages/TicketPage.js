import {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import CategoriesContext from '../context'

const TicketPage = ({ editMode }) => {

  // const { categories, setCategories} =  useContext(CategoriesContext)

  const [formData, setFormData ] = useState({
    status: 'not started',
    // category: categories[0],
    progress: 0,
    timestamp:  new Date().toISOString()
  })

  // const editMode = false
  // const { categories, setCategories } = useContext(CategoriesContext)

  const navigate = useNavigate()

  let {id} = useParams()

  const handlerSubmit =  async (e) =>{
    // console.log('Submited')
    e.preventDefault()

    if (editMode) {
      const response = await axios.put(`http://localhost:8000/tickets/${id}`, {
        data: formData
      })
      const success = response.status === 200
      if (success){
        navigate('/')
      }
      
    }

    if(!editMode){
      const response = await axios.post('http://localhost:8000/tickets', {
        formData
      })
      const success = response.status === 200
      if (success) {
        navigate('/')
      }


    }

  }
  
  

  useEffect(() => {
    if (editMode) fetchData()
  }, [])


  const handlerChange = (e) =>{
    // console.log('changed')

    const value = e.target.value
    const name = e.target.name

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

    // --- populate ---
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8000/tickets/${id}`)
      setFormData(response.data.data)
      console.log('Dados', response.data.data)
  
    }
  console.log(formData)

  const categories = ['Afazeres', 'Finanças', 'Orçamentos']

  return (
    <div className='ticket'>
      <h1>{editMode ? 'Update your Ticket' : 'Create a Ticket' } </h1>
      <div className="ticket-container">
        <form onSubmit={handlerSubmit}>
          <section>
            <label htmlFor='title'>Title</label>
            <input
              id='title'
              name='title'
              type='text'
              onChange={handlerChange}
              required={true}
              value={formData.title}

            />

            <label htmlFor='description'>Description</label>
            <input
              id='description'
              name='description'
              type='text'
              onChange={handlerChange}
              required={true}
              value={formData.description}

            />
            <label>Category</label>
            <select 
              name='category'
              value={formData.category}
              onChange={handlerChange}
              >
              {categories?.map((category, _index) => (
                <option key={_index} value={category}>{category}</option>
              ))}
              


            </select>

            <label htmlFor='new-category'>New Category</label>
            <input
              id='category'
              name='category'
              type='text'
              onChange={handlerChange}
              // required={true}
              value={formData.category}

            />

            <label>Priority</label>
            <div className='multiple-input-container'>
              <input
                id='priority-1'
                name='priority' 
                type='radio'
                onChange={handlerChange}
                value={1}
                checked={formData.priority == 1} 
                />
                <label htmlFor='priority-1'>1</label>

                <input
                id='priority-2'
                name='priority' 
                type='radio'
                onChange={handlerChange}
                value={2}
                checked={formData.priority == 2} 
                />
                <label htmlFor='priority-2'>2</label>

                <input
                id='priority-3'
                name='priority' 
                type='radio'
                onChange={handlerChange}
                value={3}
                checked={formData.priority == 3} 
                />
                <label htmlFor='priority-3'>3</label>

                <input
                id='priority-4'
                name='priority' 
                type='radio'
                onChange={handlerChange}
                value={4}
                checked={formData.priority == 4} 
                />
                <label htmlFor='priority-4'>4</label>

                <input
                id='priority-5'
                name='priority' 
                type='radio'
                onChange={handlerChange}
                value={5}
                checked={formData.priority == 5} 
                />
                <label htmlFor='priority-5'>5</label>
            </div>
            {editMode && 
            <>
             <label htmlFor='progress'>Progress</label>
            <input 
              type='range'
              id='progress'
              name='progress'
              value={formData.progress}
              min='0'
              max='100'
              onChange={handlerChange}
            />
           
            {/* {'}'} */}

            <label>Status</label>
            <select 
              name='status'
              value={formData.status}
              onChange={handlerChange}

            >
              <option  selected={formData.status === 'done'} value='done'>Done</option>
              <option  selected={formData.status === 'working on it'} value='working on it'>Working on it</option>
              <option  selected={formData.status === 'stuck'} value='stuck'>Stuck</option>
              <option  selected={formData.status === 'not started'} value='not started'>Not Started</option>
            </select>
            </>}

           
          </section>

          <section>
            <label htmlFor='owner'>Owner</label>
            <input 
              id='owner'
              name='owner'
              type='text'
              onChange={handlerChange}
              required={true}
              value={formData.owner}
              />

            <label htmlFor='avatar'>Avatar</label>
            <input 
              id='avatar'
              name='avatar'
              type='url'
              onChange={handlerChange}
              required={true}
              value={formData.avatar}
              />

            <div className='img-preview'>
              {formData.avatar && (
                <img src={formData.avatar} alt='image preview'/>
              )}
            </div>
            {/* <input type='submit'  placeholder="Enter name"/> */}
            <button type="submit" value="Submit">Gravar </button>
          </section>

        </form>
      </div>
    </div>
  )
}

export default TicketPage