import axios from "axios";
import React, { useEffect, useState } from "react";
import JSON from 'jsonata';

const API_URL = "https://aqueous-dusk-15135.herokuapp.com/logamorph"
const API_POST_URL_GROW = "https://aqueous-dusk-15135.herokuapp.com/logamorph/1/carrots/"
// const API_POST_URL_DELETE = "https://aqueous-dusk-15135.herokuapp.com/carrots/"

const getAPIData = () => {
    console.log('reached')
    return axios.get(API_URL).then((response) => response.data)
}


async function doPostRequest(loga) {
    // /logamorph/:logamorph_id/carrots(.:format)
    // let payload = {logamorph_id: 1};
    let time = Date.now()
    
    // let res = await axios.post(API_POST_URL_GROW, payload);
    // {"id":1,"logamorph_id":1,"created_at":"2022-08-30T03:54:23.154Z","updated_at":"2022-08-30T03:54:23.154Z"}
    // let data = res.data;
    // console.log(data);
    axios({
        method: 'post',
        url: API_POST_URL_GROW,
        data: {
            name: loga,
            created_at: time,
            updated_at: time,
        }
    })

}

const Monster = () => {
    //  Counter is a state initialized to 0
    const [counter, setCounter] = useState({
        grew: '',
        ate: ''
     });
    // 
    useEffect(() =>{
        
        let mounted = true
        getAPIData().then((items) => {
           
           
            if (mounted){
                let eaten = 0
                let grown = 0
                var expression = JSON("name");
                var result = expression.evaluate(items);
                for(let i = 0; i <result.length; i++){
                    if(result[i]==1){
                        grown = grown + 1 
                    }
                    if(result[i]==2){
                        eaten = eaten + 1 
                    }
                }
                let size = Object.keys(items).length;
                setCounter({grown: grown - eaten, eaten: eaten})
                console.log("mounted")
            }
        })
    },[])
    
    const eatCarrot = () => {
        
        
        
        doPostRequest(2)
        
    }
    // Function is called everytime increment button is clicked
    const handleClick1 = () => {
      // Counter state is incremented
        doPostRequest(1)
    } 
    
    // Function is called everytime decrement button is clicked
    const handleClick2 = () => {
      // Counter state is decremented
      eatCarrot()
    }
    const handleClick3 = (counter) => {
    //     // Counter state is decremented
        
    //     async function drop(){ axios.delete(`${API_POST_URL_DELETE}${15}`) // <-- remove ;
    //     .then(res => {
    //     const users = res.data;
    //     console.log(users)
    //     })
    //   }
    //   drop()
    }
    
    
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '300%',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '-15%',
      }}>
       LOGAMORPH
        <div style={{
          fontSize: '120%',
          position: 'relative',
          top: '10vh',
        }}>
          {counter.eaten}
        </div>
        <div className="buttons">
          <button style={{
            fontSize: '60%',
            position: 'relative',
            top: '20vh',
            marginRight: '5px',
            backgroundColor: 'green',
            borderRadius: '8%',
            color: 'white',
          }}
            onClick={handleClick1}>GROW CARROTS</button>
          <button style={{
            fontSize: '60%',
            position: 'relative',
            top: '20vh',
            marginLeft: '5px',
            backgroundColor: 'red',
            borderRadius: '8%',
            color: 'white',
          }}
            onClick={handleClick2}>EAT CARROTS</button>
            <button style={{
            fontSize: '60%',
            position: 'relative',
            top: '20vh',
            marginLeft: '5px',
            backgroundColor: 'red',
            borderRadius: '8%',
            color: 'white',
          }}
            onClick={handleClick3(counter)}>RESET</button>
        </div>
        <div>   
        FARM
        </div>
        <div style={{
          fontSize: '120%',
          position: 'relative',
          top: '10vh',
        }}>
          {counter.grown}
        </div>
      </div>
    )
  }
    
  export default Monster