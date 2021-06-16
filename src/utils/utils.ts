export function debounce<T extends unknown[]>(func: (...args: T) => void, delay: number) {
  let timer: NodeJS.Timeout | null = null;
  return (...args: T) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(null, ...args);
    }, delay);
  };
}

export function downLoadFile(objectUrl: any, fileName: string) {
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(objectUrl);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

export function downLoadFileByFetch(imgUrl: string, fileName: string) {
  fetch(imgUrl, { method: 'get', mode: 'cors' })
    .then((res) => res.blob())
    .then((data) => {
      downLoadFile(new Blob([data]), fileName);
    });
}
