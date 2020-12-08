import { BrowserQRCodeReader } from '@zxing/library';

self.addEventListener('message', async (event) => {
  const { data, width, height } = event.data;
  const codeReader = new BrowserQRCodeReader();
  console.log(data)
  const result = await codeReader.decodeFromImage();
  self.postMessage(result);
});
