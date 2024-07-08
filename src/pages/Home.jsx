import './shopping.css';
import {useNavigate} from "react-router-dom";

export function Home(){
    const navigate=useNavigate();
    return(
    <div className="homepage">
    
        <div className="head">
            <div className="headName">
                <p>Shopping</p>
            </div>
        </div>
        <div className="buttons">
            <button className="square" onClick={()=>navigate("/item")}>
            
                <div className="name">
                    <p>ITEMS</p>
                </div>

                <div className="explain">
                    <p>상품등록과 조회, 재고관리 등</p>
                </div>
            </button>

            <button className="square" onClick={()=>navigate("/members")}>
                <div className="name">
                    <p>Members</p>
                </div>

                <div className="explain">
                    <p>사용자 등록과 조회</p>
                </div>
            </button>

            <button className="square" onClick={()=>navigate("/orders")}>
                <div className="name">
                    <p>Orders</p>
                </div>

                <div className="explain">
                    <p>주문 등록과 조회</p>
                </div>
            </button>
       </div>
    </ div>
    );
}

