import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { socket } from '../../main'
import { Ilanch } from '../../types/launch/launch'
import data from '../../data/missiles.json'


function Launch() {
    const [launch ,setLaunch] = useState<any>(null)
    const [to ,setTo] = useState<string | undefined>('')
    const [type ,setType] = useState<string | undefined>('')
    const [reslaunch ,setResLaunch] = useState<any[]>([])
    const [fire ,setFire] = useState<number>(0)
    const [time ,setTime] = useState<number>(0)
    const {user} = useAppSelector((state) => state.user)
    
    useEffect(( )=>{
        const missiles = data.find((miss) => miss.name === type);
        if (missiles){
            setTime(missiles!.speed)
        }
    },[type])

    useEffect(( )=>{
        setLaunch({
            type ,
            orgLaunche:user?.organization.split(' ')[0],
            to,
            organizationId:user?._id
        })
        // getSpeedByName(type)
        // console.log(type)
    },[to ,type])
    
    socket.on('launchedToIsrael',(reslanch)=>{
        setResLaunch([...reslaunch , reslanch])
        // console.log(reslanch)
        console.log('launchedToIsrael')
    })
    useEffect(( )=>{
        if (fire >= 1) {
            socket.emit('newLaunch',launch)
        }
        // console.log(launch)
    },[fire])
    const hendleLaunch = (typei:string ,amount:number)=>{
        setType(typei)
        setLaunch({
            type :typei,
            orgLaunche:user?.organization.split(' ')[0],
            to,
            organizationId:user?._id
        }) 
        setFire(fire +1)
        if (amount <= 0)return
        // console.log(launch)    
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
        <div className='main'>
        <div>launch rockets</div>
        <div>
            <table>
                <tr>
                    <th>rocket</th>
                    <th>time to hit</th>
                    <th>status</th>
                </tr>
                {reslaunch && reslaunch.map((e)=>
                <tr>
                    <td>{e.type}</td>
                    <td>{time}</td>
                    <td>{!e.intercepted && <p>active</p>}</td>
                </tr>)}
            </table>  
        </div>

        </div>
        
    </div>
  )
}

export default Launch