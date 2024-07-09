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
    const [editingMemberId, setEditingMemberId] = useState(null);
    const[num,setNum]=useState(0);

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

    const patchMembers=async(memberId)=>{
        try{
            const updatedMember={
                name:name,
                address:{
                    city:city,
                    street:street,
                    zipcode:zipcode
                }
            };
            const response=await axiosInstance.patch(`/members/${memberId}`,updatedMember);
            console.log(response);
            fetchMembersById(memberId);
        }

        catch(e){
            console.log(e);
        }
    }

    const deleteMembers=async(memberId)=>{
        try{
            const response=await axiosInstance.delete(`/members/${memberId}`);
            console.log(response);
            fetchMembers();
        }
        catch(e){
            console.log(e);
        }
    }

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
        setId('');
        setNum(0);
    };

    const handleSearchEveryClick=()=>{
        fetchMembers();
        setId('');
        setNum(0);
    };

    const handleRegisterClick=()=>{
        registerMember();
    };

    const handlePatchClick=(memberId)=>{
        setEditingMemberId(memberId); //수정해줄 멤버 아이디를 targeting
        const member = members.find(member => member.id === memberId); // 입력칸에 원래의 데이터를 삽입시켜주기 위해
        setName(member.name);
        setCity(member.address.city);
        setStreet(member.address.street);
        setZipcode(member.address.zipcode);
        fetchMembersById(memberId); //수정할 대상만 화면에 출력하기 위해 fetch
        setNum(1);
    }

    const handleUpdateClick=()=>{
        patchMembers(editingMemberId);
        setName('');  //입력칸 비우기
        setCity('');
        setStreet('');
        setZipcode('');
    }

    const handleDeleteClick=(memberId)=>{
        deleteMembers(memberId);
    }

    useEffect(() => {
        fetchMembers(); // 컴포넌트가 처음 마운트될 때 전체 목록 가져오기
        console.log("처음시작");
    }, []);


    return(
    <>
        {num===0 &&(
            <div className="inputFind">
            
                <input type="text" className="findInput" placeholder="입력" value={id} onChange={handleInputChange}></input>
                <button className="confirmBtn" onClick={handleIdConfirmClick}>확인</button>
            
            </div>
        )}

        <div className="searchEvery">
            <button className="searchEveryBtn" onClick={handleSearchEveryClick}>전체회원검색</button>
        </div>

        {num===0 && (
            <div className="register">
            
            <input type="text" className="nameRegister" placeholder="이름" value={name} onChange={handleNameChange} ></input>
            <input type="text" className="cityRegister" placeholder="도시" value={city} onChange={handleCityChange}></input>
            <input type="text" className="streetRegister" placeholder="거리" value={street} onChange={handleStreetChange}></input>
            <input type="text" className="zipcodeRegister" placeholder="우편번호" value={zipcode} onChange={handleZipcodeChange}></input>
            <button className="registerBtn" onClick={handleRegisterClick}>회원등록</button>
        </div>
        )}

        {editingMemberId && num===1 && (
            <div className="update">
                <input type="text" className="nameUpdate" placeholder="이름" value={name} onChange={handleNameChange} ></input>
                <input type="text" className="cityUpdate" placeholder="도시" value={city} onChange={handleCityChange}></input>
                <input type="text" className="streetUpdate" placeholder="거리" value={street} onChange={handleStreetChange}></input>
                <input type="text" className="zipcodeUpdate" placeholder="우편번호" value={zipcode} onChange={handleZipcodeChange}></input>
                <button className="updateBtn" onClick={handleUpdateClick}>회원정보수정</button>
            </div>
        )}

        <div className="membersList">
                {members.map((member) => (
                    <div key={member.id} className="member">
                        <p>ID: {member.id}</p>
                        <p>이름: {member.name}</p>
                        <p>도시: {member.address.city}</p>
                        <p>거리: {member.address.street}</p>
                        <p>우편번호: {member.address.zipcode}</p>
                        <button className="patchBtn" onClick={()=>handlePatchClick(member.id)}>수정</button>
                        <button className="deleteBtn" onClick={()=>handleDeleteClick(member.id)}>삭제</button>
                        <br></br>
                    </div>
                ))}
        </div> 


    </>
    );

}