const ACCEPT = ['image/jpg', 'image/jpeg', 'image/png']
const MAX_SIZE = 3 * 1024 * 1024
const MAX_SIZE_STR = '3M'

const fileInput = document.querySelector('#file')

const covertImageToBase64 = (file, callback) => {
  let reader = new FileReader(file)
  reader.addEventListener('load', (e) => {
    const base64Image = e.target.result
    callback && callback(base64Image)
    reader = null
  })
  reader.readAsDataURL(file)
}

const compress = (base64Image, callback) => {
  let maxW = 1024
  let maxH = 1024
  const image = new Image()
  image.addEventListener('load', e => {
    let ratio = null // 图片的压缩比
    let needCompress = false // 是否需要压缩
    if (maxW < image.naturalWidth) {
      needCompress = true
      ratio = image.naturalWidth / maxW
      maxH = image.naturalHeight / ratio
    }
    if (maxH < image.naturalHeight) {
      needCompress = true
      ratio = image.naturalHeight / maxH
      maxW = image.naturalWidth / ratio
    }
    if (!needCompress) {
      maxW = image.naturalWidth
      maxH = image.naturalHeight
    }
    const canvas = document.createElement('canvas')
    canvas.setAttribute('id', '__compress__')
    canvas.width = maxW
    canvas.height = maxH
    canvas.style.visibility = 'visible'
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, maxW, maxH)
    ctx.drawImage(image, 0, 0, maxW, maxH)
    const compressImage = canvas.toDataURL('image/jpeg', 0.8)
    callback && callback(compressImage)
    // 展示压缩后的图片
    const _image = new Image()
    _image.src = compressImage
    document.body.appendChild(_image)

    canvas.remove()
    console.log(`压缩比：${image.src.length / _image.src.length}`)
  })
  image.src = base64Image
  document.body.appendChild(image)
}

const uploadToServer = (compressedImage) => {
  console.log('upload to server...', compressedImage)
}

fileInput.addEventListener('change', function(e) {
  const [file] = e.target.files
  if (!file) {
    return
  }
  const { type: fileType, size: fileSize } = file
  // 检查图片类型
  if (!ACCEPT.includes(fileType)) {
    alert(`不支持[${fileType}]文件类型！`)
    return
  }
  // 检查图片尺寸
  if (fileSize > MAX_SIZE) {
    alert(`图片大于${MAX_SIZE_STR}!`)
    fileInput.value = null
    return
  }
  // 压缩图片
  covertImageToBase64(file, (base64Image) => compress(base64Image, (compressedImage) => {
    uploadToServer(compressedImage)
  }))
})
