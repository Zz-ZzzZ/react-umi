export function debounce(func, delay) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(this, ...arguments);
    }, delay);
  };
}

export function downLoadFileByBlob(blobObj, fileName) {
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(blobObj);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}
