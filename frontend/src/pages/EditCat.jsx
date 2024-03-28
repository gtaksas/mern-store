import React, {useState, useEffect} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCat = () => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8888/cats/${id}`)
    .then((response) => {
      setOwner(response.data.owner);
      setAge(response.data.age);
      setName(response.data.name);
      setLoading(false)
    }).catch((error) => {
      setLoading(false);
      alert('An error happened. Please Check console');
      console.log(error)
    });
  }, [])
  const handleEditCat = () => {
    const data = {
      name,
      owner,
      age,
    };
    setLoading(true);
    axios
      .put(`http://localhost:8888/cats/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      })
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3x1 my-4'>Edit Cat</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Owner</label>
          <input
            type='text'
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Age</label>
          <input
            type='number'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditCat}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditCat