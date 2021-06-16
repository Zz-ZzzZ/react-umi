export function debounce(func: Function, delay: number) {
  let timer: NodeJS.Timeout | null = null;
  return function (this: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(this, ...arguments);
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
