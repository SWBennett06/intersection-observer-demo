import loadImage from './utils/loadImage';

export default function runIODemo() {  
  const observables = document.querySelectorAll('section');
  
  const obsOptions: IntersectionObserverInit = {
    threshold: [0]
  };
  
  const obsHandler: IntersectionObserverCallback = (entries, observer) => {  
    entries.forEach((entry, index) => {
      // console.count();
      
      const element = entry.target as HTMLElement;
      const imgElement = element.getElementsByTagName('img')[0];
      
      if (entry.isIntersecting) {
        loadImage(imgElement)
          .then(() => {
            element.classList.add('active');
          })
          .catch(err => console.log(err));

        observer.unobserve(element);
      }
    });
  };
  
  const observer = new IntersectionObserver(obsHandler, obsOptions);
  
  observables.forEach(observable => {
    observer.observe(observable);
  });
}
