import {css} from 'styled-components';

/*A debounce function making event listeners, such as resize, 
fire less frequently so as to not overload the browser */
export const debounce = function(func, wait, immediate) {
  	var timeout;
  	return function() {
  	var context = this, args = arguments;
  	var later = function () {
  		timeout = null;
  		if (!immediate) func.apply(context, args);
  	};
  	var callNow = immediate && !timeout;
  	clearTimeout(timeout);
  	timeout = setTimeout(later, wait);
  	if (callNow) func.apply(context, args);
    };
};


export const ternary = function (variable, condition, trueCode, falseCode) {
  return (
	variable === condition ? trueCode : (falseCode)
  );
};

//Just like the bp mixin in _mixins.scss, with the same base map of our breakpoints from _variables.scss now available in styled components!
const breakpoints = {
noAnim: "(prefers-reduced-motion: reduce)",
standard: "(max-width: 56.24em)",
standardland: "(max-width: 56.24em) and (orientation: landscape)", 
phonesm:"(min-width: 15em)", //240px
default:"(min-width: 22.5em)", //360px
phone: "(min-width: 27.5em)", //440px
phonelg: "(min-width: 37.5em)", //600px
tab: "(min-width: 48em)", //768px
tabmd: "(min-width: 56.25em)", //900px  -- switch to desktop content
tablg: "(min-width: 62em)", //992px
desktopsm: "(min-width: 68.75em)", //1100px
desktop: "(min-width: 75em)", //1200px
desktoplg: "(min-width: 93.75em)" //1500px
};

export const bp = Object.keys(breakpoints).reduce( 
  (accumulator, label) => {
	accumulator[label] = (...args) => css`
	@media ${breakpoints[label]} {
		${css(...args)};
	}
	`;
	return accumulator;
  },
  {}
);

//Assign Page to Title Element on Page Change

export function changeDocumentTitle() {
  switch(window.location.pathname) {
	case '/': 
	  document.title = "Home page - Seth Lyness's Web Development Portfolio";
	  break;
	
    case '/about': 
	  document.title = "About page - Seth Lyness's Web Development Portfolio";
	  break;
	
    case '/gallery': 
	  document.title = "Gallery page - Seth Lyness's Web Development Portfolio";
	  break;

	case '/skills':
	  document.title = "Skills page - Seth Lyness's Web Development Portfolio";
	  break;

	case '/contact': 
	  document.title = "Contact page - Seth Lyness's Web Development Portfolio";
	  break;

	default: 
	  document.title = "Seth Lyness's Web Development Portfolio";
	  break;
  };
} 