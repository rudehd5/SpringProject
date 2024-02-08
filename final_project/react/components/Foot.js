import React from 'react'
import '../css/foot.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons';

function footer() {
  return (
    <div className='footer'>
      <div className='icon'>
      <p><FontAwesomeIcon icon={faPaw} size="2x" /></p>
      </div>
      <div className='contents'>
        create by         박지완         김강일         김덕희         이경동         추건휘
      </div>
    </div>
  )
}

export default footer;