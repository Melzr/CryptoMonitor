import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BodyText, OperateButton, TextContainer, WalletModalInput } from './styled';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { selectCurrentCoin } from '../../state/selectors/walletSelector';

type Props = {
    onHide: () => void;
    show: boolean;
}

export const WalletModal = (props: Props) =>  {
    const selectedCoin = useSelector(selectCurrentCoin);
    
    return (
        <Modal show={props.show} centered onHide={props.onHide}>
        <Modal.Header closeButton closeVariant='white'>
          <Modal.Title>
            Operate {selectedCoin.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <TextContainer>
                <BodyText>
                    Cotizacion:
                </BodyText>
                <BodyText color="white">
                    {selectedCoin.price}
                </BodyText>
            </TextContainer>
            <TextContainer>
                <BodyText>
                    Balance:
                </BodyText>
                <BodyText color="white">
                    {selectedCoin.amount}
                </BodyText>
            </TextContainer>
            <TextContainer>
                <BodyText>
                    Amount:
                </BodyText>
                <WalletModalInput type="number" min="0" placeholder='  Enter a value'/>
            </TextContainer>
        </Modal.Body>
        <Modal.Footer>
            <OperateButton onClick={props.onHide}>Sell</OperateButton>
            <OperateButton onClick={props.onHide}>Buy</OperateButton>
        </Modal.Footer>
      </Modal>
    );
  }