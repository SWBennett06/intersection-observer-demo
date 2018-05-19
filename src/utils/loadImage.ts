const fetchImage = (url: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = resolve;
    img.onerror = reject;
  });
};

export default function loadImage(element: HTMLImageElement): Promise<any> {
  return new Promise((resolve, reject) => {
    const src = element.dataset.src;
    fetchImage(src)
      .then(response => {
        element.src = src;
        resolve();
      })
      .catch(err => reject(err));
  });
};
