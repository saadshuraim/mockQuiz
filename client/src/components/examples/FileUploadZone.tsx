import FileUploadZone from '../FileUploadZone'

export default function FileUploadZoneExample() {
  const handleFileSelect = (file: File) => {
    console.log('File selected:', file.name)
  }

  return (
    <div className="p-6 max-w-4xl">
      <FileUploadZone onFileSelect={handleFileSelect} />
    </div>
  )
}
