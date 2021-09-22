import {useEffect, useState} from 'react';
import {useDebounce} from '../../assets/custom-hooks/hooks';
import {useActiveSkillContext} from '../../contexts/ActiveSkill.context';
import Data from './carouselChildren.data';
import {navControlConfig, maxItemsPerPageByBp} from './gridCarousel.config'
import GridCarousel from './encapsulated/GridCarousel';
import SkillButton from '../buttons/skill-button/SkillButton';

const widthMatchMedia = window.matchMedia("(max-width: 899px)").matches ? "95%" : "75%";

const Carousel = () => {
  const [gridWidth, setGridWidth] = useState(widthMatchMedia);
  const skillContext = useActiveSkillContext();
  const {setActiveSkill, toggleView} = skillContext;

  const handleResize = useDebounce(() => {
    setGridWidth(widthMatchMedia);
  }, 300);

  useEffect(() => {
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {	
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
    }   
  }, [handleResize]);

  return (
    <GridCarousel 
      wrapperClassName = "gridWrapper" 
      className = "gridCarousel"
      gridWidth = {gridWidth} 
      defaultDisplayLimit = {4}
      gridRows = {2} 
      strictRowsEnabled = {true}  
      breakpointDisplayLimits = {maxItemsPerPageByBp}
      navControls = {navControlConfig}
      overflowBehavior="hidden"
      aria-live="polite"
    > 
    { /*Map over whatever you want displayed in the GridCarousel. Dump & Forget! Read the documentation included 
       in this folder for more on how this component works. */
      Data.map((item, idx) => {  
        return(
          <SkillButton 
            key={`skillBtn--${idx+1}`}
            id={`skillBtn--${idx+1}`}
            src={item.image}
            subtitle={item.skillName}
            onClick={() => {toggleView(); setActiveSkill(item); sessionStorage.setItem('activeSkill', `skillBtn--${idx+1}`)}}
            tabIndex={1}
          />
        );
      })
    }
  </GridCarousel>
  )
};
export default Carousel;