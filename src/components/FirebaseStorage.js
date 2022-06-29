import { initializeApp } from "../../node_modules/firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "../../node_modules/firebase/storage/";

export class FirebaseStorage {
  constructor(firebaseConfig, name, selectedFile, api, { renderer }) {
    this._api = api;
    this._renderer = renderer;
    this._name = name;
    this._firebaseConfig = firebaseConfig;
    this._selectedFile = selectedFile;
    this._app = initializeApp(this._firebaseConfig);
    this._storage = getStorage();
    this._metadata = {
      contentType: "image/jpeg",
    };
    this._spinner = document.querySelector(".popup__spinner");
  }

  _createStorageRef() {
    const storageRef = ref(this._storage, `${this._name}`);
    return storageRef;
  }

  _createUploadTask() {
    const uploadTask = uploadBytesResumable(
      this._createStorageRef(),
      this._selectedFile,
      this._metadata
    );
    return uploadTask;
  }

  uploadToFirebaseStorage() {
    this._spinnerOn();
    uploadBytes(this._createStorageRef(), this._selectedFile, this._metadata)
      .then((snapshot) => {
        console.log("Uploaded file!");
      })
      .then(() => {
        this._renderToSection();
      });
  }
  _renderToSection() {
    getDownloadURL(this._createUploadTask().snapshot.ref)
      .then((downloadURL) => {
        console.log("File available at", downloadURL);
        const data = { name: this._name, link: downloadURL };
        this._renderer(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deletePhoto() {
    deleteObject(this._createStorageRef())
      .then(() => {
        console.log("Deleted file!");
      })
      .catch((error) => {
        console.log("Deleted file err!");
      });
  }
  _spinnerOn() {
    this._spinner.closest(".popup").classList.add("popup_opened");
  }
}
