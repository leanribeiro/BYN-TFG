import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

interface CustomPopupProps {
  // trigger: React.ReactNode; 
  onClose: () => void;
  children: React.ReactNode;
  open: boolean;
}

export const CustomPopup: React.FC<CustomPopupProps> = ({
  //  trigger, 
   children ,onClose,open}) => {
  return (
    <Popup
      // trigger={trigger}
      open={open}
      onClose={onClose}
      modal
      position="center center"
      contentStyle={{
        background: 'black',
        padding: '30px',
        borderRadius: '10px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        maxHeight: '80vh',
        overflowY: 'auto',
        textAlign: 'center',
      }}
      overlayStyle={{
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(5px)'
      }}
    >
       {children}
    </Popup>
  );
};
