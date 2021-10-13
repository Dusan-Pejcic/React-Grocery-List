import React, { useState, useEffect } from 'react';
import List from './components/List';
import Alert from './components/Alert';
function App() {
  const [itemTitle, setItemTitle] = useState('');
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
    if(!itemTitle){
      // setAlert({show:true, msg: 'please enter value', type: 'danger'})
      //above is legit too, but you can do it like this as well in order not to have to repeat it later:
      showAlert(true, 'danger', 'please enter value')
    }
    else if(itemTitle && isEditing){
      // deal with edit
      setList(list.map((item)=> {
        if(item.id === editId){
          return {...item, title:itemTitle}
        }
        return item
      }))
      setItemTitle('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed')
    }
    else{
      showAlert(true, 'success', 'a new item added')
      const newItem = {id: new Date().getTime().toString(), title: itemTitle};
      setList([...list, newItem]);
      setItemTitle('');
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({show, type, msg})
  }

  const handleClearItems = ()=> {
    setList([]);
    showAlert(true, 'danger', 'the list is cleared')
  }

  const removeItem = (id)=> {
    const newList = list.filter((item)=> item.id !== id)
    setList(newList);
    showAlert(true, 'danger', 'item removed')
  }

  const editItem = (anId)=> {
    const itemToEdit = list.find((item)=> item.id === anId);
    setIsEditing(true);
    setEditId(anId);
    setItemTitle(itemToEdit.title);
  }

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>grocery list</h3>
        <div className="form-control">
          <input 
            type="text" 
            className='grocery' 
            placeholder='e.g. eggs' 
            value={itemTitle} 
            onChange={(e)=> setItemTitle(e.target.value)}
          />
          <button className='submit-btn' type='submit'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && 
      <div className="grocery-container">
      <List list={list} removeItem={removeItem} editItem={editItem}/>
      <button className="clear-btn" onClick={handleClearItems}>clear items</button>
    </div>}
      
    </section>
  );
}

export default App;
