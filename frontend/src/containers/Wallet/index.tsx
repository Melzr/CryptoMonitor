import React from 'react';
import { MainContainer, SellButton, BuyButton} from './styled';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { MyVerticallyCenteredModal } from '../../components/OperateModal';
import { Console } from 'console';

export const Wallet = () => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
    <MainContainer>
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            name ={"BTC/USDT"}
        />
        <table className='table table-striped table-dark'>
            <thead className='header-container'>
                <tr>
                    <th scope="col" className ='wallet-header'>Nombre</th>
                    <th scope="col" className ='wallet-header'>Cotizacion</th>
                    <th scope="col" className ='wallet-header'>Balance</th>
                    <th scope="col" className='operate-header'>Operar</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='wallet-cell'>Bitcoin</td>
                    <td className='wallet-cell'>62000000</td>
                    <td className='wallet-cell'>0.100020</td>
                    <td className='operate-column'>
                        <SellButton onClick={() => setModalShow(true)}>Vender</SellButton>
                        <BuyButton onClick={() => setModalShow(true)}>Comprar</BuyButton>
                        
                    </td>
                </tr>
                <tr>
                    <td className='wallet-cell'>Ethereum</td>
                    <td className='wallet-cell'>420002</td>
                    <td className='wallet-cell'>0.00000</td>
                    <td className='operate-column'>
                        <SellButton onClick={() => setModalShow(true)}>Vender</SellButton>
                        <BuyButton onClick={() => setModalShow(true)}>Comprar</BuyButton>
                    </td>
                </tr>
                <tr>
                    <td className='wallet-cell'>Cardano</td>
                    <td className='wallet-cell'>50432</td>
                    <td className='wallet-cell'>4.240000</td>
                    <td className='operate-column'>
                        <SellButton onClick={() => setModalShow(true)}>Vender</SellButton>
                        <BuyButton onClick={() => setModalShow(true)}>Comprar</BuyButton>
                    </td>
                </tr>
            </tbody>
        </table>
    </MainContainer>
    )
}