
import { axiosInstance } from "../api";
import React, { useState, useEffect } from "react";
import './shopping.css';



export function Orders(){
    const [member_id, setMemberId] = useState('');
    const [item_id,setItemId]=useState('');
    const [order_id,setOrderId]=useState('');
    const [status, setStatus] = useState('');
    const [count,setCount]=useState('');
    const [items, setItems] = useState([{ item_id: '', count: '' }]);
   // const [ordersByMember, setOrdersByMember] = useState({member_id: null,orders:[]});
    const [ordersByMember, setOrdersByMember] = useState('');
    const [orderById, setOrderById] = useState('');
    const [num,setNum]=useState(0);

    
    const fetchOrdersByMemberId=async(member_id)=>{
        try{
            const response=await axiosInstance.get(`/orders/?memberid=${member_id}`);
            setOrdersByMember(response.data);
            //setOrders(Array.isArray(response.data) ? response.data : []);
            console.log(response);
        }
        catch(e){
            console.log(e);
        }
    }

    const fetchOrderByOrderId=async(orderId)=>{
        try{
            const response=await axiosInstance.get(`/orders/${orderId}`);
            //setOrders([response.data]);
            setOrderById(response.data);
            console.log(response);
        }   
        catch(e){
            console.log(e);
        }
    }

    const orderItem=async()=>{
        try{
            const newOrder={
                member_id: member_id,
                status: status,
                items:[{
                    item_id: item_id,
                    count: count
                }]
            }

            const response=await axiosInstance.post('/orders/',newOrder);
            console.log(response);
            fetchOrdersByMemberId(member_id);
            //console.log(count);

        }
        catch(e){
            console.log(e);
        }
    }

    const handleMemberIdChange=(e)=>{
        //setMemberId(e.target.value?parseInt(e.target.value,10):0);  useState에서 초기값을 0 즉 member_id의 값을 integer로 하고 싶다면 이 방법 사용?
        setMemberId(e.target.value);
    };

   
    const handleStatusChange=(e)=>{
        setStatus(e.target.value);
    };

    const handleItemIdChange=(e)=>{
        //setItemId(e.target.value?parseInt(e.target.value, 10):0);
        setItemId(e.target.value);
    };

    const handleCountChange=(e)=>{
        //setCount(e.target.value?parseInt(e.target.value, 10):0);
        setCount(e.target.value);
    };  
    
    const handleOrderIdChange=(e)=>{
        //setCount(e.target.value?parseInt(e.target.value, 10):0);
        setOrderId(e.target.value);
    };  


    const handleOrderItem=()=>{
        orderItem();
    };

    const handleIdConfirmClick=()=>{
        fetchOrdersByMemberId(member_id);
        setNum(1);  //orderList1을 출력하기 위해
    };

    const handleOrderNumInput=()=>{
        fetchOrderByOrderId(order_id);
        setNum(0);  //orderList2를 출력하기 위해
    }

    // useEffect(()=>{

    // },[member_id,order_id]);

    return(
    <>
        <div className="inputFind">
            <input type="text" className="findInput" placeholder="회원ID입력" value={member_id} onChange={handleMemberIdChange}></input>
            <button className="confirmBtn" onClick={handleIdConfirmClick}>주문찾기</button>
        </div>

        <div className="findOrder">
            <input type="text" className="orderFind" placeholder="주문번호입력" value={order_id} onChange={handleOrderIdChange}></input>
            <button className="orderNumInput" onClick={handleOrderNumInput}>주문번호확인</button>
        </div>

        <div className="ordering">
            <input type="text" className="idInput" placeholder="회원ID 입력" value={member_id} onChange={handleMemberIdChange}></input>
            <input type="text" className="statusInput" placeholder="상태 입력" value={status} onChange={handleStatusChange}></input>
            <input type="text" className="itemIdInput" placeholder="아이템 아이디 입력" value={item_id} onChange={handleItemIdChange}></input>
            <input type="text" className="countInput" placeholder="수량입력" value={count} onChange={handleCountChange}></input>
            <button className="orderItem" onClick={handleOrderItem}>주문</button>
        </div>


        {orderById && num===0 && (
                <div className="orderList1">  
                    <div className="order">
                        <p>주문 ID: {orderById.order_id}</p>
                        <p>주문 날짜: {new Date(orderById.order_date).toLocaleString()}</p>
                        <p>아이템:</p>
                        {orderById.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="itemInfo">
                                <p>아이템 ID: {item.item_id}</p>
                                <p>아이템 이름: {item.item_name}</p>
                                <p>아이템 가격: {item.item_price}</p>
                                <p>수량: {item.count}</p>
                                <br></br>
                            </div>
                        ))}
                    </div>
                </div>
        )}

        {ordersByMember.member_id && num===1 && (
                <div className="orderList2">
                    <div className="memberInfo">
                        <p>회원 ID: {ordersByMember.member_id}</p>
                    </div>

                    {ordersByMember.orders.map((order, orderIndex) => (
                        <div key={orderIndex} className="order">
                            <p>주문 ID: {order.order_id}</p>
                            <p>주문 날짜: {new Date(order.order_date).toLocaleString()}</p>
                            <p>아이템:</p>
                            {order.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="itemInfo">
                                    <p>아이템 ID: {item.item_id}</p>
                                    <p>아이템 이름: {item.item_name}</p>
                                    <p>아이템 가격: {item.item_price}</p>
                                    <p>수량: {item.count}</p>
                                    <br></br>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
        )}

    </>
        


    );
}