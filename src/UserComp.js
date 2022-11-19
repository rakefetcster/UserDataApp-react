import './App.css';
import {useState} from 'react';


function UserComp(props) {
  const [dataArray, setData] = useState({name:'',email:''});
    
    const cancelAction = ()=>{
      props.callback([false])
    }
     function AddObj(){
      props.callback(dataArray);
    }

    return(
      
      <div className= 'newDivUser'>
      <div className='heaadlineNewUser'>
        New New User
      </div>
      <div className= 'titleAddUser'>
        Name: <input type='text' defaultValue={''} onChange={(e)=>setData({...dataArray,name:e.target.value})}/>
        <br/>
        Email: <input type='text' defaultValue={''} onChange={(e)=>setData({...dataArray,email:e.target.value})}/>
        <button className='buttonAddUser' onClick={AddObj}>Add</button>
        <button onClick={cancelAction}>Cancel</button>    
        </div>         
    </div>
  )
}

export default UserComp;
