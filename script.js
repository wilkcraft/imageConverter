document.getElementById('convertButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const format = document.getElementById('formatSelect').value;
    const canvas = document.getElementById('canvas');
    const downloadsDiv = document.getElementById('downloads');

    if (!fileInput.files.length) {
        alert('Please upload at least one image!');
        return;
    }

    downloadsDiv.innerHTML = ''; // Clear previous download links

    Array.from(fileInput.files).forEach((file) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = () => {
            img.src = reader.result;
        };

        img.onload = () => {
            // Set canvas dimensions to match image
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            let mimeType = '';
            switch (format) {
                case 'jpeg':
                    mimeType = 'image/jpeg';
                    break;
                case 'png':
                    mimeType = 'image/png';
                    break;
                case 'webp':
                    mimeType = 'image/webp';
                    break;
                case 'bmp':
                    mimeType = 'image/bmp';
                    break;
                case 'gif':
                    mimeType = 'image/gif';
                    break;
                default:
                    mimeType = 'image/png';
            }

            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error(`Failed to create Blob for image: ${file.name}`);
                    return;
                }

                const url = URL.createObjectURL(blob);

                // Get the original filename without extension
                const originalName = file.name.split('.').slice(0, -1).join('.');
                const newName = `${originalName}.${format}`;

                const link = document.createElement('a');
                link.href = url;
                link.download = newName;
                link.textContent = `Download: ${newName}`;
                downloadsDiv.appendChild(link);

                console.log(`Converted and ready for download: ${newName}`);
            }, mimeType);
        };

        reader.onerror = () => {
            console.error(`Failed to read file: ${file.name}`);
        };

        reader.readAsDataURL(file);
    });
});
