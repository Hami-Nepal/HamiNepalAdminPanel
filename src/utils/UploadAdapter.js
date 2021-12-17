import baseUrl from './../api/baseUrl';

class UploadAdapter {
  constructor(loader) {
    // CKEditor 5's FileLoader instance.
    this.loader = loader;

    // URL where to send files.
    this.url = `${baseUrl}uploads/image`;
  }

  // Starts the upload process.
  upload() {
    return new Promise((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject);
      this._sendRequest();
    });
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open('POST', this.url, true);
    xhr.setRequestHeader(
      'Authorization',
      `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
    );

    xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = "Couldn't upload file:" + ` ${loader.file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;

      if (!response || response.error) {
        return reject(
          response && response.error
            ? response.error.message
            : genericErrorText,
        );
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      resolve({
        default: response.url,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest() {
    const data = new FormData();
    this.loader.file
      .then((file) => {
        // console.log(file)

        data.append('upload', file);

        this.xhr.send(data);
      })
      .catch((err) => alert(err.message));
  }
}

const MyCustomUploadAdapterPlugin = (editor) => {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new UploadAdapter(loader);
  };
};

export default MyCustomUploadAdapterPlugin;
