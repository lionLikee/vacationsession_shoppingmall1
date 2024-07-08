import { axiosInstance } from "../api";
import React, { useState, useEffect } from "react";
import './shopping.css';

export function Members(){
    const[id,setId]=useState('');
    const[name,setName]=useState('');
    const[city,setCity]=useState('');
    const[street,setStreet]=useState('');
    const[zipcode,setZipcode]=useState('');
    const[members,setMembers]=useState([]);

    const fetchMembers=async()=>{
        try{
            const response=await axiosInstance.get('/members/');
            setMembers(response.data);
            console.log(response);
        }

        catch(e){
            console.log(e);
        }
    };

    const fetchMembersById=async(memberId)=>{
        try{
            const response=await axiosInstance.get(`/members/${memberId}`);
            setMembers([response.data]);
            console.log(response);
        }

        catch(e){
            console.log(e);
        }
    };

    const registerMember=async()=>{
        try {
            const newMember = {
                name: name,
                address: {
                    city: city,
                    street: street,
                    zipcode: zipcode
                }
            };
            const response=await axiosInstance.post('/members/',newMember);
            console.log(response);
            fetchMembers();
        }

        catch(e){
            console.log(e);
        }
    };

    const handleInputChange=(e)=>{
        setId(e.target.value);
    };
    
    const handleNameChange=(e)=>{
        setName(e.target.value);
    };

    const handleCityChange=(e)=>{
        setCity(e.target.value);
    };

    const handleStreetChange=(e)=>{
        setStreet(e.target.value);
    };

    const handleZipcodeChange=(e)=>{
        setZipcode(e.target.value);
    };

    const handleIdConfirmClick=()=>{
        fetchMembersById(id);
    };

    const handleSearchEveryClick=()=>{
        fetchMembers();
    };

    const handleRegisterClick=()=>{
        registerMember();
    };

    useEffect(() => {
        fetchMembers(); // 컴포넌트가 처음 마운트될 때 전체 목록 가져오기
        console.log("처음시작");
    }, []);


    return(
    <>
        <div className="inputFind">
            
            <input type="text" className="findInput" placeholder="입력" value={id} onChange={handleInputChange}></input>
            <button className="confirmBtn" onClick={handleIdConfirmClick}>확인</button>
            
        </div>

        <div className="searchEvery">
            <button className="searchEveryBtn" onClick={handleSearchEveryClick}>전체회원검색</button>
        </div>

        <div className="register">
            
            <input type="text" className="nameRegister" placeholder="이름" value={name} onChange={handleNameChange} ></input>
            <input type="text" className="cityRegister" placeholder="도시" value={city} onChange={handleCityChange}></input>
            <input type="text" className="streetRegister" placeholder="거리" value={street} onChange={handleStreetChange}></input>
            <input type="text" className="zipcodeRegister" placeholder="우편번호" value={zipcode} onChange={handleZipcodeChange}></input>
            <button className="registerBtn" onClick={handleRegisterClick}>회원등록</button>
            
        </div>

        <div className="membersList">
                {members.map((member) => (
                    <div key={member.id} className="member">
                        <p>ID: {member.id}</p>
                        <p>이름: {member.name}</p>
                        <p>도시: {member.address.city}</p>
                        <p>거리: {member.address.street}</p>
                        <p>우편번호: {member.address.zipcode}</p>
                        <br></br>
                    </div>
                ))}
        </div> 


    </>
    );

}