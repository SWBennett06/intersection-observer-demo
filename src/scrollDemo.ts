import loadImage from './utils/loadImage';
import isInView from './utils/isInView';

export default function runScrollDemo() {
  let ticking = false;
  let observables = document.querySelectorAll('section:not(.active)');

  function checkAllInView() {
    if (!observables.length) {
      document.removeEventListener('scroll', scrollHandler);
      return;
    }
    
    observables.forEach(el => {
      // console.count()

      if (el.classList.contains('active'))
        return;

      if (isInView(el)) {
        const imgElement = el.getElementsByTagName('img')[0];        
        loadImage(imgElement)
          .then(() => {
            el.classList.add('active');
          })
          .catch(err => console.log(err));        
      }
    });

    observables = document.querySelectorAll('section:not(.active)');    
  }
  
  const scrollHandler = (event: Event) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkAllInView();
        ticking = false;
      });
      ticking = true;
    }
  };

  checkAllInView();
  document.addEventListener('scroll', scrollHandler);
}
