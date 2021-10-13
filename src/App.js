import React, { useState, useEffect } from 'react';
import List from './components/List';
import Alert from './components/Alert';
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show:false,
    msg: '',
    type: ''
  });

  const handleSubmit =(e)=> {
    e.preventDefault();
    if(!name){
      // setAlert({show:true, msg: 'please enter value', type: 'danger'})
      //above is legit too, but you can do it like this as well in order not to have to repeat it later:
      showAlert(true, 'danger', 'please enter value')
    }
    else if(name && isEditing){
      // deal with edit
    }
    else{
      showAlert(true, 'success', 'a new item added')
      const newItem = {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      setName('');
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({show, type, msg})
  }

  const handleClearItems = ()=> {
    setList([]);
  }

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}

        <h3>grocery list</h3>
        <div className="form-control">
          <input 
            type="text" 
            className='grocery' 
            placeholder='e.g. eggs' 
            value={name} 
            onChange={(e)=> setName(e.target.value)}
          />
          <button className='submit-btn' type='submit'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && 
      <div className="grocery-container">
      <List items={list} />
      <button className="clear-btn" onClick={handleClearItems}>clear items</button>
    </div>}
      
    </section>
  );
}

export default App;
