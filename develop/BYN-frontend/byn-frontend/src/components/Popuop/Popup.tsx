// CustomPopup.tsx
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

interface CustomPopupProps {
  trigger: React.ReactNode; 
  children?: React.ReactNode; 
}

export const CustomPopup: React.FC<CustomPopupProps> = ({ trigger, children }) => {
  return (
    <Popup
      trigger={trigger}
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
        maxHeight: '80vh', // 👈 máximo alto relativo a la ventana
        overflowY: 'auto',  // 👈 activa scroll vertical
        textAlign: 'center',
      }}
        overlayStyle={{
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)'
        }}
    >
      <div>
        {children}
      </div>
    </Popup>
  );
};

