export default function isInView(el: Element): boolean {
  let isInView = false;

  const elRect = el.getBoundingClientRect();
  if (
    elRect.top <= window.innerHeight 
    && elRect.bottom > 0
  ) {
    isInView = true;
  }

  return isInView;
}
