const ACCEPT = ['image/jpg', 'image/jpeg', 'image/png']

const fileInput = document.querySelector('#file')

fileInput.addEventListener('change', function(e) {
  const [file] = e.target.files
  console.log(file)
  if (!file) {
    return
  }
  const { type: fileType, size: fileSize } = file
  if (!ACCEPT.includes(fileType)) {
    alert(`不支持[${fileType}]文件类型！`)
    return
  }
})
