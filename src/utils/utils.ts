export function debounce(func: Function, delay: number): Function {
  let timer: NodeJS.Timeout | null = null;
  return function (this: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(this, ...arguments);
    }, delay);
  };
}

export function downLoadFileByBlob(blobObj: object, fileName: string): void {
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(blobObj);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}
