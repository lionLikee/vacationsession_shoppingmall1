
import { axiosInstance } from "../api";
import React, { useState, useEffect } from "react";
import './shopping.css';

export function Item(){
    const [id, setId] = useState("");
    const[items,setItems]=useState([]);
    const [item_name,setName]=useState("");
    const [stock_quantity,setQuantity]=useState(0);
    const [item_price,setPrice]=useState(0);

    const fetchItem=async()=>{
        try{
            const response=await axiosInstance.get('/items/');
            setItems(response.data);
        }

        catch(e){
            console.log(e);
        }
    };

    const fetchItemById=async(itemId)=>{
        try{
            const response=await axiosInstance.get(`/items/${itemId}`);
            setItems([response.data]);
            console.log(response);
        }

        catch(e){
            console.log(e);
        }
    };

    const registerItem=async()=>{
        try{
            const newItem={item_name,stock_quantity,item_price};
            //const newItem = { item_name: name, stock_quantity: quantity, item_price: price }; 아래 입력에서 value를 원래처럼 그냥 name,quantity,price로 받을시
            const response=await axiosInstance.post('/items/',newItem);
            //setItems((prevItems) => [...prevItems, response.data]);
            fetchItem();
            console.log(response);
        }

        catch(e){
            console.log(e);
        }
    }

    const handleInputChange = (e) => {
        setId(e.target.value);
    };

    const handleConfirmClick = () => {
        fetchItemById(id);
    };

    const handleSearchEveryClick = () => {
        fetchItem();
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleRegisterClick = () => {
        registerItem();
    };

    useEffect(() => {
        fetchItem(); // 컴포넌트가 처음 마운트될 때 전체 목록 가져오기
        console.log("처음시작");
    }, []);
 
    // useEffect(() => {
    //     console.log("Item updated:", items); // items 상태가 변경될 때마다 호출
    //  }, [items]);


    return(
    <>
        <div className="inputFind">
            
            <input type="text" className="findInput" placeholder="입력" value={id} onChange={handleInputChange}></input>
            <button className="confirmBtn" onClick={handleConfirmClick}>확인</button>
            
        </div>

        <div className="searchEvery">
            <button className="searchEveryBtn" onClick={handleSearchEveryClick}>전체검색</button>
        </div>

        <div className="register">
            
            <input type="text" className="nameRegister" placeholder="상품입력" value={item_name} onChange={handleNameChange} ></input>
            <input type="text" className="quantityRegister" placeholder="수량입력" value={stock_quantity} onChange={handleQuantityChange}></input>
            <input type="text" className="priceRegister" placeholder="가격입력" value={item_price} onChange={handlePriceChange}></input>
            <button className="registerBtn" onClick={handleRegisterClick}>상품등록</button>
            
        </div>

        <div className="itemList">
                {items.map((item) => (
                    <div key={item.id} className="item">
                        <p>ID: {item.id}</p>
                        <p>이름: {item.item_name}</p>
                        <p>수량: {item.stock_quantity}</p>
                        <p>가격: {item.item_price}</p>
                        <br></br>
                    </div>
                ))}
        </div> 


    </>
    );
}