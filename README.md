# Image-Compressor
> 前端压缩图片

1. 使用`input[type='file']`获取文件
2. 限制图片类型和大小
3. 使用`FileReader.readAsDataURL()`,将图片转为base64格式
4. 设置允许最大宽高，同比例缩放图片
5. 使用canvas绘制和压缩图片