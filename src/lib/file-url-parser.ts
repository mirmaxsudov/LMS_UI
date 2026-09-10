export const fileUrlParser = (url: string) => {
  // OLD one => http://localhost:8888/api/v1/attachments/d52b3a00-a21e-40cf-a480-2b0a097cde72
  // NEW one => http://95.182.117.202:8888/api/v1/attachments/d52b

  return url.replace('http://localhost:8888', 'http://95.182.117.202:8888');
};
