import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png'
const Logo =()=>{
    return (
        <div className='ma4 mt0' >
        <Tilt  style={{ display:'flex',justifyContent:'center', height:'200px', width:'200px' }} className='br2 shadow-6 Tilt '>
          <div className='innertilt pa3' style={{height:'100px', width:'100px'}}>
            <h1> <img style={{paddingTop:'5px', paddingBottom:'auto'}} src={brain} alt='logo'></img></h1>
          </div>
        </Tilt>
        </div>
      );
}
export default Logo