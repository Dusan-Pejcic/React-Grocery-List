import React, { useState, useEffect } from 'react';
import List from './components/List';
import Alert from './components/Alert';
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show:false,
                                      msg: '',
                                      type: ''})

  const handleSubmit =(e)=> {
    e.preventDefault();
    console.log('hello');
  }

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert />}
        <h3>grocery list</h3>
        <div className="form-control">
          <input type="text" className='frocery' placeholder='e.g. eggs' value={name} onChange={(e)=> setName(e.target.vlue)}/>
          <button className='submit-btn' type='submit'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <List />
        <button className="clear-btn">
            clear items
          </button>
      </div>
    </section>
  );
}

export default App;
