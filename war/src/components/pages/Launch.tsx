import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { socket } from '../../main'
import { Ilanch } from '../../types/launch/launch'

function Launch() {
    const [launch ,setLaunch] = useState<any>(null)
    const [to ,setTo] = useState<string | undefined>('')
    const [type ,setType] = useState<string | undefined>('')

    // const navigate = useNavigate()
    // const dispach = useAppDispatch()
    const {user} = useAppSelector((state) => state.user)

    useEffect(( )=>{
        setLaunch({
            type ,
            orgLaunche:user?.organization.split(' ')[0],
            to,
            organizationId:user?._id
        })
        console.log(launch)
    },[user ,to ,type])

   socket.on('launchedToIsrael',()=>{
        console.log('launchedToIsrael')
    })
    const hendleLaunch = (type:string ,amount:number)=>{

        setType(type) 
        setLaunch({
            type ,
            orgLaunche:user?.organization.split(' ')[0],
            to,
            organizationId:user?._id
        })

        if (amount <= 0)return
        console.log(launch)
        socket.emit('newLaunch',launch)
         
    }
 
return (
    <div className='launch'>
        <h1>organization {user?.organization.split(' ')[0]}</h1>
        <div className='headerLaunch'>
            <div className='location'>
                <p>location</p>
                <select
                 onChange={(e)=>{setTo(e.target.value)}}>
                    <option 
                    disabled={true}
                    value="North">celect location</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="Center">Center</option>
                    <option value="West Bank">West Bank</option>
                </select>
            </div>
            <div className='rocket'>{user?.resources.map((e) => <div key={e.resources} className='in_rocket'>
                <p>type : {e.name}</p>
                <p>amount : {e.amount}</p>
                <button 
                disabled={e.amount <= 0 || to == ""}
                 onClick={()=>{
                    hendleLaunch(e.name ,e.amount)}}>launch</button>
               </div>)}
            </div>
        </div>
        <div>launch rockets</div>
        <div>
            <table>
                <tr>
                    <th>rocket</th>
                    <th>time to hit</th>
                    <th>status</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                </tr>
            </table>
   
        </div>
        <div className='main'>

        </div>
        
    </div>
  )
}

export default Launch