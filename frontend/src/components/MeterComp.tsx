import React,{useEffect,useState} from 'react'
import { useSelector} from 'react-redux';
import { RootState } from '../store/utils/index';


const MeterComp:React.FC = () => {
    const color = useSelector((state: RootState) => state.themeMode.color);
    const [ currentHeight, setCurrentHeight ] = useState<number>(0);

    const fullPageHeight:number = document.body.scrollHeight;
      const viewportHeight:number = window.innerHeight;
      const availableScrollHeight:number = fullPageHeight - viewportHeight;

      useEffect(() => {
        const handleScroll = ():void => {
          const currentScrollPosition = window.scrollY;
            setCurrentHeight(currentScrollPosition);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    

      
    return (
        <div style={{ minWidth: '100%', maxHeight: '15px', display: 'flex', alignItems: 'flex-start', position: 'sticky',zIndex:50, top: '53.78px', backgroundColor: color.navbg,backdropFilter: 'blur(10px)' }}>
            <meter value={currentHeight} min={0} max={availableScrollHeight} style={{ minWidth: '100%', backgroundColor: color.navbg, }}></meter>
        </div>
    )
}

export default MeterComp